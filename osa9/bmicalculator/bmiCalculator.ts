
const calculateBmi = (height: number, weight: number) => {
    // BMI = weight (in kg) / (height in cm / 100)²
    const bmi: number = weight / Math.pow((height / 100), 2);

    if(bmi < 16.0) {
        console.log("Underweight (Severe thinness)");
    } else if(bmi >= 16.0 && bmi <= 16.9) {
        console.log("Underweight (Moderate thinness");
    } else if(bmi >= 17.0 && bmi <= 18.4) {
        console.log("Underweight (Mild thinness)");
    } else if(bmi >= 18.5 && bmi <= 24.9) {
        console.log("Normal range");
    } else if(bmi >= 25.0 && bmi <= 29.9) {
        console.log("Overweight (Pre-obese)");
    } else if(bmi >= 30.0 && bmi <= 34.9) {
        console.log("Obese (Class I)");
    } else if(bmi >= 35.0 && bmi <= 39.9) {
        console.log("Obese (Class II)");
    } else if(bmi >= 40.0) {
        console.log("Obese (Class III)");
    }
}

console.log(calculateBmi(182, 82));
