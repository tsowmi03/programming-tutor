import type {
  CheckpointSlot,
  Course,
  CourseExercise,
  CourseModule,
  KnowledgeCheck,
  Lesson,
} from "../types";

type Case = [input: string, output: string, hidden?: boolean];

function exercise(
  id: string,
  title: string,
  objectiveId: string,
  prompt: string,
  starterCode: string,
  solution: string,
  cases: Case[],
): CourseExercise {
  return {
    mode: "script",
    id,
    title,
    objectiveId,
    required: true,
    prompt,
    starterCode,
    solution,
    tests: cases.map(([input, expectedOutput, hidden]) => ({
      input,
      expectedOutput,
      hidden,
    })),
    guidance: [
      { level: "nudge", title: "Name the next step", body: "Read the task one sentence at a time and identify the single line that should produce each required result." },
      { level: "strategy", title: "Use the lesson pattern", body: "Return to the worked example immediately above and copy its *shape*, then change the values and names for this task." },
      { level: "pitfall", title: "Check exact output", body: "Check spelling, capitalisation, punctuation, and the order of printed lines. The judge compares the complete output." },
      { level: "pseudocode", title: "Plan before syntax", body: "Write a short comment for each step, then translate each comment into one Python statement." },
    ],
  };
}

function check(
  id: string,
  objectiveId: string,
  prompt: string,
  acceptedAnswers: string[],
  explanation: string,
  choices?: string[],
): KnowledgeCheck {
  return {
    id,
    objectiveId,
    format: choices ? "single_choice" : "prediction",
    prompt,
    acceptedAnswers,
    explanation,
    choices,
    required: true,
  };
}

function lesson(
  slug: string,
  title: string,
  summary: string,
  objectives: string[],
  prose: string,
  activities: (CourseExercise | KnowledgeCheck)[],
): Lesson {
  return {
    slug,
    title,
    summary,
    objectives,
    estimatedMinutes: 40,
    blocks: [
      { kind: "prose", markdown: prose },
      ...activities.map((activity) =>
        "acceptedAnswers" in activity
          ? ({ kind: "knowledge_check", check: activity } as const)
          : ({ kind: "exercise", exercise: activity } as const),
      ),
    ],
  };
}

interface CheckpointSeed {
  objectiveId: string;
  remediationLessonSlug: string;
  prompts: [string, string, string];
  answers: [string[], string[], string[]];
}

function checkpointSlots(seeds: CheckpointSeed[]): CheckpointSlot[] {
  return seeds.map((seed) => ({
    objectiveId: seed.objectiveId,
    format: "short_answer",
    remediationLessonSlug: seed.remediationLessonSlug,
    variants: seed.prompts.map((prompt, index) => ({
      id: `${seed.objectiveId}-v${index + 1}`,
      prompt,
      acceptedAnswers: seed.answers[index],
      explanation: `This checks ${seed.objectiveId.replaceAll("-", " ")}. Review ${seed.remediationLessonSlug.replaceAll("-", " ")} if the reasoning was unclear.`,
    })),
  }));
}

function module(
  slug: string,
  title: string,
  description: string,
  lessons: Lesson[],
  seeds: CheckpointSeed[],
): CourseModule {
  return {
    slug,
    title,
    description,
    lessons,
    objectiveIds: seeds.map((seed) => seed.objectiveId),
    checkpoint: {
      id: `${slug}-checkpoint`,
      title: `${title} checkpoint`,
      passingScore: 4,
      slots: checkpointSlots(seeds),
    },
  };
}

const m1 = module(
  "instructions",
  "Giving a Computer Instructions",
  "Learn how Python runs instructions in order, how expressions produce values, and how to read the first useful part of an error.",
  [
    lesson(
      "programs-and-order",
      "Programs and execution order",
      "Run instructions in order and connect source code to output.",
      ["m1-order", "m1-output"],
      `## A program is a precise sequence

A computer follows instructions in order, one statement at a time. Python's \`print(...)\` instruction displays a value. Predict the output before choosing **Check my program**, then compare the result with your prediction.

\`\`\`python
print("Ready")
print("Set")
print("Go")
\`\`\`

The editor contains source code. The results panel contains the program's output. They are related, but they are not the same thing.`,
      [
        exercise("m1-order-steps", "Put output in order", "m1-order", "Write a complete program that prints `Ready`, `Set`, and `Go` on separate lines in that exact order.", "# Print the three steps in order.\nprint(\"Ready\")\n", "print(\"Ready\")\nprint(\"Set\")\nprint(\"Go\")\n", [["", "Ready\nSet\nGo"], ["", "Ready\nSet\nGo", true]]),
        check("m1-order-check", "m1-order", "What is the first line printed by `print(\"A\")` followed by `print(\"B\")`?", ["A"], "Python executes the first print statement before moving to the second."),
        exercise("m1-output-label", "Label a result", "m1-output", "Print two lines: first `Score`, then the number `10`. Use two print statements.", "# Print the label and value on separate lines.\nprint(\"Score\")\n", "print(\"Score\")\nprint(10)\n", [["", "Score\n10"], ["", "Score\n10", true]]),
        check("m1-output-check", "m1-output", "Which word describes what a running program displays: source or output?", ["output"], "Source is what you write; output is what the program produces.", ["source", "output"]),
      ],
    ),
    lesson(
      "values-and-expressions",
      "Values and expressions",
      "Combine numbers and text to produce new values.",
      ["m1-expressions", "m1-strings"],
      `## Python can calculate

Numbers and text are **values**. An expression combines values with operators and produces another value. Python evaluates the expression inside \`print\` before displaying it.

\`\`\`python
print(6 + 4)
print(3 * 5)
print("Code" + "Climb")
\`\`\`

Quotes distinguish text from Python names. Arithmetic operators follow the usual mathematical order of operations.`,
      [
        exercise("m1-expression-calc", "Calculate a total", "m1-expressions", "Print the result of 8 plus 6, then print the result of 4 multiplied by 5.", "# Replace the question marks with expressions.\nprint(8 + 0)\nprint(4 * 0)\n", "print(8 + 6)\nprint(4 * 5)\n", [["", "14\n20"], ["", "14\n20", true]]),
        check("m1-expression-check", "m1-expressions", "What value does `2 + 3 * 4` produce?", ["14"], "Multiplication happens before addition, so 3 × 4 is 12, then 2 is added."),
        exercise("m1-string-combine", "Combine text", "m1-strings", "Use `+` to combine `Code` and `Climb`, including one space between the words, and print the result.", "# Combine the three string values.\nprint(\"Code\")\n", "print(\"Code\" + \" \" + \"Climb\")\n", [["", "Code Climb"], ["", "Code Climb", true]]),
        check("m1-string-check", "m1-strings", "Which operator joins two string values?", ["+", "plus"], "The plus operator concatenates strings in the order they appear."),
      ],
    ),
    lesson(
      "errors-and-profile-card",
      "Errors and your first mini-project",
      "Read a syntax error and repair a small profile-card program.",
      ["m1-errors"],
      `## Errors are evidence

An error is Python explaining where it became unable to continue. Read the final line first, then inspect the highlighted line. A \`SyntaxError\` usually means Python could not understand the written instruction.

\`\`\`python
print("Hello")
\`\`\`

Missing quotes or parentheses are common and repairable. Change one thing, run again, and use the new result as evidence.`,
      [
        exercise("m1-repair-print", "Repair the greeting", "m1-errors", "Repair the program so it prints exactly `Hello, programmer!` without changing the intended message.", "# The closing quote and parenthesis are missing.\nprint(\"Hello, programmer!\n", "print(\"Hello, programmer!\")\n", [["", "Hello, programmer!"], ["", "Hello, programmer!", true]]),
        check("m1-error-check", "m1-errors", "Which error name means Python could not understand the written structure?", ["syntaxerror", "syntax error"], "A SyntaxError points to invalid Python syntax."),
        exercise("m1-profile-card", "Build a profile card", "m1-output", "Create a four-line profile card that prints `CODER CARD`, `Name: Alex`, `Level: Beginner`, and `Goal: Build things`.", "# Print all four lines of the profile card.\nprint(\"CODER CARD\")\n", "print(\"CODER CARD\")\nprint(\"Name: Alex\")\nprint(\"Level: Beginner\")\nprint(\"Goal: Build things\")\n", [["", "CODER CARD\nName: Alex\nLevel: Beginner\nGoal: Build things"], ["", "CODER CARD\nName: Alex\nLevel: Beginner\nGoal: Build things", true]]),
      ],
    ),
  ],
  [
    { objectiveId: "m1-order", remediationLessonSlug: "programs-and-order", prompts: ["What line runs first in a Python script?", "If three print statements are written top to bottom, which one runs first?", "Does Python normally begin at the top or bottom of a script?"], answers: [["the first line", "first line"], ["the first", "first", "top"], ["top", "the top"]] },
    { objectiveId: "m1-output", remediationLessonSlug: "programs-and-order", prompts: ["What does `print` produce?", "What do we call text displayed by a running program?", "Is displayed program text called source or output?"], answers: [["output"], ["output"], ["output"]] },
    { objectiveId: "m1-expressions", remediationLessonSlug: "values-and-expressions", prompts: ["What is `5 + 2 * 3`?", "What is `4 * 3 + 1`?", "What is `10 - 2 * 4`?"], answers: [["11"], ["13"], ["2"]] },
    { objectiveId: "m1-strings", remediationLessonSlug: "values-and-expressions", prompts: ["What operator joins two strings?", "Which symbol combines `\"a\"` and `\"b\"`?", "What is `\"Code\" + \"!\"`?"], answers: [["+", "plus"], ["+", "plus"], ["Code!", "code!"]] },
    { objectiveId: "m1-errors", remediationLessonSlug: "errors-and-profile-card", prompts: ["What error means Python cannot understand the code's structure?", "Which part of an error should a beginner read first?", "After an error, should you change everything or one thing at a time?"], answers: [["syntaxerror", "syntax error"], ["final line", "the final line", "last line"], ["one thing", "one thing at a time"]] },
  ],
);

