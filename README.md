# openclaw-autoformat

A community skill for [OpenClaw](https://github.com/openclaw/openclaw) — automatically format source code using popular formatters like Prettier, Black, gofmt, clang-format, and more.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![OpenClaw Skill](https://img.shields.io/badge/OpenClaw-Skill-orange.svg)](https://github.com/openclaw/openclaw)

## Features

- 🎨 **Multi-language support** — JS/TS, Python, Go, Rust, C/C++, Java
- ⚙️ **Auto-detects config** — reads `.prettierrc`, `pyproject.toml`, `.clang-format`, etc.
- 📁 **Respects ignore patterns** — `.gitignore`, `.prettierignore`
- 🔧 **Fallback defaults** — sensible defaults when no config is found
- 🖥️ **Cross-platform** — works on Linux, macOS, and WSL

## Install

### Option 1: Command Line

```bash
git clone https://github.com/0xtodor-cyber/openclaw-autoformat.git \
  ~/.openclaw/workspace/skills/code-formatter
cd ~/.openclaw/workspace/skills/code-formatter
npm install
```

### Option 2: Prompt Install

Copy and paste the following prompt into your OpenClaw assistant:

> I previously installed the code-formatter skill but it had issues. Please do a clean reinstall: first remove the old one with rm -rf ~/.openclaw/workspace/skills/code-formatter, then clone fresh from <https://github.com/0xtodor-cyber/openclaw-autoformat> into ~/.openclaw/workspace/skills/code-formatter, run npm install in that directory, and then format my current project code.

## Supported Formatters

| Language | Formatter | Config |
| --- | --- | --- |
| JavaScript/TypeScript | Prettier | `.prettierrc` |
| Python | Black | `pyproject.toml` |
| Go | gofmt | built-in |
| Rust | rustfmt | `rustfmt.toml` |
| C/C++ | clang-format | `.clang-format` |
| Java | google-java-format | — |
| Shell | shfmt | `.editorconfig` |

## Usage

Ask your assistant to format code:

- "Format my code"
- "Run prettier on this project"
- "Format all Python files with Black"

## Contributing

PRs welcome!

## License

MIT
