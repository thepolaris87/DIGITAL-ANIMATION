import { useRef } from 'react';
import { useParams } from 'react-router-dom';

export default function useMediaRecord(fileName?: string) {
    const { frameId, locale } = useParams();
    const mediaRecorder = useRef<MediaRecorder>();
    const desktopStream = useRef<MediaStream>();
    const url = useRef<string>();

    const mergeAudioStreams = (desktopStream?: MediaStream, voiceStream?: MediaStream) => {
        // 비디오, 오디오스트림 연결
        const context = new AudioContext();
        const destination = context.createMediaStreamDestination();
        let hasDesktop = false;
        let hasVoice = false;
        if (desktopStream && desktopStream.getAudioTracks().length > 0) {
            const source1 = context.createMediaStreamSource(desktopStream);
            const desktopGain = context.createGain();
            desktopGain.gain.value = 0.7;
            source1.connect(desktopGain).connect(destination);
            hasDesktop = true;
        }

        if (voiceStream && voiceStream.getAudioTracks().length > 0) {
            const source2 = context.createMediaStreamSource(voiceStream);
            const voiceGain = context.createGain();
            voiceGain.gain.value = 0.7;
            source2.connect(voiceGain).connect(destination);
            hasVoice = true;
        }

        return hasDesktop || hasVoice ? destination.stream.getAudioTracks() : [];
    };

    const start = async () => {
        try {
            desktopStream.current = await navigator.mediaDevices.getDisplayMedia({ video: { width: 640, height: 480 }, audio: true }); // 비디오스트림 생성
        } catch (error) {
            return false;
        }

        const tracks = [...desktopStream.current.getVideoTracks(), ...mergeAudioStreams(desktopStream.current)];
        const stream = new MediaStream(tracks);
        const blobs: Blob[] = [];

        mediaRecorder.current = new MediaRecorder(stream, { mimeType: 'video/webm; codecs=vp9' }); // mediaRecorder객체 생성
        mediaRecorder.current.ondataavailable = (e) => blobs.push(e.data);
        mediaRecorder.current.onstop = async () => {
            const blob = new Blob(blobs, { type: 'video/mp4' });
            url.current = window.URL.createObjectURL(blob);
        };

        mediaRecorder.current.start(); // 녹화 시작

        return true;
    };

    const stop = () => {
        if (!mediaRecorder.current) return;
        mediaRecorder.current.stop();
        desktopStream.current?.getTracks().forEach((s) => s.stop());
    };

    const download = () => {
        if (!url.current) return;
        const a = document.createElement('a');
        a.href = url.current;
        a.download = fileName || frameId + '_' + locale;
        a.click();
    };

    return { start, stop, download };
}
