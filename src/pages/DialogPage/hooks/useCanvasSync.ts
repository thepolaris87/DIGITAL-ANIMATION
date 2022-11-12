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
                const clone = Object.assign({});
                const { id } = data;
                const canvas = render?.[id];

                Object.assign(clone, {});
                if (canvas) {
                    // TEXT STYLE
                    canvas?.forEachObject((object) => {
                        if (object.data.type === 'script') {
                            const styles = (object as fabric.Textbox).styles;
                            (object as fabric.Textbox).text = object.data.src;
                            if (locale === 'ko') {
                                object.data = { ...object.data, koStyles: styles };
                            }
                            if (locale === 'en') {
                                object.data = { ...object.data, enStyles: styles };
                            }
                        }
                    });

                    canvas.includeDefaultValues = false;
                    const fabricData = canvas.toObject(['data']);
                    
                    //DELETE VERSION
                    if (fabricData.backgroundImage) {
                        Object.assign(clone, { backgroundImage: fabricData.backgroundImage });
                        delete clone.backgroundImage.version;
                    }
                    if (fabricData.objects && Array.isArray(fabricData.objects)) {
                        const objects = fabricData.objects.map((object: any) => {
                            delete object.version;
                            return object;
                        });
                        Object.assign(clone, { objects });
                    }
                    return { ...data, canvas: clone };
                }
                return { ...data };
            }) || [];

        return syncData;
    };

    return { getSyncData, getMasterSyncData };
}
