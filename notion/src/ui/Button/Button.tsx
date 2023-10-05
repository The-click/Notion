import { ButtonHTMLAttributes, memo } from "react";
import cls from "./Button.module.scss";
import clsx from "clsx";

export enum ThemeButton {
    CLEAR = "clear",
    BACKGROUND = "background",
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    theme?: ThemeButton;
    skeleton?: boolean;
}

export const MyButton = memo((props: ButtonProps) => {
    const {
        className,
        theme = ThemeButton.CLEAR,
        children,
        skeleton,
        ...otherProps
    } = props;

    return (
        <button
            type="button"
            className={clsx(cls.button, className, cls[theme])}
            {...otherProps}
        >
            {children}
        </button>
    );
});
