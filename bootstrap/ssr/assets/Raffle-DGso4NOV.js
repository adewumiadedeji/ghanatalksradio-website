import { o as __toESM } from "./rolldown-runtime-BMI-E3GI.js";
import { c as require_react, r as Tt, s as qt, t as require_jsx_runtime } from "./jsx-runtime-BjQWgNTJ.js";
import { t as Head_default } from "./index.esm-WJJ4XT9m.js";
import { n as GTR_AD_SLOTS, t as AdSlot } from "./AdSlot-BKXWXakb.js";
import { t as APP_LINKS } from "./footerLinks-CBwulu-M.js";
import { t as logo_default } from "./logo-BLzQFDMr.js";
//#region resources/js/components/AppDownloadModal.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var fadeIn = qt`
  from { opacity: 0; }
  to   { opacity: 1; }
`;
var slideUp = qt`
  from { opacity: 0; transform: translateY(28px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0)    scale(1);    }
`;
var Backdrop = Tt.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 17, 22, 0.72);
  backdrop-filter: blur(3px);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
var Panel = Tt.div`
  position: relative;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: 20px;
  box-shadow: 0 32px 80px rgba(15, 17, 22, 0.28);
  width: 100%;
  max-width: 440px;
  max-height: 90vh;
  overflow-y: auto;
  animation: ${slideUp} 0.26s cubic-bezier(0.34, 1.36, 0.64, 1);

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
`;
var Banner = Tt.div`
  background: ${({ theme }) => theme.colors.ink};
  border-radius: 20px 20px 0 0;
  padding: 2rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -60px;
    right: -40px;
    width: 200px;
    height: 200px;
    background: ${({ theme }) => theme.colors.gold};
    opacity: 0.08;
    border-radius: 50%;
  }
`;
var Logo = Tt.img`
  width: 48px;
  height: 48px;
  object-fit: contain;
  border-radius: 10px;
  position: relative;
  z-index: 1;
`;
var Headline = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: clamp(1.2rem, 4vw, 1.45rem);
  font-weight: 700;
  color: #fff;
  line-height: 1.25;
  margin: 0;
  position: relative;
  z-index: 1;
`;
var Sub = Tt.p`
  font-size: 0.87rem;
  color: rgba(255, 255, 255, 0.62);
  margin: 0;
  line-height: 1.5;
  position: relative;
  z-index: 1;
  max-width: 340px;
`;
var Body = Tt.div`
  padding: 1.5rem 1.75rem 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
var AppGrid = Tt.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
`;
var AppPill = Tt.a`
  display: flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.6rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  font-size: 0.78rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.ink};
  background: ${({ theme }) => theme.colors.background};
  transition: border-color 0.15s ease, background 0.15s ease;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    border-color: ${({ theme }) => theme.colors.gold};
    background: ${({ theme }) => theme.colors.goldTint};
    text-decoration: none;
  }
`;
var DismissBtn = Tt.button`
  border: none;
  background: ${({ theme }) => theme.colors.backgroundAlt};
  color: ${({ theme }) => theme.colors.inkMuted};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.65rem 1rem;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.borderStrong};
  }
`;
var CloseBtn = Tt.button`
  position: absolute;
  top: 0.85rem;
  right: 0.85rem;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.22);
    color: #fff;
  }
`;
/**
* Shared "this only works in the app" prompt — first used by the Raffle
* preview page (entering/paying only happens in the app), but written
* generically so any other web-only-preview interaction can reuse it with
* its own title/message.
*/
function AppDownloadModal({ open, onClose, title = "Get the app to enter", message = "Raffle entries and payments happen in the GhanaTalksRadio app. Download it free to enter this raffle and track your tickets." }) {
	(0, import_react.useEffect)(() => {
		if (!open) return;
		const handleKey = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handleKey);
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", handleKey);
			document.body.style.overflow = "";
		};
	}, [open, onClose]);
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Backdrop, {
		onClick: onClose,
		role: "dialog",
		"aria-modal": "true",
		"aria-label": title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			onClick: (e) => e.stopPropagation(),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Banner, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloseBtn, {
					type: "button",
					onClick: onClose,
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
						width: "12",
						height: "12",
						viewBox: "0 0 12 12",
						fill: "none",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M1 1L11 11M11 1L1 11",
							stroke: "currentColor",
							strokeWidth: "1.8",
							strokeLinecap: "round"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {
					src: logo_default,
					alt: "GhanaTalksRadio"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Headline, { children: title }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sub, { children: message })
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Body, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppGrid, { children: APP_LINKS.map(({ label, href, Icon }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppPill, {
				href,
				target: "_blank",
				rel: "noopener noreferrer",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 }), label]
			}, label)) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DismissBtn, {
				type: "button",
				onClick: onClose,
				children: "Maybe later"
			})] })]
		})
	});
}
//#endregion
//#region resources/js/pages/Raffle.tsx
var Header = Tt.div`
  margin-bottom: 2rem;
`;
var Eyebrow = Tt.div`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  margin-bottom: 0.4rem;
`;
var Title = Tt.h1`
  font-size: clamp(1.6rem, 4vw, 2.1rem);
  margin-bottom: 0.4rem;
`;
var Subtitle = Tt.p`
  color: ${({ theme }) => theme.colors.inkMuted};
  font-size: 0.95rem;
  margin: 0;
`;
var List = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
var Card = Tt.article`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
  padding: 1.75rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;
var PrizeBlock = Tt.div`
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
`;
var SponsorTag = Tt.span`
  font-family: ${({ theme }) => theme.font.mono};
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.goldDark};
  background: ${({ theme }) => theme.colors.goldTint};
  border-radius: ${({ theme }) => theme.radius.sm};
  padding: 0.25rem 0.55rem;
  width: fit-content;
