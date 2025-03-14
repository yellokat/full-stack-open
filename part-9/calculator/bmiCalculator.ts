const calculateBmi = (heightCm: number, weightKg: number): string => {
    if (heightCm === 0 || weightKg === 0) {
        // throw new Error("Invalid input.");
        throw new Error("malformatted parameters");
    }
    if(!heightCm || !weightKg) {
        // throw new Error("calculateBmi requires two arguments that are numbers.");
        throw new Error("malformatted parameters");
    }
    const bmi: number = weightKg / (heightCm / 100) ** 2;

    let message:string = `Your BMI is ${bmi}. `;
    if (bmi < 16) {
        message += "You are severely underweight.";
    } else if (16 <= bmi && bmi < 17) {
        message += "You are moderately underweight.";
    } else if (17 <= bmi && bmi < 18.5) {
        message += "You are mildly underweight.";
    } else if (18.5 <= bmi && bmi < 25) {
        message += "Your weight is in normal range considering your height.";
    } else if (25 <= bmi && bmi < 30) {
        message += "You are overweight.";
    } else if (30 <= bmi && bmi < 35) {
        message += "You are obese (class I).";
    } else if (35 <= bmi && bmi < 40) {
        message += "You are obese (class II).";
    } else {
        message += "You are obese (class III).";
    }
    return message;
};

try {
    if(require.main === module){
        const heightCm: number = Number(process.argv[2]);
        const weightKg: number = Number(process.argv[3]);
        console.log(calculateBmi(heightCm, weightKg));
    }
} catch (error: unknown) {
    let errorMessage = 'Something went wrong: ';
    if (error instanceof Error) {
        errorMessage += error.message;
    }
    console.log(errorMessage);
}

export default calculateBmi;