import { Box } from '@mui/material';
import RemoveTag from './RemoveTag';
import CopyTag from './CopyTag';
import PlayTag from './PlayTag';

export default function Tags({ id }: { id: string }) {
    return (
        <Box>
            <PlayTag id={id} />
            <CopyTag id={id} />
            <RemoveTag id={id} />            
        </Box>
    );
}
