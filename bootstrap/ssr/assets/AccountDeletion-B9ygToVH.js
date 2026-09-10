import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { n as Tt, s as require_react, t as require_jsx_runtime } from "./jsx-runtime-BC7GUiKv.js";
import { t as Link } from "./Link-W-JB9btq.js";
//#region resources/js/pages/AccountDeletion.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var Article = Tt.article`
  max-width: ${({ theme }) => theme.contentWidth};
  margin: 0 auto;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 2rem clamp(1.25rem, 4vw, 3rem) 2.5rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-radius: ${({ theme }) => theme.radius.sm};
  }
`;
var Title = Tt.h1`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  margin: 0 0 1rem;
`;
var Body = Tt.p`
  font-size: 1.02rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1rem;
`;
var List = Tt.ul`
  font-size: 1.02rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 2rem;
  padding-left: 1.25rem;
`;
var Form = Tt.form`
  max-width: 26rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
var Label = Tt.label`
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
`;
var Input = Tt.input`
  display: block;
  width: 100%;
  margin-top: 0.35rem;
  padding: 0.65rem 0.85rem;
  font-size: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.ink};
`;
var ConfirmLabel = Tt.label`
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.92rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var SubmitButton = Tt.button`
  align-self: flex-start;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  color: #ffffff;
  background: #b3261e;
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
var Message = Tt.p`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ $isError }) => $isError ? "#b3261e" : "#1b6b4a"};
`;
function AccountDeletion({ portalApiUrl }) {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [result, setResult] = (0, import_react.useState)(null);
	async function handleSubmit(event) {
		event.preventDefault();
		if (!confirmed || submitting) return;
		setSubmitting(true);
		setResult(null);
		try {
			const json = await (await fetch(`${portalApiUrl}/api/auth/delete-account`, {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json"
				},
				body: JSON.stringify({
					email,
					password
				})
			})).json();
			if (json.status) {
				setResult({
					success: true,
					message: json.message || "Your account has been deleted."
				});
				setEmail("");
				setPassword("");
				setConfirmed(false);
			} else setResult({
				success: false,
				message: json.message || "Something went wrong. Please try again."
			});
		} catch {
			setResult({
				success: false,
				message: "Network error - please check your connection and try again."
			});
		} finally {
			setSubmitting(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Delete Your Account" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Deleting your GhanaTalksRadio account is permanent and cannot be undone. This immediately removes:" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your account and login credentials" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Your listening history and points/leaderboard standing" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any saved preferences tied to your account" })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
			"Confirm your email and password below to delete your account right now. If you'd rather have our support team handle it, ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/contact-us",
				children: "contact us"
			}),
			" instead."
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form, {
			onSubmit: handleSubmit,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "email",
					children: "Email address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "email",
					type: "email",
					required: true,
					value: email,
					onChange: (e) => setEmail(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "password",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "password",
					type: "password",
					required: true,
					value: password,
					onChange: (e) => setPassword(e.target.value)
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ConfirmLabel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: confirmed,
					onChange: (e) => setConfirmed(e.target.checked)
				}), "I understand this is permanent and cannot be undone."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubmitButton, {
					type: "submit",
					disabled: !confirmed || submitting,
					children: submitting ? "Deleting…" : "Delete my account"
				}),
				result && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Message, {
					$isError: !result.success,
					children: result.message
				})
			]
		})
	] });
}
//#endregion
export { AccountDeletion as default };
