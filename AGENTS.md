<!-- intent:begin -->
## Intent
- **Why:** A small Next.js site: paste a LinkedIn profile or upload a PDF, get an adaptive ARCS-style scan.
- **Done looks like:** The scan has one home: either this repo deploys its own surface, or it is retired in favor of the arcs-v9 copy.
- **Not this:** Not what arcs-field-scan.arcs.care serves: that subdomain is an alias of the arcs-v9 Vercel project. No Vercel project deploys this repo. Uses Tailwind, unlike arcs-v9.
- **Status:** active (last merge `e61c508` 2026-09-29; 4 commits since 2026-08-01)
- **Last verified:** 2026-10-03 (`git log`; Vercel `get_deployment("arcs.care")` alias list includes arcs-field-scan.arcs.care on project `arcs-v9`; Vercel `list_projects` has no arcs-field-scan project)
- **Spec:** none
<!-- intent:end -->
