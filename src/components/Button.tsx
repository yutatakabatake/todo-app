import Button from '@mui/material/Button';

type Color = 'primary' | 'secondary' | 'success' | 'error'

type Props = {
    text: string;
    color: Color;
    handleClick: () => void
}

export default function ButtonUsage(props: Props) {
    const { text, color, handleClick } = props;
    return (
        <Button
            variant="contained"
            color={color}
            onClick={handleClick}>
            {text}
        </Button>
    );
}