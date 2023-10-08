import React, { memo, useCallback, useState } from "react";
import clsx from "clsx";
import cls from "./Sidebar.module.scss";
import { Space } from "pages/MainPage";
import { SpaceTitle } from "components/SpaceTitle";
import { MyButton } from "ui/Button/Button";
import plusImg from "assets/plus.svg";

import { SpaceModal } from "components/SpaceModal";
import { sortByTime } from "helper/sortByTime/sortByTime";

interface SidebarProps {
    className?: string;
    spaces: Space[];
    onSelectSpace: (name: string) => void;
    deleteSpace: (name: string) => void;
    createSpace: (newSpace: Space, oldName?: string) => void;
    changeFixSpace: (name: string, value: number) => void;
    selectSpace: Space | null;
}

export const Sidebar: React.FC<SidebarProps> = memo((props) => {
    const {
        className = "",
        spaces,
        onSelectSpace,
        selectSpace,
        deleteSpace,
        createSpace,
        changeFixSpace,
    } = props;

    const [isSpaceModal, setIsSpaceModal] = useState<{
        isOpen: boolean;
        space: Space | null;
    }>({ isOpen: false, space: null });

    const onAddNewspace = useCallback(
        (newSpace: Space, oldName?: string) => {
            if (spaces.find((el) => el.name === newSpace.name)) return;
            createSpace(newSpace, oldName);
            onCloseModal();
        },
        [createSpace, spaces]
    );

    const onShowModal = useCallback((space?: Space) => {
        setIsSpaceModal({ isOpen: true, space: space ? space : null });
    }, []);
    const onCloseModal = useCallback(() => {
        setIsSpaceModal({ isOpen: false, space: null });
    }, []);

    return (
        <section className={clsx(cls.sidebar, {}, [className])}>
            <div className={cls.head}>
                <p className={cls.title}>Пространства</p>
                <MyButton className={cls.addBtn} onClick={() => onShowModal()}>
                    <img src={plusImg} alt="add" />
                </MyButton>
            </div>
            {isSpaceModal.isOpen && (
                <SpaceModal
                    status={isSpaceModal}
                    onClose={onCloseModal}
                    onAddNewSpace={onAddNewspace}
                />
            )}

            <div className={cls.spaces}>
                {spaces
                    .sort((a, b) => sortByTime(a.fix, b.fix))
                    .map((el) => (
                        <SpaceTitle
                            select={el.name == selectSpace?.name}
                            key={el.name}
                            space={el}
                            changeFixSpace={changeFixSpace}
                            onSelectSpace={onSelectSpace}
                            deleteSpace={deleteSpace}
                            changeSpace={onShowModal}
                        />
                    ))}
            </div>
        </section>
    );
});
