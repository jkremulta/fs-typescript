export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  targetAmount: number,
): Result => {
  // const args = process.argv.slice(2).map(Number);

  // const dailyHours = args.slice(0, -1);
  // const targetAmount = args[args.length - 1];

  const totalHours = dailyHours.reduce((sum, hours) => sum + hours, 0);
  const averageHours = totalHours / dailyHours.length;

  const ratingPoints = (): number => {
    if (averageHours >= targetAmount) {
      return 3;
    } else if (averageHours >= targetAmount * 0.5) {
      return 2;
    } else {
      return 1;
    }
  };

  const ratingDescription = (): string => {
    const rating = ratingPoints();
    if (rating === 3) {
      return "excellent";
    } else if (rating === 2) {
      return "not too bad but could be better";
    } else {
      return "poor";
    }
  };
  const stats = {
    periodLength: dailyHours.length,
    trainingDays: dailyHours.filter((d) => d > 0).length,
    success: totalHours / dailyHours.length >= targetAmount,
    rating: ratingPoints(),
    ratingDescription: ratingDescription(),
    target: targetAmount,
    average: averageHours,
  };

  return stats;
};
