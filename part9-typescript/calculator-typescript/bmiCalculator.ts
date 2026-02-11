const calculateBmi = (h: number, w: number): string => {
  const bmi = w / (h / 100) ** 2;

  const underweight = 18.5;
  const overweight = 25;

  return bmi < underweight
    ? "Underweight"
    : bmi < overweight
      ? "Normal range"
      : "Overweight";
};

try {
  const args = process.argv.slice(2);
  console.log(process.argv);

  if (args.length < 2) {
    throw new Error("Please provide height and weight values");
  }

  const h = Number(args[0]);
  const w = Number(args[1]);

  if (isNaN(h) || isNaN(w)) {
    throw new Error("Please provide numerical values only");
  }

  console.log(calculateBmi(h, w));
} catch (error) {
  console.log(error instanceof Error ? error.message : "something went wrong");
}
// console.log(calculateBmi(180, 74));
