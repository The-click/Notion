import React from "react";
import clsx from "clsx";
import cls from "./TextEditor.module.scss";
import ReactQuill, { Quill } from "react-quill";
import ImageResize from "quill-image-resize-module-react";

import "react-quill/dist/quill.bubble.css";
import "react-quill/dist/quill.snow.css";

Quill.register("modules/imageResize", ImageResize);

const toolbarModules = {
    header: [
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
    ],
    text: [
        [{ font: [] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        ["image", "link"],
        [],
    ],
};

interface TextEditorProps {
    className?: string;
    toolbar: keyof typeof toolbarModules;
    placeholder?: string;
    value: string;
    onChange: (text: string) => void;
    theme: "snow" | "bubble";
}

export const TextEditor: React.FC<TextEditorProps> = (props) => {
    const {
        className = "",
        toolbar,
        placeholder,
        value,
        onChange,
        theme,
    } = props;

    return (
        <ReactQuill
            placeholder={placeholder || ""}
            className={clsx(cls.textEditor, {}, [className])}
            theme={theme}
            value={value}
            onChange={onChange}
            modules={{
                toolbar: toolbarModules[toolbar],
                imageResize: {
                    parchment: Quill.import("parchment"),
                    modules: ["Resize", "DisplaySize"],
                },
            }}
        />
    );
};
