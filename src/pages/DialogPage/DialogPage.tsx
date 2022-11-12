import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFrameData, getImage, getMasterFrame, getSound, getText } from '../../apis/api';

import { setData, setFrameType, setNavi, setSize } from '../../slices/dialog';
import Dialog from './Dialog';

export default function DialogPage() {
    const { frameId } = useParams();
    const [load, setLoad] = useState(true);
    const { data } = useQuery(['dialog', 'meta', frameId], async () => getFrameData({ frameId }), { enabled: !!frameId });
    const { data: masterData } = useQuery(['dialog', 'master'], getMasterFrame.bind(null, { subjectCode: 'A1' }));
    const { data: soundData } = useQuery(['dialog', 'sound'], getSound);
    const { data: textData } = useQuery(['dialog', 'text'], getText.bind(null, {}));
    const { data: imageData } = useQuery(['dialog', 'image'], getImage);
    const dispatch = useDispatch();

    useEffect(() => {
        if (data && data.frameConfig && textData && load) {
            let parseData = data.frameConfig.replace(/"(AI\d{8}.*?)"/g, '"https://sol-api.esls.io/images/A1/$1"');
            parseData = parseData.replace(/"text":("AT\d{8}")/g, (match: string, p1: string) => {
                const target = textData.find((el) => `"${el.textId}"` === p1);
                if (target) return `"text":"${target.textKo}"`;
                return match;
            });
            parseData = parseData.replaceAll('\n', '\\n');
            parseData = JSON.parse(parseData);
            console.log(parseData);
            setLoad(false);
            dispatch(setFrameType(data.frameTypeCode));
            if (Array.isArray(parseData)) return;
            dispatch(setData(parseData));
            if (data.frameTypeCode === 'M') dispatch(setNavi('master'));
            if (!parseData.size) dispatch(setSize({ width: 1024, height: 768 }));
        }
    }, [data, dispatch, textData, load]);

    if (!data || !masterData || !soundData || !textData || !imageData || load) return <div>데이터 로드중</div>;

    return <Dialog />;
}