const m2 = module(
  "variables-and-input",
  "Variables, Types, Input, and Output",
  "Store information under clear names, receive text input, convert it when necessary, and display calculated results.",
  [
    lesson("variables-and-state", "Variables and assignment", "Store values and follow how they change.", ["m2-assignment", "m2-state"], `## Names for values

A variable gives a value a useful name. The assignment statement \`score = 10\` makes the name \`score\` refer to the value 10. A later assignment can change which value the name refers to.

\`\`\`python
score = 10
score = score + 5
print(score)
\`\`\`

Trace code by writing the current value beside each variable after every line.`, [
      exercise("m2-store-name", "Store and print a name", "m2-assignment", "Store the text \`Alex\` in a variable named \`name\`, then print \`Hello, Alex\` using that variable.", "# Create the variable, then use it.\nname = \"\"\nprint(\"Hello, \" + name)\n", "name = \"Alex\"\nprint(\"Hello, \" + name)\n", [["", "Hello, Alex"], ["", "Hello, Alex", true]]),
      check("m2-assignment-check", "m2-assignment", "After \`points = 7\`, what value does \`points\` refer to?", ["7"], "Assignment associates the name points with the value 7."),
      exercise("m2-update-score", "Update a score", "m2-state", "Start \`score\` at 10, add 5 using the current value, subtract 2, then print the final score.", "score = 10\n# Update score twice.\nprint(score)\n", "score = 10\nscore = score + 5\nscore = score - 2\nprint(score)\n", [["", "13"], ["", "13", true]]),
      check("m2-state-check", "m2-state", "What is \`score\` after \`score = 4\` then \`score = score + 3\`?", ["7"], "The right side uses the old value 4, producing the new value 7."),
    ]),
    lesson("types-and-conversion", "Types and conversion", "Distinguish text, integers, decimals, and booleans.", ["m2-types", "m2-conversion"], `## Different kinds of values

Python values have types. \`str\` represents text, \`int\` whole numbers, \`float\` decimal numbers, and \`bool\` either \`True\` or \`False\`. Input arrives as text even when the user types digits.

\`\`\`python
age_text = input()
age = int(age_text)
print(age + 1)
\`\`\`

Convert at the boundary: receive text, validate or convert it, then calculate with the converted value.`, [
      exercise("m2-input-greeting", "Read a name", "m2-types", "Read one line of standard input as a name and print \`Welcome, NAME!\` using the supplied name.", "name = input()\n# Print the welcome message.\n", "name = input()\nprint(\"Welcome, \" + name + \"!\")\n", [["Mia\n", "Welcome, Mia!"], ["Sam\n", "Welcome, Sam!", true]]),
      check("m2-types-check", "m2-types", "What type does \`input()\` return?", ["str", "string", "text"], "Python input returns a string, even when its characters are digits."),
      exercise("m2-add-inputs", "Add two supplied numbers", "m2-conversion", "Read two whole numbers on separate lines, convert both to integers, and print their sum.", "first = input()\nsecond = input()\n# Convert before adding.\nprint(first + second)\n", "first = int(input())\nsecond = int(input())\nprint(first + second)\n", [["4\n7\n", "11"], ["20\n-3\n", "17", true]]),
      check("m2-conversion-check", "m2-conversion", "What does \`int(\"12\")\` produce?", ["12", "the integer 12", "integer 12"], "int converts digit text into a whole-number value."),
    ]),
    lesson("budget-calculator", "Mini-project: trip budget", "Combine input, conversion, variables, and arithmetic.", ["m2-formatting"], `## Build a complete calculation

Programs often follow an input–process–output structure: receive information, calculate a result, then display it clearly. Give intermediate results meaningful names so the code explains itself.

\`\`\`python
days = int(input())
daily_cost = float(input())
total = days * daily_cost
print(f"Total: {total}")
\`\`\`

An f-string places expressions inside braces and turns them into readable output.`, [
      exercise("m2-daily-budget", "Calculate a trip total", "m2-formatting", "Read a number of days and a whole-dollar daily cost. Print \`Total: $N\` where N is days multiplied by daily cost.", "days = int(input())\ndaily_cost = int(input())\n# Calculate and print the total.\n", "days = int(input())\ndaily_cost = int(input())\ntotal = days * daily_cost\nprint(f\"Total: ${total}\")\n", [["3\n20\n", "Total: $60"], ["7\n15\n", "Total: $105", true]]),
      check("m2-format-check", "m2-formatting", "In an f-string, which characters surround an inserted expression?", ["braces", "curly braces", "{}"], "Expressions in an f-string are placed inside curly braces."),
      exercise("m2-budget-left", "Calculate money remaining", "m2-state", "Read a total budget and an amount spent as whole numbers. Print \`Remaining: $N\` using a named intermediate variable.", "budget = int(input())\nspent = int(input())\n# Calculate what remains.\n", "budget = int(input())\nspent = int(input())\nremaining = budget - spent\nprint(f\"Remaining: ${remaining}\")\n", [["100\n35\n", "Remaining: $65"], ["50\n50\n", "Remaining: $0", true]]),
    ]),
  ],
  [
    { objectiveId: "m2-assignment", remediationLessonSlug: "variables-and-state", prompts: ["What symbol performs assignment?", "In \`age = 15\`, which name receives the value?", "What value is assigned by \`total = 8\`?"], answers: [["="], ["age"], ["8"]] },
    { objectiveId: "m2-state", remediationLessonSlug: "variables-and-state", prompts: ["What is x after \`x=2; x=x+4\`?", "What is score after 10 then subtracting 3?", "What is n after \`n=5; n=n*2\`?"], answers: [["6"], ["7"], ["10"]] },
    { objectiveId: "m2-types", remediationLessonSlug: "types-and-conversion", prompts: ["What type does input return?", "What Python type stores whole numbers?", "What type is \`True\`?"], answers: [["str", "string"], ["int", "integer"], ["bool", "boolean"]] },
    { objectiveId: "m2-conversion", remediationLessonSlug: "types-and-conversion", prompts: ["Which function converts text to a whole number?", "What is \`int(\"9\") + 1\`?", "Why convert input before arithmetic?"], answers: [["int", "int()"], ["10"], ["input is text", "because input is text", "it is a string"]] },
    { objectiveId: "m2-formatting", remediationLessonSlug: "budget-calculator", prompts: ["What prefix marks an f-string?", "Where does an expression go inside an f-string?", "Complete the idea: f-strings make output more _____."], answers: [["f"], ["braces", "curly braces", "{}"], ["readable", "clear"]] },
  ],
);

