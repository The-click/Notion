import React, { memo } from "react";
import clsx from "clsx";
import cls from "./Sidebar.module.scss";
import { Space } from "pages/MainPage";
import { SpaceTitle } from "components/SpaceTitle";
import { MyButton } from "ui/Button/Button";
import plusImg from "assets/plus.svg";

interface SidebarProps {
    className?: string;
    spaces: Space[];
    changeSpace: (name: string) => void;
    deleteSpace: (name: string) => void;
    selectSpace: Space | null;
}

export const Sidebar: React.FC<SidebarProps> = memo((props) => {
    const {
        className = "",
        spaces,
        changeSpace,
        selectSpace,
        deleteSpace,
    } = props;

    return (
        <section className={clsx(cls.sidebar, {}, [className])}>
            <div className={cls.head}>
                <p className={cls.title}>Пространства</p>
                <MyButton className={cls.addBtn}>
                    <img src={plusImg} alt="add" />
                </MyButton>
            </div>

            <div className={cls.spaces}>
                {spaces.map((el) => (
                    <SpaceTitle
                        select={el.name == selectSpace?.name}
                        key={el.name}
                        space={el}
                        changeSpace={changeSpace}
                        deleteSpace={deleteSpace}
                    />
                ))}
            </div>
        </section>
    );
});
