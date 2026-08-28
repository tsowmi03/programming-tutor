import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import { describe, expect, it } from "vitest";
import { createCheckpointAnswerChangeHandler } from "./checkpoint-answer-change";

describe("createCheckpointAnswerChangeHandler", () => {
  it("captures the input value before React clears the event currentTarget", () => {
    let queuedUpdate: SetStateAction<Record<string, string>> | undefined;
    const setAnswers: Dispatch<SetStateAction<Record<string, string>>> = (
      update,
    ) => {
      queuedUpdate = update;
    };
    const event = {
      currentTarget: { value: "output" },
    } as ChangeEvent<HTMLInputElement>;

    createCheckpointAnswerChangeHandler("m1-output", setAnswers)(event);
    Object.assign(event, { currentTarget: null });

    expect(queuedUpdate).toBeTypeOf("function");
    const applyUpdate = queuedUpdate as (
      current: Record<string, string>,
    ) => Record<string, string>;
    expect(applyUpdate({ "m1-order": "order" })).toEqual({
      "m1-order": "order",
      "m1-output": "output",
    });
  });
});
