import $ from './ErrorMessage.module.css';

interface ErrorMessageProps {
    error: string;
}

export default function ErrorMessage({ error }: ErrorMessageProps) {
    return error ? <div className={$.error}>{error}</div> : null;
}
