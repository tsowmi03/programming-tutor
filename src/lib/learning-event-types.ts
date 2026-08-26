export const LEARNING_EVENT_NAMES = [
  "signup_completed",
  "onboarding_completed",
  "beginner_dashboard_viewed",
  "course_overview_viewed",
  "lesson_started",
  "program_checked",
  "first_program_passed",
  "lesson_mastered",
  "guidance_completed",
  "solution_revealed",
  "knowledge_check_answered",
  "checkpoint_submitted",
] as const;

export type LearningEventName = (typeof LEARNING_EVENT_NAMES)[number];

export const CLIENT_LEARNING_EVENT_NAMES = [
  "beginner_dashboard_viewed",
  "course_overview_viewed",
  "lesson_started",
] as const;
