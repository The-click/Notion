import React from "react";
import clsx from "clsx";
import cls from "./SearchBar.module.scss";
import searchImg from "assets/поиск.png";
import plusImg from "assets/plus.svg";
import { MyInput } from "ui/Input/Input";
import { MyButton } from "ui/Button/Button";

interface SearchBarProps {
    className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = (props) => {
    const { className = "" } = props;

    return (
        <section className={clsx(cls.searchBar, {}, [className])}>
            <img className={cls.icon} src={searchImg} alt="search img" />
            <MyInput className={cls.input} placeholder="Найти запись" />

            <MyButton className={cls.addNotion}>
                <img src={plusImg} alt="add notion" />
            </MyButton>
        </section>
    );
};
