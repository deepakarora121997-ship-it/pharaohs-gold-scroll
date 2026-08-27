# Plan: Hide the "Edit with Lovable" badge

## What
Hide the "Edit with Lovable" badge that appears on the published deployment of the wedding invitation site.

## How
Call the publish settings tool to set `hide_badge = true` (currently it is `false`, so the badge shows on the live site). This is a single toggle — no code changes.

## Requirement
Hiding the badge requires a **Pro plan or higher**. If the project is on a lower tier, the change will be rejected; in that case the only ways to remove it are upgrading the plan or keeping the badge.

## Result
After the toggle, republish the site (the change applies on the next publish) and the badge will no longer appear on the published/custom-domain deployment.
