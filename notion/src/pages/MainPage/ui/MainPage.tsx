import React, { useState, useEffect, useCallback } from "react";
import clsx from "clsx";
import cls from "./MainPage.module.scss";
import { NotionColor, Space } from "../type/type";
import { Sidebar } from "components/Sidebar";
import { SearchBar } from "components/SearchBar";
import { Record } from "components/Record";

interface MainPageProps {
    className?: string;
}

export const MainPage: React.FC<MainPageProps> = (props) => {
    const { className = "" } = props;
    const [spaces, setSpaces] = useState<Space[]>([
        {
            name: "Первое рабочее пространство",
            type: "notion",
            fix: null,
            records: [
                {
                    title: "Заметка о пропадающих дельфинах",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.BLACK,
                    fix: null,
                },
                {
                    title: "Заметка о не пропадающих дельфинах",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.BLUE,
                    fix: null,
                },
                {
                    title: "Заметка о не пропадающих дельфинах 2",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.GREEN,
                    fix: null,
                },
            ],
        },
        {
            name: "Второе раб. простр.",
            type: "mark",
            fix: null,
            records: [
                {
                    title: "Маркер Заметка о пропадающих дельфинах",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.BLACK,
                    fix: null,
                    mark: false,
                },
                {
                    title: "Маркер Заметка о не пропадающих дельфинах",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.BLUE,
                    fix: null,
                    mark: true,
                },
                {
                    title: " Маркер Заметка о не пропадающих дельфинах 1",
                    text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                    color: NotionColor.GREEN,
                    fix: null,
                    mark: true,
                },
            ],
        },
    ]);

    const [selectSpace, setSelectSpace] = useState<Space | null>(null);

    useEffect(() => {
        if (spaces[0]) {
            setSelectSpace(spaces[0]);
        }
    }, []);

    const changeSpace = useCallback(
        (name: string) => {
            const space = spaces.find((el) => el.name === name);
            if (space) {
                setSelectSpace(space);
            }
        },
        [spaces]
    );
    const deleteSpace = useCallback(
        (name: string) => {
            const newSpaces = spaces.filter((el) => el.name !== name);
            setSpaces(newSpaces);
            if (name === selectSpace?.name) {
                setSelectSpace(newSpaces[0]);
            }
        },
        [spaces, selectSpace]
    );

    return (
        <section className={clsx(cls.mainPage, {}, [className])}>
            <Sidebar
                changeSpace={changeSpace}
                selectSpace={selectSpace}
                deleteSpace={deleteSpace}
                spaces={spaces}
                className={cls.sidebar}
            />
            <div className={cls.content}>
                <h1 className={clsx(cls.title, "hat")}>« Записал и точка »</h1>

                <SearchBar className={cls.searchBar} />

                {selectSpace &&
                    selectSpace.records.map((el) => (
                        <Record
                            record={el}
                            key={el.title}
                            className={cls.record}
                        />
                    ))}
            </div>
        </section>
    );
};
