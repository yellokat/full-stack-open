import DiaryList from "./components/diaryList";
import NewDiaryForm from "./components/newDiaryForm";
import {useEffect, useState} from "react";
import {DiaryEntry} from "./types";
import diaryService from "./services/diaryService";

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])
    useEffect(() => {
        diaryService
            .getAll()
            .then((diaries: DiaryEntry[]) => {
                setDiaries(diaries)
            })
    }, [])

    const onCreateDiaryCallback = (newDiary:DiaryEntry)=>{
        setDiaries([...diaries, newDiary])
    }

    return (
        <>
            <NewDiaryForm onCreateCallback={onCreateDiaryCallback}/>
            <DiaryList diaries={diaries}/>
        </>
    )
};

export default App;