import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/pages/EditorialPolicy.tsx
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
var List = Tt.ul`
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
function EditorialPolicy({ supportEmail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Editorial Policy" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Editorial Standards" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio is committed to responsible journalism and the publication of accurate, fair, relevant and trustworthy information. Our editorial policy establishes the principles that guide our news reporting, digital publishing, interviews, broadcasts and other editorial activities." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"Our editorial work is guided by the principles of",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "accuracy, fairness, independence, accountability, transparency and public interest." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Editorial Mission" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio exists to inform, engage, entertain and give people a platform to be heard." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "We seek to provide audiences with reliable information while creating space for meaningful conversations about Ghana, Africa and the wider world." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our editorial decisions are intended to serve our audience and the public interest rather than political, commercial or personal interests." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Accuracy and Verification" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Accuracy is fundamental to our journalism. We seek to verify information before publication and take reasonable steps to establish the reliability of significant claims." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "We seek to use credible and identifiable sources whenever possible." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Important claims should be checked against available evidence or reliable sources before publication." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Information obtained from social media should not automatically be treated as verified information." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Anonymous or unnamed sources may be used when there is a legitimate editorial reason to protect the source's identity." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Where information cannot be independently verified, the published report should make that limitation clear where appropriate." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Fairness and Balance" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio seeks to report matters fairly and without deliberately misleading its audience." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where a story involves significant competing claims, disputes or allegations, we seek to provide relevant perspectives and give affected parties a reasonable opportunity to respond where appropriate." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Allegations should not be presented as established facts. Editorial language should distinguish between what is confirmed, what is alleged and what remains uncertain." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Sources and Attribution" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio recognizes the importance of identifying the origin of information." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Information from official institutions should be appropriately attributed." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Statements and opinions should be attributed to the individuals or organizations expressing them." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Information obtained from other media organizations should be appropriately credited where applicable." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "User-generated content and social-media material should be identified appropriately when used in editorial reporting." })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Editorial Independence" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio maintains a separation between editorial decision making and commercial interests." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Advertising, sponsorship, partnerships or other commercial relationships should not determine the factual conclusions, editorial positions or newsworthiness of a story." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Editorial staff and contributors are expected to exercise independent judgment when determining what information should be published." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Public Interest" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Public interest is an important consideration in determining what we report and how we report it." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Public-interest journalism may include reporting on government, governance, public spending, elections, crime, public safety, business, health, education, corruption, environmental matters and other issues that materially affect communities." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Public interest should, however, be distinguished from simple public curiosity. Personal information should not be published merely because it may attract attention." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Privacy and Personal Information" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio respects individual privacy and seeks to avoid the unnecessary publication of private or sensitive personal information." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Information concerning private individuals should only be published where there is a legitimate editorial or public-interest reason." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Particular care should be exercised when reporting on children, victims of crime, vulnerable individuals and people who may be at heightened risk from the disclosure of personal information." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Reporting Allegations and Crime" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Allegations of criminal, unethical or improper conduct should be clearly identified as allegations unless the matter has been established through reliable evidence or an appropriate legal determination." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Being arrested, questioned, accused or charged does not by itself establish guilt. Reports should distinguish allegations from established facts." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where appropriate, GhanaTalksRadio may seek responses from people or organizations named in significant allegations." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Use of Social Media and User-Generated Content" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Social media is an important source of information and audience engagement, but content published on social platforms is not automatically considered verified." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Before relying on social-media content as a significant part of a news report, we seek to establish its authenticity and context where reasonably possible." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Comments, submissions, social-media posts and other audience contributions do not necessarily represent the views of GhanaTalksRadio." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Artificial Intelligence and Digital Tools" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Digital tools, including artificial intelligence technologies, may be used to assist with research, transcription, translation, editing, content organization and other production tasks." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Technology does not replace editorial responsibility. Human editorial judgment remains responsible for the accuracy, appropriateness and integrity of published material." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "AI-generated or automatically produced information should not be treated as inherently accurate and should be reviewed appropriately before publication." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Conflicts of Interest" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Editorial contributors should avoid conflicts of interest that could compromise, or reasonably appear to compromise, their independence." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where a significant conflict is unavoidable and materially relevant to a story, appropriate disclosure may be made." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Corrections and Accountability" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio recognizes that mistakes can occur in journalism. When a material factual error is identified, we seek to correct the published record promptly and transparently." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"Our correction process is described in our",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Corrections Policy" }),
				"."
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Editorial Responsibility" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Everyone involved in the creation and publication of editorial content is expected to exercise reasonable care and professional judgment." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Ultimately, GhanaTalksRadio remains responsible for the editorial integrity of content published through its platforms." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Contact the Editorial Team" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Questions, concerns, corrections and feedback concerning our editorial practices are welcome." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactBox, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Email:" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailLink, {
					href: `mailto:${supportEmail}`,
					children: supportEmail
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContactItem, { children: "Please include the relevant article, programme or editorial matter when contacting us about a specific publication." })] })
		] })
	] });
}
//#endregion
export { EditorialPolicy as default };
