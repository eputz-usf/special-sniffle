# FERPA and PII Security Review

## Scope and summary

This review examined the repository for application-level collection, storage,
transmission, logging, and exposure of student education records and other
personally identifiable information (PII).

Bellini Degree Explorer is a client-rendered degree information and comparison
application. The reviewed source does not show collection of names, student
IDs, grades, transcripts, or other individualized education records. Degree
content is bundled with the application. Visitors can select an audience and
compare degree programs.

The audience selection is stored in browser `localStorage` as `cicUserType`
(`src/utils/userSession.ts`). Comparison URLs contain degree program slugs and
audience context (`src/utils/degreeComparison.ts`). These values may reveal a
visitor's student category or interests, but the reviewed code does not link
them to an identified student.

## Finding

### LOW — Third-party font request discloses browser request metadata

- **Location:** `index.html:7–9`
- **Confidence:** 9/10
- **Evidence:** The page preconnects to `fonts.googleapis.com` and
  `fonts.gstatic.com`, and loads a Google Fonts stylesheet.
- **Risk:** The browser makes requests to a third party, exposing the request's
  network source address and standard request metadata to the font provider.
  The reviewed code does not show education records or identifying form data
  being sent with these requests.
- **Recommendation:** Self-host the fonts if third-party requests are not
  approved for this application. Otherwise, confirm the request is covered by
  the institution's privacy review and disclosures.

## FERPA and PII assessment

No source evidence reviewed shows collection or transmission of FERPA-protected
education records. The audience preference is stored locally in the browser,
and could be visible to another person using the same browser profile. Whether
this preference or operational data qualifies as protected or regulated
information depends on institutional context and handling practices; this
source review does not determine legal compliance.

## Positive controls observed

- The audience choice is constrained to predefined values, and stored values
  are validated (`src/utils/userTypes.ts`, `src/utils/userSession.ts`).
- The reviewed source contains no identity or education-data forms, transcript
  upload, analytics integration, backend API client, or application logging of
  visitor data.
- Infrastructure documentation describes the app as having no accounts,
  transcript storage, saved student plans, or server sessions
  (`docs/infrastructure.md`).

## Recommended follow-up

1. Decide whether the Google Fonts request is acceptable under institutional
   privacy requirements; self-host fonts if it is not.
2. Consider whether persistent audience selection is appropriate on shared
   devices.
3. Review deployed-host access logs, retention, monitoring, and privacy notices
   separately. These practices cannot be established from the reviewed
   repository.

This is a repository-level security and privacy review, not a legal
determination of FERPA compliance.
