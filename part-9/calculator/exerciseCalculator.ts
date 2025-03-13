const TARGET_AVG_HOURS:number = 1;

interface exerciseCalculateResults {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const calculateExercises = (hours: number[]):exerciseCalculateResults => {
    if (hours.length !== 7){
        throw new Error("Input an array of 7 numbers.")
    }

    const trainingDays:number = hours.filter((hour) => hour !== 0).length
    const average:number = (hours.reduce((a:number, b:number):number => a+b) / 7);
    const completionRatio:number = average/TARGET_AVG_HOURS;
    const success:boolean = (completionRatio === 1)

    let rating: number;
    let ratingDescription:string;
    if(completionRatio < 0.33){
        rating = 1;
        ratingDescription = "Pathetic.";
    } else if (0.33 <= completionRatio && completionRatio < 0.66){
        rating = 2;
        ratingDescription = "You could do better.";
    } else{
        rating = 3;
        ratingDescription = "Perfect workout!";
    }

    return {
        periodLength : 7,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target:TARGET_AVG_HOURS,
        average
    };
}

try {
    console.log(calculateExercises([1, 0.4, 1.2, 0.8, 0, 0.5, 0]));
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: '
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}