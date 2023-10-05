import React, { memo } from "react";
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
    changeSpace: (name: string) => void;
    deleteSpace: (name: string) => void;
    select: boolean;
}

export const SpaceTitle: React.FC<SpaceTitleProps> = memo((props) => {
    const {
        className = "",
        space,
        changeName,
        changeSpace,
        deleteSpace,
        select,
    } = props;

    return (
        <section
            onClick={() => changeSpace(space.name)}
            className={clsx(cls.spaceTitle, { [cls.select]: select }, [
                className,
            ])}
        >
            <img
                className={cls.icon}
                src={space.type === "notion" ? pencilImg : checkImg}
                alt="icon"
            />
            <h2
                onDoubleClick={() => console.log("dbl click")}
                className={cls.text}
            >
                {space.name}
            </h2>
            <div className={cls.setting} onClick={(e) => e.stopPropagation()}>
                <MyButton className={cls.btn}>
                    <img src={secureImg} alt="secured space" />
                </MyButton>
                <MyButton className={cls.btn}>
                    <img src={penImg} alt="edit space" />
                </MyButton>
                <MyButton
                    className={cls.btn}
                    onClick={(e) => deleteSpace(space.name)}
                >
                    <img src={trashImg} alt="trash space" />
                </MyButton>
            </div>
        </section>
    );
});
