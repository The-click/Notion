import React, { memo } from "react";
import clsx from "clsx";
import cls from "./SpaceTitle.module.scss";
import { Space } from "pages/MainPage";
import checkImg from "assets/check.png";
import pencilImg from "assets/pencil.png";
import secureImg from "assets/булавка.png";
import trashImg from "assets/мусор.png";
import penImg from "assets/pen.svg";
import DoSecuredImg from "assets/push-pin.png";
import { MyButton } from "ui/Button/Button";

interface SpaceTitleProps {
    className?: string;
    space: Space;
    changeSpace: (space?: Space) => void;
    onSelectSpace: (name: string) => void;
    deleteSpace: (name: string) => void;
    changeFixSpace: (name: string, value: number) => void;
    select: boolean;
}

export const SpaceTitle: React.FC<SpaceTitleProps> = memo((props) => {
    const {
        className = "",
        space,
        changeSpace,
        onSelectSpace,
        deleteSpace,
        changeFixSpace,
        select,
    } = props;

    return (
        <section
            onClick={() => onSelectSpace(space.name)}
            className={clsx(cls.spaceTitle, { [cls.select]: select }, [
                className,
            ])}
        >
            {space.fix > 0 && (
                <img src={DoSecuredImg} alt="secured" className={cls.secured} />
            )}
            <img
                className={cls.icon}
                src={space.type === "notion" ? pencilImg : checkImg}
                alt="icon"
            />
            <h2 className={cls.text}>{space.name}</h2>
            <div className={cls.setting} onClick={(e) => e.stopPropagation()}>
                <MyButton
                    className={cls.btn}
                    onClick={() =>
                        changeFixSpace(
                            space.name,
                            space.fix > 0 ? 0 : +new Date()
                        )
                    }
                >
                    <img src={secureImg} alt="secured space" />
                </MyButton>
                <MyButton
                    className={cls.btn}
                    onClick={(e) => changeSpace(space)}
                >
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
