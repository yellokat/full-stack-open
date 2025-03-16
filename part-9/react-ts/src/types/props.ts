import {CoursePart} from "./models.ts";

export interface HeaderProps {
    courseName: string;
}

export interface ContentProps {
    courseParts: CoursePart[];
}

export interface TotalProps {
    totalExercises: number;
}