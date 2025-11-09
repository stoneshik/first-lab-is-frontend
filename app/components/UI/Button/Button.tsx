import styles from "./Button.module.scss";

interface ButtonProps {
    onClick?: () => void;
    textButton: string;
    disabled?: boolean;
}

export const Button = ({onClick, textButton, disabled}: ButtonProps) => {
    return (
        <button onClick={onClick} disabled={disabled} className={styles.button}>
            {textButton}
        </button>
    );
}
