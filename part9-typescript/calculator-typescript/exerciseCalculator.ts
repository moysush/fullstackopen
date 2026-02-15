export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const RATING_DESCRIPTIONS: Record<number, string> = {
  1: "bad",
  2: "not too bad but could be better",
  3: "great!",
};

export const calculateExercises = (
  exerciseData: number[],
  target: number,
): Result | string => {
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

if (require.main === module) {
  try {
    // turning args into an array without the first two args
    const args = process.argv.slice(2);

    if (args.length < 2) {
      throw new Error("Please provide at least one target and exercise day");
    }

    const exerciseData = args.slice(1).map((a) => Number(a));
    const target = Number(args[0]);

    if (isNaN(target) || exerciseData.some(isNaN)) {
      throw new Error("Please provide numerical values only");
    }

    console.log(calculateExercises(exerciseData, target));
  } catch (error) {
    console.log(
      error instanceof Error ? error.message : "Something went wrong",
    );
  }
  // console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
}
