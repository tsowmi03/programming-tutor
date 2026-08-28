import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import CoursesError from "./error";

describe("CoursesError", () => {
  it("renders course recovery actions without exposing the error message", () => {
    const html = renderToStaticMarkup(
      createElement(CoursesError, {
        error: Object.assign(new Error("sensitive internal details"), {
          digest: "course-reference",
        }),
        unstable_retry: vi.fn(),
      }),
    );

    expect(html).toContain("This course hit a problem");
    expect(html).toContain("Try again");
    expect(html).toContain('href="/courses"');
    expect(html).toContain("course-reference");
    expect(html).not.toContain("sensitive internal details");
  });
});
