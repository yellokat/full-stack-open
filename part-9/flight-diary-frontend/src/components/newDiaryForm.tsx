import React, {JSX, useState} from 'react';
import diaryService from "../services/diaryService.ts";
import {DiaryEntry, NewDiaryEntry, Visibility, Weather} from "../types.ts";
import z, {ZodError} from 'zod';
import axios, {AxiosError} from "axios";

const NewDiaryForm = ({onCreateCallback, handleError}: {
    onCreateCallback: (newDiary: DiaryEntry) => void,
    handleError: (message: string) => void
}): JSX.Element => {

    const handleCreate = ({comment, date, visibility, weather}: {
        comment: string,
        date: string,
        visibility: string,
        weather: string
    }): void => {
        try {
            const newDiaryEntry: NewDiaryEntry = {
                comment: z.string().parse(comment),
                date: z.string().date().parse(date),
                visibility: z.nativeEnum(Visibility).parse(visibility),
                weather: z.nativeEnum(Weather).parse(weather),
            }
            diaryService
                .createDiary(newDiaryEntry)
                .then((newDiary: DiaryEntry) => {
                    onCreateCallback(newDiary)
                })
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const caughtError = error as AxiosError
                handleError(`Axios Error : ${caughtError.message}`)
            } else if (error instanceof ZodError) {
                const caughtError = error as ZodError
                handleError(`Zod Error : ${caughtError.issues[0].message}`)
            } else if (error instanceof Error) {
                handleError(`Error : ${error.message}`)
            } else {
                handleError('Unknown error.')
            }
        }
    }

    const [date, setDate] = useState<string>('')
    const [visibility, setVisibility] = useState<string>('')
    const [weather, setWeather] = useState<string>('')
    const [comment, setComment] = useState<string>('')
    return (
        <div>
            <form onSubmit={(event: React.SyntheticEvent) => {
                event.preventDefault()
                handleCreate({comment, date, visibility, weather})
            }}>
                <div>
                    date
                    <input type="date" id="date" name="date" value={date}
                           onChange={({target}) => setDate(target.value)}/>
                </div>
                <div>
                    Visibility
                    Great <input type="radio" name="visibility" value="great"
                                 onChange={(event) => setVisibility(event.target.value)}/>
                    Good <input type="radio" name="visibility" value="good"
                                onChange={(event) => setVisibility(event.target.value)}/>
                    Ok <input type="radio" name="visibility" value="ok"
                              onChange={(event) => setVisibility(event.target.value)}/>
                    Poor <input type="radio" name="visibility" value="poor"
                                onChange={(event) => setVisibility(event.target.value)}/>
                </div>
                <div>
                    Weather
                    Sunny <input type="radio" name="weather" value="sunny"
                                 onChange={(event) => setWeather(event.target.value)}/>
                    Rainy <input type="radio" name="weather" value="rainy"
                                 onChange={(event) => setWeather(event.target.value)}/>
                    Cloudy <input type="radio" name="weather" value="cloudy"
                                  onChange={(event) => setWeather(event.target.value)}/>
                    Stormy <input type="radio" name="weather" value="stormy"
                                  onChange={(event) => setWeather(event.target.value)}/>
                    Windy <input type="radio" name="weather" value="windy"
                                 onChange={(event) => setWeather(event.target.value)}/>
                </div>
                <div>
                    visibility
                    <input
                        value={visibility}
                        onChange={({target}) => setVisibility(target.value)}
                    />
                </div>
                <div>
                    weather
                    <input
                        value={weather}
                        onChange={({target}) => setWeather(target.value)}
                    />
                </div>
                <div>
                    comment
                    <input
                        value={comment}
                        onChange={({target}) => setComment(target.value)}
                    />
                </div>
                <button type="submit">add</button>
            </form>
        </div>
    );
}

export default NewDiaryForm;