import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectLearning } from '../../slices/learning';
import Dialog from './Dialog';

export default function LearningPage() {
    const { frameType } = useParams();
    const { data: learningData } = useSelector(selectLearning);

    if (frameType === 'record') <div>CAN NOT RECORD</div>;
    if (!learningData) return <div>데이터 로드중</div>;

    return <Dialog />;
}
