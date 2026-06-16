import type { CourseModule } from "../types";

export const csharpObjectDesign: CourseModule = {
  slug: "object-design",
  title: "Object-Oriented Design in C#",
  description:
    "Use classes to protect invariants, apply inheritance selectively, model finite states with enums, and pass behavior with delegates.",
  lessons: [
    {
      slug: "encapsulation-and-invariants",
      title: "Encapsulation and invariants",
      summary:
        "Keep objects valid by controlling construction and state changes.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Objects should protect their own rules

Encapsulation is not just making fields private. It means a type owns the rules that keep its state valid.

\`\`\`csharp
public sealed class BankAccount {
    public int Balance { get; private set; }

    public BankAccount(int openingBalance) {
        if (openingBalance < 0) {
            throw new ArgumentOutOfRangeException(nameof(openingBalance));
        }
        Balance = openingBalance;
    }

    public bool TryWithdraw(int amount) {
        if (amount < 0 || amount > Balance) return false;
        Balance -= amount;
        return true;
    }
}
\`\`\`

Callers can read \`Balance\`, but only the account can change it. That keeps the "balance is never negative" invariant in one place.

Prefer properties over public fields for a public API. A property can begin as simple storage and later add validation without changing how callers access it.`,
        },
        {
          kind: "prose",
          markdown: `## Construction and ownership

A constructor should leave an object ready to use. If construction needs many optional values, named arguments, factory methods, or a builder can be clearer than a long positional constructor.

Think about ownership when a constructor accepts a mutable collection:

\`\`\`csharp
public Team(List<string> members) {
    _members = new List<string>(members); // defensive copy
}
\`\`\`

Storing the caller's list directly lets outside code mutate the object's internal state without going through its methods. A defensive copy trades allocation for isolation.

\`sealed\` prevents inheritance. Use it when the class is a complete concrete concept and was not designed as a base type. Inheritance expands the behavioral contract, so it should be intentional.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "protected-balance",
            title: "Protect an account balance",
            prompt: `Create an internal \`BankAccount\` type and use it from \`FinalBalance\`.

Start with \`openingBalance\`. Apply each signed value in \`changes\` in order:

- A positive value is a deposit.
- A negative value is a withdrawal.
- Ignore a change that would make the balance negative.

Return the final balance.

\`\`\`text
FinalBalance(10, [5, -8, -20, 4]) -> 11
FinalBalance(0, [-1, 3, -2])      -> 1
\`\`\`

Keep the balance setter private and put the invariant inside a method on \`BankAccount\`.`,
            signature: {
              name: "finalBalance",
              params: [
                { name: "openingBalance", type: "int" },
                { name: "changes", type: "int[]" },
              ],
              returns: "int",
            },
            tests: [
              { input: [10, [5, -8, -20, 4]], expected: 11 },
              { input: [0, [-1, 3, -2]], expected: 1 },
              { input: [50, []], expected: 50 },
              {
                input: [5, [-5, -1, 10]],
                expected: 10,
                hidden: true,
              },
              {
                input: [2, [3, -4, -2, 1]],
                expected: 2,
                hidden: true,
              },
            ],
            starterCode: `public sealed class BankAccount {
    public int Balance { get; private set; }

    public BankAccount(int openingBalance) {
        Balance = openingBalance;
    }

    public void Apply(int change) {
        // Apply only changes that keep Balance non-negative.
    }
}

public class Solution {
    public int FinalBalance(int openingBalance, int[] changes) {
        // Create an account, apply the changes, and return its balance.
    }
}`,
            solution: `public sealed class BankAccount {
    public int Balance { get; private set; }

    public BankAccount(int openingBalance) {
        Balance = openingBalance;
    }

    public void Apply(int change) {
        if (Balance + change >= 0) {
            Balance += change;
        }
    }
}

public class Solution {
    public int FinalBalance(int openingBalance, int[] changes) {
        var account = new BankAccount(openingBalance);
        foreach (int change in changes) {
            account.Apply(change);
        }
        return account.Balance;
    }
}`,
            hints: [
              "The account should decide whether a change is valid.",
              "Inside `Apply`, update only when `Balance + change >= 0`.",
              "The solution method should interact with the account through its public API.",
            ],
          },
        },
      ],
    },
    {
      slug: "inheritance-and-polymorphism",
      title: "Inheritance and polymorphism",
      summary:
        "Share a contract across implementations without hard-coding every concrete type.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Substitutability is the point

Inheritance is useful when a derived type can stand in for its base type without surprising callers.

\`\`\`csharp
public abstract class ShippingRule {
    public abstract int Price(int weight);
}

public sealed class StandardShipping : ShippingRule {
    public override int Price(int weight) => weight * 2;
}
\`\`\`

An \`abstract\` member has no base implementation and must be supplied by a concrete derived class. A \`virtual\` member has a default implementation that a derived class may replace with \`override\`.

Code that depends on \`ShippingRule\` can call \`Price\` without testing which concrete rule it received. Runtime dispatch selects the implementation.`,
        },
        {
          kind: "prose",
          markdown: `## Prefer composition for independent behavior

Inheritance creates a strong relationship between types. It works best for a stable "is a" hierarchy with a shared contract.

Composition stores a collaborator instead:

\`\`\`csharp
public class Checkout {
    private readonly IShippingRule _shipping;

    public Checkout(IShippingRule shipping) {
        _shipping = shipping;
    }
}
\`\`\`

The checkout does not inherit shipping behavior. It delegates to an object that implements the required interface. This makes rules independently replaceable and easier to test.

Useful modifiers:

- \`abstract\`: incomplete type or member.
- \`virtual\`: may be overridden.
- \`override\`: replaces a virtual or abstract implementation.
- \`sealed override\`: replaces it and stops further overriding.
- \`protected\`: visible to the type and derived types. Keep it narrow because it becomes part of the inheritance contract.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "shipping-polymorphism",
            title: "Calculate shipping through a common contract",
            prompt: `Each package has a weight and a shipping speed at the same index.

- \`"standard"\`: cost is \`weight * 2\`.
- \`"express"\`: cost is \`weight * 3 + 5\`.

Return the total cost. Define an \`IShippingRule\` interface with a \`Price(int weight)\` method and two implementations. Choose the implementation for each package, then call it through the interface.

\`\`\`text
ShippingTotal([2, 4], ["standard", "express"]) -> 21
\`\`\`

All weights are non-negative and every speed is one of the two values above.`,
            signature: {
              name: "shippingTotal",
              params: [
                { name: "weights", type: "int[]" },
                { name: "speeds", type: "string[]" },
              ],
              returns: "int",
            },
            tests: [
              {
                input: [[2, 4], ["standard", "express"]],
                expected: 21,
              },
              { input: [[5], ["standard"]], expected: 10 },
              { input: [[], []], expected: 0 },
              {
                input: [[0, 1, 2], ["express", "express", "standard"]],
                expected: 17,
                hidden: true,
              },
              {
                input: [[3, 3], ["standard", "standard"]],
                expected: 12,
                hidden: true,
              },
            ],
            starterCode: `public interface IShippingRule {
    int Price(int weight);
}

public sealed class StandardShipping : IShippingRule {
    public int Price(int weight) {
        // weight * 2
    }
}

public sealed class ExpressShipping : IShippingRule {
    public int Price(int weight) {
        // weight * 3 + 5
    }
}

public class Solution {
    public int ShippingTotal(int[] weights, string[] speeds) {
        // Select a rule for each package and add its price.
    }
}`,
            solution: `public interface IShippingRule {
    int Price(int weight);
}

public sealed class StandardShipping : IShippingRule {
    public int Price(int weight) {
        return weight * 2;
    }
}

public sealed class ExpressShipping : IShippingRule {
    public int Price(int weight) {
        return weight * 3 + 5;
    }
}

public class Solution {
    public int ShippingTotal(int[] weights, string[] speeds) {
        int total = 0;
        for (int i = 0; i < weights.Length; i++) {
            IShippingRule rule = speeds[i] == "express"
                ? (IShippingRule)new ExpressShipping()
                : new StandardShipping();
            total += rule.Price(weights[i]);
        }
        return total;
    }
}`,
            hints: [
              "Both concrete classes implement the same `Price` method.",
              "Declare the selected variable as `IShippingRule`.",
              "After selecting the rule, the loop only needs `total += rule.Price(weights[i]);`.",
            ],
          },
        },
      ],
    },
    {
      slug: "enums-and-domain-states",
      title: "Enums and finite domain states",
      summary:
        "Replace loosely related constants with named, constrained values.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Give finite choices a type

An enum names a closed set of integral values:

\`\`\`csharp
public enum OrderStatus {
    Draft,
    Submitted,
    Paid,
    Cancelled
}
\`\`\`

The names communicate intent better than raw integers or repeated strings. Enums work well in \`switch\` expressions and can be parsed:

\`\`\`csharp
if (Enum.TryParse<OrderStatus>(
    text,
    ignoreCase: true,
    out OrderStatus status
)) {
    // use status
}
\`\`\`

An enum variable can technically hold an undefined numeric value after a cast, so validate values at external boundaries when required.

Use \`[Flags]\` only when values are independent bit options that can be combined. Assign powers of two:

\`\`\`csharp
[Flags]
public enum Permission {
    None = 0,
    Read = 1,
    Write = 2,
    Delete = 4
}
\`\`\``,
        },
        {
          kind: "exercise",
          exercise: {
            id: "count-weekend-days",
            title: "Parse and count weekend days",
            prompt: `Each string in \`dayNames\` may name a value from \`System.DayOfWeek\`, in any letter case.

Return how many valid entries are \`Saturday\` or \`Sunday\`. Ignore invalid text.

\`\`\`text
CountWeekendDays(["Monday", "SATURDAY", "sunday"]) -> 2
CountWeekendDays(["holiday", "Friday"])            -> 0
\`\`\`

Use \`Enum.TryParse<DayOfWeek>\` with case-insensitive parsing.`,
            signature: {
              name: "countWeekendDays",
              params: [{ name: "dayNames", type: "string[]" }],
              returns: "int",
            },
            tests: [
              {
                input: [["Monday", "SATURDAY", "sunday"]],
                expected: 2,
              },
              { input: [["holiday", "Friday"]], expected: 0 },
              { input: [[]], expected: 0 },
              {
                input: [["Saturday", "Saturday", "Sunday"]],
                expected: 3,
                hidden: true,
              },
              {
                input: [["sUnDaY", "Sunday", "not-a-day"]],
                expected: 2,
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    public int CountWeekendDays(string[] dayNames) {
        // Parse valid DayOfWeek names and count Saturday/Sunday.
    }
}`,
            solution: `using System;

public class Solution {
    public int CountWeekendDays(string[] dayNames) {
        int count = 0;
        foreach (string name in dayNames) {
            if (Enum.TryParse<DayOfWeek>(
                name,
                true,
                out DayOfWeek day
            ) && (day == DayOfWeek.Saturday || day == DayOfWeek.Sunday)) {
                count++;
            }
        }
        return count;
    }
}`,
            hints: [
              "`Enum.TryParse<DayOfWeek>(name, true, out DayOfWeek day)` ignores case.",
              "Only inspect `day` when parsing succeeds.",
              "Count both `DayOfWeek.Saturday` and `DayOfWeek.Sunday`.",
            ],
          },
        },
      ],
    },
    {
      slug: "delegates-lambdas-and-events",
      title: "Delegates, lambdas, and events",
      summary:
        "Treat behavior as a value and publish notifications without exposing invocation.",
      blocks: [
        {
          kind: "prose",
          markdown: `## Delegates are typed references to methods

A delegate describes a callable signature. .NET provides generic delegate types for most needs:

- \`Func<T, TResult>\`: accepts input and returns a result.
- \`Action<T>\`: accepts input and returns nothing.
- \`Predicate<T>\`: accepts input and returns \`bool\`.

\`\`\`csharp
Func<int, int> square = n => n * n;
Action<string> print = message => Console.WriteLine(message);

int result = square(5); // 25
\`\`\`

Lambdas can capture variables from their surrounding scope. The captured variables live as long as the delegate needs them:

\`\`\`csharp
int offset = 10;
Func<int, int> addOffset = n => n + offset;
\`\`\`

Avoid changing a captured loop variable from several threads without synchronization.`,
        },
        {
          kind: "prose",
          markdown: `## Events restrict who can publish

An event is a delegate with controlled access. Other objects may subscribe and unsubscribe, but only the declaring type may invoke it:

\`\`\`csharp
public class Counter {
    public event Action<int> Changed;

    public void Increment() {
        Value++;
        Changed?.Invoke(Value);
    }

    public int Value { get; private set; }
}
\`\`\`

Events are suitable for in-process notifications where the publisher should not know every subscriber. Remember to unsubscribe long-lived subscriptions when the subscriber has a shorter lifetime, otherwise the publisher's delegate can keep it alive.

Delegates also power LINQ selectors, comparison callbacks, middleware, test doubles, and strategy objects. They are a lightweight alternative to defining a one-method interface when the behavior has no extra state or identity.`,
        },
        {
          kind: "exercise",
          exercise: {
            id: "transform-by-mode",
            title: "Select behavior with a delegate",
            prompt: `Return a transformed copy of \`nums\` according to \`mode\`:

- \`"square"\`: \`n * n\`
- \`"negate"\`: \`-n\`
- \`"absolute"\`: \`Math.Abs(n)\`
- any other mode: leave \`n\` unchanged

\`\`\`text
TransformByMode([1, -2, 3], "square")   -> [1, 4, 9]
TransformByMode([1, -2, 3], "absolute") -> [1, 2, 3]
\`\`\`

Choose one \`Func<int, int>\`, then use the same loop for every mode.`,
            signature: {
              name: "transformByMode",
              params: [
                { name: "nums", type: "int[]" },
                { name: "mode", type: "string" },
              ],
              returns: "int[]",
            },
            tests: [
              {
                input: [[1, -2, 3], "square"],
                expected: [1, 4, 9],
              },
              {
                input: [[1, -2, 3], "absolute"],
                expected: [1, 2, 3],
              },
              {
                input: [[1, -2, 3], "negate"],
                expected: [-1, 2, -3],
              },
              { input: [[], "square"], expected: [], hidden: true },
              {
                input: [[4, 0, -5], "unknown"],
                expected: [4, 0, -5],
                hidden: true,
              },
            ],
            starterCode: `using System;

public class Solution {
    public int[] TransformByMode(int[] nums, string mode) {
        // Select a Func<int, int>, then apply it to every value.
    }
}`,
            solution: `using System;

public class Solution {
    public int[] TransformByMode(int[] nums, string mode) {
        Func<int, int> transform;
        if (mode == "square") {
            transform = n => n * n;
        } else if (mode == "negate") {
            transform = n => -n;
        } else if (mode == "absolute") {
            transform = n => Math.Abs(n);
        } else {
            transform = n => n;
        }

        int[] result = new int[nums.Length];
        for (int i = 0; i < nums.Length; i++) {
            result[i] = transform(nums[i]);
        }
        return result;
    }
}`,
            hints: [
              "Declare `Func<int, int> transform;` before the mode branches.",
              "Assign a lambda in each branch.",
              "The loop should call `transform(nums[i])` without knowing which behavior was selected.",
            ],
          },
        },
      ],
    },
  ],
};
