import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/pages/ContactUs.tsx
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
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.5rem;
`;
var EmailLink = Tt.a`
  display: inline-block;
  font-size: 1.15rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
`;
function ContactUs({ supportEmail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Contact Us" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Have a question, feedback, or need help with your account? Reach out and we'll get back to you." }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailLink, {
			href: `mailto:${supportEmail}`,
			children: supportEmail
		})
	] });
}
//#endregion
export { ContactUs as default };
