export interface CoursePartBase {
    name: string;
    exerciseCount: number;
}

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group"
}

export interface CoursePartSingle extends CoursePartBase {
    description: string;
}

export interface CoursePartBasic extends CoursePartSingle {
    kind: "basic"
}

export interface CoursePartBackground extends CoursePartSingle {
    backgroundMaterial: string;
    kind: "background"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground;