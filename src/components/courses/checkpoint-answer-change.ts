import type { ChangeEvent, Dispatch, SetStateAction } from "react";

type CheckpointAnswers = Record<string, string>;

export function createCheckpointAnswerChangeHandler(
  objectiveId: string,
  setAnswers: Dispatch<SetStateAction<CheckpointAnswers>>,
) {
  return (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.currentTarget.value;
    setAnswers((current) => ({ ...current, [objectiveId]: value }));
  };
}
