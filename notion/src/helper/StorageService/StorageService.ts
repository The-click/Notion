export class StorageService {
    constructor() {}

    static save = <T>(key: string, data: T): void => {
        console.log("save", { data });
        try {
            localStorage.setItem(key, JSON.stringify(data));
        } catch (error) {
            console.log({ error });
        }
    };

    static get = <T>(key: string): T | null | undefined => {
        try {
            const data = localStorage.getItem(key);
            console.log({ data });
            if (data) {
                return JSON.parse(data) as T;
            }
            return null;
        } catch (error) {
            console.log({ error });
        }
    };

    static remove = (key: string): void => {
        localStorage.removeItem(key);
    };
}
