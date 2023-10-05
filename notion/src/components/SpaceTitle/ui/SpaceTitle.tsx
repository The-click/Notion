import React from "react";
import clsx from "clsx";
import cls from "./SpaceTitle.module.scss";
import { Space } from "pages/MainPage";
import checkImg from "assets/check.png";
import pencilImg from "assets/pencil.png";
import secureImg from "assets/булавка.png";
import trashImg from "assets/мусор.png";
import penImg from "assets/pen.svg";
import { MyButton } from "ui/Button/Button";

interface SpaceTitleProps {
    className?: string;
    space: Space;
    changeName?: (text: string) => void;
}

export const SpaceTitle: React.FC<SpaceTitleProps> = (props) => {
    const { className = "", space, changeName } = props;

    return (
        <div className={clsx(cls.spaceTitle, {}, [className])}>
            <img
                className={cls.icon}
                src={space.type === "notion" ? pencilImg : checkImg}
                alt="icon"
            />
            <span
                onDoubleClick={() => console.log("dbl click")}
                className={cls.text}
            >
                {space.name}
            </span>
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
        </div>
    );
};
