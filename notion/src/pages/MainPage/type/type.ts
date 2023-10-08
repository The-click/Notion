export interface Space {
    name: string;
    type: TypeSpace;
    fix: number;
    records: Notion[] | Mark[];
}

export type TypeSpace = "notion" | "mark";

export interface Mark extends Notion {
    mark: boolean;
}

export interface Notion {
    title: string;
    text?: string;
    color?: NotionColor;
    fix: number;
    order?: number;
}

export enum NotionColor {
    BLUE = "0, 47, 255",
    RED = "224, 0, 0",
    GRAY = "196, 196, 196",
    YELLOW = "243, 247, 28",
    GREEN = "64, 247, 28",
    WHITE = "249, 245, 241",
    BLACK = "25, 25, 25",
}
