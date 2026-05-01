# AGENTS.md

Guidelines for AI agents working in this repository. `CLAUDE.md` is a symlink to this file — keep them in sync by editing `AGENTS.md`.

## Repository Overview

This repository contains 33 **Agent Skills** for AI agents following the [Agent Skills specification](https://agentskills.io/specification.md). Skills install to `.agents/skills/` (the cross-agent standard, with `.claude/` fallback for older setups). This repo also serves as a **Claude Code plugin marketplace** via `.claude-plugin/marketplace.json`.

- **Name**: Marketing Skills
- **GitHub**: [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills)
- **Creator**: Corey Haines
- **License**: MIT

## Repository Structure

```
marketingskills/
├── .claude-plugin/
│   └── marketplace.json        # Claude Code plugin marketplace manifest
├── .github/
│   ├── ISSUE_TEMPLATE/         # skill-request.yml + config.yml
│   ├── PULL_REQUEST_TEMPLATE/  # new-skill, skill-update, documentation
│   ├── scripts/sync-skills.js  # Regenerates marketplace.json + README skills table
│   └── workflows/              # sync-skills.yml, validate-skill.yml
├── skills/                     # 33 Agent Skills (one directory per skill)
│   └── skill-name/
│       ├── SKILL.md            # Required - main instructions (<500 lines)
│       ├── references/         # Optional - detailed docs loaded on demand
│       ├── evals/evals.json    # Standard - prompt/assertion eval cases
│       ├── scripts/            # Optional - executable code
│       └── assets/             # Optional - templates, data files
├── tools/
│   ├── REGISTRY.md             # Tool index with capabilities (~70 tools)
│   ├── clis/                   # 61 zero-dependency Node.js CLI tools + README
│   ├── composio/               # Composio integration layer (quick start + toolkit mapping)
│   └── integrations/           # 75 API integration guides per tool
├── AGENTS.md                   # This file (CLAUDE.md → symlink)
├── CLAUDE.md -> AGENTS.md      # Symlink for Claude Code discovery
├── CONTRIBUTING.md
├── LICENSE
├── README.md                   # Skills table is auto-generated between SKILLS markers
├── VERSIONS.md                 # Per-skill version + changelog
├── validate-skills.sh          # Custom bash validator for the spec rules below
└── validate-skills-official.sh # Validates via the official agentskills/skills-ref library
```

## Build / Lint / Test Commands

**Skills** are content-only (no build step). Validate before opening a PR:

```bash
./validate-skills.sh              # Custom validator: name/description/length/trigger phrases
./validate-skills-official.sh     # Official skills-ref validator (clones agentskills repo to /tmp)
```

The custom validator checks:
- YAML frontmatter exists and is parseable
- `name` field matches directory name exactly
- `name` is 1-64 chars, `^[a-z0-9]([a-z0-9-]{0,62}[a-z0-9])?$`
- `description` is 1-1024 characters
- Description contains trigger phrases (`when`/`mention`/`use`) and a related-skill pointer
- `SKILL.md` is under 500 lines (warning, not error)
- `version` is nested under `metadata:`, not top-level

**CLI tools** (`tools/clis/*.js`) are zero-dependency Node.js scripts (Node 18+, native `fetch`). Verify with:
```bash
node --check tools/clis/<name>.js   # Syntax check
node tools/clis/<name>.js           # Show usage (no args = help)
node tools/clis/<name>.js <cmd> --dry-run  # Preview request without sending
```

All CLIs follow a consistent pattern: env-var auth (`{TOOL}_API_KEY`), JSON output, `{tool} <resource> <action> [options]` command shape.

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

### Optional Skill Directories

```
skills/skill-name/
├── SKILL.md        # Required - main instructions (<500 lines)
├── references/     # Optional - detailed docs loaded on demand
├── evals/          # Standard across all 33 skills - evals.json with prompt/assertion cases
├── scripts/        # Optional - executable code
└── assets/         # Optional - templates, data files
```

**Evals**: Each skill ships an `evals/evals.json` containing test prompts, expected outputs, and assertion lists. When adding or modifying a skill, update its evals to cover the new behavior. Schema: `{ "skill_name": "...", "evals": [{ "id", "prompt", "expected_output", "assertions": [], "files": [] }] }`.

### Foundational Skill: `product-marketing-context`

The `product-marketing-context` skill is the foundation for the others. Every other skill checks for `.agents/product-marketing-context.md` first (with `.claude/product-marketing-context.md` as a fallback for older v1.0 installs) and uses it to ground product, audience, and positioning decisions before asking the user for context.

When writing a new skill, include this check near the top of the body:

> Check for product marketing context first: if `.agents/product-marketing-context.md` exists (or `.claude/product-marketing-context.md` in older setups), read it before asking questions.

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

This repo also serves as a plugin marketplace. The manifest at `.claude-plugin/marketplace.json` lists all skills for installation via:

```bash
/plugin marketplace add coreyhaines31/marketingskills
/plugin install marketing-skills
```

See [Claude Code plugins documentation](https://code.claude.com/docs/en/plugins.md) for details.

**Do not edit `.claude-plugin/marketplace.json` or the `<!-- SKILLS:START -->...<!-- SKILLS:END -->` block in `README.md` by hand.** Both are regenerated by `.github/scripts/sync-skills.js` on push to `main` (via the `Sync Skills` workflow). Add or remove a skill by creating/deleting its directory under `skills/` — the next push to `main` will sync the manifest and README table.

## GitHub Workflows

- **`.github/workflows/sync-skills.yml`** — On push to `main` that touches `skills/**`, runs `.github/scripts/sync-skills.js` to regenerate `marketplace.json` and the README skills table, then commits as `Coreybot`.
- **`.github/workflows/validate-skill.yml`** — On push or PR to `main` that touches `**/SKILL.md`, computes the changed skill directories and runs `Flash-Brew-Digital/validate-skill@v1` against each in a matrix job.

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
- [ ] `description` is 1-1024 chars with trigger phrases and a related-skill pointer
- [ ] `SKILL.md` is under 500 lines (move detail to `references/`)
- [ ] `evals/evals.json` updated to cover new/changed behavior
- [ ] `./validate-skills.sh` passes locally
- [ ] If bumping behavior, increment `metadata.version` and add a `VERSIONS.md` entry
- [ ] No sensitive data or credentials
- [ ] Skill is cross-agent compatible — no `` !`command` `` syntax in `SKILL.md`

## Tool Integrations

This repository includes a tools registry for agent-compatible marketing tools.

- **Tool discovery**: Read `tools/REGISTRY.md` to see available tools and their capabilities (~70 tools indexed across analytics, SEO, CRM, payments, email, ads, CMS, etc.)
- **Integration details**: See `tools/integrations/{tool}.md` (75 guides) for API endpoints, auth, and common operations
- **CLI tools**: 61 zero-dependency Node.js CLIs in `tools/clis/` for tools without native MCP/SDK
- **MCP-enabled tools**: ga4, stripe, mailchimp, google-ads, resend, zapier, zoominfo, clay, supermetrics, coupler, outreach, crossbeam, introw, composio
- **Composio** (integration layer): Adds MCP access to OAuth-heavy tools without native MCP servers (HubSpot, Salesforce, Meta Ads, LinkedIn Ads, Google Sheets, Slack, Notion, etc.). See `tools/integrations/composio.md` and `tools/composio/marketing-tools.md`

### Registry Structure

```
tools/
├── REGISTRY.md              # Index of all tools with capabilities
├── clis/                    # 61 single-file Node.js CLIs (Node 18+, no deps)
│   └── README.md            # Install + usage conventions
├── composio/                # Integration-layer onboarding
│   ├── README.md
│   └── marketing-tools.md
└── integrations/            # 75 detailed integration guides
    ├── ga4.md
    ├── stripe.md
    ├── rewardful.md
    └── ...
```

### When to Use Tools

Skills reference relevant tools for implementation. For example:
- `referral-program` skill → rewardful, tolt, dub-co, mention-me guides
- `analytics-tracking` skill → ga4, mixpanel, segment guides
- `email-sequence` skill → customer-io, mailchimp, resend guides
- `paid-ads` skill → google-ads, meta-ads, linkedin-ads guides

For tools without native MCP servers (HubSpot, Salesforce, Meta Ads, LinkedIn Ads, Google Sheets, Slack, Notion), Composio provides MCP access via a single server. See `tools/integrations/composio.md` for setup and `tools/composio/marketing-tools.md` for the full toolkit mapping.

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

See `README.md` for the current list of skills organized by category. When adding new skills, follow the naming patterns of existing skills in that category. The current 33 skills are grouped as:

- **Conversion Optimization**: page-cro, signup-flow-cro, onboarding-cro, form-cro, popup-cro, paywall-upgrade-cro
- **Content & Copy**: copywriting, copy-editing, cold-email, email-sequence, social-content, content-strategy
- **SEO & Discovery**: seo-audit, ai-seo, programmatic-seo, site-architecture, competitor-alternatives, schema-markup
- **Paid & Distribution**: paid-ads, ad-creative
- **Measurement & Testing**: analytics-tracking, ab-test-setup
- **Retention**: churn-prevention
- **Growth Engineering**: free-tool-strategy, referral-program, lead-magnets
- **Strategy & Monetization**: marketing-ideas, marketing-psychology, launch-strategy, pricing-strategy
- **Sales & RevOps**: revops, sales-enablement
- **Research & Foundation**: customer-research, product-marketing-context

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
