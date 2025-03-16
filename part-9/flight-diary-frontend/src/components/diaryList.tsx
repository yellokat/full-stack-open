import {JSX} from "react";
import {DiaryEntry} from "../types.ts";

const DiaryList = ({diaries}:{diaries: DiaryEntry[]}): JSX.Element => {
    return (<>
        <h2>Diary Entries</h2>
        {diaries.map((diary:DiaryEntry) =>
            (<div key={diary.id}>
                <h3>{diary.date}</h3>
                <span>visibility: {diary.visibility}</span><br/>
                <span>weather: {diary.weather}</span><br/>
                <span>comment: {diary.comment}</span>
            </div>)
        )}
    </>)
}

export default DiaryList;