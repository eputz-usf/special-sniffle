# Degree Content Review Record

Review started October 7, 2026. This is a technical/source review, not academic approval.

## Sources Checked

The official [Bellini undergraduate overview](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/index.aspx) and the following program pages were inspected:

| Explorer program | Official program source | Result |
| --- | --- | --- |
| Computer Science | [BSCS](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscs.aspx) | Program name and broad academic focus checked |
| Computer Science and Engineering | [BSCSE](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscse.aspx) | Program name and broad academic focus checked |
| Artificial Intelligence | [BSAI](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bsai.aspx) | Program name and broad academic focus checked; malformed app link corrected |
| Cybersecurity | [BSCyS](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bscys.aspx) | Program name checked |
| Information Technology | [BSIT](https://www.usf.edu/ai-cybersecurity-computing/academics/undergraduate/bsit.aspx) | Program name checked |

The undergraduate overview also lists Computer Engineering. The explorer currently focuses on five detailed programs; an academic owner should confirm whether that selection is appropriate for the beta. Do not silently treat the explorer as a complete inventory of every Bellini offering.

The overview describes interdisciplinary programs separately and gives estimated fall 2027 dates for Economics and Anthropology. The app retains planned-program wording. Additional future-option entries and their launch status require reviewer confirmation.

The parent-information experiential-learning link was corrected to the official [Student Opportunities overview](https://www.usf.edu/ai-cybersecurity-computing/academics/student-opportunities/index.aspx).

## External-Link Review

[external-link-report.json](external-link-report.json) records HTTP status, final URL, and source locations for each public external reference. An HTTP success does not establish academic accuracy or prove that a PDF/catalog page is usable. Some responses are HTTP 202 interstitials; catalog content and authenticated Canvas resources need human review.

Run `npm run check:links` for syntax checks. Run `npm run check:links -- --online` to refresh the network report.

## Review Still Needed

- [ ] Confirm the beta's program coverage, including Computer Engineering.
- [ ] Verify every course list, credit total, prerequisite, sample plan, and academic requirement.
- [ ] Confirm the catalog year for each catalog link. URLs contain different catalog identifiers and should not be assumed to describe the same year.
- [ ] Verify all salary, employment, and growth figures against the stated source, time period, and geography.
- [ ] Confirm current availability and labeling for each interdisciplinary/future option.
- [ ] Review bachelor's/master's pathway and minor descriptions.
- [ ] Manually inspect catalog interstitials, PDFs, Box links, and Canvas resources.
- [ ] Approve comparison and advising language as exploration guidance.
- [ ] Assign an academic content owner and review interval.

**Academic content owner:** awaiting assignment by Bellini.

**Last technical/source review:** October 8, 2026 (user-supplied interdisciplinary catalog text and technical checks; academic approval pending).

**Academic approval date:** pending.

## Updating Content

1. Update shared degree-card content in `src/data/degrees.ts` and prospective-student content in `src/data/highSchoolDegrees.ts` as appropriate.
2. Update planned/interdisciplinary options in `src/data/highSchoolFutureDegreeOptions.ts`.
3. Review matching detail-page content in `src/pages/degrees/DegreeDetail.tsx` and `src/pages/highSchool/degrees/HighSchoolDegreeDetail.tsx`; these contain separate coursework and career sections.
4. Review comparison pages and bachelor's/master's pathway pages for matching changes.
5. Run `npm run check` and refresh the online link report when URLs change.
6. Record the source, catalog year, change, reviewer, and review date here.
7. Have the appointed content owner approve the release before publication.

## Interdisciplinary Integration — October 8, 2026

Technical implementation reuses the seven existing entries and their catalog/Box planning sources in `src/data/highSchoolFutureDegreeOptions.ts`; source content has not received new academic validation. Both explorers now display those records once, with planned/coming-soon labels, degree/concentration names, details, and comparisons. Unreviewed skills/coursework are explicitly pending rather than derived from focus labels.

Economics and Anthropology remain informational notes with the existing estimated 2027 timing and incomplete-content labels, excluded from selectable cards pending inclusion approval. No publication performed.

Academic approval remains required for exact names, launch/admissions status, catalog years, applicability of every two-/four-year plan, descriptions/interests, skills, comparison content, and the inclusion/timing of Economics and Anthropology. The existing official catalog and Box URLs are preserved; automated rendering validates destinations in app content, not academic correctness or external document usability.

### Computer Science and Criminology content — October 8, 2026

Learn More content now summarizes catalog text supplied by the user: 120 total credits, core/elective structure, upper-division progression, GPA/grade/attempt requirements, residency, capstone, internship/research opportunities, and the BS-to-MS pathway. Stored in `src/data/interdisciplinaryDetailContent.ts`. Skills are derived from explicitly listed courses. Fit/preparation text is editorial exploration guidance. No salary or regional employment figures were supplied or added. The copied prerequisite text repeats the Physics I label for the second physics prerequisite; the summary uses the unambiguous major-core Physics I/II list instead. Catalog year, admissions status, planning-resource applicability, and academic approval still require confirmation.

### Computer Science and Interdisciplinary Social Sciences — October 8, 2026

Both Learn More pages now summarize user-supplied catalog text: the 120-credit degree, computing/social-science foundations, example specialization areas, skills inferred from listed courses, and internship/research/BS-to-MS opportunities. Fit and career framing are editorial guidance, not verified employment outcomes. Detailed course, elective, GPA, and progression rules remain accessible through the existing official catalog link rather than repeated on the page, following user direction. No salary or regional employment claims were added. Catalog year and academic approval remain pending.

### Accountancy and Analytics concentration — October 8, 2026

Both Learn More versions summarize the catalog text supplied by the user after the official URL returned an access challenge. Content covers the 120-credit Computer Science and Business degree, accounting concentration focus, computing/business foundations, fit/preparation, course-derived skills, and internship/research/BS-to-MS opportunities. Corporate accounting systems analyst is attributed to the broader program; other concentrations’ career examples are not presented as accounting outcomes. Detailed coursework, elective, grading, GPA, and sequencing rules remain behind the existing catalog link. No salary or regional employment claims were added. Academic approval and catalog-year applicability remain pending.

### Business Analytics and Information Systems concentration — October 8, 2026

Both Learn More versions now summarize the corrected user-supplied catalog text. The overview, fit/preparation, and skills reflect the computing/business foundation and the concentration’s database design, data mining/predictive analytics, statistical programming, big data, and Python courses. Internship/research/BS-to-MS opportunities are retained. Career framing describes study-related interests without inventing job outcomes or salary figures. Detailed coursework, elective, progression, GPA, and grading rules remain behind the existing official catalog link. Layout, audience-specific ordering, colors, and smaller titles remain consistent with the other updated interdisciplinary pages. Academic approval and catalog-year applicability remain pending.

### Digital Marketing and Analytics concentration — October 8, 2026

Both Learn More versions summarize the user-supplied catalog text. Content covers the 120-credit degree, computing/business foundation, marketing principles/research, digital marketing, marketing analytics, and marketing technology and AI. Fit/preparation and skills derive from these listed subjects. Marketing systems analyst is attributed to the broader degree rather than guaranteed as a concentration outcome. Internship/research/BS-to-MS opportunities are retained; detailed course lists, elective, grade, and progression rules remain behind the existing catalog link. No salary or regional employment claims were added. Academic approval and catalog-year applicability remain pending.

### Fintech concentration — October 8, 2026

Both Learn More versions summarize user-supplied catalog text: the 120-credit degree, computing/business foundation, financial institutions/markets, financial modeling/analytics, fintech foundations, big data/machine learning in finance, and algorithmic trading. Fit/preparation and skills derive from listed subjects. Fintech analyst, blockchain developer, and financial software engineer are attributed to the broader program; no blockchain coursework is inferred. Internship/research/BS-to-MS opportunities are retained. Detailed requirements remain behind the existing official catalog link. No salary or regional employment figures were added. Academic approval and catalog-year applicability remain pending.

### Supply Chain Management concentration — October 8, 2026

Both Learn More versions summarize user-supplied catalog text: the 120-credit degree, computing/business foundation, global sourcing, global commerce, logistics/physical distribution, and supply chain analytics. Fit/preparation and skills derive from the listed subjects. Supply chain analyst is attributed to the broader program; salary and regional employment claims are not added. Internship/research/BS-to-MS opportunities are retained. Detailed coursework, elective, grade, and progression rules remain behind the existing official catalog link. All seven interdisciplinary programs now have supplied-content Learn More summaries. Academic approval and catalog-year applicability remain pending.

### High-school interdisciplinary language — October 8, 2026

All seven high-school cards, Learn More pages, and interdisciplinary comparison fields now use a separate plain-language content layer. Computing/business/social-science subjects are preserved while terms such as concentration, fintech, supply chain, logistics, auditing, and algorithmic trading are explained. Resource labels, compare instructions, advising questions, and the anticipated-2027 page use simpler wording. Official names and URLs remain shared. No detailed requirement tables, elective placeholders, admissions notes on cards, or unavailable tools were added. Editorial simplifications and course-derived skills remain subject to academic review. Shared-group content is retained.

### Checklist reconciliation — October 8, 2026

Academic-preparation checkboxes now separate completed source summaries, URL checks, comparison advising cautions, and recorded source context from the remaining detailed source verification, full comparison wording review, and exact catalog-year confirmation. Earlier integration notes are historical: card/detail availability notes and elective placeholders were subsequently removed at the user’s request; Economics and Anthropology are now separate anticipated-2027 cards. Technical progress does not establish Bellini academic approval.

### User-confirmed source checks — October 8, 2026

The user confirmed that detailed main-degree coursework, career/salary information, and planning resources were checked when added, and that all catalog years are correct. The corresponding source-verification and catalog-year/applicability tasks in `beta_checklist.md` are marked complete based on that confirmation. This records prior verification reported by the user, rather than a new independent audit in this session. Bellini’s final academic approval remains separate and pending.
