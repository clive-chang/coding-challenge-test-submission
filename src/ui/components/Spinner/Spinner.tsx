import $ from './Spinner.module.css';

interface LoadingSpinnerProps {
    size?: number;
}

export default function LoadingSpinner({ size }: LoadingSpinnerProps) {
    return <div data-testid="loading-spinner" className={$.spinner} style={size ? { width: size, height: size } : {}}></div>;
}
