export interface Space {
    id?: number;
    name: string;
    type: TypeSpace;
    fix: boolean;
}

export type TypeSpace = "notion" | "mark";
