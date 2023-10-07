import React, { useCallback, useState } from "react";
import clsx from "clsx";
import cls from "./SpaceModal.module.scss";
import { Modal } from "ui/Modal/ui/Modal";
import { Space, TypeSpace } from "pages/MainPage";
import { MyInput } from "ui/Input/Input";
import { MyButton, ThemeButton } from "ui/Button/Button";
import pencilImg from "assets/pencil.png";
import checkImg from "assets/check.png";

interface SpaceModalProps {
    className?: string;
    onAddNewSpace: (space: Space) => void;
    isOpen: boolean | Space;
    onClose: () => void;
}

export const SpaceModal: React.FC<SpaceModalProps> = (props) => {
    const { className = "", onAddNewSpace, isOpen, onClose } = props;

    const [spaceName, setSpaceName] = useState<string>(isOpen);
    const [spaceType, setSpaceType] = useState<TypeSpace>("notion");

    const onClickSave = useCallback(() => {
        const newSpace: Space = {
            name: spaceName.trim(),
            fix: null,
            type: spaceType,
            records: [],
        };
        if (newSpace.name === "") return;

        onAddNewSpace(newSpace);
        setSpaceName("");
    }, [spaceName, spaceType]);

    return (
        <Modal
            className={clsx(cls.spaceModal, {}, [className])}
            isOpen={!!isOpen}
            onClose={onClose}
        >
            <div className={cls.modal}>
                <h3 className={clsx(cls.modalTitle, "hat")}>
                    « Создал и точка »
                </h3>
                <div className={cls.modalContent}>
                    <MyInput
                        className={cls.modalName}
                        value={spaceName}
                        onChange={setSpaceName}
                        placeholder="Название нового пространства"
                    ></MyInput>

                    <div className={cls.modalSwitch}>
                        <MyButton
                            className={clsx(cls.modalType, {
                                [cls.active]: spaceType === "notion",
                            })}
                            onClick={() => setSpaceType("notion")}
                        >
                            <img src={pencilImg} alt="pencil" />
                        </MyButton>
                        <MyButton
                            className={clsx(cls.modalType, {
                                [cls.active]: spaceType === "mark",
                            })}
                            onClick={() => setSpaceType("mark")}
                        >
                            <img src={checkImg} alt="check" />
                        </MyButton>
                    </div>

                    <MyButton
                        theme={ThemeButton.BACKGROUND}
                        className={cls.modalSave}
                        onClick={onClickSave}
                    >
                        Сохранить
                    </MyButton>
                </div>
            </div>
        </Modal>
    );
};
