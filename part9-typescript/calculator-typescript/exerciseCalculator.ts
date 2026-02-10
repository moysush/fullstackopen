interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: "needs improvement",
  2: "not too bad but could be better",
  3: "great!",
};

const calculateExercises = (exerciseData: number[], target: number): Result => {
  const periodLength = exerciseData.length;
  const trainingDays = exerciseData.filter((e) => e !== 0).length;
  const average =
    exerciseData.reduce((sum, current) => sum + current, 0) / periodLength;
  const success = average >= target;
  const rating =
    Math.round(average) < target ? 1 : Math.round(average) === target ? 2 : 3;

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription: RATING_DESCRIPTIONS[rating],
    target,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
