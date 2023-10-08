import React, { useState, useEffect, useMemo, useCallback } from "react";
import clsx from "clsx";
import cls from "./MainPage.module.scss";
import { Mark, Notion, NotionColor, Space } from "../type/type";
import { Sidebar } from "components/Sidebar";
import { MainRecords } from "../components/MainRecords/MainRecords";
import { StorageService } from "helper/StorageService/StorageService";
import { KEY_SPACES } from "const/storage";

interface MainPageProps {
    className?: string;
}

const initValue: Space[] = [
    {
        name: "Первое рабочее пространство",
        type: "notion",
        fix: 0,
        records: [
            {
                title: "Заметка о пропадающих дельфинах",
                text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                color: NotionColor.BLACK,
                fix: 0,
            },
            {
                title: "Вечер воскресенья",
                text: "Описание вечера воскресенья",
                color: NotionColor.GREEN,
                fix: 0,
            },
        ],
    },
    {
        name: "Второе раб. простр.",
        type: "mark",
        fix: 0,
        records: [
            {
                title: "Маркер Заметка о пропадающих дельфинах",
                text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                color: NotionColor.BLACK,
                fix: 0,
                mark: false,
            },
            {
                title: "Маркер Заметка о не пропадающих дельфинах",
                text: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nihil, et autem culpa ad quo, possimus cum architecto accusantium sed ipsum molestias alias sunt! Odit in sint fugit quasi facilis deleniti",
                color: NotionColor.BLUE,
                fix: 0,
                mark: true,
            },
        ],
    },
];

export const MainPage: React.FC<MainPageProps> = (props) => {
    const { className = "" } = props;
    const [spaces, setSpaces] = useState<Space[]>([]);

    useEffect(() => {
        const data = StorageService.get<Space[]>(KEY_SPACES);
        console.log("load", { data });
        if (data?.length) {
            setSpaces(data);
        } else {
            setSpaces(initValue);
        }
    }, []);
    useEffect(() => {
        if (spaces.length > 0) {
            StorageService.save(KEY_SPACES, spaces);
        }
    }, [spaces]);

    const [selectSpace, setSelectSpace] = useState<number>(0);

    const onSelectSpace = useCallback(
        (name: string) => {
            const index = spaces.findIndex((el) => el.name === name);
            if (index !== -1) {
                setSelectSpace(index);
            }
        },
        [spaces]
    );

    const deleteSpace = useCallback(
        (name: string) => {
            const newSpaces = spaces.filter((el) => el.name !== name);
            setSpaces(newSpaces);
            if (name === spaces[selectSpace].name) {
                setSelectSpace(0);
            }
        },
        [spaces, selectSpace]
    );
    const createSpace = useCallback(
        (newSpace: Space, oldName?: string) => {
            let newSpaces;
            if (oldName) {
                newSpaces = spaces.map((el) =>
                    el.name === oldName ? newSpace : el
                );
            } else {
                newSpaces = [...spaces, newSpace];
            }
            setSpaces(newSpaces);
        },
        [spaces]
    );

    const changeFixSpace = useCallback(
        (name: string, value: number) => {
            const newSpaces = spaces.find((el) => el.name === name);

            if (newSpaces) {
                newSpaces.fix = value;
                setSpaces(
                    spaces.map((el) => (el.name === name ? newSpaces : el))
                );
            }
        },
        [spaces]
    );

    const changeRecords = useCallback(
        (record: Notion | Mark, oldTitleRecord?: string) => {
            let newSpace = spaces[selectSpace];
            if (oldTitleRecord) {
                newSpace.records = newSpace.records.map((el) =>
                    el.title === oldTitleRecord ? record : el
                );
            } else {
                newSpace.records = [...newSpace.records, record];
            }
            const newSpaces = spaces.map((el, i) =>
                i === selectSpace ? newSpace : el
            );

            setSpaces(newSpaces);
        },
        [spaces, selectSpace]
    );

    const deleteRecords = useCallback(
        (name: string) => {
            const newSpace = spaces[selectSpace];
            newSpace.records = newSpace.records.filter(
                (el) => el.title !== name
            );

            const newSpaces = spaces.map((el, i) =>
                i === selectSpace ? newSpace : el
            );
            setSpaces(newSpaces);
        },
        [spaces, selectSpace]
    );

    const changeMarker = useCallback(
        (name: string, value: boolean) => {
            const newSpace = spaces[selectSpace];
            newSpace.records = newSpace.records.map((el) =>
                el.title === name ? { ...el, mark: value } : el
            );

            const newSpaces = spaces.map((el, i) =>
                i === selectSpace ? newSpace : el
            );
            setSpaces(newSpaces);
        },
        [spaces, selectSpace]
    );

    const changeFixedRecord = useCallback(
        (name: string, value: number) => {
            const newSpace = spaces[selectSpace];
            newSpace.records = newSpace.records.map((el) =>
                el.title === name ? { ...el, fix: value } : el
            );

            const newSpaces = spaces.map((el, i) =>
                i === selectSpace ? newSpace : el
            );
            setSpaces(newSpaces);
        },
        [spaces, selectSpace]
    );

    const currentSpace = useMemo(() => {
        return spaces[selectSpace];
    }, [spaces, selectSpace]);

    return (
        <section className={clsx(cls.mainPage, {}, [className])}>
            <Sidebar
                onSelectSpace={onSelectSpace}
                createSpace={createSpace}
                selectSpace={currentSpace}
                deleteSpace={deleteSpace}
                changeFixSpace={changeFixSpace}
                spaces={spaces}
                className={cls.sidebar}
            />
            <div className={cls.content}>
                <h1 className={clsx(cls.title, "hat")}>« Записал и точка »</h1>

                <MainRecords
                    changeRecords={changeRecords}
                    changeMarker={changeMarker}
                    deleteRecords={deleteRecords}
                    typeSpace={currentSpace?.type}
                    records={currentSpace?.records || []}
                    changeFixedRecord={changeFixedRecord}
                />
            </div>
        </section>
    );
};
