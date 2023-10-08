import React, { memo } from "react";
import clsx from "clsx";
import cls from "./Record.module.scss";
import { Mark, Notion } from "pages/MainPage";
import { MyButton } from "ui/Button/Button";
import secureImg from "assets/булавка.png";
import trashImg from "assets/мусор.png";
import penImg from "assets/pen.svg";
import checkImg from "assets/checkmark.svg";
import doSecuredImg from "assets/push-pin.png";

interface RecordProps {
    className?: string;
    record: Notion | Mark;
    onChangeRecords: (record: Notion | Mark) => void;
    deleteRecords: (title: string) => void;
    changeMarker: (title: string, mark: boolean) => void;
    changeFixedRecord: (title: string, value: number) => void;
}

export const Record: React.FC<RecordProps> = memo((props) => {
    const {
        className = "",
        record,
        onChangeRecords,
        deleteRecords,
        changeMarker,
        changeFixedRecord,
    } = props;

    return (
        <section
            style={{
                backgroundColor: `rgba(${record.color}, 0.7)`,
            }}
            className={clsx(cls.record, {}, [className])}
        >
            {record.fix > 0 && (
                <img className={cls.secured} src={doSecuredImg} alt="secure" />
            )}
            <div className={cls.head}>
                {"mark" in record && (
                    <MyButton
                        className={clsx(cls.mark, { [cls.do]: record.mark })}
                        onClick={() => changeMarker(record.title, !record.mark)}
                    >
                        <img src={checkImg} alt="check" />{" "}
                    </MyButton>
                )}
                <h3
                    className={clsx(cls.title, {
                        [cls.done]: "mark" in record && record?.mark,
                    })}
                    dangerouslySetInnerHTML={{ __html: record.title }}
                />
            </div>
            {record.text && (
                <div
                    className={cls.text}
                    dangerouslySetInnerHTML={{ __html: record.text }}
                />
            )}

            <div className={cls.setting}>
                <MyButton
                    className={cls.btn}
                    onClick={() =>
                        changeFixedRecord(
                            record.title,
                            record.fix ? 0 : +new Date()
                        )
                    }
                >
                    <img src={secureImg} alt="secured space" />
                </MyButton>
                <MyButton
                    className={cls.btn}
                    onClick={() => onChangeRecords(record)}
                >
                    <img src={penImg} alt="edit space" />
                </MyButton>

                <MyButton
                    className={cls.btn}
                    onClick={() => deleteRecords(record.title)}
                >
                    <img src={trashImg} alt="trash space" />
                </MyButton>
            </div>
        </section>
    );
});
