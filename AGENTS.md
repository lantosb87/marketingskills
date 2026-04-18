# CLAUDE.md

Guidelines for AI agents working in this repository.

## Repository Overview

This repository contains **Agent Skills** for AI agents following the [Agent Skills specification](https://agentskills.io/specification.md). Skills install to `.agents/skills/` (the cross-agent standard). This repo also serves as a **Claude Code plugin marketplace** via `.claude-plugin/marketplace.json`.

- **Name**: Marketing Skills
- **GitHub**: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- **Creator**: Corey Haines
- **License**: MIT
- **Current skill version**: 1.2.0 (most skills); see `VERSIONS.md` for per-skill versions

## Repository Structure

```
marketingskills/
├── .claude-plugin/
│   └── marketplace.json        # Claude Code plugin marketplace manifest (34 skills)
├── .github/                    # GitHub workflows and templates
├── skills/                     # Agent Skills (34 skills)
│   └── skill-name/
│       ├── SKILL.md            # Required skill file
│       ├── evals/              # Automated evaluation tests (evals.json)
│       └── references/         # Optional detailed docs loaded on demand
├── tools/
│   ├── clis/                   # Zero-dependency Node.js CLI tools (61 tools)
│   ├── composio/               # Composio integration layer (README.md + marketing-tools.md)
│   ├── integrations/           # API integration guides (75 guides)
│   └── REGISTRY.md             # Tool index with capabilities (92 tools, 24+ categories)
├── validate-skills.sh          # Skill validation script
├── validate-skills-official.sh # Official validation script
├── CONTRIBUTING.md
├── VERSIONS.md                 # Per-skill version tracking
├── LICENSE
└── README.md
```

## Build / Lint / Test Commands

**Skills** are content-only (no build step). Verify manually:
- YAML frontmatter is valid
- `name` field matches directory name exactly
- `name` is 1-64 chars, lowercase alphanumeric and hyphens only
- `description` is 1-1024 characters

Use the provided validation scripts:
```bash
bash validate-skills.sh            # Validate all skills locally
bash validate-skills-official.sh   # Official spec-compliant validation
```

**CLI tools** (`tools/clis/*.js`) are zero-dependency Node.js scripts (Node 18+). Verify with:
```bash
node --check tools/clis/<name>.js          # Syntax check
node tools/clis/<name>.js                  # Show usage (no args = help)
node tools/clis/<name>.js <cmd> --dry-run  # Preview request without sending
```

## Agent Skills Specification

Skills follow the [Agent Skills spec](https://agentskills.io/specification.md).

### Required Frontmatter

```yaml
---
name: skill-name
description: What this skill does and when to use it. Include trigger phrases.
---
```

### Frontmatter Field Constraints

| Field         | Required | Constraints                                                      |
|---------------|----------|------------------------------------------------------------------|
| `name`        | Yes      | 1-64 chars, lowercase `a-z`, numbers, hyphens. Must match dir.   |
| `description` | Yes      | 1-1024 chars. Describe what it does and when to use it.          |
| `license`     | No       | License name (default: MIT)                                      |
| `metadata`    | No       | Key-value pairs (author, version, etc.)                          |

### Name Field Rules

- Lowercase letters, numbers, and hyphens only
- Cannot start or end with hyphen
- No consecutive hyphens (`--`)
- Must match parent directory name exactly

**Valid**: `page-cro`, `email-sequence`, `ab-test-setup`
**Invalid**: `Page-CRO`, `-page`, `page--cro`

### Skill Directory Structure

```
skills/skill-name/
├── SKILL.md        # Required - main instructions (<500 lines)
├── evals/          # Optional - automated evaluations (evals.json)
├── references/     # Optional - detailed docs loaded on demand
├── scripts/        # Optional - executable code
└── assets/         # Optional - templates, data files
```

## Available Skills (34)

All skills reference `product-marketing-context` as a foundation. Invoke that skill first when product context is unknown.

| Category | Skills |
|---|---|
| **CRO** | `page-cro`, `signup-flow-cro`, `form-cro`, `onboarding-cro`, `paywall-upgrade-cro`, `popup-cro` |
| **Copy & Content** | `copywriting`, `copy-editing`, `content-strategy`, `social-content`, `ad-creative` |
| **SEO** | `seo-audit`, `ai-seo`, `programmatic-seo`, `schema-markup`, `site-architecture` |
| **Email** | `email-sequence`, `cold-email` |
| **Paid Ads** | `paid-ads` |
| **Analytics** | `analytics-tracking`, `ab-test-setup` |
| **Research** | `customer-research`, `competitor-alternatives`, `marketing-psychology`, `marketing-ideas` |
| **Strategy** | `pricing-strategy`, `launch-strategy`, `free-tool-strategy`, `lead-magnets` |
| **Growth** | `referral-program`, `churn-prevention` |
| **Revenue** | `revops`, `sales-enablement` |
| **Foundation** | `product-marketing-context` |

## Evals System

Each skill includes an `evals/evals.json` file for automated quality testing. The repository contains 197 evals across all skills.

- Evals test that skill instructions produce correct, on-task outputs
- Run evals locally using the eval runner or CI
- When adding a new skill, add at least 3–5 evals covering the primary use cases

## Writing Style Guidelines

### Structure

- Keep `SKILL.md` under 500 lines (move details to `references/`)
- Use H2 (`##`) for main sections, H3 (`###`) for subsections
- Use bullet points and numbered lists liberally
- Short paragraphs (2-4 sentences max)

### Tone

- Direct and instructional
- Second person ("You are a conversion rate optimization expert")
- Professional but approachable

### Formatting

- Bold (`**text**`) for key terms
- Code blocks for examples and templates
- Tables for reference data
- No excessive emojis

### Clarity Principles

- Clarity over cleverness
- Specific over vague
- Active voice over passive
- One idea per section

### Description Field Best Practices

The `description` is critical for skill discovery. Include:
1. What the skill does
2. When to use it (trigger phrases)
3. Related skills for scope boundaries

```yaml
description: When the user wants to optimize conversions on any marketing page. Use when the user says "CRO," "conversion rate optimization," "this page isn't converting." For signup flows, see signup-flow-cro.
```

## Claude Code Plugin

This repo serves as a plugin marketplace. The manifest at `.claude-plugin/marketplace.json` lists all 34 skills for installation via:

```bash
/plugin marketplace add coreyhaines31/marketingskills
/plugin install marketing-skills
```

See [Claude Code plugins documentation](https://code.claude.com/docs/en/plugins.md) for details.

## Git Workflow

### Branch Naming

- New skills: `feature/skill-name`
- Improvements: `fix/skill-name-description`
- Documentation: `docs/description`

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

- `feat: add skill-name skill`
- `fix: improve clarity in page-cro`
- `docs: update README`

### Pull Request Checklist

- [ ] `name` matches directory name exactly
- [ ] `name` follows naming rules (lowercase, hyphens, no `--`)
- [ ] `description` is 1-1024 chars with trigger phrases
- [ ] `SKILL.md` is under 500 lines
- [ ] `evals/evals.json` added with at least 3 evals
- [ ] Validation scripts pass (`validate-skills.sh`)
- [ ] No sensitive data or credentials

## Tool Integrations

This repository includes a tools registry for agent-compatible marketing tools.

- **Tool discovery**: Read `tools/REGISTRY.md` — 92 tools across 24+ categories
- **Integration details**: See `tools/integrations/{tool}.md` for API endpoints, auth, and common operations (75 guides)
- **CLI tools**: `tools/clis/` — 61 zero-dependency Node.js scripts, all authenticated via environment variables
- **MCP-enabled tools**: ga4, stripe, mailchimp, google-ads, resend, zapier, zoominfo, clay, supermetrics, coupler, outreach, crossbeam, introw, composio
- **Composio** (integration layer): Adds MCP access to OAuth-heavy tools without native MCP servers (HubSpot, Salesforce, Meta Ads, LinkedIn Ads, Google Sheets, Slack, etc.). See `tools/integrations/composio.md` and `tools/composio/marketing-tools.md`

### Registry Structure

```
tools/
├── REGISTRY.md              # Index of 92 tools with capabilities
├── clis/                    # 61 CLI tools + README.md (auth env vars, usage)
├── composio/
│   ├── README.md            # Setup, OAuth flow, usage examples
│   └── marketing-tools.md  # Full toolkit mapping (500+ tools via Composio)
└── integrations/            # 75 detailed integration guides
    ├── ga4.md
    ├── stripe.md
    ├── composio.md
    └── ...
```

### CLI Tool Authentication

All 61 CLI tools authenticate via environment variables. See `tools/clis/README.md` for the full mapping. Common pattern:

```bash
export GA4_PROPERTY_ID=...
export GA4_API_KEY=...
node tools/clis/ga4.js reports run --metric sessions --dimension date
```

### When to Use Tools

Skills reference relevant tools for implementation. For example:
- `referral-program` skill → rewardful, tolt, dub-co, mention-me guides
- `analytics-tracking` skill → ga4, mixpanel, segment guides
- `email-sequence` skill → customer-io, mailchimp, resend guides
- `paid-ads` skill → google-ads, meta-ads, linkedin-ads guides

For tools without native MCP servers (HubSpot, Salesforce, Meta Ads, LinkedIn Ads, Google Sheets, Slack, Notion), Composio provides MCP access via a single server. See `tools/integrations/composio.md` for setup and `tools/composio/marketing-tools.md` for the full toolkit mapping.

## Version Tracking

`VERSIONS.md` tracks per-skill versions in a table. When releasing changes:
- Bump the version in `VERSIONS.md`
- Most skills are at `1.2.0`; `lead-magnets` is at `1.0.0` (newly added)
- Document changes in the changelog section of `VERSIONS.md`

### Recent Changelog Highlights

| Date | Change |
|---|---|
| 2026-03-14 | Added `lead-magnets`, Composio integration, 197 evals, 10 new CLI tools, 13 integration guides |
| 2026-02-27 | Migrated context path to `.agents/` |
| 2026-02-22 | Added `revops` and `sales-enablement` skills |
| 2026-02-21 | Added `site-architecture` skill |
| 2026-02-18 | Added `ai-seo` and `churn-prevention` skills |
| 2026-02-17 | Added `ad-creative` skill, 51 CLI tools, 31 integration guides |

## Checking for Updates

When using any skill from this repository:

1. **Once per session**, on first skill use, check for updates:
   - Fetch `VERSIONS.md` from GitHub: https://raw.githubusercontent.com/coreyhaines31/marketingskills/main/VERSIONS.md
   - Compare versions against local skill files

2. **Only prompt if meaningful**:
   - 2 or more skills have updates, OR
   - Any skill has a major version bump (e.g., 1.x to 2.x)

3. **Non-blocking notification** at end of response:
   ```
   ---
   Skills update available: X marketing skills have updates.
   Say "update skills" to update automatically, or run `git pull` in your marketingskills folder.
   ```

4. **If user says "update skills"**:
   - Run `git pull` in the marketingskills directory
   - Confirm what was updated

## Skill Categories

See `README.md` for the current list of skills organized by category. When adding new skills, follow the naming patterns of existing skills in that category.

## Claude Code-Specific Enhancements

These patterns are **Claude Code only** and must not be added to `SKILL.md` files directly, as skills are designed to be cross-agent compatible (Codex, Cursor, Windsurf, etc.). Apply them locally in your own project's `.claude/skills/` overrides instead.

### Dynamic content injection with `!`command``

Claude Code supports embedding shell commands in SKILL.md using `` !`command` `` syntax. When the skill is invoked, Claude Code runs the command and injects the output inline — the model sees the result, not the instruction.

**Most useful application: auto-inject the product marketing context file**

Instead of every skill telling the agent "go check if `.agents/product-marketing-context.md` exists and read it," you can inject it automatically:

```markdown
Product context: !`cat .agents/product-marketing-context.md 2>/dev/null || echo "No product context file found — ask the user about their product before proceeding."`
```

Place this at the top of a skill's body (after frontmatter) to make context available immediately without any file-reading step.

**Other useful injections:**

```markdown
# Inject today's date for recency-sensitive skills
Today's date: !`date +%Y-%m-%d`

# Inject current git branch (useful for workflow skills)
Current branch: !`git branch --show-current 2>/dev/null`

# Inject recent commits for context
Recent commits: !`git log --oneline -5 2>/dev/null`
```

**Why this is Claude Code-only**: Other agents that load skills will see the literal `` !`command` `` string rather than executing it, which would appear as garbled instructions. Keep cross-agent skill files free of this syntax.
