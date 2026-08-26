"use client";

import { useEffect } from "react";
import type { CLIENT_LEARNING_EVENT_NAMES } from "@/lib/learning-event-types";

type ClientEventName = (typeof CLIENT_LEARNING_EVENT_NAMES)[number];

export function LearningEventBeacon({
  eventName,
  courseSlug,
  lessonSlug,
}: {
  eventName: ClientEventName;
  courseSlug?: string;
  lessonSlug?: string;
}) {
  useEffect(() => {
    const key = `cc-learning-event:${eventName}:${courseSlug ?? ""}:${lessonSlug ?? ""}`;
    try {
      if (window.sessionStorage.getItem(key)) return;
      window.sessionStorage.setItem(key, "1");
    } catch {
      // Tracking should still work when session storage is unavailable.
    }
    void fetch("/api/learning-events", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ eventName, courseSlug, lessonSlug }),
      keepalive: true,
    }).catch(() => {
      try {
        window.sessionStorage.removeItem(key);
      } catch {
        // There is no local marker to clear when storage is unavailable.
      }
    });
  }, [courseSlug, eventName, lessonSlug]);

  return null;
}
