const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ** 2;

  return bmi < 18.5
    ? "Underweight range"
    : bmi < 25
      ? "Normal range"
      : "Overweight range";
};

console.log(calculateBmi(180, 74));