const m3 = module(
  "decisions",
  "Decisions",
  "Use comparisons and Boolean logic to make a program choose exactly one appropriate path.",
  [
    lesson("comparisons-and-booleans", "Comparisons and Boolean values", "Ask yes-or-no questions about values.", ["m3-comparisons", "m3-booleans"], `## Questions with two possible answers

A comparison produces \`True\` or \`False\`. Equality uses \`==\`, while \`=\` performs assignment. Other comparison operators include \`<\`, \`<=\`, \`>\`, \`>=\`, and \`!=\`.

\`\`\`python
age = int(input())
print(age >= 13)
\`\`\`

Write boundary examples on both sides of a comparison before deciding which operator belongs in the program.`, [
      exercise("m3-is-teen", "Check a minimum age", "m3-comparisons", "Read an age and print \`True\` when it is at least 13, otherwise print \`False\`.", "age = int(input())\n# Print the comparison result.\n", "age = int(input())\nprint(age >= 13)\n", [["13\n", "True"], ["12\n", "False", true], ["18\n", "True", true]]),
      check("m3-comparison-check", "m3-comparisons", "What operator tests whether two values are equal?", ["=="], "Two equals signs compare values; one equals sign assigns a value."),
      exercise("m3-password-match", "Compare two strings", "m3-booleans", "Read two lines and print whether the two strings are exactly equal.", "first = input()\nsecond = input()\n# Compare the strings.\n", "first = input()\nsecond = input()\nprint(first == second)\n", [["climb\nclimb\n", "True"], ["Code\ncode\n", "False", true]]),
      check("m3-boolean-check", "m3-booleans", "What are Python's two Boolean values?", ["true and false", "false and true", "true, false", "false, true"], "Boolean values are written True and False in Python."),
    ]),
    lesson("if-elif-else", "Choosing a branch", "Use if, elif, and else to select one path.", ["m3-branches", "m3-boundaries"], `## Run one appropriate branch

An \`if\` statement runs its indented block when its condition is true. \`elif\` checks another condition only when earlier branches did not run, and \`else\` handles everything remaining.

\`\`\`python
score = int(input())
if score >= 80:
    print("High")
else:
    print("Keep going")
\`\`\`

Indentation shows which instructions belong to each branch.`, [
      exercise("m3-temperature", "Classify a temperature", "m3-branches", "Read an integer temperature. Print \`Hot\` for 30 or above, \`Warm\` for 20–29, and \`Cool\` otherwise.", "temperature = int(input())\n# Add if, elif, and else branches.\n", "temperature = int(input())\nif temperature >= 30:\n    print(\"Hot\")\nelif temperature >= 20:\n    print(\"Warm\")\nelse:\n    print(\"Cool\")\n", [["30\n", "Hot"], ["25\n", "Warm", true], ["19\n", "Cool", true]]),
      check("m3-branch-check", "m3-branches", "Which branch handles all cases not matched earlier?", ["else", "the else branch"], "else is the fallback after prior conditions are false."),
      exercise("m3-grade-band", "Handle score boundaries", "m3-boundaries", "Read a score. Print \`A\` for 90+, \`B\` for 70–89, and \`C\` below 70.", "score = int(input())\n# Check the highest boundary first.\n", "score = int(input())\nif score >= 90:\n    print(\"A\")\nelif score >= 70:\n    print(\"B\")\nelse:\n    print(\"C\")\n", [["90\n", "A"], ["89\n", "B", true], ["69\n", "C", true]]),
      check("m3-boundary-check", "m3-boundaries", "For a 90+ rule, should a score of exactly 90 pass?", ["yes", "true"], "The >= operator includes the boundary value itself."),
    ]),
    lesson("compound-decisions", "Compound decisions and mini-project", "Combine conditions without losing boundary cases.", ["m3-compound"], `## Combine related conditions

\`and\` requires both conditions to be true. \`or\` requires at least one. \`not\` reverses a Boolean value. Prefer readable named pieces when a condition becomes long.

\`\`\`python
age = int(input())
has_permission = input() == "yes"
if age >= 16 and has_permission:
    print("Allowed")
\`\`\`

Build a small truth table before coding a compound decision.`, [
      exercise("m3-entry-rule", "Check two entry requirements", "m3-compound", "Read an age and then \`yes\` or \`no\` for permission. Print \`Allowed\` only when age is at least 16 and permission is yes; otherwise print \`Not allowed\`.", "age = int(input())\nhas_permission = input() == \"yes\"\n# Check both requirements.\n", "age = int(input())\nhas_permission = input() == \"yes\"\nif age >= 16 and has_permission:\n    print(\"Allowed\")\nelse:\n    print(\"Not allowed\")\n", [["16\nyes\n", "Allowed"], ["17\nno\n", "Not allowed", true], ["15\nyes\n", "Not allowed", true]]),
      check("m3-compound-check", "m3-compound", "Which operator requires both conditions to be true?", ["and"], "and produces True only when both sides are true."),
      exercise("m3-ticket-price", "Build a ticket calculator", "m3-boundaries", "Read an age. Print \`Ticket: $8\` for under 13, \`Ticket: $12\` for 13 through 64, and \`Ticket: $9\` for 65 or older.", "age = int(input())\n# Select exactly one ticket price.\n", "age = int(input())\nif age < 13:\n    price = 8\nelif age >= 65:\n    price = 9\nelse:\n    price = 12\nprint(f\"Ticket: ${price}\")\n", [["12\n", "Ticket: $8"], ["13\n", "Ticket: $12", true], ["65\n", "Ticket: $9", true]]),
    ]),
  ],
  [
    { objectiveId: "m3-comparisons", remediationLessonSlug: "comparisons-and-booleans", prompts: ["Which operator compares equality?", "Is 5 >= 5 true or false?", "Which operator means not equal?"], answers: [["=="], ["true"], ["!="]] },
    { objectiveId: "m3-booleans", remediationLessonSlug: "comparisons-and-booleans", prompts: ["Name one Boolean value.", "What type is the result of a comparison?", "Is \`False\` written with a capital F?"], answers: [["true", "false"], ["bool", "boolean"], ["yes", "true"]] },
    { objectiveId: "m3-branches", remediationLessonSlug: "if-elif-else", prompts: ["Which keyword begins a conditional?", "Which keyword checks another condition?", "Which keyword is the fallback?"], answers: [["if"], ["elif"], ["else"]] },
    { objectiveId: "m3-boundaries", remediationLessonSlug: "if-elif-else", prompts: ["Does >= include its boundary?", "For under 13, should 13 match?", "What score is the first included by score >= 90?"], answers: [["yes", "true"], ["no", "false"], ["90"]] },
    { objectiveId: "m3-compound", remediationLessonSlug: "compound-decisions", prompts: ["Which operator requires both sides?", "Which operator needs at least one side?", "Which operator reverses a Boolean?"], answers: [["and"], ["or"], ["not"]] },
  ],
);

