import { TextField } from '@mui/material';

export default function TextFieldAttribute({
    name,
    value,
    onChange,
    error,
    disabled
}: {
    name: string;
    value: number;
    onChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    error?: boolean;
    disabled?: boolean;
}) {
    return (
        <TextField
            variant='standard'
            label={name.toUpperCase()}
            name={name}
            value={value}
            size='small'
            type='number'
            sx={{ width: '100px', marginRight: '8px', backgroundColor: 'white' }}
            onChange={onChange}
            error={error}
            disabled={disabled}
        />
    );
}
