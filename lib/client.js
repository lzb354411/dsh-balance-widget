window.__ModuleLoader__.load({
	id: "dsh-balance-widget",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let react_dom = require("react-dom");
		let _deepseek_ai_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
		/**
		* Glyph of the popover's refresh button. DSH 0.1.7 renamed product icons to
		* size-neutral weights (`IconRefreshOutlineRegular` plus a `size` prop —
		* primitives README, decision 2026-09-16); 0.1.5 exported only the
		* artboard-sized `IconRefreshOutline14`. Resolve once and fall back to a
		* local glyph: rendering `undefined` as a component throws React #130, and
		* the slot answers by dropping the whole card.
		*/
		const RefreshGlyph = [
			_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineRegular,
			_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutlineMedium,
			_deepseek_ai_dsh_client_ui_primitives.IconRefreshOutline14
		].find((glyph) => typeof glyph === "function" || typeof glyph === "object" && glyph !== null);
		/** Refresh glyph element, stroke-matched to the card's own 16px icon. */
		function refreshGlyph() {
			if (RefreshGlyph !== void 0) return (0, react_jsx_runtime.jsx)(RefreshGlyph, {
				size: 14
			});
			return (0, react_jsx_runtime.jsxs)("svg", {
				width: 14,
				height: 14,
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: 1.7,
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [(0, react_jsx_runtime.jsx)("polyline", {
					points: "23 4 23 10 17 10"
				}), (0, react_jsx_runtime.jsx)("path", {
					d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10"
				})]
			});
		}
		//#region lib/types/client/styles.js
		/**
		* Card + popover styles. The card is a frame-wide floating surface now, so it
		* carries its own opaque surface and shadow (it sits over arbitrary page
		* content), keeps its own fixed width (the remembered place and the popover
		* width must not jump while the numbers change length), and offers a grab
		* cursor as its drag affordance.
		*/
		const css = ".dshbw_card{position:fixed;z-index:55;box-sizing:border-box;touch-action:none;-webkit-user-select:none;user-select:none;display:flex;flex-direction:column;gap:4px;width:208px;max-width:calc(100% - 16px);box-sizing:border-box;padding:7px 9px;border:1px solid var(--dsw-alias-border-l2);border-radius:12px;background:var(--dsw-alias-bg-layer-3);color:var(--dsw-alias-label-primary);cursor:grab;font-family:inherit;text-align:left;box-shadow:var(--dsw-shadow-lv3,0 0 1px 0 #0003,0 0 4px 0 #00000005,0 12px 32px 0 #00000014);transition:transform 120ms cubic-bezier(0.23,1,0.32,1),background 120ms cubic-bezier(0.23,1,0.32,1),border-color 120ms cubic-bezier(0.23,1,0.32,1)}.dshbw_card:hover{background:var(--dsw-alias-interactive-bg-hover)}.dshbw_card:not([data-dragging=\"true\"]):active{transform:scale(.98)}.dshbw_card[data-dragging=\"true\"],.dshbw_card:active{cursor:grabbing}.dshbw_cardTop{display:flex;align-items:center;justify-content:space-between;gap:8px;font-size:14px;line-height:20px}.dshbw_cardAmount{font-weight:600;display:inline-flex;align-items:center}.dshbw_cardAmount[data-level=\"1\"]{color:var(--dsw-alias-state-warn-primary);font-weight:600}.dshbw_cardAmount[data-level=\"2\"]{color:var(--dsw-alias-state-error-primary)}.dshbw_cardFoot{display:flex;justify-content:space-between;font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary)}.dshbw_cardAmount::before{content:\"\";display:none;width:6px;height:6px;border-radius:50%;margin-right:6px;vertical-align:middle}.dshbw_card[data-peak=\"true\"] .dshbw_cardAmount::before{display:inline-block;background:var(--dsw-alias-state-warn-primary)}.dshbw_card[data-peak=\"false\"] .dshbw_cardAmount::before{display:inline-block;background:var(--dsw-alias-state-success-primary)}.dshbw_ico{color:var(--dsw-alias-state-business-primary);display:inline-flex;align-items:center}.dshbw_row{display:flex;justify-content:space-between;align-items:center;gap:12px;padding:2px 0}.dshbw_label{display:inline-flex;align-items:center;min-width:0}.dshbw_val{font-weight:600;color:var(--dsw-alias-label-primary)}.dshbw_val[data-tier=\"sec\"]{font-weight:400;color:var(--dsw-alias-label-secondary)}.dshbw_val[data-tier=\"ter\"]{font-weight:400;color:var(--dsw-alias-label-tertiary)}.dshbw_val[data-level=\"1\"]{color:var(--dsw-alias-state-warn-primary)}.dshbw_val[data-level=\"2\"]{color:var(--dsw-alias-state-error-primary)}.dshbw_err{color:var(--dsw-alias-state-error-primary);font-size:12px;line-height:16px;margin-top:6px}.dshbw_link{background:none;border:none;cursor:pointer;color:var(--dsw-alias-state-business-primary);display:inline-flex;align-items:center;gap:4px;padding:2px 6px;border-radius:6px;font-size:12px;line-height:18px;font-family:inherit;text-decoration:none}.dshbw_link:hover{color:var(--dsw-alias-state-business-primary);text-decoration:underline}.dshbw_sidePop{position:fixed;z-index:70;box-sizing:border-box;min-width:240px;max-width:calc(100% - 16px);max-height:calc(100% - 16px);overflow:auto;background:var(--dsw-alias-bg-layer-3);border:1px solid var(--dsw-alias-border-l2);border-radius:12px;box-shadow:var(--dsw-shadow-lv3,0 0 1px 0 #0003,0 0 4px 0 #00000005,0 12px 32px 0 #00000014);padding:12px 12px;font-size:13px;line-height:20px;color:var(--dsw-alias-label-primary);animation:dshbw-pop-in 160ms cubic-bezier(0.23,1,0.32,1) backwards}.dshbw_sidePopHead{display:flex;align-items:center;justify-content:space-between;margin-bottom:6px}.dshbw_sidePopTitle{font-weight:600}.dshbw_sidePopClose{background:none;border:none;cursor:pointer;color:var(--dsw-alias-label-tertiary);font-size:16px;line-height:1;padding:0 2px;font-family:inherit}.dshbw_sidePopClose:hover{color:var(--dsw-alias-label-primary)}.dshbw_sidePopFoot{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:10px}.dshbw_sidePopRefresh{background:none;border:1px solid var(--dsw-alias-border-l2);cursor:pointer;color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;justify-content:center;width:22px;height:22px;border-radius:6px;padding:0;font-family:inherit}.dshbw_sidePopRefresh:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}.dshbw_popReset{background:none;border:1px solid var(--dsw-alias-border-l2);cursor:pointer;color:var(--dsw-alias-label-secondary);display:inline-flex;align-items:center;gap:4px;padding:2px 7px;border-radius:6px;font-size:12px;line-height:18px;font-family:inherit}.dshbw_popReset:hover{color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-border-l3);background:var(--dsw-alias-interactive-bg-hover)}.dshbw_peakTag{display:inline-flex;align-items:center;gap:4px;font-size:12px;line-height:16px;padding:1px 7px;border-radius:6px}.dshbw_peakTag[data-peak=\"true\"]{color:var(--dsw-alias-state-warn-primary);background:var(--dsw-alias-state-warn-tertiary)}.dshbw_peakTag[data-peak=\"false\"]{color:var(--dsw-alias-state-success-primary);background:var(--dsw-alias-state-success-tertiary)}.dshbw_sessionNote{display:flex;align-items:center;gap:4px;margin-top:6px;padding-top:6px;border-top:1px solid var(--dsw-alias-border-l1);font-size:12px;line-height:16px;color:var(--dsw-alias-label-tertiary);min-width:0}.dshbw_sessionName{max-width:140px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@keyframes dshbw-pop-in{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:translateY(0)}}.dshbw_sidePopRefresh,.dshbw_sidePopClose,.dshbw_popReset{transition:transform 120ms cubic-bezier(0.23,1,0.32,1),color 120ms cubic-bezier(0.23,1,0.32,1),border-color 120ms cubic-bezier(0.23,1,0.32,1)}.dshbw_sidePopRefresh:active,.dshbw_sidePopClose:active,.dshbw_popReset:active{transform:scale(.92)}.dshbw_card:focus-visible,.dshbw_link:focus-visible,.dshbw_sidePopClose:focus-visible,.dshbw_sidePopRefresh:focus-visible,.dshbw_popReset:focus-visible{outline:var(--dsw-focus-ring-width,2px) solid var(--dsw-focus-ring-color,var(--dsw-alias-state-business-primary));outline-offset:-2px}@media (prefers-reduced-motion:reduce){.dshbw_card,.dshbw_sidePopRefresh,.dshbw_sidePopClose,.dshbw_popReset{transition:none}.dshbw_sidePop{animation:none}}";
		const tagId = "dsh-balance-widget/styles.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "dsh-balance-widget";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var styles = {
			"card": "dshbw_card",
			"cardTop": "dshbw_cardTop",
			"cardAmount": "dshbw_cardAmount",
			"cardFoot": "dshbw_cardFoot",
			"ico": "dshbw_ico",
			"row": "dshbw_row",
			"label": "dshbw_label",
			"val": "dshbw_val",
			"err": "dshbw_err",
			"link": "dshbw_link",
			"sidePop": "dshbw_sidePop",
			"sidePopHead": "dshbw_sidePopHead",
			"sidePopTitle": "dshbw_sidePopTitle",
			"sidePopClose": "dshbw_sidePopClose",
			"sidePopFoot": "dshbw_sidePopFoot",
			"sidePopRefresh": "dshbw_sidePopRefresh",
			"popReset": "dshbw_popReset",
			"peakTag": "dshbw_peakTag",
			"sessionNote": "dshbw_sessionNote",
			"sessionName": "dshbw_sessionName"
		};
		//#endregion
		/** Format a CNY amount: ¥ + 3 significant decimals (drop trailing zeros). */
		function formatCny(value) {
			if (value === void 0 || value === null || !Number.isFinite(value)) return "—";
			const rounded = Math.round(value * 1e4) / 1e4;
			return `¥${rounded.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: 4 })}`;
		}
		/**
		* Compact CNY for the collapsed card's foot row: keeps at most 1 decimal
		* (2 decimals below ¥10) so "今日 ¥1.2 · 累计 ¥82.8" fits one line.
		*/
		function shortCny(value) {
			if (value === void 0 || value === null || !Number.isFinite(value)) return "—";
			const digits = Math.abs(value) >= 10 ? 1 : 2;
			return `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: 0, maximumFractionDigits: digits })}`;
		}
		//#endregion
		//#region lib/types/client/balance-api.js
		/** Same-origin balance route (host half registers it over ctx.webServer). */
		const BALANCE_ROUTE = "/api/dsh-balance/balance";
		/** Same-origin cost routes. */
		const LAST_COST_ROUTE = "/api/dsh-balance/last-cost";
		const TODAY_COST_ROUTE = "/api/dsh-balance/today-cost";
		const ACTIVE_COST_ROUTE = "/api/dsh-balance/active-cost";
		const TOTAL_COST_ROUTE = "/api/dsh-balance/total-cost";
		/** Official DeepSeek platform top-up page (opens in a new tab). */
		const TOP_UP_URL = "https://platform.deepseek.com/top_up";
		/**
		* Fetch the active session's costs (last prompt + today's session total).
		* @param {string} [sessionId] - the currently selected session; when omitted
		*   the host falls back to its most recently active session.
		* @returns { ok, lastPrompt?, todaySession?, sessionTitle?, workspaceName?, peak?, error? }
		*/
		async function fetchActiveCost(sessionId) {
			try {
				const url = sessionId === void 0 || sessionId === ""
					? ACTIVE_COST_ROUTE
					: `${ACTIVE_COST_ROUTE}?session=${encodeURIComponent(sessionId)}`;
				const response = await fetch(url, { headers: { accept: "application/json" } });
				const payload = await response.json().catch(() => ({}));
				if (!response.ok) return { ok: false, error: payload.error ?? `active-cost responded ${response.status}` };
				return {
					ok: true,
					lastPrompt: payload.lastPrompt?.cost ?? 0,
					todaySession: payload.todaySession?.cost ?? 0,
					sessionTitle: payload.title,
					workspaceName: payload.workspaceName,
					cwd: payload.cwd,
					sessionId: payload.sessionId,
					peak: payload.peak
				};
			} catch (error) {
				return { ok: false, error: error instanceof Error ? error.message : String(error) };
			}
		}
		/**
		* Fetch the account balance from the host proxy.
		* @returns { ok, balanceInfos?, modelId?, error? }
		*/
		async function fetchBalance() {
			try {
				const response = await fetch(BALANCE_ROUTE, { headers: { accept: "application/json" } });
				if (!response.ok) {
					let detail = "";
					try {
						detail = (await response.json()).error ?? "";
					} catch (_error) {
						/* ignore body parse failure */
					}
					return { ok: false, error: detail || `balance endpoint responded ${response.status}` };
				}
				const payload = await response.json();
				if (payload.ok === false) return { ok: false, error: payload.error ?? "unknown balance error" };
				return {
					ok: true,
					balanceInfos: payload.balance_infos ?? [],
					modelId: payload.modelId,
					lowThreshold: payload.lowThreshold,
					criticalThreshold: payload.criticalThreshold
				};
			} catch (error) {
				return { ok: false, error: error instanceof Error ? error.message : String(error) };
			}
		}
		/**
		* Fetch a cost figure from the host (last turn or today's total).
		* @param {string} route - LAST_COST_ROUTE or TODAY_COST_ROUTE.
		* @param {string} [sessionId] - required for last-cost.
		* @returns { ok, cost?, inputTokens?, outputTokens?, error? }
		*/
		async function fetchCost(route, sessionId) {
			try {
				const url = sessionId === void 0 || sessionId === ""
					? route
					: `${route}?session=${encodeURIComponent(sessionId)}`;
				const response = await fetch(url, { headers: { accept: "application/json" } });
				const payload = await response.json().catch(() => ({}));
				if (!response.ok) return { ok: false, error: payload.error ?? `cost endpoint responded ${response.status}` };
				return { ok: true, cost: payload.cost ?? 0, inputTokens: payload.inputTokens ?? 0, outputTokens: payload.outputTokens ?? 0 };
			} catch (error) {
				return { ok: false, error: error instanceof Error ? error.message : String(error) };
			}
		}
		/**
		* Fetch the all-time cumulative cost across every session on record.
		* @returns { ok, cost?, earliestDay?, error? }
		*/
		async function fetchTotalCost() {
			try {
				const response = await fetch(TOTAL_COST_ROUTE, { headers: { accept: "application/json" } });
				const payload = await response.json().catch(() => ({}));
				if (!response.ok) return { ok: false, error: payload.error ?? `total-cost responded ${response.status}` };
				return { ok: true, cost: payload.cost ?? 0, earliestDay: payload.earliestDay };
			} catch (error) {
				return { ok: false, error: error instanceof Error ? error.message : String(error) };
			}
		}
		/** Pick the display balance from balance_infos (prefer CNY, else first). */
		function displayBalance(balanceInfos) {
			if (!Array.isArray(balanceInfos) || balanceInfos.length === 0) return null;
			const cny = balanceInfos.find((entry) => (entry.currency ?? "").toUpperCase() === "CNY");
			const entry = cny ?? balanceInfos[0];
			const total = Number(entry.total_balance);
			if (!Number.isFinite(total)) return null;
			const symbol = (entry.currency ?? "").toUpperCase() === "CNY" ? "¥" : (entry.currency ?? "") + " ";
			return { symbol, total, currency: entry.currency };
		}
		//#endregion
		//#region lib/types/client/ExplainIcon.js
		/**
		* A small ⓘ marker with a hover tooltip explaining a term. Wraps the
		* official DSH Tooltip so the popover stays visually consistent.
		* @param {Object} props - label (tooltip text), t (locale).
		*/
		function ExplainIcon({ label, t }) {
			return (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
				label: label,
				side: "top",
				delayMs: 300,
				children: (0, react_jsx_runtime.jsx)("span", {
					role: "img",
					"aria-label": t("explain.aria"),
					style: { cursor: "help", color: "var(--dsw-alias-label-tertiary)", marginLeft: 3, fontSize: 11, lineHeight: 1 },
					children: (0, react_jsx_runtime.jsx)("span", {
						children: "ⓘ"
					})
				})
			});
		}
		//#endregion
		//#region lib/types/client/placement.js
		/**
		* Remembered place of the floating card.
		*
		* Stored shape: `{ anchorX: "left" | "right", fx: number, fy: number }`.
		* The card is pinned to the *horizontal edge it was dropped nearest* and to
		* the top edge, and `f` carries a fraction of the free space along each
		* axis. Anchoring to an edge means a card parked on the right stays on the
		* right when the window grows, while the fraction reproduces the rough
		* position at any window size — the user chose proportional memory over
		* pixel-exact memory (SPEC F5 / PLAN), because a page reload must land
		* within the visible area at whatever size the window comes back.
		*/
		const POSITION_KEY = "dsh-balance-widget:position:v1";
		/** Gap kept between a clamped card and the viewport edge, in px. */
		const EDGE_MARGIN = 8;
		/** Pointer travel before a press counts as a drag instead of a click. */
		const DRAG_THRESHOLD = 4;
		/** Default place: bottom-right, the corner the card used to live in. */
		const DEFAULT_PLACE = { anchorX: "right", fx: 1, fy: 1 };
		/**
		* Clamp into the 0..1 range, treating a non-finite input as 0.
		*
		* The finite check is not decoration: `NaN < 0` and `NaN > 1` are both
		* false, so a naive two-comparison clamp passes `NaN` straight through. A
		* NaN fraction would then reach the inline style as `NaNpx` and take the
		* card off the screen for the rest of the session (a reload would heal it,
		* because `readPlace` rejects non-finite stored values) — cheap to prevent
		* here, and a pointer event with no coordinates is exactly how NaN arrives.
		*/
		function clamp01(value) {
			if (!Number.isFinite(value)) return 0;
			return value < 0 ? 0 : value > 1 ? 1 : value;
		}
		/**
		* Read the remembered place. Any malformed or unreadable payload falls back
		* to the default — `localStorage` throws outright in some privacy modes, and
		* a partially written value must never leave the card unplaceable.
		*/
		function readPlace() {
			try {
				const raw = window.localStorage.getItem(POSITION_KEY);
				if (raw === null || raw === "") return { ...DEFAULT_PLACE };
				const parsed = JSON.parse(raw);
				if (parsed === null || typeof parsed !== "object") return { ...DEFAULT_PLACE };
				const fx = Number(parsed.fx);
				const fy = Number(parsed.fy);
				return {
					anchorX: parsed.anchorX === "left" ? "left" : "right",
					fx: Number.isFinite(fx) ? clamp01(fx) : DEFAULT_PLACE.fx,
					fy: Number.isFinite(fy) ? clamp01(fy) : DEFAULT_PLACE.fy
				};
			} catch (error) {
				return { ...DEFAULT_PLACE };
			}
		}
		/** Persist the place; an unavailable storage just makes the card forgetful. */
		function writePlace(place) {
			try {
				window.localStorage.setItem(POSITION_KEY, JSON.stringify(place));
			} catch (error) {
				/* storage unavailable: the card still works, it only forgets its place */
			}
		}
		/** Drop the remembered place, so the next read lands on the default. */
		function clearPlace() {
			try {
				window.localStorage.removeItem(POSITION_KEY);
			} catch (error) {
				/* storage unavailable — nothing to clear */
			}
		}
		/**
		* The span of valid top-left coordinates along one axis, given the card's own
		* size and the viewport. When the card is larger than the viewport on that
		* axis the span collapses to a single value instead of reporting an inverted
		* range, which is what keeps a big card from oscillating between two edges
		* (the same guard kelues/deepseek-pet, dsh-token-pet and dsh-whale-pet all
		* carry — see REFERENCES R7).
		*/
		function freeSpan(viewportSize, cardSize) {
			const max = viewportSize - cardSize - EDGE_MARGIN;
			if (!Number.isFinite(max) || max <= EDGE_MARGIN) return { min: EDGE_MARGIN, max: EDGE_MARGIN, collapsed: true };
			return { min: EDGE_MARGIN, max, collapsed: false };
		}
		/** Viewport top-left corner for a place, clamped into the allowed area. */
		function placeToPoint(place, size, viewport) {
			const spanX = freeSpan(viewport.width, size.width);
			const spanY = freeSpan(viewport.height, size.height);
			return {
				x: spanX.collapsed ? spanX.min : clamp01(place.fx) * (spanX.max - spanX.min) + spanX.min,
				y: spanY.collapsed ? spanY.min : clamp01(place.fy) * (spanY.max - spanY.min) + spanY.min
			};
		}
		/** The place a viewport top-left corner implies — the inverse of placeToPoint. */
		function pointToPlace(x, y, size, viewport) {
			const spanX = freeSpan(viewport.width, size.width);
			const spanY = freeSpan(viewport.height, size.height);
			const clampedX = Math.min(Math.max(x, spanX.min), spanX.max);
			const clampedY = Math.min(Math.max(y, spanY.min), spanY.max);
			const ratio = (value, span) => span.collapsed ? 0 : clamp01((value - span.min) / (span.max - span.min));
			// Anchor by which half the card sits in: a card mostly on the right edge
			// stays on the right when the window grows, instead of drifting to the
			// middle with it.
			const middle = spanX.min + (spanX.max - spanX.min) / 2;
			return {
				anchorX: clampedX >= middle ? "right" : "left",
				fx: ratio(clampedX, spanX),
				fy: ratio(clampedY, spanY)
			};
		}
		/**
		* Inline style for the card. Only the anchoring horizontal edge is set, so
		* the opposite side stays auto; `placeStyle` deliberately does not set both,
		* since a browser resolves a pair of `left`+`right` on a fixed element by
		* ignoring `right`.
		*/
		function placeStyle(point, place, size, viewport) {
			const style = { top: `${Math.round(point.y)}px` };
			if (place.anchorX === "right") style.right = `${Math.round(viewport.width - size.width - point.x)}px`;
			else style.left = `${Math.round(point.x)}px`;
			return style;
		}
		/**
		* The viewport a `position: fixed` element actually lives in, in CSS px.
		*
		* `window.innerWidth/innerHeight` include the classic scrollbars, but the
		* containing block of a fixed element — and the coordinate space
		* `getBoundingClientRect()` reports in — is the *layout* viewport, which
		* excludes them. Mixing the two silently shifts every right-anchored
		* position by the scrollbar width, and because a drag reads the element's
		* rect back and re-derives the place from it, that shift is applied again
		* on every pointerup: a card on a scrolling host drifts sideways and can
		* end up hanging over the edge. `document.documentElement.clientWidth`
		* reports the layout viewport, so the whole feature measures one space.
		* (Found by the independent verifier; see verify/REPORT.md D1.)
		*/
		function layoutViewport() {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			};
		}
		//#endregion
		//#region lib/types/client/balance-card.js
		/**
		* Frame-wide floating balance card.
		*
		* Same figures as the old sidebar-foot card, but mounted in the shell's
		* `shell.overlay` layer and portalled to `document.body`, so it floats above
		* every column and can be dragged anywhere (SPEC F1–F3). The card keeps its
		* own 208px width on purpose: a width that tracked its contents would move
		* the remembered place and jitter the popover whenever a number changed
		* length.
		*
		* Root-scoped: it fetches the balance itself, refreshes every 60s, and
		* remembers its place in localStorage. Nothing here depends on the session
		* list beyond the optional `useSessions` seat the shell hands every entry.
		* @param {Object} props - t (locale), useSessions (standard slot prop).
		*/
		function FloatingBalanceCard({ t, useSessions }) {
			const [open, setOpen] = (0, react.useState)(false);
			const [balance, setBalance] = (0, react.useState)(null);
			const [lastPrompt, setLastPrompt] = (0, react.useState)(null);
			const [todaySession, setTodaySession] = (0, react.useState)(null);
			const [sessionTitle, setSessionTitle] = (0, react.useState)(null);
			const [todayWs, setTodayWs] = (0, react.useState)(null);
			const [todayAll, setTodayAll] = (0, react.useState)(null);
			const [totalAll, setTotalAll] = (0, react.useState)(null);
			const [totalEarliestDay, setTotalEarliestDay] = (0, react.useState)(null);
			const [lowThreshold, setLowThreshold] = (0, react.useState)(5);
			const [criticalThreshold, setCriticalThreshold] = (0, react.useState)(1);
			const [error, setError] = (0, react.useState)(null);
			const [loading, setLoading] = (0, react.useState)(false);
			const [peak, setPeak] = (0, react.useState)(null);
			const [place, setPlace] = (0, react.useState)(() => readPlace());
			/** Card size, measured from the DOM — the placement math needs real px. */
			const [size, setSize] = (0, react.useState)(null);
			const [viewport, setViewport] = (0, react.useState)(() => typeof document === "undefined" ? { width: 0, height: 0 } : layoutViewport());
			const [dragging, setDragging] = (0, react.useState)(false);
			/**
			* Viewport position of the popover. Portalled to `document.body` because
			* the panel must not inherit the card's drag transform or the overlay
			* layer's stacking context; body carries the theme tokens, so a portalled
			* panel keeps its surface colors.
			*/
			const [popPos, setPopPos] = (0, react.useState)(null);
			const cardRef = (0, react.useRef)(null);
			const popRef = (0, react.useRef)(null);
			const dragRef = (0, react.useRef)(null);
			/** Set between a drag's pointerup and the click it would otherwise fire. */
			const suppressClickRef = (0, react.useRef)(false);
			const currentSessionId = typeof useSessions === "function" ? (0, useSessions)((s) => s.current) : void 0;
			/** Fetch today's costs (workspace + all) from the dual-value route. */
			const fetchTodayCosts = async () => {
				const url = currentSessionId !== void 0 && currentSessionId !== ""
					? `${TODAY_COST_ROUTE}?session=${encodeURIComponent(currentSessionId)}`
					: TODAY_COST_ROUTE;
				const response = await fetch(url, { headers: { accept: "application/json" } });
				const payload = await response.json().catch(() => ({}));
				if (!response.ok) return { ok: false, error: payload.error ?? `today-cost responded ${response.status}` };
				return {
					ok: true,
					workspace: payload.workspace?.cost ?? 0,
					all: payload.all?.cost ?? 0
				};
			};
			const refresh = async (showLoading) => {
				if (showLoading) setLoading(true);
				setError(null);
				const [bResult, aResult, tResult, totResult] = await Promise.all([
					fetchBalance(),
					fetchActiveCost(currentSessionId),
					fetchTodayCosts(),
					fetchTotalCost()
				]);
				const failures = [];
				if (bResult.ok) {
					setBalance(displayBalance(bResult.balanceInfos));
					if (typeof bResult.lowThreshold === "number" && bResult.lowThreshold >= 0) setLowThreshold(bResult.lowThreshold);
					if (typeof bResult.criticalThreshold === "number" && bResult.criticalThreshold >= 0) setCriticalThreshold(bResult.criticalThreshold);
				} else {
					failures.push(`余额: ${bResult.error}`);
				}
				if (aResult.ok) {
					setLastPrompt(aResult.lastPrompt);
					setTodaySession(aResult.todaySession);
					setSessionTitle(aResult.sessionTitle ?? null);
					setPeak(aResult.peak ?? null);
				} else {
					failures.push(`会话: ${aResult.error}`);
				}
				if (tResult.ok) {
					setTodayWs(tResult.workspace);
					setTodayAll(tResult.all);
				} else {
					failures.push(`今日: ${tResult.error}`);
				}
				if (totResult.ok) {
					setTotalAll(totResult.cost);
					setTotalEarliestDay(typeof totResult.earliestDay === "string" ? totResult.earliestDay : null);
				}
				setError(failures.length > 0 ? failures.join("；") : null);
				if (showLoading) setLoading(false);
			};
			(0, react.useEffect)(() => {
				refresh(false);
				const timer = setInterval(() => refresh(false), 60000);
				return () => clearInterval(timer);
			}, [currentSessionId]);
			// Measure the card so the placement math works in real pixels. A
			// ResizeObserver covers font/zoom/locale changes without us polling, and
			// the window listener covers the viewport side of the same equation.
			(0, react.useEffect)(() => {
				const el = cardRef.current;
				if (el === null) return;
				const measure = () => {
					const rect = el.getBoundingClientRect();
					setSize((previous) => previous !== null && Math.abs(previous.width - rect.width) < 0.5 && Math.abs(previous.height - rect.height) < 0.5 ? previous : {
						width: rect.width,
						height: rect.height
					});
					const nextViewport = layoutViewport();
					setViewport((previous) => previous.width === nextViewport.width && previous.height === nextViewport.height ? previous : nextViewport);
				};
				measure();
				const observer = typeof ResizeObserver === "function" ? new ResizeObserver(measure) : null;
				if (observer !== null) observer.observe(el);
				window.addEventListener("resize", measure);
				return () => {
					if (observer !== null) observer.disconnect();
					window.removeEventListener("resize", measure);
				};
			}, []);
			// Close the popover when clicking outside the card or its portalled panel.
			(0, react.useEffect)(() => {
				if (!open) return;
				const onDocClick = (event) => {
					const el = cardRef.current;
					const panel = popRef.current;
					if (el !== null && el.contains(event.target)) return;
					if (panel !== null && panel.contains(event.target)) return;
					setOpen(false);
				};
				document.addEventListener("mousedown", onDocClick);
				return () => document.removeEventListener("mousedown", onDocClick);
			}, [open]);
			/**
			* Anchor the panel above the card (below it when the card sits too high
			* for a panel to fit above), same width as the card and kept inside the
			* viewport.
			*/
			const placePopover = () => {
				const el = cardRef.current;
				if (el === null) return;
				const rect = el.getBoundingClientRect();
				const view = layoutViewport();
				// 240px is the panel's floor: the card is only 208px wide.
				const PANEL_MIN_WIDTH = 240;
				const width = Math.min(Math.max(PANEL_MIN_WIDTH, Math.round(rect.width)), view.width - 16);
				const next = {
					left: Math.max(8, Math.min(Math.round(rect.left), view.width - width - 8)),
					width
				};
				// Rough panel height, used only to pick a side: the panel is 15px
				// type over ~9 rows plus its header and footer.
				const ABOVE_NEED = 300;
				if (rect.top >= ABOVE_NEED) next.bottom = Math.max(8, Math.round(view.height - rect.top + 8));
				else next.top = Math.max(8, Math.min(Math.round(rect.bottom + 8), view.height - 120));
				setPopPos(next);
			};
			// Keep the portalled panel glued to the card while the layout moves.
			(0, react.useEffect)(() => {
				if (!open) return;
				const reposition = () => placePopover();
				window.addEventListener("resize", reposition);
				const el = cardRef.current;
				const observer = typeof ResizeObserver === "function" && el !== null ? new ResizeObserver(reposition) : null;
				if (observer !== null) observer.observe(el);
				return () => {
					window.removeEventListener("resize", reposition);
					if (observer !== null) observer.disconnect();
				};
			}, [open]);
			const level = balance === null ? 0 : balance.total < criticalThreshold ? 2 : balance.total < lowThreshold ? 1 : 0;
			const point = size === null ? null : placeToPoint(place, size, viewport);
			const toggle = async () => {
				const next = !open;
				if (next) placePopover();
				setOpen(next);
				if (next) await refresh(true);
			};
			/** Put the card back at its default place and forget the stored one. */
			const resetPlace = () => {
				clearPlace();
				setPlace({ ...DEFAULT_PLACE });
				setOpen(false);
				setPopPos(null);
			};
			const beginDrag = (event) => {
				// Left button only: middle/right clicks keep their browser behavior.
				if (typeof event.button === "number" && event.button !== 0) return;
				const el = cardRef.current;
				if (el === null) return;
				const rect = el.getBoundingClientRect();
				// A fresh gesture clears the previous drag's click suppression, so a
				// click that never arrived cannot swallow this gesture's real click.
				suppressClickRef.current = false;
				dragRef.current = {
					pointerId: event.pointerId,
					startX: event.clientX,
					startY: event.clientY,
					originX: rect.left,
					originY: rect.top,
					width: rect.width,
					height: rect.height,
					moved: false
				};
				try {
					el.setPointerCapture(event.pointerId);
				} catch (error) {
					/* capture is best-effort: without it the drag still follows the pointer */
				}
			};
			const moveDrag = (event) => {
				const state = dragRef.current;
				if (state === null || state.pointerId !== event.pointerId) return;
				const dx = event.clientX - state.startX;
				const dy = event.clientY - state.startY;
				// A synthetic or malformed pointer event can carry non-finite
				// coordinates; letting them through would write NaNpx into the style
				// and take the card off-screen until the next reload.
				if (!Number.isFinite(dx) || !Number.isFinite(dy)) return;
				if (!state.moved) {
					// Below the threshold this is still a click, so the card must not
					// budge: the user asked for dragging *and* a working popover.
					if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
					state.moved = true;
					setDragging(true);
					// A panel anchored to a moving card is just noise.
					setOpen(false);
					setPopPos(null);
				}
				setPlace(pointToPlace(state.originX + dx, state.originY + dy, {
					width: state.width,
					height: state.height
				}, viewport));
			};
			const endDrag = (event) => {
				const state = dragRef.current;
				if (state === null || state.pointerId !== event.pointerId) return;
				dragRef.current = null;
				setDragging(false);
				const el = cardRef.current;
				try {
					el?.releasePointerCapture?.(event.pointerId);
				} catch (error) {
					/* already released */
				}
				if (!state.moved) return;
				// Suppress the click the browser is about to fire for this gesture.
				suppressClickRef.current = true;
				if (el === null) return;
				// Persist from the DOM's own rect rather than from state: the last
				// setPlace of the drag may not have rendered yet when the pointer
				// comes up, and an off-by-one in the remembered place is exactly the
				// bug that makes a card creep on every reload.
				const rect = el.getBoundingClientRect();
				const finalPlace = pointToPlace(rect.left, rect.top, {
					width: rect.width,
					height: rect.height
				}, viewport);
				setPlace(finalPlace);
				writePlace(finalPlace);
			};
			const onCardClick = (event) => {
				if (suppressClickRef.current) {
					suppressClickRef.current = false;
					event.preventDefault();
					event.stopPropagation();
					return;
				}
				// Second click of a double click: reset instead of toggling again.
				if (event.detail >= 2) {
					resetPlace();
					return;
				}
				toggle();
			};
			/** Popover position: only one vertical side is ever set by placePopover. */
			const popoverStyle = { left: popPos === null ? 0 : popPos.left, width: popPos === null ? void 0 : popPos.width };
			if (popPos !== null && popPos.bottom !== void 0) popoverStyle.bottom = popPos.bottom;
			if (popPos !== null && popPos.top !== void 0) popoverStyle.top = popPos.top;
			// Portalled to <body>: the shell's overlay layer is a stacking context at
			// z-20, so an occupant of it can never rise above the layers that sit
			// above (toasts, dialogs). Portalling keeps the card's own z-index
			// meaningful against page content while staying below official dialogs
			// (z-1000) — the arrangement sticky-note, deepseek-pet and token-pet all
			// use (REFERENCES R2/R3, community 3/5). body carries the theme tokens,
			// so the card keeps its surface colors.
			return (0, react_dom.createPortal)((0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
				children: [(0, react_jsx_runtime.jsx)("button", {
					ref: cardRef,
					type: "button",
					className: styles.card,
					"data-dragging": dragging ? "true" : undefined,
					"data-peak": peak !== null ? String(peak.active) : undefined,
					// Hidden for the single frame before the card has been measured:
					// placing it without a size would flash it in the wrong spot.
					style: point === null ? { visibility: "hidden" } : placeStyle(point, place, size, viewport),
					title: `${t("title")} — ${t("dragHint")}`,
					onPointerDown: beginDrag,
					onPointerMove: moveDrag,
					onPointerUp: endDrag,
					onPointerCancel: endDrag,
					onClick: onCardClick,
					children: [(0, react_jsx_runtime.jsxs)("div", {
						className: styles.cardTop,
						children: [(0, react_jsx_runtime.jsx)("span", {
							className: styles.ico,
							children: (0, react_jsx_runtime.jsx)("svg", {
								width: 16,
								height: 16,
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: 1.7,
								strokeLinecap: "round",
								strokeLinejoin: "round",
								children: [(0, react_jsx_runtime.jsx)("rect", {
									x: 3,
									y: 6,
									width: 18,
									height: 13,
									rx: 2
								}), (0, react_jsx_runtime.jsx)("path", { d: "M3 10h18" })]
							})
						}), (0, react_jsx_runtime.jsx)("span", {
							className: styles.cardAmount,
							"data-level": level > 0 ? level : undefined,
							children: balance !== null ? `${balance.symbol}${balance.total.toFixed(2)}` : "—"
						})]
					}), (0, react_jsx_runtime.jsxs)("div", {
						className: styles.cardFoot,
						children: [(0, react_jsx_runtime.jsxs)("span", {
							children: [t("todayShort"), " ", todayAll !== null ? shortCny(todayAll) : "—"]
						}), (0, react_jsx_runtime.jsxs)("span", {
							title: totalEarliestDay !== null ? `${t("totalSince")} ${totalEarliestDay}` : undefined,
							children: [t("totalCostShort"), " ", totalAll !== null ? shortCny(totalAll) : "—"]
						})]
					})]
				}), open && popPos !== null && (0, react_dom.createPortal)((0, react_jsx_runtime.jsx)("div", {
					ref: popRef,
					className: styles.sidePop,
					"data-peak": peak !== null ? String(peak.active) : undefined,
					role: "dialog",
					style: popoverStyle,
					children: (0, react_jsx_runtime.jsxs)(react_jsx_runtime.Fragment, {
						children: [(0, react_jsx_runtime.jsxs)("div", {
							className: styles.sidePopHead,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.sidePopTitle,
								children: [t("title"), peak !== null && (0, react_jsx_runtime.jsx)(_deepseek_ai_dsh_client_ui_primitives.Tooltip, {
									label: peak.active
										? t("peak.tooltip.active", { input: peak.inputMiss, output: peak.output })
										: t("peak.tooltip.offpeak", { input: peak.inputMiss, output: peak.output }),
									side: "top",
									delayMs: 200,
									children: (0, react_jsx_runtime.jsx)("span", {
										className: styles.peakTag,
										"data-peak": String(peak.active),
										children: peak.active ? t("peak.active") : t("peak.offpeak")
									})
								})]
							}), (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: styles.sidePopClose,
								"aria-label": t("close"),
								onClick: () => setOpen(false),
								children: "×"
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("balance"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.balance"),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								"data-level": level > 0 ? level : undefined,
								children: loading ? "…" : balance !== null ? `${balance.symbol}${balance.total.toFixed(2)}` : "—"
							})]
						}), level > 0 && (0, react_jsx_runtime.jsx)("div", {
							className: styles.err,
							role: "status",
							children: t(`warn.text.${level}`)
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("lastPrompt"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.lastPrompt"),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								"data-tier": "ter",
								children: loading ? "…" : lastPrompt !== null ? formatCny(lastPrompt) : "—"
							})]
						}), sessionTitle !== null && sessionTitle !== "" && (0, react_jsx_runtime.jsxs)("div", {
							className: styles.sessionNote,
							title: sessionTitle,
							children: [(0, react_jsx_runtime.jsx)("span", { children: t("sessionNote") }), (0, react_jsx_runtime.jsx)("span", {
								className: styles.sessionName,
								children: sessionTitle
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("todaySession"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.todaySession"),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								children: loading ? "…" : todaySession !== null ? formatCny(todaySession) : "—"
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("todayWs"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.todayWs"),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								"data-tier": "sec",
								children: loading ? "…" : todayWs !== null ? formatCny(todayWs) : "—"
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("todayAll"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.todayAll"),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								"data-tier": "sec",
								children: loading ? "…" : todayAll !== null ? formatCny(todayAll) : "—"
							})]
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.row,
							children: [(0, react_jsx_runtime.jsxs)("span", {
								className: styles.label,
								children: [t("totalAll"), (0, react_jsx_runtime.jsx)(ExplainIcon, {
									label: t("explain.totalAll", { day: totalEarliestDay ?? "…" }),
									t
								})]
							}), (0, react_jsx_runtime.jsx)("span", {
								className: styles.val,
								"data-tier": "sec",
								children: loading ? "…" : totalAll !== null ? formatCny(totalAll) : "—"
							})]
						}), error !== null && (0, react_jsx_runtime.jsx)("div", {
							className: styles.err,
							role: "status",
							children: error
						}), (0, react_jsx_runtime.jsxs)("div", {
							className: styles.sidePopFoot,
							children: [(0, react_jsx_runtime.jsx)("a", {
								className: styles.link,
								href: TOP_UP_URL,
								target: "_blank",
								rel: "noreferrer",
								children: t("topUp")
							}), (0, react_jsx_runtime.jsxs)("span", {
								style: { display: "inline-flex", alignItems: "center", gap: 6 },
								children: [(0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: styles.popReset,
									title: t("reset.title"),
									onClick: resetPlace,
									children: t("reset")
								}), (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: styles.sidePopRefresh,
									"aria-label": t("refresh.aria"),
									title: t("refresh.title"),
									onClick: () => refresh(true),
									children: refreshGlyph()
								})]
							})]
						})]
					})
				}), document.body)]
			}), document.body);
		}
		//#endregion
		//#region lib/types/client/locales.js
		/** Dictionary namespace owned by this plugin. */
		const NS = "balance-widget";
		/** Simplified Chinese dictionary (the key-set source of truth). */
		const zh = {
			"aria": "查看账户余额与成本",
			"title": "余额与成本",
			"refresh.aria": "刷新数据",
			"refresh.title": "刷新余额与成本",
			"balance": "账户余额",
			"lastPrompt": "最近一次提问",
			"todaySession": "今日·本会话",
			"todayWs": "今日·本工作区",
			"todayAll": "今日·所有工作区",
			"totalAll": "累计·全部",
			"explain.totalAll": "本机所有留存会话从最早记录（{day}）至今的累计费用估算，含所有工作区，仅统计本地日志。",
			"explain.aria": "解释",
			"explain.balance": "DeepSeek 账户可用余额，实时查询官方接口。",
			"explain.lastPrompt": "最近活跃会话的最后一个问题（含 AI 回复）的费用估算。",
			"explain.todaySession": "当前会话今天产生的费用估算（从会话开始累计到今天）。",
			"explain.todayWs": "当前工作区今天所有会话的费用合计估算。",
			"explain.todayAll": "所有工作区今天所有会话的费用合计估算（含其他项目）。",
			"warn.title.1": "余额不足 ¥5，建议及时充值",
			"warn.title.2": "余额低于 ¥1，即将耗尽！",
			"warn.text.1": "⚠️ 余额不足 ¥5，建议及时充值。",
			"warn.text.2": "⛔ 余额低于 ¥1，即将耗尽，请立即充值！",
			"todayCostShort": "今日·全部",
			"todayShort": "今日",
			"totalCostShort": "累计",
			"totalSince": "累计自",
			"peak.active": "峰时",
			"peak.offpeak": "谷时",
			"peak.tooltip.active": "当前为峰时（周一至周五 09:00-12:00、14:00-18:00，不含法定节假日，价格翻倍）：输入 ¥{input}/M · 输出 ¥{output}/M",
			"peak.tooltip.offpeak": "当前为谷时（其余时段：周末含调休上班日、法定节假日全天，半价）：输入 ¥{input}/M · 输出 ¥{output}/M",
			"sessionNote": "基于最近活跃会话：",
			"dragHint": "按住可拖动；双击复位到右下角",
			"reset": "复位",
			"reset.title": "把卡片放回右下角默认位置",
			"hint": "价格为估算值，实际以官方账单为准。",
			"topUp": "去充值",
			"close": "关闭"
		};
		/** English dictionary, checked complete against the zh key set. */
		const en = {
			"aria": "View account balance and costs",
			"title": "Balance & cost",
			"refresh.aria": "Refresh data",
			"refresh.title": "Refresh balance and costs",
			"balance": "Account balance",
			"lastPrompt": "Last prompt",
			"todaySession": "Today · this session",
			"todayWs": "Today · this workspace",
			"todayAll": "Today · all workspaces",
			"totalAll": "Total · all time",
			"explain.totalAll": "Estimated cumulative cost of all sessions on record since {day}, across all workspaces (local logs only).",
			"explain.aria": "Explain",
			"explain.balance": "DeepSeek account balance, fetched live from the official API.",
			"explain.lastPrompt": "Estimated cost of the latest question (incl. the AI reply) in the most recent session.",
			"explain.todaySession": "Estimated cost of today's usage in the current session.",
			"explain.todayWs": "Estimated total cost of today's sessions in the current workspace.",
			"explain.todayAll": "Estimated total cost of today's sessions across all workspaces.",
			"warn.title.1": "Balance below ¥5, consider topping up",
			"warn.title.2": "Balance below ¥1, almost exhausted!",
			"warn.text.1": "⚠️ Balance below ¥5, consider topping up.",
			"warn.text.2": "⛔ Balance below ¥1, almost exhausted — top up now!",
			"todayCostShort": "Today · all",
			"todayShort": "Today",
			"totalCostShort": "Total",
			"totalSince": "Since",
			"peak.active": "Peak",
			"peak.offpeak": "Off-peak",
			"peak.tooltip.active": "Peak hours now (Mon-Fri 09:00-12:00, 14:00-18:00, statutory holidays excluded, 2× price): input ¥{input}/M · output ¥{output}/M",
			"peak.tooltip.offpeak": "Off-peak hours now (everything else: weekends incl. make-up workdays, statutory holidays all day, half price): input ¥{input}/M · output ¥{output}/M",
			"sessionNote": "Based on most recent session:",
			"dragHint": "Drag to move; double-click to reset to the bottom-right",
			"reset": "Reset",
			"reset.title": "Put the card back at the default bottom-right place",
			"hint": "Prices are estimates; actual billing from the provider is authoritative.",
			"topUp": "Top up",
			"close": "Close"
		};
		//#endregion
		//#region lib/types/client/index.js
		/** Required services: the seat's slot registry and locale registry. */
		const inject = [
			"slots",
			"locale"
		];
		/**
		* Client plugin body: register the frame-wide floating balance card (the
		* single entry point since v0.4.1; the former header widget is removed
		* to avoid duplicate always-visible balances).
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "dsh-balance-widget: dictionaries");
			// A frame-wide floating card: registered in the shell's overlay layer
			// (a LIST slot, so our own id is added beside the shipped entries) and
			// portalled to document.body inside the card itself. The former
			// sidebar.footer.action seat was dropped because another plugin's
			// injected CSS claims every non-shipped entry in that row (it forces
			// `flex:100%;order:1` and wraps the foot area), which overlapped the
			// card — see REFERENCES.md R1.
			ctx.slots.inject("shell.overlay", () => ctx.slots.register({
				name: "shell.overlay",
				id: "balance-widget",
				order: 60,
				locale: NS
			}, FloatingBalanceCard));
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});
