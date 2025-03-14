export interface ExerciseCalculateResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[], target: number): ExerciseCalculateResults => {
    if ((target !== 0 && !target) || hours.length !== 7) {
        throw new Error("parameters missing");
    }
    if (isNaN(Number(target))) {
        throw new Error("malformatted parameters");
    }
    hours.forEach((hour: number) => {
        if (hour !== 0 && !hour) {
            throw new Error("parameters missing");
        }
        if (isNaN(Number(hour))) {
            throw new Error("malformatted parameters");
        }
    });

    const trainingDays: number = hours.filter((hour) => hour !== 0).length;
    const average: number = (hours.reduce((a: number, b: number): number => a + b) / 7);
    const completionRatio: number = average / target;
    const success: boolean = (completionRatio === 1);

    let rating: number;
    let ratingDescription: string;
    if (completionRatio < 0.33) {
        rating = 1;
        ratingDescription = "Pathetic.";
    } else if (0.33 <= completionRatio && completionRatio < 0.66) {
        rating = 2;
        ratingDescription = "You could do better.";
    } else {
        rating = 3;
        ratingDescription = "Perfect workout!";
    }

    return {
        periodLength: 7,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    };
};

try {
    if(require.main === module) {
        const hours: number[] = [];
        for (let i: number = 0; i < 7; i++) {
            hours.push(Number(process.argv[2 + i]));
        }
        const target = Number(process.argv[9]);
        console.log(calculateExercises(hours, target));
    }
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateExercises;