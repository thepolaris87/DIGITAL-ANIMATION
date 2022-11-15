import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getFrameData, getImage, getMasterFrame, getSound, getText } from '../../apis/api';

import { setData, setFrameType, setNavi, setSize } from '../../slices/dialog';
import Dialog from './Dialog';

export default function DialogPage() {
    const [load, setLoad] = useState(true);
    // 데이터 로드 및 전처리
    useEffect(() => {
        setTimeout(()=> setLoad(false), 1000)
    }, []);

    if (load) return <div>데이터 로드중</div>;

    return <Dialog />;
}
