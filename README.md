<p align="center">
  <a href="https://cantonese.md">
    <img src="./public/assets/brand.webp" width="300" alt="Cantonese.md Logo">
  </a>
</p>

# Cantonese.md

> **Preserving and promoting the beauty of Cantonese through open-source data and modern technology.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-https%3A%2F%2Fcantonese.md-blue?style=for-the-badge)](https://cantonese.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](./LICENSE)
[![Data: CC0](https://img.shields.io/badge/Data-CC0-green.svg?style=for-the-badge)](./LICENSE-DATA)

---

## 🌟 The Vision

**Cantonese.md** is an open-source initiative dedicated to the preservation of Cantonese language and culture.

In the age of AI, the survival of a language depends on the quality and quantity of its digital footprint. Current Large Language Models (LLMs) often struggle with Cantonese due to a lack of high-quality training data. This project aims to bridge that gap by building a human-supervised, high-quality dataset of Cantonese knowledge.

We're starting with Cantonese idioms (歇後語), but this is just the beginning. We would love to grow beyond that over time, and we need your help.

## ✨ Features

- **Open for All:** Everyone is welcome to contribute, from the classic idioms you find in books to the slangs your grandma uses, anything is welcome as long as they are related to Cantonese.
- **Wide Coverage:** With over **100 million** people speaking Cantonese worldwide, we aim to document as much of the language as possible.
- **High-Quality Data:** Human supervision ensures data integrity, correct grammar, and authentic word usage.
- **Modern UI:** A modern and user-friendly interface for browsing and discovering Cantonese idioms and slangs.
- **Portable:** Fully statically generated for maximum performance and easy hosting.

---

## 📝 Dataset

Every entry in `src/contents/` is a Markdown file. A typical entry looks like this:

```markdown
---
id: iRNL7TmVZbOW
term: 阿茂整餅
termJyutping: aa3 mau6 zing2 beng2
answer: 冇嗰樣整嗰樣
answerJyutping: mou5 go2 joeng6 zing2 go2 joeng6
---

# 阿茂整餅──冇嗰樣整嗰樣

## 字面意思

相傳以前廣州有位出色嘅做餅師傅叫「阿茂」...
```

### Why Markdown?

We use Markdown as our primary storage format because:

- **AI-Friendly:** It’s one of the best formats for LLM parsing and training.
- **Human-Readable:** Anyone can read, edit, and contribute without specialized tools.
- **Flexible:** It supports richer context beyond simple key-value pairs, including explanations, examples, and cultural notes.

---

## 🚀 Local Setup

See the [Development Guide](./docs/development.md) for requirements, installation steps, and the full CLI command reference.

## 🤝 How to Contribute

We need your help! Whether you are a native speaker, a researcher, or a developer:

1.  **Add Content:** Extend the Cantonese library with more idioms, slangs, and other Cantonese-related content.
2.  **Improve Quality:** Fact check content, correct grammar, or refine word usage.
3.  **Improve Code:** Enhance UI/UX components.

Check out our [**Contributing Guide**](./CONTRIBUTING.md) to get started.

### Get in Touch

- **General Discussion:** [GitHub Discussions](https://github.com/daimaruhk/Cantonese.md/discussions)
- **Found a Bug?** [Report it here](https://github.com/daimaruhk/Cantonese.md/issues/new?template=bug_report.md)
- **Have an Idea?** [Request a feature](https://github.com/daimaruhk/Cantonese.md/issues/new?template=feature_request.md)

---

## ⚖️ License

This project is dual-licensed to ensure both the software and the data are used appropriately:

- **Software & Codebase:** Licensed under the [MIT License](./LICENSE).
- **Data & Content:** All markdown files in the `src/contents/` directory are dedicated to the public domain under the [CC0 1.0 Universal License](./LICENSE-DATA).
