import data from './data/courses';
import Header from "./components/header.tsx";
import Content from "./components/content.tsx";
import Total from "./components/total.tsx";


const App = () => {
    return (
        <div>
            <Header courseName={data.courseName}/>
            <Content courseParts={data.courseParts}/>
            <Total totalExercises={data.totalExercises}/>
        </div>
    );
};

export default App;