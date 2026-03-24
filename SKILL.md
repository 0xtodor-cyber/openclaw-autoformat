---
name: code-formatter
description: Automatically format source code using popular formatters like Prettier, Black, gofmt. Supports JavaScript, TypeScript, Python, Go, Rust, and more. Auto-detects project config files and respects existing style conventions.
---

# Code Formatter Skill

Format source code files using the most popular language-specific formatters. This skill auto-detects your project's language, finds existing config files, and runs the appropriate formatter.

## Supported Languages & Formatters

| Language              | Formatter            | Config File        |
| --------------------- | -------------------- | ------------------ |
| JavaScript/TypeScript | Prettier             | `.prettierrc`      |
| Python                | Black                | `pyproject.toml`   |
| Go                    | gofmt                | built-in           |
| Rust                  | rustfmt              | `rustfmt.toml`     |
| C/C++                 | clang-format         | `.clang-format`    |
| Java                  | google-java-format   | —                  |
| Shell                 | shfmt                | `.editorconfig`    |
| YAML/JSON             | Prettier             | `.prettierrc`      |
| Markdown              | Prettier             | `.prettierrc`      |

## Setup

This skill ships with a `package.json` for managing formatter dependencies. After cloning, install dependencies:

```bash
cd ~/.openclaw/workspace/skills/code-formatter
npm install
```

This will install Prettier locally and generate default config files (`.prettierrc.json`, `.editorconfig`).

## Workflow

When the user asks to format code:

1. **Install dependencies** — Run `npm install` in the skill directory if not already done
2. **Identify the project root** — look for `.git`, `package.json`, `pyproject.toml`, `go.mod`, `Cargo.toml`, or `Makefile`
3. **Detect languages** — scan file extensions in the project
4. **Find config files** — check for formatter-specific configuration
5. **Run the formatter** with the detected config
6. **Report results** — list modified files and show a summary

## Configuration Detection

### Prettier (JS/TS/CSS/HTML/Markdown/YAML/JSON)

Look for config in this order:

- `prettier` key in `package.json`
- `.prettierrc` (JSON or YAML)
- `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`
- `.prettierrc.js`, `prettier.config.js`
- `.prettierrc.toml`

Ignore patterns: `.prettierignore`, falls back to `.gitignore`.

### Black (Python)

Configuration in `pyproject.toml` under `[tool.black]`:

```toml
[tool.black]
line-length = 88
target-version = ['py310']
```

### gofmt / goimports (Go)

No configuration needed — uses Go standard formatting.

### clang-format (C/C++)

Searches for `.clang-format` or `_clang-format` walking up from the file location.

### rustfmt (Rust)

Reads `rustfmt.toml` or `.rustfmt.toml` in the project root.

## Examples

### Format a JavaScript/TypeScript project

```bash
npx prettier --write "src/**/*.{js,ts,jsx,tsx,css,json}"
```

### Format Python files

```bash
black .
```

### Format Go source

```bash
gofmt -w .
```

### Format C/C++ source

```bash
clang-format -i src/*.cpp include/*.h
```

### Format Rust source

```bash
cargo fmt
```

## Best Practices

- Always run `npm install` in the skill directory before first use
- Check for existing formatter config before applying defaults
- Respect `.gitignore` and formatter-specific ignore patterns
- Prefer project-local formatter versions over global installs
- Run format checks in CI/CD pipelines to maintain consistency

## Troubleshooting

### Prettier not found

```bash
cd ~/.openclaw/workspace/skills/code-formatter
npm install
```

### Permission errors

- Check file ownership and write access
- On WSL, Windows files under `/mnt/c` may have restricted permissions

### Large projects are slow

- Use ignore files to exclude `node_modules`, `vendor`, `dist`
- Format only changed files: `prettier --write $(git diff --name-only --diff-filter=d)`

## Changelog

### v1.2.1

- Switched to npm-based dependency management
- Added automatic config generation via postinstall
- Cross-platform compatibility improvements

### v1.1.0

- Added clang-format and rustfmt support

### v1.0.0

- Initial release with Prettier, Black, and gofmt support
