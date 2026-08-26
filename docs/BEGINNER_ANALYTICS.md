# Beginner activation tracking

The beginner experience is designed around one activation outcome: a learner
successfully checks their first program and understands the edit → check →
improve loop.

Events are stored first-party in `LearningEvent`. The event context contains no
names, email addresses, code, answers, or raw errors. Deleting a user cascades
to their learning events.

| Event | Trigger | Decision it supports |
| --- | --- | --- |
| `signup_completed` | A password or OAuth account is created | Are registrations succeeding? |
| `onboarding_completed` | A learner chooses a starting path | How many choose the beginner path? |
| `beginner_dashboard_viewed` | A beginner opens their course-first home | Are learners returning? |
| `course_overview_viewed` | The beginner course overview is opened | Does onboarding lead into the course? |
| `lesson_started` | An unlocked beginner lesson is opened | Do learners begin a lesson? |
| `program_checked` | A program is checked against the exercise cases | Do learners attempt the core action? |
| `first_program_passed` | The learner passes their first course program | Has the learner reached first value? |
| `knowledge_check_answered` | A knowledge check is submitted | Are concepts being actively recalled? |
| `guidance_completed` | All staged guidance for an exercise is opened | Where is structured help needed? |
| `solution_revealed` | A reference solution is requested | Where are learners getting stuck? |
| `lesson_mastered` | Every required lesson activity is passed | Do learners complete a full session? |
| `checkpoint_submitted` | A module checkpoint is graded | Are learners retaining module objectives? |

Run `npm run analytics:beginner` to print the distinct-learner activation funnel
and average time from onboarding to the first passed program.

The report is deliberately cohort-based rather than a raw event-count report:
repeated checks and page visits should not inflate activation rates.
