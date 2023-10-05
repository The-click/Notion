import React, { useState } from "react";
import clsx from "clsx";
import cls from "./MainPage.module.scss";
import { Space } from "../type/type";
import { Sidebar } from "components/Sidebar";

interface MainPageProps {
    className?: string;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
    const { className = "" } = props;
    const [spaces, setSpaces] = useState<Space[]>([
        { name: "Первое рабочее пространство", type: "notion", fix: false },
        { name: "Второе раб. простр.", type: "mark", fix: false },
    ]);

    return (
        <section className={clsx(cls.mainPage, {}, [className])}>
            <Sidebar spaces={spaces} className={cls.sidebar} />
            <div className={cls.content}>
                <h1 className={clsx(cls.title, "hat")}>« Записал и точка »</h1>
            </div>
        </section>
    );
};
