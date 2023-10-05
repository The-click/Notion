import React from "react";
import clsx from "clsx";
import cls from "./Sidebar.module.scss";
import { Space } from "pages/MainPage";
import { SpaceTitle } from "components/SpaceTitle";

interface SidebarProps {
    className?: string;
    spaces: Space[];
}

export const Sidebar: React.FC<SidebarProps> = (props) => {
    const { className = "", spaces } = props;

    return (
        <section className={clsx(cls.sidebar, {}, [className])}>
            <p className={cls.title}>Пространства</p>

            <div className={cls.spaces}>
                {spaces.map((el) => (
                    <SpaceTitle space={el} />
                ))}
            </div>
        </section>
    );
};
