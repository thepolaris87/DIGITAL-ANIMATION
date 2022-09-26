import { useCallback, useEffect, useState } from 'react';

type DATA = { payload: any; loading: boolean; error: unknown };

export default function useGetTestAPI(api: Function) {
    const [data, setData] = useState<DATA>({ payload: null, loading: false, error: null });

    const getData = useCallback(async () => {
        setData((state) => ({ ...state, loading: true }));
        try {
            const data = await api();            
            setData((state) => ({ ...state, payload: data, loading: false }));
        } catch (error) {
            setData((state) => ({ ...state, loading: false, error }));
        }
    }, [api]);

    useEffect(() => {
        !data.payload && getData();
    }, [data.payload, getData]);

    return data;
}