const m4 = module(
  "loops",
  "Repetition",
  "Repeat work with for and while loops, track changing totals, and recognise loop boundaries.",
  [
    lesson("for-and-range", "for loops and range", "Repeat a known number of times.", ["m4-for", "m4-range"], `## Repeat without copying code

A \`for\` loop visits each value in a sequence. \`range(start, stop)\` produces values from start up to, but not including, stop.

\`\`\`python
for number in range(1, 4):
    print(number)
\`\`\`

This prints 1, 2, and 3. Trace the loop by recording the loop variable for each iteration.`, [
      exercise("m4-count-up", "Count up", "m4-range", "Read a positive integer n and print every number from 1 through n, one per line.", "n = int(input())\n# Include n in the output.\n", "n = int(input())\nfor number in range(1, n + 1):\n    print(number)\n", [["3\n", "1\n2\n3"], ["1\n", "1", true], ["5\n", "1\n2\n3\n4\n5", true]]),
      check("m4-range-check", "m4-range", "What values come from \`range(1, 4)\`?", ["1, 2, 3", "1 2 3", "1,2,3"], "The stop value 4 is excluded."),
      exercise("m4-repeat-word", "Repeat a word", "m4-for", "Read a word and a count. Print the word exactly that many times, one per line.", "word = input()\ncount = int(input())\n# Repeat the print statement.\n", "word = input()\ncount = int(input())\nfor _ in range(count):\n    print(word)\n", [["Go\n3\n", "Go\nGo\nGo"], ["Hi\n1\n", "Hi", true]]),
      check("m4-for-check", "m4-for", "Which loop is usually best when the repeat count is known?", ["for", "for loop"], "A for loop naturally handles a known sequence or count."),
    ]),
    lesson("counters-and-totals", "Counters and accumulators", "Update a running count or total each iteration.", ["m4-accumulator", "m4-tracing"], `## Carry information through a loop

An accumulator starts before the loop and is updated during each iteration. Its position matters: resetting it inside the loop loses earlier work.

\`\`\`python
total = 0
for number in range(1, 4):
    total = total + number
print(total)
\`\`\`

Trace both the loop variable and total after every update.`, [
      exercise("m4-sum-to-n", "Build a running total", "m4-accumulator", "Read n and print the sum of every whole number from 1 through n.", "n = int(input())\ntotal = 0\n# Add every number to total.\nprint(total)\n", "n = int(input())\ntotal = 0\nfor number in range(1, n + 1):\n    total = total + number\nprint(total)\n", [["4\n", "10"], ["1\n", "1", true], ["10\n", "55", true]]),
      check("m4-total-check", "m4-accumulator", "Where should \`total = 0\` go: before or inside the loop?", ["before", "before the loop", "outside", "outside the loop"], "Initialising before the loop preserves accumulated work."),
      exercise("m4-count-even", "Count matching values", "m4-tracing", "Read n and count how many numbers from 1 through n are even. Print the count.", "n = int(input())\ncount = 0\n# Test each number and update count.\n", "n = int(input())\ncount = 0\nfor number in range(1, n + 1):\n    if number % 2 == 0:\n        count = count + 1\nprint(count)\n", [["6\n", "3"], ["1\n", "0", true], ["10\n", "5", true]]),
      check("m4-trace-check", "m4-tracing", "How many times does \`range(3)\` iterate?", ["3", "three"], "range(3) produces 0, 1, and 2: three values."),
    ]),
    lesson("while-and-validation", "while loops and validation", "Repeat until a condition changes.", ["m4-while"], `## Repeat while something remains true

A \`while\` loop is useful when the number of attempts is not known in advance. The loop must change something involved in its condition, or it may never stop.

\`\`\`python
answer = input()
while answer != "yes":
    print("Try again")
    answer = input()
print("Accepted")
\`\`\`

Before running, identify what eventually makes the condition false.`, [
      exercise("m4-until-yes", "Validate a response", "m4-while", "Read responses until \`yes\` is entered. Print \`Try again\` for each earlier response, then print \`Accepted\`.", "answer = input()\n# Keep asking through the supplied input lines.\n", "answer = input()\nwhile answer != \"yes\":\n    print(\"Try again\")\n    answer = input()\nprint(\"Accepted\")\n", [["no\nyes\n", "Try again\nAccepted"], ["maybe\nno\nyes\n", "Try again\nTry again\nAccepted", true]]),
      check("m4-while-check", "m4-while", "What must eventually happen to a while-loop condition?", ["become false", "turn false", "false"], "A terminating while loop eventually makes its condition false."),
      exercise("m4-times-table", "Mini-project: times table", "m4-for", "Read an integer n and print five lines in the form \`n x i = result\` for i from 1 to 5.", "n = int(input())\n# Produce five multiplication facts.\n", "n = int(input())\nfor i in range(1, 6):\n    print(f\"{n} x {i} = {n * i}\")\n", [["3\n", "3 x 1 = 3\n3 x 2 = 6\n3 x 3 = 9\n3 x 4 = 12\n3 x 5 = 15"], ["2\n", "2 x 1 = 2\n2 x 2 = 4\n2 x 3 = 6\n2 x 4 = 8\n2 x 5 = 10", true]]),
    ]),
  ],
  [
    { objectiveId: "m4-for", remediationLessonSlug: "for-and-range", prompts: ["Which loop suits a known repeat count?", "What keyword begins a for loop?", "Does a for loop visit sequence values?"], answers: [["for", "for loop"], ["for"], ["yes", "true"]] },
    { objectiveId: "m4-range", remediationLessonSlug: "for-and-range", prompts: ["Is range's stop value included?", "What is the last value in range(2,5)?", "How many values are in range(4)?"], answers: [["no", "false"], ["4"], ["4", "four"]] },
    { objectiveId: "m4-accumulator", remediationLessonSlug: "counters-and-totals", prompts: ["Where is an accumulator initialised?", "What common starting value is used for a total?", "Should a running total be reset each iteration?"], answers: [["before the loop", "outside the loop", "before"], ["0", "zero"], ["no", "false"]] },
    { objectiveId: "m4-tracing", remediationLessonSlug: "counters-and-totals", prompts: ["How many iterations does range(5) make?", "What is total after adding 1 then 2 to zero?", "What values does range(2) produce?"], answers: [["5", "five"], ["3"], ["0 and 1", "0, 1", "0 1"]] },
    { objectiveId: "m4-while", remediationLessonSlug: "while-and-validation", prompts: ["When is a while loop useful?", "What causes an infinite loop?", "A terminating while condition eventually becomes what?"], answers: [["when the repeat count is unknown", "unknown repeat count", "until a condition changes"], ["the condition never becomes false", "condition stays true"], ["false"]] },
  ],
);

