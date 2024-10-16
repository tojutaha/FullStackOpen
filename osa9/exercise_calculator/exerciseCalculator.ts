interface Exercise {
    perioidLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number,
};

const calculateExercises = (dailyExercises: number[], target: number): Exercise => {
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
}

const result = calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2);
console.log(result);
