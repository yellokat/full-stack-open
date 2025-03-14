import {Router} from "express";
import calculateExercise, {ExerciseCalculateResults} from "../exerciseCalculator";

const exerciseRouter = Router();

interface ExerciseRequestDto {
    daily_exercises: number[];
    target: number;
}

// exercise calculator endpoint
// eslint-disable-next-line @typescript-eslint/no-explicit-any
exerciseRouter.post('/', (req: any, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
        const {daily_exercises, target}: ExerciseRequestDto = req.body;
        const results: ExerciseCalculateResults = calculateExercise(daily_exercises, target);
        res.json({
            ...results
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(400).json({error: error.message});
        }
        console.log("Error : Unknown error.");
    }
});

export default exerciseRouter;