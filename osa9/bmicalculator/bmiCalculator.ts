export const calculateBmi = (height: number, weight: number): string => {
    // BMI = weight (in kg) / (height in cm / 100)²
    const bmi: number = weight / Math.pow((height / 100), 2);
    let category: string = '';

    if(bmi < 16.0) {
        category = "Underweight (Severe thinness)";
    } else if(bmi >= 16.0 && bmi <= 16.9) {
        category = "Underweight (Moderate thinness";
    } else if(bmi >= 17.0 && bmi <= 18.4) {
        category = "Underweight (Mild thinness)";
    } else if(bmi >= 18.5 && bmi <= 24.9) {
        category = "Normal range";
    } else if(bmi >= 25.0 && bmi <= 29.9) {
        category = "Overweight (Pre-obese)";
    } else if(bmi >= 30.0 && bmi <= 34.9) {
        category = "Obese (Class I)";
    } else if(bmi >= 35.0 && bmi <= 39.9) {
        category = "Obese (Class II)";
    } else if(bmi >= 40.0) {
        category = "Obese (Class III)";
    }

    return category;
}

interface Bmi {
    height: number,
    weight: number,
}

const parseArguments = (args: string[]): Bmi => {
    if(args.length < 4) throw new Error("Not enough arguments");
    if(args.length > 4) throw new Error("Too many arguments");

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
            height: Number(args[2]),
            weight: Number(args[3])
        };
    }
    else {
        throw new Error("Provided values were not numbers");
    }
}

if(require.main === module) {
    try {
        const { height, weight } = parseArguments(process.argv);
        console.log(calculateBmi(height, weight));
    } catch (error: unknown) {
        let errorMsg = "Something went wrong.";
        if (error instanceof Error) {
            errorMsg += "Error: " + error.message;
        }
        console.log(errorMsg);
    }
}