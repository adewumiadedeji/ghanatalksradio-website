import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { t as Link } from "./Link-CrWePb0Y.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as getGuestToken } from "./guestToken-CL9G0vxa.js";
//#region resources/js/api/predictions.ts
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
/**
* Prediction game API — ghanatalksradio-portal's Modules/Engagement (see
* PublicPredictionController), the same Laravel backend the mobile app
* uses. Unlike Raffle, this is a real read/write client — predicting a
* score and posting a comment both happen directly on the web, there's
* no app-download redirect (see predictionApi.ts in the mobile repo for
* the matching client, same DTO shapes).
*/
var PORTAL_API_URL = "https://app.ghanatalksradio.com".replace(/\/$/, "") || "https://app.ghanatalksradio.com";
var PredictionApiError = class extends Error {
	status;
	constructor(message, status) {
		super(message);
		this.name = "PredictionApiError";
		this.status = status;
	}
};
async function apiGet(path) {
	let response;
	try {
		response = await fetch(`${PORTAL_API_URL}/api${path}`, {
			headers: { Accept: "application/json" },
			cache: "no-store"
		});
	} catch (networkErr) {
		throw new PredictionApiError(`Network error reaching prediction API: ${networkErr.message}`, 0);
	}
	const json = await response.json().catch(() => null);
	if (!json || json.status !== true) throw new PredictionApiError(json?.message || `Prediction API request failed (${response.status})`, response.status);
	return json.data;
}
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
		throw new PredictionApiError(`Network error reaching prediction API: ${networkErr.message}`, 0);
	}
	const json = await response.json().catch(() => null);
	if (!json || json.status !== true) throw new PredictionApiError(json?.message || `Prediction API request failed (${response.status})`, response.status);
	return json.data;
}
async function fetchPredictionDetail(slug) {
	const guestToken = getGuestToken();
	return apiGet(`/predictions/${encodeURIComponent(slug)}?guest_token=${encodeURIComponent(guestToken)}`);
}
async function predictFixture(slug, fixtureId, predictedHomeScore, predictedAwayScore) {
	return apiPost(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/predict`, {
		predicted_home_score: predictedHomeScore,
		predicted_away_score: predictedAwayScore,
		guest_token: getGuestToken()
	});
}
/** Oldest-first, page 1 = oldest. Web doesn't paginate the thread yet
* (see mobile's comments modal for the infinite-scroll version), so this
* requests a generously large page to cover typical fixture threads in
* one call - has_more/page/total are still returned for whenever web
* grows a "load more" control. */
async function fetchComments(slug, fixtureId, page = 1) {
	return apiGet(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/comments?page=${page}&per_page=50`);
}
async function postComment(slug, fixtureId, body, guestName) {
	return (await apiPost(`/predictions/${encodeURIComponent(slug)}/fixtures/${fixtureId}/comments`, {
		body,
		guest_token: getGuestToken(),
		guest_name: guestName
	})).comment;
}
//#endregion
//#region resources/js/pages/PredictionDetail.tsx
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
  gap: 0.6rem;
`;
var RowBetween = Tt.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;
var FixtureTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0;
`;
var ClosedBadge = Tt.span`
  font-size: 0.72rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var Meta = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var FinalScore = Tt.span`
  font-size: 0.92rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var MyPrediction = Tt.span`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var PredictRow = Tt.form`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.3rem;
`;
var ScoreInput = Tt.input`
  width: 3rem;
  text-align: center;
  font-size: 1rem;
  font-weight: 700;
  padding: 0.5rem 0.25rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  color: ${({ theme }) => theme.colors.ink};
`;
var ScoreDash = Tt.span`
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var SubmitButton = Tt.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.55rem 1.25rem;
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    filter: brightness(1.05);
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
var ErrorText = Tt.span`
  font-size: 0.78rem;
  color: #b3261e;
`;
var CommentsToggle = Tt.button`
  align-self: flex-start;
  border: none;
  background: none;
  padding: 0;
  font-size: 0.82rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
  cursor: pointer;
  margin-top: 0.4rem;

  &:hover {
    text-decoration: underline;
  }
`;
var CommentsBox = Tt.div`
  margin-top: 0.4rem;
  padding-top: 0.85rem;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
`;
var CommentRow = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
`;
var CommentAuthor = Tt.span`
  font-size: 0.82rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.ink};
`;
var CommentBody = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;
var CommentForm = Tt.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.3rem;
`;
var CommentInputRow = Tt.div`
  display: flex;
  gap: 0.5rem;
`;
var TextField = Tt.input`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.55rem 0.75rem;
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.ink};
`;
var EmptyNote = Tt.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.inkFaint};
  margin: 0;
`;
var StateBox = Tt.div`
  text-align: center;
  color: ${({ theme }) => theme.colors.inkMuted};
  padding: 4rem 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
