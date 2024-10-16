interface Exercise {
    perioidLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
};

export const calculateExercises = (dailyExercises: number[], target: number): Exercise => {
    const trainingDays = dailyExercises.filter(day => day > 0).length;
    const average = dailyExercises.reduce((sum, day) => sum + day, 0) / dailyExercises.length;

    const success = average >= target;
    const rating = success ? 3 : (average >= target * 0.8 ? 2 : 1);
    const ratingDescription = rating === 3 ? 'Great job!' : rating === 2 ? 'Not bad, but you can do better!' : 'You need to work on it!';

    const perioidLength = dailyExercises.length;

    return {
        perioidLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average,
    };
};

const parseArguments = (args: string[]) => {
    if(args.length <= 2) {
        console.log('Usage: npm run calculateExercises [0, 1, 2, 3, ...]');
        return;
    }

    const numbers = args.slice(2).map(arg => {
        const num = Number(arg);
        if(isNaN(num)) {
            throw new Error(`Invalid number: ${arg}`);
        }
        return num;
    });

    return numbers;
};

if(require.main === module) {
    try {
        const args = parseArguments(process.argv);
        if(args)
        {
            const target = args[0];
            const dailyExercises = args.slice(1);
        
            const result = calculateExercises(dailyExercises, target);
            console.log(result);
        }
    }
    catch(error: unknown) {
        let errorMsg = "Something went wrong.";
        if(error instanceof Error) {
            errorMsg += "Error: " + error.message;
        }
        console.log(errorMsg);
    }
}