const m5 = module(
  "strings-and-lists",
  "Strings and Lists",
  "Work with ordered collections, indices, mutation, and loops that process every element.",
  [
    lesson("string-tools", "Working with strings", "Inspect and transform text safely.", ["m5-string-index", "m5-string-methods"], `## Text is an ordered sequence

Each character in a string has an index beginning at zero. Negative index \`-1\` means the last character. Methods such as \`.lower()\` and \`.strip()\` produce transformed strings.

\`\`\`python
word = input()
print(word[0])
print(word[-1])
\`\`\`

Check whether a string could be empty before indexing it in a general program.`, [
      exercise("m5-first-last", "Find the ends of a word", "m5-string-index", "Read a non-empty word and print its first character, last character, and length on separate lines.", "word = input()\n# Print first, last, and length.\n", "word = input()\nprint(word[0])\nprint(word[-1])\nprint(len(word))\n", [["climb\n", "c\nb\n5"], ["Python\n", "P\nn\n6", true]]),
      check("m5-index-check", "m5-string-index", "What index refers to the first character?", ["0", "zero"], "Python sequence indices begin at zero."),
      exercise("m5-clean-text", "Clean supplied text", "m5-string-methods", "Read one line, remove surrounding whitespace, convert it to lowercase, and print the result.", "text = input()\n# Chain or sequence the two transformations.\n", "text = input()\ncleaned = text.strip().lower()\nprint(cleaned)\n", [["  Hello World  \n", "hello world"], [" CODE  \n", "code", true]]),
      check("m5-method-check", "m5-string-methods", "Which string method converts text to lowercase?", ["lower", "lower()", ".lower()"], "The lower method returns a lowercase version of the string."),
    ]),
    lesson("list-basics", "Creating and changing lists", "Store several related values in one ordered collection.", ["m5-lists", "m5-mutation"], `## One name, many values

A list stores an ordered collection. Lists use zero-based indices like strings, but lists are mutable: methods such as \`.append(...)\` can change the existing list.

\`\`\`python
tasks = ["read", "code"]
tasks.append("test")
print(tasks[1])
\`\`\`

Use \`len(items)\` for the number of elements and avoid hard-coding the final index.`, [
      exercise("m5-list-positions", "Read list positions", "m5-lists", "Create the list \`red\`, \`green\`, \`blue\`; then print the first colour, last colour, and list length.", "colours = [\"red\", \"green\", \"blue\"]\n# Print the requested facts.\n", "colours = [\"red\", \"green\", \"blue\"]\nprint(colours[0])\nprint(colours[-1])\nprint(len(colours))\n", [["", "red\nblue\n3"], ["", "red\nblue\n3", true]]),
      check("m5-list-check", "m5-lists", "What does \`len([10, 20, 30])\` return?", ["3", "three"], "The list contains three elements."),
      exercise("m5-append-item", "Add to a list", "m5-mutation", "Start with \`['plan', 'code']\`, read one new task, append it, and print every task on its own line.", "tasks = [\"plan\", \"code\"]\nnew_task = input()\n# Append and print all tasks.\n", "tasks = [\"plan\", \"code\"]\nnew_task = input()\ntasks.append(new_task)\nfor task in tasks:\n    print(task)\n", [["test\n", "plan\ncode\ntest"], ["share\n", "plan\ncode\nshare", true]]),
      check("m5-mutation-check", "m5-mutation", "Which list method adds one item to the end?", ["append", "append()", ".append()"], "append mutates the list by adding an element at the end."),
    ]),
    lesson("processing-collections", "Processing collections", "Combine lists, loops, and accumulators.", ["m5-processing"], `## Process every element

Loop directly over list values when you do not need their positions. Combine this with conditions and accumulators to summarise data.

\`\`\`python
numbers = [3, 7, 2]
total = 0
for number in numbers:
    total += number
print(total)
\`\`\`

Test collection code with one item, several items, and values around important boundaries.`, [
      exercise("m5-comma-total", "Total comma-separated numbers", "m5-processing", "Read comma-separated whole numbers, convert each piece, and print their total.", "parts = input().split(\",\")\ntotal = 0\n# Convert and add every part.\n", "parts = input().split(\",\")\ntotal = 0\nfor part in parts:\n    total += int(part)\nprint(total)\n", [["3,4,5\n", "12"], ["10,-2,7\n", "15", true]]),
      check("m5-processing-check", "m5-processing", "When positions are unnecessary, should you loop over values directly?", ["yes", "true"], "Direct value iteration is clearer when indices are not needed."),
      exercise("m5-word-analyser", "Mini-project: word analyser", "m5-processing", "Read a word and print \`Length: N\` and \`Vowels: N\`. Count a, e, i, o, and u without treating uppercase differently.", "word = input()\n# Count vowels and print both facts.\n", "word = input()\nvowels = 0\nfor character in word.lower():\n    if character in \"aeiou\":\n        vowels += 1\nprint(f\"Length: {len(word)}\")\nprint(f\"Vowels: {vowels}\")\n", [["Code\n", "Length: 4\nVowels: 2"], ["RHYTHM\n", "Length: 6\nVowels: 0", true], ["Education\n", "Length: 9\nVowels: 5", true]]),
    ]),
  ],
  [
    { objectiveId: "m5-string-index", remediationLessonSlug: "string-tools", prompts: ["What is the first string index?", "What index means the final character?", "What does len return?"], answers: [["0", "zero"], ["-1"], ["length", "the length", "number of characters"]] },
    { objectiveId: "m5-string-methods", remediationLessonSlug: "string-tools", prompts: ["Which method lowercases text?", "Which method removes surrounding whitespace?", "Do string methods such as lower return transformed text?"], answers: [["lower", "lower()"], ["strip", "strip()"], ["yes", "true"]] },
    { objectiveId: "m5-lists", remediationLessonSlug: "list-basics", prompts: ["Are lists ordered?", "What is the first list index?", "How do you get a list's length?"], answers: [["yes", "true"], ["0", "zero"], ["len", "len()"]] },
    { objectiveId: "m5-mutation", remediationLessonSlug: "list-basics", prompts: ["Which method adds to a list?", "Are lists mutable?", "Does append change the existing list?"], answers: [["append", "append()"], ["yes", "true"], ["yes", "true"]] },
    { objectiveId: "m5-processing", remediationLessonSlug: "processing-collections", prompts: ["What loop processes every list value?", "Where is a total initialised?", "What method splits comma-separated text?"], answers: [["for", "for loop"], ["before the loop", "outside the loop"], ["split", "split()"]] },
  ],
);

