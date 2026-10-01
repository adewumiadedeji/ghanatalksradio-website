import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as getGuestToken } from "./guestToken-CL9G0vxa.js";
//#region resources/js/api/quizzes.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Quiz API — ghanatalksradio-portal's Modules/Engagement (see
* PublicQuizController), the same Laravel backend the mobile app's
* quizApi.ts uses. Guests submit with a guest_token (same pattern as
* Predictions) — no sign-in required.
*/
var PORTAL_API_URL = "https://app.ghanatalksradio.com".replace(/\/$/, "") || "https://app.ghanatalksradio.com";
var QuizApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "QuizApiError";
		this.status = status;
	}
};
async function apiPost(path, body) {
	let response;
	try {
		response = await fetch(`${PORTAL_API_URL}/api${path}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
	} catch (networkErr) {
		throw new QuizApiError(`Network error reaching quiz API: ${networkErr.message}`, 0);
	}
	const json = await response.json().catch(() => null);
	if (!json || json.status !== true) throw new QuizApiError(json?.message || `Quiz API request failed (${response.status})`, response.status);
	return json.data;
}
/** `answers` maps question id -> chosen choice id. */
async function submitQuiz(slug, answers) {
	return apiPost(`/quizzes/${encodeURIComponent(slug)}/submit`, {
		answers,
		guest_token: getGuestToken()
	});
}
//#endregion
//#region resources/js/pages/QuizDetail.tsx
var import_jsx_runtime = require_jsx_runtime();
var BackLink = Tt(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin-bottom: 1.5rem;

  &:hover {
    color: ${({ theme }) => theme.colors.ink};
  }
`;
var Header = Tt.div`
  margin-bottom: 1.75rem;
`;
var Title = Tt.h1`
  font-size: clamp(1.5rem, 3.6vw, 2rem);
  margin-bottom: 0.4rem;
`;
var Subtitle = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.92rem;
  margin: 0;
`;
var ResultBanner = Tt.div`
  margin-top: 1rem;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.goldDark};
  border-radius: ${({ theme }) => theme.radius.md};
  padding: 1rem 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var List = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;
var Card = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.5rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
var QuestionText = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.05rem;
  font-weight: 700;
  margin: 0;
`;
var ChoiceRow = Tt.label`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.65rem 0.85rem;
  border-radius: ${({ theme }) => theme.radius.sm};
  border: 1px solid ${({ theme, $selected }) => $selected ? theme.colors.goldDark : theme.colors.border};
  background: ${({ theme, $selected }) => $selected ? theme.colors.backgroundAlt : "transparent"};
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.ink};
  cursor: ${({ $disabled }) => $disabled ? "default" : "pointer"};
`;
var SubmitButton = Tt.button`
  align-self: flex-start;
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.65rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  margin-top: 0.5rem;

  &:hover {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
var ErrorText = Tt.span`
  font-size: 0.82rem;
  color: #b3261e;
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
/**
* Ported from the Vite SPA's src/pages/QuizDetail.tsx. Questions/choices
* are fully server-rendered (QuizDetailController) - no guest-specific
* state exists before submission, unlike PredictionDetail. Submitting
* stays a direct client call to the portal API (api/quizzes.ts), same as
* the original (no react-query in this project, so a plain useState-based
* submit instead of a mutation hook).
*/
function QuizDetail({ quiz }) {
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	if (!quiz) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Quiz not found | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/quizzes",
			children: "← Back to Quizzes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "This quiz doesn't exist or may have ended."
		})
	] });
	function handleSubmit(e) {
		e.preventDefault();
		if (!quiz || Object.keys(answers).length < quiz.questions.length) {
			setFormError("Pick an answer for every question before submitting.");
			return;
		}
		setFormError(null);
		setSubmitting(true);
		submitQuiz(quiz.slug, answers).then(setResult).catch((err) => setFormError(err instanceof Error ? err.message : "Please try again.")).finally(() => setSubmitting(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${quiz.name} | GhanaTalksRadio` }), quiz.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: quiz.description
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/quizzes",
			children: "← Back to Quizzes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: quiz.name }),
			!!quiz.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: quiz.description }),
			result && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ResultBanner, { children: [
				"You scored ",
				result.score,
				" / ",
				result.total_possible
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: quiz.questions.map((question) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuestionText, { children: question.question_text }), question.choices.map((choice) => {
					const selected = answers[question.id] === choice.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ChoiceRow, {
						$selected: selected,
						$disabled: !!result,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "radio",
							name: `question-${question.id}`,
							checked: selected,
							disabled: !!result,
							onChange: () => setAnswers((prev) => ({
								...prev,
								[question.id]: choice.id
							}))
						}), choice.label]
					}, choice.id);
				})] }, question.id)) }),
				formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: formError }),
				!result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					type: "submit",
					disabled: submitting,
					children: submitting ? "Submitting…" : "Submit Quiz"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "in-article",
			slotId: GTR_AD_SLOTS.inArticle
		})
	] });
}
//#endregion
export { QuizDetail, QuizDetail as default };
