import {JSX} from "react";

const App = () => {
    const courseName = "Half Stack application development";
    const courseParts = [
        {
            name: "Fundamentals",
            exerciseCount: 10
        },
        {
            name: "Using props to pass data",
            exerciseCount: 7
        },
        {
            name: "Deeper type usage",
            exerciseCount: 14
        }
    ];

    const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);


    interface HeaderProps {
        courseName: string;
    }

    interface ContentProps {
        courseParts: CoursePartProps[];
    }

    interface CoursePartProps {
        name: string;
        exerciseCount: number;
    }

    interface TotalProps {
        totalExercises: number;
    }

    const Header = (props: HeaderProps): JSX.Element => {
        return (
            <h1>{props.courseName}</h1>
        )
    }

    const Content = (props: ContentProps): JSX.Element => {
        return (<>
            {props.courseParts.map((coursePart) => (
                <><span>{coursePart.name} {coursePart.exerciseCount}</span><br/></>
            ))}
        </>);
    }

    const Total = (props: TotalProps): JSX.Element => {
        return (
            <>Number of exercises {props.totalExercises}</>
        )
    }

    return (
        <div>
            <Header courseName={courseName}/>
            <Content courseParts={courseParts}/>
            <Total totalExercises={totalExercises}/>
        </div>
    );
};

export default App;