const m6 = module(
  "functions",
  "Functions and Decomposition",
  "Name reusable behaviour, pass information through parameters, return results, and divide a larger problem into testable pieces.",
  [
    lesson("defining-functions", "Defining and calling functions", "Package instructions under a meaningful name.", ["m6-define", "m6-call"], `## Give behaviour a name

\`def\` defines a function; calling its name runs the body. A definition does not run merely because Python reads it.

\`\`\`python
def show_banner():
    print("CODECLIMB")

show_banner()
\`\`\`

Use verb-based names that describe what the function does.`, [
      exercise("m6-banner-function", "Define a banner function", "m6-define", "Define \`show_banner\` so it prints \`CODECLIMB\`, then call it once.", "def show_banner():\n    # Print the banner.\n    pass\n\n# Call the function.\n", "def show_banner():\n    print(\"CODECLIMB\")\n\nshow_banner()\n", [["", "CODECLIMB"], ["", "CODECLIMB", true]]),
      check("m6-define-check", "m6-define", "Which keyword defines a function?", ["def"], "Python function definitions begin with def."),
      exercise("m6-call-twice", "Call reusable behaviour", "m6-call", "Define \`cheer\` to print \`Keep climbing!\`, then call it twice.", "def cheer():\n    pass\n\n# Call cheer twice.\n", "def cheer():\n    print(\"Keep climbing!\")\n\ncheer()\ncheer()\n", [["", "Keep climbing!\nKeep climbing!"], ["", "Keep climbing!\nKeep climbing!", true]]),
      check("m6-call-check", "m6-call", "Does defining a function automatically run its body?", ["no", "false"], "The body runs when the function is called."),
    ]),
    lesson("parameters-and-returns", "Parameters and return values", "Move information into and out of functions.", ["m6-parameters", "m6-return"], `## Inputs and outputs for functions

Parameters are local names that receive argument values. \`return\` sends a result back to the caller. Printing displays a value but does not return it.

\`\`\`python
def double(number):
    return number * 2

result = double(6)
print(result)
\`\`\`

Think of a function contract: what information enters, and what value comes back?`, [
      exercise("m6-personal-greeting", "Use a parameter", "m6-parameters", "Read a name. Define \`greeting(name)\` to return \`Hello, NAME!\`, then print the returned result.", "def greeting(name):\n    # Return the message.\n    pass\n\nname = input()\n", "def greeting(name):\n    return f\"Hello, {name}!\"\n\nname = input()\nprint(greeting(name))\n", [["Mia\n", "Hello, Mia!"], ["Lee\n", "Hello, Lee!", true]]),
      check("m6-parameter-check", "m6-parameters", "What receives an argument value inside a function?", ["parameter", "a parameter", "parameters"], "A parameter is the function's local name for supplied information."),
      exercise("m6-celsius", "Return a calculated value", "m6-return", "Define \`to_fahrenheit(celsius)\` using \`celsius * 9 / 5 + 32\`. Read an integer Celsius value and print the returned Fahrenheit value without a trailing \`.0\`.", "def to_fahrenheit(celsius):\n    pass\n\ncelsius = int(input())\n", "def to_fahrenheit(celsius):\n    return int(celsius * 9 / 5 + 32)\n\ncelsius = int(input())\nprint(to_fahrenheit(celsius))\n", [["0\n", "32"], ["100\n", "212", true], ["20\n", "68", true]]),
      check("m6-return-check", "m6-return", "Which keyword sends a result back to the caller?", ["return"], "return ends the function call and supplies its result."),
    ]),
    lesson("decomposition", "Decomposing a program", "Split one larger calculation into small functions.", ["m6-decompose"], `## One responsibility at a time

Decomposition turns a large task into small functions with clear contracts. A useful function can be understood and tested without running the whole program.

For a receipt, one function might calculate tax and another might format the final message. Keep input and printing near the program boundary while calculation functions return values.`, [
      exercise("m6-receipt-functions", "Separate calculation steps", "m6-decompose", "Define \`tax(amount)\` to return 10% of an amount and \`total(amount)\` to return amount plus its tax. Read a whole-dollar amount and print the total with one decimal place.", "def tax(amount):\n    pass\n\ndef total(amount):\n    pass\n\namount = int(input())\n", "def tax(amount):\n    return amount * 0.1\n\ndef total(amount):\n    return amount + tax(amount)\n\namount = int(input())\nprint(f\"{total(amount):.1f}\")\n", [["50\n", "55.0"], ["100\n", "110.0", true]]),
      check("m6-decompose-check", "m6-decompose", "Should a small function usually have one clear responsibility?", ["yes", "true"], "Single-purpose functions are easier to understand, test, and reuse."),
      exercise("m6-text-pipeline", "Build a text pipeline", "m6-decompose", "Define \`clean(text)\` to strip and lowercase text, and \`word_count(text)\` to return the number of space-separated words. Read one line and print the cleaned text then its word count.", "def clean(text):\n    pass\n\ndef word_count(text):\n    pass\n\ntext = input()\n", "def clean(text):\n    return text.strip().lower()\n\ndef word_count(text):\n    return len(text.split())\n\ntext = input()\ncleaned = clean(text)\nprint(cleaned)\nprint(word_count(cleaned))\n", [["  Hello Code Climb  \n", "hello code climb\n3"], ["One two\n", "one two\n2", true]]),
    ]),
  ],
  [
    { objectiveId: "m6-define", remediationLessonSlug: "defining-functions", prompts: ["Which keyword defines a function?", "Does an indented body belong to its def?", "What should a function name describe?"], answers: [["def"], ["yes", "true"], ["what it does", "its behaviour", "behavior"]] },
    { objectiveId: "m6-call", remediationLessonSlug: "defining-functions", prompts: ["How do you run a defined function?", "Does definition alone run a function?", "What punctuation follows a no-argument function call?"], answers: [["call it", "calling it", "function call"], ["no", "false"], ["parentheses", "()"]] },
    { objectiveId: "m6-parameters", remediationLessonSlug: "parameters-and-returns", prompts: ["What receives an argument?", "Are parameters local names?", "Where are parameters written in a definition?"], answers: [["parameter", "a parameter"], ["yes", "true"], ["parentheses", "inside parentheses"]] },
    { objectiveId: "m6-return", remediationLessonSlug: "parameters-and-returns", prompts: ["Which keyword sends back a result?", "Is printing the same as returning?", "Where does a returned value go?"], answers: [["return"], ["no", "false"], ["the caller", "caller"]] },
    { objectiveId: "m6-decompose", remediationLessonSlug: "decomposition", prompts: ["What is decomposition?", "Should a calculation function usually print or return?", "Why use small functions?"], answers: [["splitting a problem into smaller parts", "breaking a problem into smaller parts"], ["return"], ["easier to test", "easier to understand", "reuse"]] },
  ],
);

