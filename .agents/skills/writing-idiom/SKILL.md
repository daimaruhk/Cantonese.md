---
name: writing-idiom
description: Use when creating new Cantonese idiom (歇後語) content — covers file scaffolding with gen:content, frontmatter completion, factual research, and free-form Cantonese content writing
---

# 寫歇後語

依份文件係寫廣東話歇後語內容嘅全套流程。每一步都要跟足，唔好跳步。

**REQUIRED SUB-SKILL:** 所有正文內容一定要跟返 `writing-cantonese` 嘅標準。寫之前一定要睇咗先。

## 幾時用

- 用戶俾咗一個或者幾個歇後語題目，要你生成內容
- 要喺 `src/contents/idioms/` 資料夾開新嘅 `.md` file
- **唔適用：** 修改已經有嘅歇後語內容（依啲直接改就得）

## 流程

### 第一步：開 file

用 CLI command 開新 file：

```bash
pnpm gen:content idioms <term>
```

依個 command 會自動喺 `src/contents/idioms/<term>.md` 建立一個有齊 blank frontmatter 嘅 markdown file。

### 第二步：填 Frontmatter

Frontmatter 有五個 field：

| 欄位             | 說明                   | 例子                                  |
| ---------------- | ---------------------- | ------------------------------------- |
| `id`             | 自動生成，唔好郁佢     | `c6kCTZQ3G6kt`                        |
| `term`           | 歇後語前半部分（謎面） | `一個酸梅兩個核`                      |
| `termJyutping`   | term 嘅粵拼            | `jat1 go3 syun1 mui4 loeng5 go3 wat6` |
| `answer`         | 歇後語後半部分（謎底） | `今時唔同往日`                        |
| `answerJyutping` | answer 嘅粵拼          | `gam1 si4 m4 tung4 wong5 jat6`        |

**粵拼格式：**

- 全部細楷英文 + 聲調 1-6
- 每個音節之間用空格分開
- ❌ `Jat1 Go3` ❌ `jat1go3` ❌ `jat1 go3 syun1 mui4 7`
- ✅ `jat1 go3 syun1 mui4`

**唔肯定粵拼嘅時候：** 用網上嘅粵拼字典（例如 words.hk、粵典）查吓先。唔好靠估。

### 第三步：資料搜集

寫任何嘢之前，一定要做 research。依步係**冇得傾嘅**。

**規矩：**

1. **搵多過一個 source。** 淨係得一個來源係唔夠嘅，最少要有兩個獨立來源交叉驗證。
2. **如果唔同 source 講嘅嘢唔同？** 就要搵多啲資料睇吓邊個先啱。如果真係搞唔清，內容入面都要寫返依家有唔同講法。
3. **「自我 Fact Check」：** 寫完之後問吓自己——如果有個廣東話 native speaker 質疑你嘅解釋，你攞唔攞得出 source 支持？如果答唔出、攞唔到證據嘅話，就唔好寫落去。
4. **唔好用黑名單網站。** 依啲網站嘅資料質素好差或者唔可靠，千祈唔好引用：

- http://travel103.com

### 第四步：寫正文

**REQUIRED SUB-SKILL:** 開始寫之前，一定要睇咗 `writing-cantonese` skill 先。所有正文一定要跟足入面嘅標準。

**正文冇固定格式。** 唔好俾 template 框死——每一條歇後語嘅故事同背景都唔同，應該按返內容去寫最適合嘅 structure。

以下係一啲你可以寫嘅方向（唔代表每篇都要寫齊）：

- 字面解法
- 背後意思 / 引申義
- 來源或者典故
- 例句（用 blockquote `>`）
- 相關嘅歷史、文化背景
- 同其他歇後語嘅關係或者比較
- 有趣嘅冷知識

**寫嘅時候要記住：**

- 用自然嘅廣東話口語，唔好寫到好似教科書咁生硬
- 標題用 `# <term>──<answer>` 格式
- 可以用粗口或者俗語（如果夾到語境），參考 `writing-cantonese` 嘅指引
- 每篇寫幾長係由內容決定——豐富嘅就寫多啲，簡單嘅話就唔好夾硬寫長佢

## 常見錯誤

| 錯誤                     | 點解唔得                                   |
| ------------------------ | ------------------------------------------ |
| 冇做 research 就寫       | 歇後語嘅來源同意思好容易搞錯，唔查證會出事 |
| 粵拼用咗大楷或者冇聲調   | 唔符合 schema 正則，build 會 fail          |
| 每篇都用同一個模板結構   | 失去咗 free-form 嘅意義，內容會好悶        |
| 用書面語寫正文           | 唔符合 `writing-cantonese` 嘅標準          |
| 只搵咗一個來源就當正確   | 有可能搵到嘅係錯嘅，最少要兩個來源         |
| 用咗黑名單網站嘅資料     | 資料質素差，唔可靠                         |
| 冇睇 `writing-cantonese` | 正文嘅語言質素會唔達標                     |
