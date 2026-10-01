import { r as Tt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
//#region resources/js/pages/AboutUs.tsx
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
  margin-bottom: 0.5rem;
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
var WebsiteLink = Tt.a`
  color: ${({ theme }) => theme.colors.gold ?? theme.colors.ink};
  font-weight: 700;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
function AboutUs({ supportEmail }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Article, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "About GhanaTalksRadio" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Ghana's Digital Radio and News Platform" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio is a Ghana-focused digital media and radio platform delivering news, live radio, music, talk programming, podcasts, sports, entertainment, technology, lifestyle content and public-interest stories to audiences in Ghana and around the world." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"Built around the principle of ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "giving the youth a voice" }),
				", GhanaTalksRadio provides a digital platform where news, ideas, conversations, culture and entertainment can reach audiences through radio, the web, mobile applications and digital media."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio operates as a digital-first media organization combining online radio broadcasting with digital journalism and on-demand content." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our History" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"GhanaTalksRadio's digital platform dates back to ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "2020" }),
				", when its mobile radio application was introduced to make live programming and digital content accessible to audiences beyond traditional radio."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"The GhanaTalksRadio mobile application was first released in",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: " May 2020" }),
				" and has subsequently evolved to support live radio, news, shows, catch-up programming, podcasts, entertainment and other digital features."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "The organization has continued to develop from an online radio service into a broader digital media platform, publishing original and curated news and information across multiple areas of public interest." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our evolution reflects a simple objective: to make credible information, meaningful conversation and engaging African content accessible wherever audiences are." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "What GhanaTalksRadio Does" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio operates at the intersection of radio, journalism, digital publishing and audience engagement." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Live digital radio broadcasting" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "News publishing" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Political and current-affairs coverage" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Sports reporting and commentary" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Entertainment and celebrity news" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Business and financial news" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Technology coverage" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Education reporting" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Health and public-interest information" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Lifestyle and culture content" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Podcasts and on-demand programmes" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Interviews and talk shows" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Music programming" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Digital audience engagement and interactive content" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our website serves as a continuously updated digital publication, while our radio service provides live programming and entertainment." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio also makes its content accessible through mobile applications, allowing listeners to follow live broadcasts and access selected programmes and content on demand." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Editorial Mission" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: ["GhanaTalksRadio exists to ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "inform, engage, entertain and give people a platform to be heard." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our editorial mission is built around providing timely information, meaningful conversation, useful context and engaging content to our audiences." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Inform:" }), " Provide timely news and information about developments affecting Ghanaian communities and audiences across Africa and the wider world."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Give People a Voice:" }), " Create space for young people and members of the public to participate in conversations about politics, society, culture, education, sports and everyday life."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Explain:" }), " Provide context that helps audiences understand why important events matter and how they affect communities."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Connect Ghana to the World:" }), " Keep Ghanaians and African audiences connected to developments, conversations, culture and entertainment from home."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Entertain:" }), " Provide music, podcasts, lifestyle programming, sports and entertainment as part of the overall GhanaTalksRadio experience."] })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Geographical Coverage" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"GhanaTalksRadio is primarily focused on ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Ghana" }),
				", with editorial coverage extending across the country's regions and communities."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our reporting includes national developments as well as stories originating from Accra and other parts of Ghana. Our international coverage includes major developments affecting Ghana, Africa and the global community, particularly where those developments are relevant to Ghanaian audiences." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Because GhanaTalksRadio is a digital platform, our content is accessible internationally. We serve both audiences in Ghana and Ghanaians and Africans living in the diaspora." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Radio Services" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio is a digital radio service providing live and on-demand audio programming." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Music" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Talk shows" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "News" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Current affairs" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Sports" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Entertainment" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Interviews" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Youth-focused programming" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Cultural programming" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListItem, { children: "Special broadcasts" })
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Listeners can access GhanaTalksRadio through the website and supported mobile applications. Our digital radio model allows audiences to listen from computers, smartphones and other connected devices." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "News Operation" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio operates a digital news publishing platform covering a broad range of subjects relevant to its audience." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "National News:" }), " Developments involving government, public institutions, communities and national affairs in Ghana."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Politics:" }), " Political developments, governance, elections, public policy, political parties and public officials."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Business & Finance:" }), " Economic developments, businesses, banking, consumer issues and economic policy."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "World News:" }), " Major international developments with relevance to Ghanaian, African and global audiences."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Sports:" }), " Football and other sports, including Ghanaian sports, international competitions and major sporting developments."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Entertainment:" }), " Music, film, television, celebrities, events and Ghanaian and African popular culture."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Technology:" }), " Digital technology, innovation, telecommunications, artificial intelligence and developments affecting the technology ecosystem."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Education:" }), " Schools, universities, educational policy, examinations, students and developments within the education sector."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Health:" }), " Public health, healthcare, medical developments and health-related issues of public interest."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Lifestyle & Culture:" }), " Stories covering society, relationships, food, culture, fashion, entertainment trends and everyday life."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Crime & Public Safety:" }), " Significant crime, law-enforcement and public-safety developments."] })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Editorial Independence" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: ["GhanaTalksRadio's editorial operation is guided by the principles of", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: " accuracy, fairness, accountability and public interest." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Editorial decisions should be based on the relevance and newsworthiness of information rather than political, commercial or personal interests." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Where a story involves allegations or disputed claims, GhanaTalksRadio seeks to distinguish allegations from established facts and, where appropriate, provide relevant responses or perspectives." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "When an error is identified, we seek to correct the record transparently and promptly." })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Editorial Policy" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio is committed to responsible digital journalism and maintains editorial standards designed to protect accuracy, fairness, public interest and audience trust." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(List, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Accuracy:" }), " We seek to verify information before publication and distinguish confirmed information from claims, allegations, opinions and speculation."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Fairness:" }), " Where a matter involves significant competing positions, we seek to represent relevant perspectives fairly."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Attribution:" }), " Information obtained from external sources should be appropriately attributed."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Public Interest:" }), " We prioritize information that is relevant to the lives, safety, rights, opportunities and interests of our audiences."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Corrections:" }), " Where a material factual error is identified, GhanaTalksRadio may amend the published material and, where appropriate, acknowledge the correction."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Privacy:" }), " Private individuals should not have their personal information unnecessarily exposed where there is no legitimate public-interest justification."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Source Protection:" }), " Journalistic sources may require confidentiality. Where confidentiality is granted, GhanaTalksRadio seeks to protect the identity of the source, subject to applicable law and editorial considerations."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Editorial and Commercial Separation:" }), " Commercial relationships should not determine the factual content or editorial conclusions of news reports."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "No Deliberate Misinformation:" }), " GhanaTalksRadio does not knowingly publish false information as fact."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ListItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "User-Generated Content:" }), " Comments, submissions, social-media posts and other audience contributions do not necessarily represent the views of GhanaTalksRadio."] })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Audience" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio serves a broad audience, with particular attention to young people, digitally connected audiences, radio listeners, news consumers and Ghanaians in the diaspora." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Our platform brings together radio listeners, readers, podcast audiences and digital communities through a single media ecosystem." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: ["The goal is not simply to publish content, but to create an environment where audiences can ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "listen, read, participate, discuss and stay informed." })] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Ownership & Company Information" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [
				"GhanaTalksRadio operates under ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Ghana Talks Radio LTD" }),
				", the organization identified as the developer and provider of the GhanaTalksRadio mobile application."
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "Ghana Talks Radio LTD operates in the radio and digital media space, with GhanaTalksRadio serving as its digital radio and media platform." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactBox, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Company:" }), " Ghana Talks Radio LTD"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Platform:" }), " GhanaTalksRadio"] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Website:" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLink, {
						href: "https://ghanatalksradio.com",
						target: "_blank",
						rel: "noopener noreferrer",
						children: "ghanatalksradio.com"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Email:" }),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailLink, {
						href: `mailto:${supportEmail}`,
						children: supportEmail
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Telephone:" }), " +44 7404 057874"] })
			] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Contact GhanaTalksRadio" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "We welcome enquiries from listeners, readers, journalists, organizations, businesses, media professionals and members of the public." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "For general enquiries, news tips, corrections, partnerships and media enquiries, please contact our team through the official contact channels." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactBox, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Email:" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmailLink, {
					href: `mailto:${supportEmail}`,
					children: supportEmail
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ContactItem, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Website:" }),
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WebsiteLink, {
					href: "https://ghanatalksradio.com",
					target: "_blank",
					rel: "noopener noreferrer",
					children: "www.ghanatalksradio.com"
				})
			] })] })
		] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubTitle, { children: "Our Commitment" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "GhanaTalksRadio will continue to invest in digital journalism, radio broadcasting, technology and audience engagement while maintaining our commitment to responsible publishing." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "We believe that media should inform people, encourage meaningful conversation, represent diverse perspectives and provide communities with a platform to be heard." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: "That is the purpose behind GhanaTalksRadio." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Body, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strong, { children: "Giving the youth a voice. Your voice. Your stories. Your station." }) })
		] })
	] });
}
//#endregion
export { AboutUs as default };