const m7 = module(
  "dictionaries",
  "Dictionaries and Structured Data",
  "Represent labelled information with key-value pairs and combine dictionaries with lists to model records.",
  [
    lesson("dictionary-basics", "Dictionary basics", "Store and retrieve labelled values.", ["m7-keys", "m7-lookup"], `## Look up values by meaning

A dictionary maps unique keys to values. Instead of remembering that a name sits at position zero, use the meaningful key \`"name"\`.

\`\`\`python
student = {"name": "Alex", "score": 8}
print(student["name"])
\`\`\`

Use \`key in dictionary\` before a lookup when a key might be absent.`, [
      exercise("m7-profile-dict", "Read a record", "m7-lookup", "Create a dictionary with name \`Alex\` and level \`Beginner\`, then print each value on its own line using key lookup.", "profile = {\"name\": \"Alex\", \"level\": \"Beginner\"}\n# Look up both values.\n", "profile = {\"name\": \"Alex\", \"level\": \"Beginner\"}\nprint(profile[\"name\"])\nprint(profile[\"level\"])\n", [["", "Alex\nBeginner"], ["", "Alex\nBeginner", true]]),
      check("m7-key-check", "m7-keys", "What does a dictionary map to a value?", ["key", "a key", "keys"], "Each dictionary value is associated with a unique key."),
      exercise("m7-safe-lookup", "Check before lookup", "m7-keys", "Create \`scores = {'Mia': 9, 'Sam': 7}\`. Read a name and print its score, or \`Not found\` when the key is absent.", "scores = {\"Mia\": 9, \"Sam\": 7}\nname = input()\n# Check membership before lookup.\n", "scores = {\"Mia\": 9, \"Sam\": 7}\nname = input()\nif name in scores:\n    print(scores[name])\nelse:\n    print(\"Not found\")\n", [["Mia\n", "9"], ["Lee\n", "Not found", true]]),
      check("m7-lookup-check", "m7-lookup", "Which operator checks whether a key exists?", ["in"], "The in operator checks dictionary-key membership."),
    ]),
    lesson("dictionary-processing", "Changing and processing dictionaries", "Update values and loop through key-value pairs.", ["m7-mutation", "m7-items"], `## Records can change

Assigning to a dictionary key inserts or replaces its value. The \`.items()\` method supplies each key and value together during iteration.

\`\`\`python
scores = {"Mia": 8}
scores["Mia"] = scores["Mia"] + 1
for name, score in scores.items():
    print(name, score)
\`\`\`

Choose names that explain whether a loop variable is a key, value, or complete record.`, [
      exercise("m7-update-score", "Update a stored score", "m7-mutation", "Create \`{'Alex': 5}\`, read a whole-number bonus, add it to Alex's score, and print the new score.", "scores = {\"Alex\": 5}\nbonus = int(input())\n# Update and print Alex's score.\n", "scores = {\"Alex\": 5}\nbonus = int(input())\nscores[\"Alex\"] += bonus\nprint(scores[\"Alex\"])\n", [["3\n", "8"], ["0\n", "5", true]]),
      check("m7-mutation-check", "m7-mutation", "Can assigning to an existing key replace its value?", ["yes", "true"], "Dictionary assignment inserts a new key or updates an existing one."),
      exercise("m7-frequency", "Count character frequencies", "m7-items", "Read a lowercase word, count every character with a dictionary, then print the count for \`a\` or 0 when there is no \`a\`.", "word = input()\ncounts = {}\n# Build counts, then print the count for a.\n", "word = input()\ncounts = {}\nfor character in word:\n    counts[character] = counts.get(character, 0) + 1\nprint(counts.get(\"a\", 0))\n", [["banana\n", "3"], ["code\n", "0", true]]),
      check("m7-items-check", "m7-items", "Which method supplies dictionary key-value pairs?", ["items", "items()", ".items()"], "items returns pairs suitable for unpacking in a loop."),
    ]),
    lesson("structured-quiz-data", "Lists of records and quiz data", "Model several records and process them uniformly.", ["m7-structured"], `## Combine structures

A list of dictionaries represents several records with the same fields. Each list element is one complete record; dictionary keys describe its parts.

\`\`\`python
questions = [
    {"prompt": "2 + 2?", "answer": "4"},
    {"prompt": "3 + 3?", "answer": "6"},
]
\`\`\`

This representation will form the data model for the final capstone.`, [
      exercise("m7-record-total", "Total values in records", "m7-structured", "Use the supplied list of product dictionaries. Loop through the records and print the total of their \`price\` values.", "products = [{\"name\": \"Book\", \"price\": 12}, {\"name\": \"Pen\", \"price\": 3}]\n# Total every price.\n", "products = [{\"name\": \"Book\", \"price\": 12}, {\"name\": \"Pen\", \"price\": 3}]\ntotal = 0\nfor product in products:\n    total += product[\"price\"]\nprint(total)\n", [["", "15"], ["", "15", true]]),
      check("m7-structured-check", "m7-structured", "In a list of dictionaries, what does each dictionary usually represent?", ["a record", "one record", "record", "an item"], "Each dictionary groups the labelled fields for one record."),
      exercise("m7-quiz-engine", "Mini-project: quiz engine", "m7-structured", "Use two supplied question records. Read two answers, compare each with its record's answer, and print \`Score: N/2\`.", "questions = [{\"answer\": \"4\"}, {\"answer\": \"blue\"}]\nscore = 0\n# Read and check one answer per record.\n", "questions = [{\"answer\": \"4\"}, {\"answer\": \"blue\"}]\nscore = 0\nfor question in questions:\n    answer = input().lower()\n    if answer == question[\"answer\"]:\n        score += 1\nprint(f\"Score: {score}/2\")\n", [["4\nblue\n", "Score: 2/2"], ["5\nBLUE\n", "Score: 1/2", true]]),
    ]),
  ],
  [
    { objectiveId: "m7-keys", remediationLessonSlug: "dictionary-basics", prompts: ["What identifies a dictionary value?", "Must dictionary keys be unique?", "What operator checks key membership?"], answers: [["key", "a key"], ["yes", "true"], ["in"]] },
    { objectiveId: "m7-lookup", remediationLessonSlug: "dictionary-basics", prompts: ["How do you retrieve a value by key?", "What should you check before an uncertain lookup?", "In d['name'], what is 'name'?"], answers: [["key lookup", "use the key", "square brackets"], ["the key exists", "membership", "key in dictionary"], ["key", "a key"]] },
    { objectiveId: "m7-mutation", remediationLessonSlug: "dictionary-processing", prompts: ["Can dictionary values change?", "How do you replace a key's value?", "Does assignment to a new key insert it?"], answers: [["yes", "true"], ["assign to the key", "assignment"], ["yes", "true"]] },
    { objectiveId: "m7-items", remediationLessonSlug: "dictionary-processing", prompts: ["Which method returns key-value pairs?", "What does get allow you to supply?", "Can a loop unpack a key and value?"], answers: [["items", "items()"], ["a default", "default value"], ["yes", "true"]] },
    { objectiveId: "m7-structured", remediationLessonSlug: "structured-quiz-data", prompts: ["What can a list of dictionaries model?", "What does each quiz dictionary represent?", "What structure holds several records in order?"], answers: [["records", "a collection of records"], ["one question", "a question", "one record"], ["list", "a list"]] },
  ],
);

