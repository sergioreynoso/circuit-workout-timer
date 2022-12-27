import { Activity } from "../hooks/useWorkout";

export function addTimestamp(array: Activity[], totalTime: number) {
  return array.map((item, index) => {
    let start = array
      .slice(0, index)
      .reduce((prev, curr) => prev + curr.duration, 0);

    const end = array[index].duration + start;
    return {
      ...item,
      timestamp: { start: totalTime - start, end: totalTime - end },
    };
  });
}
