import { useSelector } from 'react-redux';
import { DATAMASTER, selectDialog } from '../../../slices/dialog';

export default function useCanvasSync() {
    const { data, render, locale } = useSelector(selectDialog);

    const getMasterSyncData = () => {
        if (!render?.['master']) return;
        render['master'].includeDefaultValues = false;
        const masterSyncData = render['master'].toObject(['data']);
        if (masterSyncData && masterSyncData.objects.length !== 0) {
            const master: DATAMASTER = { id: 'master', canvas: {} };

            if (masterSyncData?.backgroundImage) {
                master.canvas.backgroundImage = { ...masterSyncData.backgroundImage };
                delete master.canvas.backgroundImage.version;
            }
            if (masterSyncData.objects && Array.isArray(masterSyncData.objects)) {
                master.canvas.objects = [...masterSyncData.objects].map((object) => {
                    delete object.version;
                    return object;
                });
            }
            return master;
        }
        return;
    };

    const getSyncData = (option?: { excludeText?: boolean }) => {
        const syncData =
            data?.dialog?.map((data) => {                
                const { id } = data;
                const canvas = render?.[id];                
                if (canvas) {
                    canvas.includeDefaultValues = false;
                    const fabricData = canvas.toObject(['data']);
                    return { ...data, canvas: fabricData };
                }
                return { ...data };
            }) || [];

        return syncData;
    };

    return { getSyncData, getMasterSyncData };
}