const m8 = module(
  "debugging-and-capstone",
  "Debugging, Testing, and Capstone",
  "Use evidence to find faults, design boundary tests, and combine the full course into a structured quiz game.",
  [
    lesson("systematic-debugging", "Systematic debugging", "Turn failures into small, testable hypotheses.", ["m8-tracebacks", "m8-debug-process"], `## Debug with evidence

Read a traceback from the final line upward: identify the error type, message, and relevant source line. Reproduce the failure, form one hypothesis, change one thing, and run again.

Temporary prints can reveal current values and reached branches. Remove them after the defect is understood. Avoid random edits because they destroy evidence about which change mattered.`, [
      exercise("m8-fix-total", "Repair a type error", "m8-tracebacks", "Repair the program so two supplied whole numbers are added numerically and printed. The current program joins text instead.", "first = input()\nsecond = input()\nprint(first + second)\n", "first = int(input())\nsecond = int(input())\nprint(first + second)\n", [["4\n5\n", "9"], ["10\n20\n", "30", true]]),
      check("m8-traceback-check", "m8-tracebacks", "Which traceback line should you usually read first?", ["final line", "last line", "the final line"], "The final line names the error and gives its concise message."),
      exercise("m8-fix-loop", "Repair an off-by-one error", "m8-debug-process", "Repair the program so input n produces every number from 1 through n rather than stopping before n.", "n = int(input())\nfor number in range(1, n):\n    print(number)\n", "n = int(input())\nfor number in range(1, n + 1):\n    print(number)\n", [["3\n", "1\n2\n3"], ["1\n", "1", true]]),
      check("m8-debug-check", "m8-debug-process", "During systematic debugging, how many hypotheses should one change test?", ["one", "1", "one hypothesis"], "One focused change preserves evidence about cause and effect."),
    ]),
    lesson("testing-and-boundaries", "Testing and boundary cases", "Choose tests that can expose likely mistakes.", ["m8-tests", "m8-boundaries"], `## Tests are examples with a purpose

A normal case demonstrates expected use. A boundary case sits exactly where behaviour changes, such as age 13 in an under-13 rule. An invalid case checks defensive behaviour.

For every condition, test a value below the boundary, exactly on it, and above it. When a defect is repaired, keep the failing example as a regression test.`, [
      exercise("m8-safe-division", "Handle a dangerous boundary", "m8-boundaries", "Read two integers. Print their integer quotient, but print \`Cannot divide by zero\` when the second number is zero.", "first = int(input())\nsecond = int(input())\n# Guard the dangerous operation.\n", "first = int(input())\nsecond = int(input())\nif second == 0:\n    print(\"Cannot divide by zero\")\nelse:\n    print(first // second)\n", [["10\n2\n", "5"], ["10\n0\n", "Cannot divide by zero", true]]),
      check("m8-boundary-check", "m8-boundaries", "For an age >= 13 rule, name the exact boundary value.", ["13", "thirteen"], "The behaviour changes at 13, so 13 is the boundary."),
      exercise("m8-test-classifier", "Classify a boundary correctly", "m8-tests", "Read a score and print \`Pass\` for 50 or higher, otherwise \`Try again\`. Ensure the exact boundary is correct.", "score = int(input())\n# Implement the stated boundary.\n", "score = int(input())\nif score >= 50:\n    print(\"Pass\")\nelse:\n    print(\"Try again\")\n", [["50\n", "Pass"], ["49\n", "Try again", true], ["51\n", "Pass", true]]),
      check("m8-test-check", "m8-tests", "What do we call a test kept after fixing a bug?", ["regression test", "a regression test"], "A regression test prevents the same defect from returning unnoticed."),
    ]),
    lesson("quiz-capstone", "Capstone: build a quiz game", "Plan, build, test, and explain a multi-function program.", ["m8-capstone"], `## Bring the pieces together

The capstone uses structured question data, functions, loops, conditions, input validation, scoring, and clear output. Keep question data separate from quiz behaviour.

Plan these responsibilities before coding: normalise an answer, check one answer, run every question, and display the final score. The automated cases supply three answers in order. After passing, explain where data enters, where state changes, and what each function returns.`, [
      exercise("m8-normalise-answer", "Build a capstone helper", "m8-capstone", "Define \`normalise(answer)\` to strip surrounding whitespace and lowercase text. Read one answer and print the returned value.", "def normalise(answer):\n    pass\n\nanswer = input()\n", "def normalise(answer):\n    return answer.strip().lower()\n\nanswer = input()\nprint(normalise(answer))\n", [["  BLUE  \n", "blue"], ["Four\n", "four", true]]),
      check("m8-capstone-check", "m8-capstone", "Should question data be kept separate from quiz-running behaviour?", ["yes", "true"], "Separating data from behaviour makes the program easier to change and test."),
      exercise("m8-quiz-game", "Final capstone: quiz game", "m8-capstone", "Complete the quiz game. It must ask the three supplied questions by reading one answer per record, compare answers case-insensitively after stripping whitespace, and finally print \`Final score: N/3\`. Do not print prompts because the automated runner supplies input directly.", "def normalise(answer):\n    # Return a cleaned answer.\n    pass\n\ndef run_quiz(questions):\n    # Read and score one answer per question.\n    pass\n\nquestions = [\n    {\"answer\": \"4\"},\n    {\"answer\": \"blue\"},\n    {\"answer\": \"python\"},\n]\n", "def normalise(answer):\n    return answer.strip().lower()\n\ndef run_quiz(questions):\n    score = 0\n    for question in questions:\n        answer = normalise(input())\n        if answer == question[\"answer\"]:\n            score += 1\n    return score\n\nquestions = [\n    {\"answer\": \"4\"},\n    {\"answer\": \"blue\"},\n    {\"answer\": \"python\"},\n]\nscore = run_quiz(questions)\nprint(f\"Final score: {score}/3\")\n", [["4\nblue\npython\n", "Final score: 3/3"], [" 4 \nBLUE\nRuby\n", "Final score: 2/3", true], ["5\nred\njava\n", "Final score: 0/3", true]]),
    ]),
  ],
  [
    { objectiveId: "m8-tracebacks", remediationLessonSlug: "systematic-debugging", prompts: ["Which traceback line is read first?", "What three things should a traceback reveal?", "Is an error message evidence?"], answers: [["final line", "last line"], ["error type message and line", "type, message, line"], ["yes", "true"]] },
    { objectiveId: "m8-debug-process", remediationLessonSlug: "systematic-debugging", prompts: ["How many things should one debug change test?", "What comes before changing code?", "Why avoid random edits?"], answers: [["one", "1"], ["a hypothesis", "form a hypothesis", "reproduce the failure"], ["they destroy evidence", "lose evidence"]] },
    { objectiveId: "m8-tests", remediationLessonSlug: "testing-and-boundaries", prompts: ["What test prevents a fixed bug returning?", "What does a normal case represent?", "Should tests have a purpose?"], answers: [["regression test"], ["expected use", "typical use", "normal use"], ["yes", "true"]] },
    { objectiveId: "m8-boundaries", remediationLessonSlug: "testing-and-boundaries", prompts: ["What values surround a boundary test?", "For x >= 10, what is the boundary?", "Is zero the dangerous divisor boundary?"], answers: [["below at and above", "below, at, and above"], ["10"], ["yes", "true"]] },
    { objectiveId: "m8-capstone", remediationLessonSlug: "quiz-capstone", prompts: ["What function cleans capstone answers?", "Where should the changing score live?", "What structures hold the quiz records?"], answers: [["normalise", "normalise()"], ["in run_quiz", "run_quiz", "the quiz function"], ["a list of dictionaries", "list of dictionaries"]] },
  ],
);

export const beginnerPythonCourse: Course = {
  slug: "programming-foundations-python",
  title: "Programming Foundations with Python",
  language: "python",
  level: "beginner",
  audience: "Teen and adult first-time programmers",
  prerequisiteCourseSlugs: [],
  estimatedMinutes: 1_680,
  progression: "mastery",
  nextCourseSlug: "python-for-developers",
  tagline: "Learn to think, build, debug, and test like a programmer—starting from your very first line of code.",
  description: `This course assumes **no previous programming experience**. You will learn how a computer follows instructions, how programs store and transform information, how to make decisions and repeat work, and how to organise a larger solution into functions and structured data.

Each lesson follows a predictable rhythm: predict, run, investigate, modify, make, and check. Required activities must pass before the next lesson unlocks. Each module ends with a five-question checkpoint; a score of 4/5 demonstrates mastery, while a lower score assigns focused review before an unlimited retry.

The course finishes with a complete command-line quiz game. Afterward, you can deepen your Python skills, begin structured problem solving, or explore how computers run code at a lower level.`,
  outcomes: [
    "Trace a Python program and explain how values change",
    "Use variables, decisions, loops, strings, lists, functions, and dictionaries",
    "Read common errors and debug with evidence",
    "Design normal, boundary, and regression tests",
    "Decompose and build a small multi-function program independently",
  ],
  modules: [m1, m2, m3, m4, m5, m6, m7, m8],
};
