# Academic content sources and maintenance

Updated October 12, 2026. Technical/source preparation is complete; Bellini academic approval is pending. Task status is maintained in [beta_checklist.md](beta_checklist.md).

## Source record


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

## Verification and approval

| Review | Evidence/status |
| --- | --- |
| Main-degree sources | Official pages above reviewed October 7. On October 8 the user confirmed prior verification of detailed coursework, career/salary figures, catalog years and planning-resource applicability. This is user attestation, not a new independent audit. |
| Seven interdisciplinary summaries | Prepared October 8 from user-supplied catalog text after some official pages returned access challenges. Names/resources are shared; fit guidance and course-derived skills are editorial summaries. Detailed academic rules remain behind catalog links. No unsupported salary or regional employment figures were added. |
| Comparison wording | Editorial review completed October 9; see [comparison review](#comparison-wording-review). |
| Academic content owner | Awaiting Bellini assignment. |
| Academic approval/reviewer/date | Pending. |

Bellini must approve program coverage (including whether Computer Engineering belongs in the beta), names, admissions status, descriptions, skills, career context, pathways/minors, high-school simplifications, planning-resource applicability and comparison wording. Confirm Economics/Anthropology inclusion and estimated 2027 timing. Record the owner, reviewer, approval date and review interval here.

### Supplied-content cautions

- Criminology: supplied prerequisites repeated the Physics I label; the summary uses the unambiguous major-core Physics I/II list.
- Interdisciplinary Social Sciences: specialization examples and career interests are exploration guidance, not verified employment outcomes.
- Business concentrations: broader-degree career examples must not be treated as guaranteed concentration outcomes. Accountancy uses corporate accounting systems context; Digital Marketing uses marketing systems context; Supply Chain uses supply chain analysis. Fintech's broader-program blockchain career example does not establish blockchain coursework.
- Accountancy's official catalog returned an access challenge; its summary uses user-supplied text. Business Analytics uses the corrected supplied catalog text.
- Shared comparisons may retain missing-information labels even when Learn More summaries exist; review before filling them.

## External resources

[external-link-report.json](external-link-report.json) retains status codes, final URLs and source locations. HTTP success does not establish accuracy or usability; HTTP 202 interstitials, PDFs, Box plans and authenticated Canvas resources may need human inspection.

Run `npm run check:links` for URL syntax or `npm run check:links -- --online` to refresh the network report.

## Content maintenance

| File | Content |
| --- | --- |
| `src/data/degrees.ts`, `src/data/highSchoolDegrees.ts` | Main-degree cards and audience content |
| `src/data/highSchoolFutureDegreeOptions.ts` | Canonical interdisciplinary identifiers, names, summaries, catalog and planning links |
| `src/data/interdisciplinaryDetailContent.ts` | Shared interdisciplinary details |
| `src/data/highSchoolInterdisciplinaryContent.ts` | Plain-language high-school cards, details and comparisons |
| `src/pages/degrees/DegreeDetail.tsx`, `src/pages/highSchool/degrees/HighSchoolDegreeDetail.tsx` | Main-degree coursework/career details |

For an update: change the relevant data and matching detail/comparison/pathway pages; preserve shared names and resource identifiers; run `npm run check`; refresh link checks when URLs change. Record the source, catalog year, change and reviewer/date here, then obtain content-owner approval before publication.

## Comparison wording review

Completed October 9, 2026. Editorial review only; Bellini academic approval remains pending.

| Coverage | Findings and resolution |
| --- | --- |
| Shared comparison, Bellini context | Replaced predictive “What Changes If You Switch,” “Coursework shift,” and “Expect more emphasis” with program topics and advising questions. Explicitly distinguishes topic similarity from course equivalency or applicable credits. |
| Shared comparison, other USF/transfer contexts | Added limits: no credit evaluation, determination of remaining requirements, eligibility confirmation or guaranteed change/timeline. Refer students to advising. |
| High-school comparison | Added plain-language limits on credits, remaining classes, admission, major changes and graduation dates. |
| Explorer/detail invitations | Removed Bellini's personal-forecast wording; retained invitations describing program exploration. |
| Program-specific content | Reviewed fields for all 12 selectable programs. Replaced Computer Science and Engineering's unavailable transition-analyzer next step with advising review. Corrected interdisciplinary templates so pending coursework is not an expected shift. |
| Invalid selections | Retained recovery instructions for missing, unknown or duplicate programs. |

Automated rendering covers 66 distinct program pairs in five audience/source contexts (330 renders), including notices and the Bellini equivalency caution. Economics and Anthropology are not selectable comparison programs.

No degree requirements, credit equivalencies, admissions rules, catalog years or external documents were newly validated by this review. Task status is in [beta_checklist.md](beta_checklist.md).

## Interdisciplinary implementation

Implementation completed October 8, 2026. Current review tasks live in [beta_checklist.md](beta_checklist.md); this file records the implemented behavior rather than duplicating task checkboxes.

Both explorers show five main programs and seven interdisciplinary options: Criminology, Interdisciplinary Social Sciences, and the Computer Science and Business concentrations Accountancy and Analytics, Business Analytics and Information Systems, Digital Marketing and Analytics, Fintech, and Supply Chain Management.

- Shared identifiers/resources feed both explorers. “All” shows 12 cards; “Interdisciplinary” shows seven. Cards use concise summaries; official catalog links hold detailed requirements.
- All seven have audience-specific details, context-preserving navigation and two-program comparison support. Selection prevents duplicates and more than two programs; removal and clearing are available.
- High-school descriptions explain unfamiliar terms separately from shared-group wording. Unsupported employment figures remain unavailable.
- Economics and Anthropology appear only on the separate anticipated-2027 pages, with estimated timing/incomplete-content labels; neither is selectable for comparison.
- Card display is not confirmation of admissions availability. Removed card/detail availability notes do not replace Bellini review.

Maintenance files are listed above. Shared layouts are `src/components/InterdisciplinaryDegreeDetail.tsx` and `src/components/AnticipatedDegreeOptions.tsx`; regression coverage is in `tests/interdisciplinary.test.mjs`.

Academic review must approve names, status, descriptions, skills, career/opportunity framing, high-school wording and future-option inclusion. General sample keyboard/layout checks passed by user report; screen-reader and exhaustive audience/direct-link/history coverage remain open. See [verification](beta-verification-2026-10-12.md).