`;
var Description = Tt.p`
  font-size: 0.88rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  margin: 0;
`;
var PrizeName = Tt.h2`
  font-family: ${({ theme }) => theme.font.display};
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0;
`;
var PrizeValue = Tt.span`
  font-size: 0.95rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.goldDark};
`;
var MetaRow = Tt.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem 1rem;
  font-size: 0.82rem;
  color: ${({ theme }) => theme.colors.inkMuted};
`;
var ActionBlock = Tt.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  flex-shrink: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-end;
  }
`;
var TicketPrice = Tt.span`
  font-size: 0.8rem;
  color: ${({ theme }) => theme.colors.inkFaint};
`;
var EnterButton = Tt.button`
  border: none;
  background: ${({ theme }) => theme.colors.gold};
  color: ${({ theme }) => theme.colors.ink};
  border-radius: ${({ theme }) => theme.radius.pill};
  padding: 0.7rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  white-space: nowrap;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(1.05);
  }
`;
var StateBox = Tt.div`
  text-align: center;
  padding: 3rem 1.5rem;
  color: ${({ theme }) => theme.colors.inkMuted};
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.md};
  box-shadow: ${({ theme }) => theme.shadow.sm};
`;
function secondsUntil(dateString) {
	const ms = new Date(dateString.replace(" ", "T")).getTime() - Date.now();
	return Math.max(0, Math.floor(ms / 1e3));
}
function formatTimeLeft(totalSeconds) {
	if (totalSeconds <= 0) return "Ended";
	const d = Math.floor(totalSeconds / 86400);
	const h = Math.floor(totalSeconds % 86400 / 3600);
	const m = Math.floor(totalSeconds % 3600 / 60);
	if (d > 0) return `${d}d ${h}h left`;
	if (h > 0) return `${h}h ${m}m left`;
	return `${m}m left`;
}
function RaffleCard({ raffle, onEnter }) {
	const [timeLeft, setTimeLeft] = (0, import_react.useState)(() => secondsUntil(raffle.entries_close_at));
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => setTimeLeft(secondsUntil(raffle.entries_close_at)), 1e3);
		return () => clearInterval(timer);
	}, [raffle.entries_close_at]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrizeBlock, { children: [
		raffle.sponsor && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SponsorTag, { children: ["Sponsored by ", raffle.sponsor.name] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrizeName, { children: raffle.name }),
		!!raffle.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, { children: raffle.description }),
		raffle.number_of_winners !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PrizeValue, { children: [raffle.number_of_winners, " winner(s)"] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetaRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTimeLeft(timeLeft) }) })
	] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ActionBlock, { children: [raffle.allow_free_entry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TicketPrice, { children: "Free to enter" }) : raffle.entry_price !== null && raffle.entry_currency ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TicketPrice, { children: [
		"Entry from ",
		raffle.entry_currency,
		" ",
		raffle.entry_price
	] }) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnterButton, {
		type: "button",
		onClick: onEnter,
		children: "Enter Raffle"
	})] })] });
}
/**
* Ported from the Vite SPA's src/pages/Raffle.tsx. Raffle list resolved
* server-side (RaffleController) instead of a react-query hook. Actually
* entering (and paying) only happens in the app, so "Enter Raffle" opens
* the app-download prompt instead of any web checkout flow - unchanged
* from the original.
*/
function Raffle({ raffles, isError }) {
	const [modalOpen, setModalOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Head_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("title", { children: "Raffle | GhanaTalksRadio" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("meta", {
			name: "description",
			content: "See this week's GhanaTalksRadio raffle prize and enter from the app."
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Header, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eyebrow, { children: "Win Big" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, { children: "Raffle" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Subtitle, { children: "Enter for a chance to win — raffle entries and payments happen in the GhanaTalksRadio app." })
		] }),
		isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, {
			role: "alert",
			children: "Couldn't load the current raffle. Try refreshing the page."
		}) : raffles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StateBox, { children: "No raffle running right now — check back soon." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, { children: raffles.map((raffle) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RaffleCard, {
			raffle,
			onEnter: () => setModalOpen(true)
		}, raffle.slug)) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppDownloadModal, {
			open: modalOpen,
			onClose: () => setModalOpen(false),
			title: "Get the app to enter",
			message: "Raffle entries and payments happen in the GhanaTalksRadio app. Download it free to enter and track your tickets."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdSlot, {
			format: "leaderboard",
			slotId: GTR_AD_SLOTS.horizontal
		})
	] });
}
//#endregion
export { Raffle, Raffle as default };
