import DiaryList from "./components/diaryList";
import NewDiaryForm from "./components/newDiaryForm";
import {useEffect, useState} from "react";
import {DiaryEntry} from "./types";
import diaryService from "./services/diaryService";
import Notification from "./components/notification";

const App = () => {
    const [diaries, setDiaries] = useState<DiaryEntry[]>([])
    const [notification, setNotification] = useState<string>('')
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

    const handleError = (message: string) => {
        setNotification(message)
        setTimeout(()=>{
            setNotification('')
        }, 1000)
    }

    return (
        <>
            <Notification errorMessage={notification}/>
            <NewDiaryForm onCreateCallback={onCreateDiaryCallback} handleError={handleError}/>
            <DiaryList diaries={diaries}/>
        </>
    )
};

export default App;