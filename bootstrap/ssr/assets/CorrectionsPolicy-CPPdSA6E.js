import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/pages/CorrectionsPolicy.tsx
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
var SubTitle = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.2rem, 2vw, 1.5rem);
  margin: 0 0 1rem;
  color: ${({ theme }) => theme.colors.ink};
`;
var Section = Tt.section`
  width: 100%;
  margin-bottom: 2rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
var Body = Tt.p`
  font-size: 1.05rem;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 1.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
var List = Tt.ol`
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var UnorderedList = Tt.ul`
  margin: 0 0 1.5rem;
  padding-left: 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var ListItem = Tt.li`
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: 0.65rem;
`;
var Strong = Tt.strong`
  color: ${({ theme }) => theme.colors.ink};
`;
var ContactBox = Tt.div`
  padding: 1.25rem;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.border ?? "#e5e5e5"};
  border-radius: ${({ theme }) => theme.radius.sm};
  background: ${({ theme }) => theme.colors.background ?? "#fafafa"};
`;
var ContactItem = Tt.p`
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0 0 0.65rem;

  &:last-child {
    margin-bottom: 0;
  }
`;
var EmailLink = Tt.a`
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
function CorrectionsPolicy({ supportEmail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Corrections Policy" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Commitment to Accuracy" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio is committed to providing accurate, responsible and trustworthy information to its audience." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Journalism is a human process and, despite reasonable efforts to verify information, errors can occasionally occur. When we identify a material factual error, we seek to correct the published record promptly and transparently." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our corrections policy explains how GhanaTalksRadio handles factual errors, corrections, clarifications and complaints relating to published editorial content." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "What We Correct" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "We may correct errors that materially affect the accuracy or understanding of published content." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnorderedList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect names or identities" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect dates or locations" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect figures or statistics" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect quotations" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect descriptions of events" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Incorrect attribution of information" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Material factual errors" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Misleading factual statements" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Minor spelling, punctuation, formatting or grammatical errors that do not materially change the meaning of an article may be corrected without a formal correction notice." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Corrections vs. Clarifications" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"A ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "correction" }),
				" is appropriate when published information contains a material factual error."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"A ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "clarification" }),
				" may be used where the information is substantially accurate but could reasonably be misunderstood because of wording, context or presentation."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "In either case, our objective is to ensure that the published information accurately communicates the available facts." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "How to Request a Correction" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Anyone who identifies a potential factual error in content published by GhanaTalksRadio may contact our editorial team." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "To help us investigate a correction request efficiently, please provide:" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnorderedList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "The title or headline of the article or programme concerned." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "The URL of the published article where available." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "A clear description of the alleged error." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "The specific information that you believe is incorrect." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "The correct information and supporting evidence where available." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Your contact information in case additional clarification is required." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "How We Review Correction Requests" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Correction requests are reviewed based on the available evidence and the editorial circumstances surrounding the publication." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "We identify the specific claim or information alleged to be incorrect." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "We review the original publication and the available source material." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Where appropriate, we seek additional information or clarification from relevant sources." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "We determine whether the issue represents a factual error, clarification issue, editorial disagreement or another matter." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Where a material error is confirmed, we make an appropriate correction to the published content." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Evidence and Supporting Information" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Correction requests should, where possible, be supported by reliable evidence." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Depending on the subject matter, useful evidence may include official documents, statements from relevant authorities, verified records, direct documentation or other credible sources." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "A disagreement with the opinion, tone or editorial judgment of an article does not necessarily constitute a factual error." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "When a Correction Is Made" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "When a material factual error is confirmed, GhanaTalksRadio may correct the relevant portion of the article while preserving the integrity and context of the original report." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where appropriate, a correction notice may be added to the article to explain what was corrected." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "The nature of the correction will depend on the significance of the error and the circumstances in which it occurred." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Significant Errors" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Particularly significant errors may require more prominent correction or clarification." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Examples may include errors that materially change the meaning of a story, incorrectly identify a person, incorrectly attribute serious allegations, significantly misstate financial or statistical information, or materially misrepresent an event." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Headlines and Social Media" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Corrections may also be necessary where an error appears in a headline, caption, image description, social-media post or other distribution format." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where a material error has been distributed through our digital channels, we may update the relevant content or distribution material to reflect the correction." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Archived and Previously Published Content" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Older articles may remain accessible as part of the historical record. Where a material factual error is identified in previously published content, we may update the article and provide an appropriate correction or clarification." })] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "What Is Not Normally a Correction" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Not every complaint about published content represents a factual error." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(UnorderedList, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Disagreement with an editorial opinion is not necessarily a factual error." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Disagreement with the prominence or placement of a story is not necessarily a factual error." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Disagreement with a political or social position expressed by a quoted source is not necessarily a factual error." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Requests to remove accurate information solely because it is inconvenient may not qualify as correction requests." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Right of Reply" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where a published report contains significant allegations or claims concerning an individual or organization, GhanaTalksRadio may provide an appropriate opportunity for a response where editorially justified." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "A response or right of reply does not necessarily mean that the original report was factually incorrect." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Editorial Responsibility" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio takes responsibility for the accuracy and integrity of content published through its editorial platforms." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "We encourage readers, listeners and members of the public to bring potential errors to our attention. Constructive feedback helps us improve the quality and reliability of our journalism." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Contact Us About a Correction" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "To report a potential factual error or request a correction, please contact the GhanaTalksRadio editorial team." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactBox, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Email:" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailLink, {
					href: `mailto:${supportEmail}`,
					children: supportEmail
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, { children: "Please include the article title, URL, specific error and any supporting evidence available." })] })
		] })
	] });
}
//#endregion
export { CorrectionsPolicy as default };
