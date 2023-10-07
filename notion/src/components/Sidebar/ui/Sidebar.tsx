import React, { memo, useCallback, useEffect, useState } from "react";
import clsx from "clsx";
import cls from "./Sidebar.module.scss";
import { Space } from "pages/MainPage";
import { SpaceTitle } from "components/SpaceTitle";
import { MyButton } from "ui/Button/Button";
import plusImg from "assets/plus.svg";

import { SpaceModal } from "components/SpaceModal";

interface SidebarProps {
    className?: string;
    spaces: Space[];
    onSelectSpace: (name: string) => void;
    deleteSpace: (name: string) => void;
    createSpace: (newSpace: Space) => void;
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
    } = props;

    const [isSpaceModal, setIsSpaceModal] = useState<Space | boolean>(false);

    const onAddNewspace = useCallback(
        (newSpace: Space) => {
            if (spaces.find((el) => el.name === newSpace.name)) return;
            createSpace(newSpace);
            onCloseModal();
        },
        [createSpace, spaces]
    );

    const onShowModal = useCallback((space?: Space) => {
        setIsSpaceModal(space || true);
    }, []);
    const onCloseModal = useCallback(() => {
        setIsSpaceModal(false);
    }, []);

    return (
        <section className={clsx(cls.sidebar, {}, [className])}>
            <div className={cls.head}>
                <p className={cls.title}>Пространства</p>
                <MyButton className={cls.addBtn} onClick={() => onShowModal()}>
                    <img src={plusImg} alt="add" />
                </MyButton>
            </div>
            <SpaceModal
                isOpen={isSpaceModal}
                onClose={onCloseModal}
                onAddNewSpace={onAddNewspace}
            />

            <div className={cls.spaces}>
                {spaces.map((el) => (
                    <SpaceTitle
                        select={el.name == selectSpace?.name}
                        key={el.name}
                        space={el}
                        onSelectSpace={onSelectSpace}
                        deleteSpace={deleteSpace}
                        changeSpace={onShowModal}
                    />
                ))}
            </div>
        </section>
    );
});
