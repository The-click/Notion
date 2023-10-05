import React, { InputHTMLAttributes, memo } from "react";
import clsx from "clsx";
import cls from "./Input.module.scss";

type HTMLInputProps = Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange" | "readOnly"
>;

interface InputProps extends HTMLInputProps {
    className?: string;
    value?: string | number;
    onChange?: (value: string) => void;
    type?: string;
    placeholder?: string;
    prevText?: string;
    readonly?: boolean;
}

export const MyInput: React.FC<InputProps> = memo((props) => {
    const {
        className,
        value,
        onChange,
        type = "text",
        placeholder,
        prevText,
        readonly,
        ...otherProps
    } = props;

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange?.(e.target.value);
    };

    const mods = {
        [cls.readonly]: readonly,
    };

    return (
        <input
            className={clsx(cls.input, mods, [className])}
            readOnly={readonly}
            type={type}
            value={value}
            onChange={onChangeHandler}
            placeholder={placeholder}
            {...otherProps}
        />
    );
});
