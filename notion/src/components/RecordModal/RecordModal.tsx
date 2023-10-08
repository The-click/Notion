import React, { useCallback, useState } from "react";
import cls from "./RecordModal.module.scss";
import { Modal } from "ui/Modal/Modal";
import clsx from "clsx";
import { TextEditor } from "components/TextEditor";
import { MyButton, ThemeButton } from "ui/Button/Button";
import { Mark, Notion, NotionColor, TypeSpace } from "pages/MainPage";
import { parserText } from "helper/ParserText/ParserText";

interface RecordModalProps {
    className?: string;
    record: Notion | Mark | null;
    isOpen: boolean;
    onClose: () => void;
    type: TypeSpace;
    changeRecords: (newRecord: Notion | Mark, oldTitle?: string) => void;
}

export const RecordModal: React.FC<RecordModalProps> = (props) => {
    const {
        className = "",
        record,
        type,
        changeRecords,
        onClose,
        isOpen,
    } = props;

    const [recordTitle, setRecordTitle] = useState<string>(
        record ? record.title : " "
    );
    const [recordText, setRecordText] = useState<string>(
        record?.text ? record.text : ""
    );
    const [recordColor, setRecordColor] = useState<NotionColor>(
        record?.color ? record.color : NotionColor.BLACK
    );

    const onChangeTitle = useCallback((title: string) => {
        setRecordTitle(title);
    }, []);
    const onChangeText = useCallback((text: string) => {
        setRecordText(text);
    }, []);

    const onCreateRecord = () => {
        const titleText = parserText(recordTitle);
        const descriptTextNode = parserText(recordText);

        if (titleText === "") return;

        let newRecord: Notion | Mark;
        newRecord = {
            title: recordTitle.trim(),
            color: recordColor,
            fix: record ? record.fix : 0,
        };
        if (descriptTextNode) {
            newRecord.text = recordText;
        }
        if (type === "mark") {
            newRecord = { ...newRecord, mark: false };
            if (record && "mark" in record) {
                newRecord.mark = record.mark;
            }
        }

        changeRecords(newRecord, record?.title);
    };

    return (
        <Modal
            className={clsx(cls.recordModal, {}, [className])}
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className={cls.modal}>
                <h3 className={clsx(cls.modalTitle, "hat")}>
                    « Создал и точка »
                </h3>
                <div className={cls.modalContent}>
                    <TextEditor
                        value={recordTitle}
                        onChange={onChangeTitle}
                        className={cls.modalRecordTitle}
                        theme={"bubble"}
                        toolbar={"header"}
                        placeholder="Заголовок"
                    ></TextEditor>
                    <TextEditor
                        theme={"snow"}
                        value={recordText}
                        onChange={onChangeText}
                        className={cls.modalRecordText}
                        toolbar={"text"}
                        placeholder="Описание"
                    ></TextEditor>

                    <div className={cls.modalSwitch}>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.BLACK,
                                },
                                cls.black
                            )}
                            onClick={() => setRecordColor(NotionColor.BLACK)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.BLUE,
                                },
                                cls.blue
                            )}
                            onClick={() => setRecordColor(NotionColor.BLUE)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.GRAY,
                                },
                                cls.gray
                            )}
                            onClick={() => setRecordColor(NotionColor.GRAY)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.GREEN,
                                },
                                cls.green
                            )}
                            onClick={() => setRecordColor(NotionColor.GREEN)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.RED,
                                },
                                cls.red
                            )}
                            onClick={() => setRecordColor(NotionColor.RED)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.WHITE,
                                },
                                cls.white
                            )}
                            onClick={() => setRecordColor(NotionColor.WHITE)}
                        >
                            <span></span>
                        </MyButton>
                        <MyButton
                            className={clsx(
                                cls.modalColor,
                                {
                                    [cls.active]:
                                        recordColor === NotionColor.YELLOW,
                                },
                                cls.yellow
                            )}
                            onClick={() => setRecordColor(NotionColor.YELLOW)}
                        >
                            <span></span>
                        </MyButton>
                    </div>

                    <MyButton
                        theme={ThemeButton.BACKGROUND}
                        className={cls.modalSave}
                        onClick={onCreateRecord}
                    >
                        Сохранить
                    </MyButton>
                </div>
            </div>
        </Modal>
    );
};
