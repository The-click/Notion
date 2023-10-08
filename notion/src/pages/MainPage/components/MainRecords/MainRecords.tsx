import React, { useCallback, useState, useMemo, useEffect } from "react";

import cls from "./MainRecords.module.scss";
import { SearchBar } from "components/SearchBar";
import { Mark, Notion, TypeSpace } from "../../type/type";
import { Record } from "components/Record";

import { RecordModal } from "components/RecordModal/RecordModal";
import { sortByTime } from "helper/sortByTime/sortByTime";
import clsx from "clsx";

interface MainRecordsProps {
    records: Notion[] | Mark[];
    changeRecords: (record: Notion | Mark, oldTitleRecord?: string) => void;
    deleteRecords: (title: string) => void;
    changeMarker: (title: string, mark: boolean) => void;
    changeFixedRecord: (title: string, value: number) => void;
    typeSpace: TypeSpace;
}

export const MainRecords: React.FC<MainRecordsProps> = (props) => {
    const {
        records,
        changeRecords,
        changeFixedRecord,
        typeSpace,
        deleteRecords,
        changeMarker,
    } = props;

    const [searchText, setSearchText] = useState<string>("");

    const [statusRecordModal, setStatusRecordModal] = useState<{
        isOpen: boolean;
        record: Notion | Mark | null;
    }>({ isOpen: false, record: null });

    const onChangeSearch = useCallback((newText: string) => {
        setSearchText(newText);
    }, []);

    const onShowModal = useCallback((record?: Notion | Mark) => {
        setStatusRecordModal({ isOpen: true, record: record ? record : null });
    }, []);
    const onCloseModal = useCallback(() => {
        setStatusRecordModal({ isOpen: false, record: null });
    }, []);

    const filterRecord = useMemo(() => {
        if (searchText.trim() == "") {
            return records;
        } else {
            return records.filter(
                (el) =>
                    el.text?.includes(searchText) ||
                    el.title.includes(searchText)
            );
        }
    }, [records, searchText]);

    const onChangeRecords = useCallback(
        (newRecord: Notion | Mark, oldTitle?: string) => {
            const sameRecordsByTitle = records.find(
                (el) => el.title === newRecord.title
            );

            // check only when changing the title of an existing record
            if (oldTitle !== newRecord.title && sameRecordsByTitle) return;

            changeRecords(newRecord, oldTitle);
            onCloseModal();
        },
        [records]
    );
    console.log({
        records: filterRecord.sort((a, b) => sortByTime(a.fix, b.fix)),
    });
    return (
        <>
            <SearchBar
                className={cls.searchBar}
                searchText={searchText}
                onCreateRecord={onShowModal}
                onChangeSearch={onChangeSearch}
            />

            {statusRecordModal.isOpen && (
                <RecordModal
                    record={statusRecordModal.record}
                    isOpen={statusRecordModal.isOpen}
                    onClose={onCloseModal}
                    changeRecords={onChangeRecords}
                    type={typeSpace}
                />
            )}
            <div className={clsx(cls.mainRecords, "custom_scroll")}>
                {filterRecord
                    .sort((a, b) => sortByTime(a.fix, b.fix))
                    .map((el) => (
                        <Record
                            record={el}
                            onChangeRecords={onShowModal}
                            deleteRecords={deleteRecords}
                            changeMarker={changeMarker}
                            changeFixedRecord={changeFixedRecord}
                            key={el.title}
                            className={cls.record}
                        />
                    ))}
            </div>
        </>
    );
};
