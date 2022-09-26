import { Button } from '@mui/material';

export type UPLOADBUTTON = {
    id: string;
    accept: 'image' | 'audio';
    text: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
};

export default function UploadButton({ id, accept, text, onChange }: UPLOADBUTTON) {
    return (
        <label htmlFor={id}>
            <input hidden accept={accept + '/*'} id={id} type='file' onChange={onChange} />
            <Button variant='contained' component='span'>
                {text}
            </Button>
        </label>
    );
}
