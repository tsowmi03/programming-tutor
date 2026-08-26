import type { JudgeOutcome, TestResult } from "./judge/types";

export interface BeginnerFeedback {
  title: string;
  explanation: string;
  nextStep: string;
  technicalDetails?: string;
}

function technicalError(outcome: JudgeOutcome): string | undefined {
  if (outcome.compileOutput) return outcome.compileOutput;
  return outcome.results.find((result) => result.error)?.error;
}

function feedbackForPythonError(error: string): BeginnerFeedback {
  const technicalDetails = error;
  if (/unterminated string|string literal|EOL while scanning/i.test(error)) {
    return {
      title: "Check your quotation marks",
      explanation:
        "Python found some text that starts with a quotation mark but does not finish correctly.",
      nextStep: "Look for a missing closing quote on the line Python mentions.",
      technicalDetails,
    };
  }
  if (/expected ':'/i.test(error)) {
    return {
      title: "This line needs a colon",
      explanation:
        "Python uses a colon to begin an indented block after words such as if, else, for, while, and def.",
      nextStep: "Add : to the end of the line Python points to, then check again.",
      technicalDetails,
    };
  }
  if (/IndentationError|unexpected indent|expected an indented block/i.test(error)) {
    return {
      title: "Check the spaces at the start of the line",
      explanation:
        "Python uses indentation to decide which instructions belong together.",
      nextStep:
        "Compare the line with the lines around it and make their indentation consistent.",
      technicalDetails,
    };
  }
  if (/NameError|is not defined/i.test(error)) {
    return {
      title: "Python does not recognise one of the names",
      explanation:
        "A name may be misspelled, or the program may be using it before giving it a value.",
      nextStep:
        "Find the name on the final error line and compare its spelling everywhere it appears.",
      technicalDetails,
    };
  }
  if (/TypeError/i.test(error)) {
    return {
      title: "These values cannot be used together yet",
      explanation:
        "The operation received a different kind of value from the one it expected—for example, text instead of a number.",
      nextStep:
        "Check where the values came from and whether one needs converting before the operation.",
      technicalDetails,
    };
  }
  if (/ZeroDivisionError/i.test(error)) {
    return {
      title: "The program tried to divide by zero",
      explanation: "Division by zero has no result, so Python stopped the program.",
      nextStep: "Check the divisor before dividing and decide what should happen when it is zero.",
      technicalDetails,
    };
  }
  if (/EOFError/i.test(error)) {
    return {
      title: "The program asked for more input than the exercise supplied",
      explanation:
        "Each input() call consumes one supplied line. The program reached another input() after the lines ran out.",
      nextStep: "Count the input() calls and compare them with the inputs described in the task.",
      technicalDetails,
    };
  }
  if (/SyntaxError/i.test(error)) {
    return {
      title: "Python could not understand this instruction",
      explanation:
        "A small piece of Python punctuation or structure is incomplete near the line shown in the error.",
      nextStep:
        "Check brackets, quotes, colons, and spelling on that line and the line immediately before it.",
      technicalDetails,
    };
  }
  return {
    title: "Python stopped before finishing",
    explanation:
      "The technical details identify where Python stopped. The final line usually contains the most useful clue.",
    nextStep: "Read the final error line first, make one small change, and check again.",
    technicalDetails,
  };
}

function firstUnsuccessfulResult(outcome: JudgeOutcome): TestResult | undefined {
  return outcome.results.find(
    (result) => result.status === "fail" || result.status === "error",
  );
}

export function beginnerFeedback(outcome: JudgeOutcome): BeginnerFeedback | null {
  if (outcome.status === "passed") return null;
  const error = technicalError(outcome);
  if (error) return feedbackForPythonError(error);

  const result = firstUnsuccessfulResult(outcome);
  if (result?.hidden) {
    return {
      title: "Your program works for one example, but not every example yet",
      explanation:
        "CodeClimb checked another reasonable input so that the program works generally, not only for the example you could see.",
      nextStep:
        "Read the task again and try a different small input yourself. Look for assumptions that only fit the shown example.",
    };
  }
  return {
    title: "Your program ran, but the result is different",
    explanation:
      "Compare the expected output with your output carefully. Spaces, punctuation, capital letters, and line breaks all matter.",
    nextStep: "Change one difference at a time, then check the program again.",
  };
}
