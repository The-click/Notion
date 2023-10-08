import React, { useCallback, useState } from "react";
import clsx from "clsx";
import cls from "./SpaceModal.module.scss";
import { Modal } from "ui/Modal/Modal";
import { Space, TypeSpace } from "pages/MainPage";
import { MyInput } from "ui/Input/Input";
import { MyButton, ThemeButton } from "ui/Button/Button";
import pencilImg from "assets/pencil.png";
import checkImg from "assets/check.png";

interface SpaceModalProps {
    className?: string;
    onAddNewSpace: (space: Space, oldName?: string) => void;
    status: { space: Space | null; isOpen: boolean };
    onClose: () => void;
}

export const SpaceModal: React.FC<SpaceModalProps> = (props) => {
    const { className = "", onAddNewSpace, status, onClose } = props;
    const { isOpen, space } = status;

    const [spaceName, setSpaceName] = useState<string>(space ? space.name : "");
    const [spaceType, setSpaceType] = useState<TypeSpace>(
        space ? space.type : "notion"
    );

    const onClickSave = useCallback(() => {
        let newSpace: Space;
        if (spaceName.trim() === "") {
            return;
        }
        if (space) {
            newSpace = {
                name: spaceName.trim(),
                fix: space.fix,
                type: spaceType,
                records: space.records,
            };
        } else {
            newSpace = {
                name: spaceName.trim(),
                fix: 0,
                type: spaceType,
                records: [],
            };
        }

        if (newSpace.name === "") return;

        onAddNewSpace(newSpace, space?.name);
        setSpaceName("");
    }, [spaceName, spaceType]);

    const onChangeSpaceType = useCallback(
        (spaceType: TypeSpace) => {
            if (space) {
                return;
            } else {
                setSpaceType(spaceType);
            }
        },
        [space]
    );

    return (
        <Modal
            className={clsx(cls.spaceModal, {}, [className])}
            isOpen={isOpen}
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
                                [cls.block]: !!space,
                            })}
                            onClick={() => onChangeSpaceType("notion")}
                        >
                            <img src={pencilImg} alt="pencil" />
                        </MyButton>
                        <MyButton
                            className={clsx(cls.modalType, {
                                [cls.active]: spaceType === "mark",
                                [cls.block]: !!space,
                            })}
                            onClick={() => onChangeSpaceType("mark")}
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