function formatDate(dateString) {
	return new Date(dateString.replace(" ", "T")).toLocaleString();
}
function FixtureCard({ slug, fixture, myPrediction, guestName, onGuestNameChange, onPredicted }) {
	const [home, setHome] = (0, import_react.useState)("");
	const [away, setAway] = (0, import_react.useState)("");
	const [formError, setFormError] = (0, import_react.useState)(null);
	const [predicting, setPredicting] = (0, import_react.useState)(false);
	const [showComments, setShowComments] = (0, import_react.useState)(false);
	const [comments, setComments] = (0, import_react.useState)(null);
	const [commentsLoading, setCommentsLoading] = (0, import_react.useState)(false);
	const [draft, setDraft] = (0, import_react.useState)("");
	const [posting, setPosting] = (0, import_react.useState)(false);
	function toggleComments() {
		const next = !showComments;
		setShowComments(next);
		if (next && comments === null) {
			setCommentsLoading(true);
			fetchComments(slug, fixture.id).then((page) => setComments(page.comments)).catch(() => setComments([])).finally(() => setCommentsLoading(false));
		}
	}
	function handlePredict(e) {
		e.preventDefault();
		const h = parseInt(home, 10);
		const a = parseInt(away, 10);
		if (Number.isNaN(h) || Number.isNaN(a) || h < 0 || a < 0) {
			setFormError("Enter a score for both teams (0 or higher).");
			return;
		}
		setFormError(null);
		setPredicting(true);
		predictFixture(slug, fixture.id, h, a).then(() => onPredicted(fixture.id, h, a)).catch((err) => setFormError(err instanceof Error ? err.message : "Please try again.")).finally(() => setPredicting(false));
	}
	function handlePostComment(e) {
		e.preventDefault();
		const body = draft.trim();
		if (!body || !guestName.trim()) return;
		setPosting(true);
		postComment(slug, fixture.id, body, guestName.trim()).then((comment) => {
			setComments((prev) => [...prev ?? [], comment]);
			setDraft("");
		}).catch(() => {}).finally(() => setPosting(false));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowBetween, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FixtureTitle, { children: [
			fixture.home_team,
			" vs ",
			fixture.away_team
		] }), !fixture.predictions_open && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClosedBadge, { children: "Closed" })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: formatDate(fixture.kickoff_at) }),
		fixture.status === "completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FinalScore, { children: [
			"Final: ",
			fixture.actual_home_score,
			" – ",
			fixture.actual_away_score
		] }),
		myPrediction ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MyPrediction, { children: [
			"Your prediction: ",
			myPrediction.predicted_home_score,
			" – ",
			myPrediction.predicted_away_score,
			myPrediction.points_awarded !== null ? ` (+${myPrediction.points_awarded} pts)` : ""
		] }) : fixture.predictions_open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PredictRow, {
			onSubmit: handlePredict,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreInput, {
					inputMode: "numeric",
					maxLength: 2,
					placeholder: "0",
					value: home,
					onChange: (e) => setHome(e.target.value.replace(/[^0-9]/g, ""))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreDash, { children: "–" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScoreInput, {
					inputMode: "numeric",
					maxLength: 2,
					placeholder: "0",
					value: away,
					onChange: (e) => setAway(e.target.value.replace(/[^0-9]/g, ""))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					type: "submit",
					disabled: predicting,
					children: predicting ? "Submitting…" : "Predict"
				})
			]
		}), formError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ErrorText, { children: formError })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: "Predictions closed for this fixture." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentsToggle, {
			type: "button",
			onClick: toggleComments,
			children: showComments ? "Hide comments" : "Comments"
		}),
		showComments && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentsBox, { children: [commentsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "Loading comments…" }) : !comments || comments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyNote, { children: "No comments yet — be the first." }) : comments.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RowBetween, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentAuthor, { children: c.author }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { children: new Date(c.created_at.replace(" ", "T")).toLocaleDateString() })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommentBody, { children: c.body })] }, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentForm, {
			onSubmit: handlePostComment,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				placeholder: "Your name",
				value: guestName,
				onChange: (e) => onGuestNameChange(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CommentInputRow, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextField, {
				style: { flex: 1 },
				placeholder: "Add a comment",
				value: draft,
				onChange: (e) => setDraft(e.target.value)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
				type: "submit",
				disabled: posting,
				children: posting ? "Posting…" : "Post"
			})] })]
		})] })
	] });
}
/**
* Ported from the Vite SPA's src/pages/PredictionDetail.tsx. Fixtures are
* server-rendered (PredictionDetailController) for SEO - real teams,
* kickoff times, descriptions in the first response. guest_token is a
* browser-localStorage identity the server can't know, so `my_predictions`
* starts from the SSR pass (generic/empty) and this re-fetches client-side
* on mount with the real guest token to layer in personalization -
* predicting a score and commenting both stay direct client calls to the
* portal API (api/predictions.ts), same as the original.
*/
function PredictionDetail({ prediction: initialPrediction }) {
	const [prediction, setPrediction] = (0, import_react.useState)(initialPrediction);
	const [guestName, setGuestName] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!initialPrediction) return;
		fetchPredictionDetail(initialPrediction.slug).then(setPrediction).catch(() => {});
	}, [initialPrediction?.slug]);
	if (!prediction) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Head_default, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Predictions not found | GhanaTalksRadio" }) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/predictions",
			children: "← Back to Predictions"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "This prediction game doesn't exist or may have ended."
		})
	] });
	const myPredictionFor = (fixtureId) => prediction.my_predictions.find((p) => p.fixture_id === fixtureId) ?? null;
	function handlePredicted(fixtureId, home, away) {
		setPrediction((prev) => prev ? {
			...prev,
			my_predictions: [...prev.my_predictions, {
				fixture_id: fixtureId,
				predicted_home_score: home,
				predicted_away_score: away,
				points_awarded: null
			}]
		} : prev);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: `${prediction.name} | GhanaTalksRadio` }), prediction.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: prediction.description
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackLink, {
			to: "/predictions",
			children: "← Back to Predictions"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: prediction.name }), !!prediction.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: prediction.description })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: prediction.fixtures.map((fixture) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FixtureCard, {
			slug: prediction.slug,
			fixture,
			myPrediction: myPredictionFor(fixture.id),
			guestName,
			onGuestNameChange: setGuestName,
			onPredicted: handlePredicted
		}, fixture.id)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "in-article",
			slotId: GTR_AD_SLOTS.inArticle
		})
	] });
}
//#endregion
export { PredictionDetail, PredictionDetail as default };
