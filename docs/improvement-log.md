# JustNews improvement register — 18 November 2026 IST

Baseline: main 88a07a5, June 2021. No existing issues, PRs, or rejected proposals found. Existing GitHub Pages uses main/root. Dedicated Project: https://github.com/users/atishayjain005/projects/15.

| Problem | Proposed improvement | Reason and expected impact | Complexity | Risk | Recommendation | Deployment requirement | Status |
|---|---|---|---|---|---|---|---|
| Provider key in client and article HTML interpolation | Remove key, configure credential-free endpoint, render text and safe links | Avoid further credential distribution and executable provider content | Small | Existing live feed needs secure configuration | Implement | Static release; rotate historical key separately | In Progress |
| Silent transport and payload failures | Loading, empty, error, timeout and retry states | Visitors understand failure and can recover | Small | Request lifecycle regressions | Implement with mocked browser cases | Static release | Ready |
| Non-semantic layout and CDN-dependent interaction | Native disclosure, landmarks, keyboard focus and live announcements | News readable by keyboard and assistive technology | Small | Presentation changes | Implement | Static release | Ready |
| No narrow-screen resilience | Local responsive styles and overflow handling | Usable 320px layout without CDN dependency | Small | Minor visual changes | Implement | Static release | Ready |
| No reproducible validation or documentation | Browser CI and setup/release instructions | Protect reading and recovery flows | Small | CI compatibility | Implement | No runtime service | Ready |
| No safe live feed | Rotate historical key and identify existing free server-side provider integration | Restore real news without exposing credentials | Medium | Provider terms, quota and infrastructure choices | Backlog; assess existing infrastructure before proposing implementation | Credential owner action and approved free endpoint, then Pages release verification | Backlog |

No disruptive proposals, approval deadlines or auto-approvals. Tests use synthetic fixtures only; the product does not present invented headlines as live news. Removing the key from the tree does not revoke the historical credential. No history rewriting.
