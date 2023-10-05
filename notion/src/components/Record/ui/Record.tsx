import React, { memo } from "react";
import clsx from "clsx";
import cls from "./Record.module.scss";
import { Mark, Notion } from "pages/MainPage";
import { MyButton } from "ui/Button/Button";
import secureImg from "assets/булавка.png";
import trashImg from "assets/мусор.png";
import penImg from "assets/pen.svg";
import checkImg from "assets/checkmark.svg";

interface RecordProps {
    className?: string;
    record: Notion | Mark;
}

export const Record: React.FC<RecordProps> = memo((props) => {
    const { className = "", record } = props;

    return (
        <section
            style={{
                backgroundColor: `rgba(${record.color}, 0.7)`,
            }}
            className={clsx(cls.record, {}, [className])}
        >
            <div className={cls.head}>
                {"mark" in record && (
                    <MyButton
                        className={clsx(cls.mark, { [cls.do]: record.mark })}
                    >
                        <img src={checkImg} alt="check" />{" "}
                    </MyButton>
                )}
                <h3 className={cls.title}>{record.title}</h3>
            </div>
            {record.text && <div className={cls.text}>{record.text}</div>}

            {record.img && <img src={record.img} alt="record img" />}

            <div className={cls.setting}>
                <MyButton className={cls.btn}>
                    <img src={secureImg} alt="secured space" />
                </MyButton>
                <MyButton className={cls.btn}>
                    <img src={penImg} alt="edit space" />
                </MyButton>

                <MyButton className={cls.btn}>
                    <img src={trashImg} alt="trash space" />
                </MyButton>
            </div>
        </section>
    );
});
