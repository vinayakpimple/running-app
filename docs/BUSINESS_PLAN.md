# Business Plan — AI-Native Running Coach

## 1. Positioning

**"A running coach that already knows your running."**
Private by design, touchless by default, coached by Claude. Not a social
network (Strava owns that), not a static plan PDF (Runna's territory) — a
coach that ingests everything automatically and talks to you like a good
human coach would.

One-liner for stores and launch posts: *Your AI running coach. No logging,
no feed, no ads — just the smartest training partner you've ever had.*

## 2. Market reality

- Strava: ~100M+ registered users; social graph is its moat; its AI features
  are summaries, not coaching. It **acquired Runna (2025)** — proof that AI
  coaching is the contested ground.
- Nike Run Club: free, polished, static plans, no real adaptivity.
- Garmin/Coros coaches: device-locked, robotic tone, no conversation.
- Gap: **an adaptive, conversational coach that is privacy-first and
  device-agnostic.** Nobody owns "the coach who knows you." That's the wedge.

## 3. Who it's for (beachhead → expansion)

1. **Beachhead**: tech-forward recreational runners training for a race
   (10K/half), already wearing a watch, curious about AI. They churn off
   Runna-style plans because life happens and static plans don't adapt.
2. **Second ring**: run clubs (one enthusiast onboards twenty friends —
   exactly the founder's own buddy group; that's the design partner pool).
3. **Later**: privacy-conscious athletes leaving big-social fitness apps.

## 4. Product-led growth loops

- **Share cards**: post-run, the coach writes a witty, personal one-liner on
  a beautiful card (route trace + splits). Shareable to socials with a subtle
  app mark. The card *is* the ad.
- **Coach quotes**: screenshots of genuinely good coaching moments are
  organic marketing gold — design the chat UI to screenshot well.
- **Buddy invite**: "your coach can see your crew's weekly totals" (opt-in,
  aggregate only) — brings the run club in without building a social network.

## 5. The Claude-ecosystem strategy (distribution we uniquely have)

1. **Built-with-Claude story as content engine.** This app is being built
   end-to-end with Claude Code — repo history proves it. Build in public:
   a weekly dev-log (X/LinkedIn thread + short screen capture) showing Claude
   Code shipping a real feature end-to-end, ending with the live app. The
   audience that follows AI-assisted development is enormous right now and
   converts to early adopters. Pitch the story to Anthropic's
   customer-showcase / community channels once the mobile beta is real.
2. **Powered-by-Claude as product brand.** "Coached by Claude" in the App
   Store subtitle. Quality of coaching tone is the review-driver; Claude is
   demonstrably the best at it — make that legible to users.
3. **Ship an MCP server** (`running-log-mcp`): lets anyone connect their
   training log to Claude (Desktop, mobile, Cowork) — "ask Claude anything
   about your training" from wherever they already talk to Claude. List it in
   MCP directories/registries; it's both a feature for power users and a
   discovery channel with near-zero competition in the running niche.
4. **Agent Skills / Cowork plugin**: a "running coach" skill backed by the
   same MCP server — meets prosumers inside tools they already pay for.
5. **Launch venues that reward this story**: Product Hunt ("AI-native running
   coach"), Hacker News (Show HN: the *privacy architecture* is the HN-bait,
   not the AI), r/running + r/AdvancedRunning (be a runner first there, not a
   marketer).

## 6. Pricing & unit economics

- **Free**: touchless log, stats, charts, GPS recording, GPX import, weekly
  digest, 10 coach messages/month. Free tier must be the best free running
  log on the market — it feeds the loops.
- **Coach Pro — $5.99/mo or $49/yr**: unlimited coach, adaptive race plans,
  daily brief, voice notes, injury guard. Deliberately undercuts Strava
  ($11.99) and Runna ($17.99+): we have no server-side data costs and thin
  infrastructure — our COGS is Claude tokens.
- Unit economics guardrail: heavy Pro user ≈ 60 coach exchanges + 30 briefs
  a month ≈ $1.50–2.50 in tokens → healthy margin at $5.99; free tier capped
  so its token cost stays under ~$0.10/user/month.
- No ads, no data sales — ever. It's the moat; monetise trust, don't spend it.

## 7. Go-to-market phases

- **Now → mobile beta**: web app is the lab; run-buddy group is the design
  panel. Start the build-in-public log immediately — the audience compounds.
- **Beta (TestFlight/Play internal)**: 20–50 runners from buddy group + one
  local run club. Weekly coach-quality reviews from real transcripts.
- **Launch**: PH + Show HN + dev-log finale in the same week; share-cards on
  by default so every beta runner's feed seeds it.
- **Post-launch**: MCP server release as its own mini-launch; pitch the
  built-with-Claude case study; creator seeding (mid-size running YouTubers
  get Pro + their club gets it free).

## 8. Metrics that matter

- Activation: % of installs with Health connected within 10 min (touchless
  promise kept).
- D30 retention of runners with ≥1 coach exchange in week 1 (the coach must
  earn the habit).
- Brief open rate (is the daily push worth reading?).
- Free→Pro conversion after first adaptive-plan week.
- Token cost / MAU vs. ARPU, weekly.

## 9. Risks

- **Platform**: Strava/Apple ship "good enough" AI coaching. Answer: privacy
  + personality + device-agnosticism; stay the coach, not the feed.
- **Founder constraint**: Apple-employee side-project approval gates the iOS
  half and any commercialisation — resolve first (see MOBILE_PLAN §6/§8).
- **Token costs**: enforced caps + fast-model routing from day one.
- **Solo bandwidth**: the plans above are sequenced so every phase ships a
  usable product; no phase bets on the next one landing.

## 10. First 90 days (calendar)

- **Weeks 1–2**: Business-conduct conversation started; monorepo + CI;
  dev-log post #1 ("Claude built my running app's web version — now the real
  thing").
- **Weeks 3–6**: Touchless core in TestFlight-internal/Play-internal;
  dev-log #2–4; recruit the run-club beta list.
- **Weeks 7–10**: Coach + daily brief in beta; coach-quality eval set built
  from real transcripts; dev-log #5–7.
- **Weeks 11–13**: Store-readiness; share cards; pricing switches on in
  TestFlight; MCP server prototype.
- **Weeks 14+**: Public launch week (PH + HN + dev-log finale); MCP server
  mini-launch a few weeks later.
