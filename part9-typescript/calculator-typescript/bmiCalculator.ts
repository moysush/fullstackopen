const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ** 2
  
  if (bmi < 24.9 && bmi > 18.5) {
    return "Normal range";
  } else if (bmi > 24.9) {
    return "Overweight range";
  } else if (bmi < 18.5) {
    return "Underweight range";
  }
};

console.log(calculateBmi(180, 74));
