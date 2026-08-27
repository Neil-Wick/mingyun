# BaZi Career - 英文东方命理出海产品 PRD V1.0

> Document Version: 1.0  
> Date: 2026-08-26  
> Status: Draft (阶段一执行)  
> Deployment Target: 纯静态多平台（Netlify Drop / Cloudflare Pages / GitHub Pages 三选一 · $0）
> （Next.js Static Export 产出 `./out/`，任意静态托管平台都可部署；参见 `mvp-bazi-career/README.md`）

---

## 一、为什么做（底层逻辑与核心假设）

### 1.1 市场机会

| 维度 | 数据/判断 |
|------|-----------|
| 全球灵性经济规模 | ~1,862亿美元（2025），CAGR 4%+ |
| 主力消费人群 | Z世代 + 千禧一代，65%+ 主动投资灵性健康 |
| 西方竞品教育市场 | Co-Star / Sanctuary 已验证"输入生辰→个性化解读"的产品心智 |
| 东方命理英文空白 | 八字/风水在英文世界无系统化专业产品，仅散落在博客/YouTube |
| 竞争格局 | 全球东方玄学站点 < 几十个，头部玩家（Hoseiki / Buddha Stones / FateTell）已验证付费模型，但中间层极度空缺 |

### 1.2 结构性优势

- **技术自主**：排盘引擎基于 tyme4ts 自研，零外包依赖
- **数据驱动**：全流程埋点，用数据而非直觉决策
- **零成本启动**：Next.js + 静态托管（Netlify/Cloudflare/GitHub Pages 任一）+ tyme4ts 覆盖 MVP 全链路，$0 前置投入
- **试错兜底**：在职收入托底，失败仅损失业余时间

### 1.3 核心假设（整条链路待验证命题）

> **英文用户对"在线八字排盘 + 职业时机分析"存在未被满足的需求，且愿意为此留下联系方式甚至付费。**

后续每一个阶段都在验证该链路中的一个环节，验证不通过则止损/转向。

---

## 二、终态定义（做到最终长什么样）

### 2.1 终态产品架构

```
英文东方命理品牌站
├── 免费工具体系（获客引擎）
│   ├── 八字排盘计算器（核心流量入口）
│   ├── 职业时机分析工具
│   ├── 流年运势预测工具
│   ├── 合盘工具（伴侣/合伙人）
│   └── 风水评估工具
│
├── 内容体系（SEO + 权威性）
│   ├── 100+ 篇英文长尾SEO文章
│   ├── 支柱页 + 话题集群架构
│   ├── 真实案例库
│   └── 术语词典 / 百科
│
├── 付费产品体系（变现引擎）
│   ├── 个性化排盘报告  $14.9 - $29.9
│   ├── 年度运势报告     $9.9
│   ├── 1对1视频咨询     $50 - $200 / 次
│   └── 会员订阅         $9.9 / 月（月度运势+社群）
│
├── 用户资产（护城河）
│   ├── 邮件列表 10,000+
│   ├── 社交媒体粉丝 50,000+
│   ├── 谷歌自然搜索日均UV 3,000+
│   └── 品牌心智：英文东方命理第一站
│
└── 月收入结构 $5,000 - $15,000
    ├── 付费报告   40%
    ├── 咨询服务   25%
    ├── 会员订阅   20%
    └── 联盟+实体  15%
```

---

## 三、阶段划分与门控机制（核心）

> **原则：每阶段只有一个核心验证命题；上阶段通过 → 才进下阶段；不通过 → 调整 / 止损。**

| 阶段 | 时间跨度 | 核心命题 | 通过标准（任一即可） | 止损标准 | 累计投入时间 | 累计投入金钱 |
|------|----------|----------|----------------------|----------|--------------|--------------|
| **阶段一：需求验证** | 第 1-4 周 | 英文用户是否愿意使用在线八字排盘工具？ | ① 周UV > 30 ② 自然回访率 > 10% ③ 收到非自发主动反馈 | 4周后周UV < 10 且 零反馈 | 40-60h | $0-12 |
| **阶段二：资产沉淀** | 第 5-8 周 | 用完工具的人是否愿意留邮箱换深度解读？ | ① 邮箱转化率 > 5% ② 退订率 < 5% | 8周后邮箱转化率 < 2%（再试4周仍不达标则停） | 60-90h | $0-12 |
| **阶段三：付费验证** | 第 9-16 周 | 订阅用户是否愿意为深度报告付费？ | ① 付费转化率 > 1% ② 复购/咨询意向 > 3 | 16周零付费 → 转流量站/调整 | 120-170h | $0-12 |
| **阶段四：有机增长** | 第 17-36 周 | SEO 内容能否带来持续自然流量增长？ | 月12: 日均UV>200, 邮件>500；月18: 日均UV>500, 月收入>$500；月24: 日均UV>1000, 月收入>$1500 | 月12后日均UV仍 < 100 且零增长趋势 | 300-500h | $0-200 |
| **阶段五：产品矩阵** | 月 13-24 | 单品类能否扩展为产品矩阵？ | ① SKU > 3 个 ② 复购率 > 15% ③ 月收入破 $3,000 | — | 500-800h | $200-500 |
| **阶段六：品牌壁垒** | 月 25+ | 能否从工具站升级为英文东方命理第一品牌？ | 邮件10k+, 社交50k+, 月收入$5k-15k, 谷歌ba zi关键词前3 | — | 持续投入 | 收入驱动 |

---

## 四、各阶段详细动作拆解

### 阶段一：需求验证（第 1-4 周）—— 当前执行阶段

**NOT DO 清单：**
- ❌ 不写文章 / 不做 SEO
- ❌ 不接邮件系统
- ❌ 不做付费功能
- ❌ 不开社交账号
- ❌ 不追求完美 UI

**DO 清单（仅此而已）：**

| # | 动作 | 交付标准 |
|---|------|----------|
| 1 | 域名方案 | 优先 bazicareer.com（~$12），或直接用 Netlify/Cloudflare/Pages 免费子域名（$0） |
| 2 | 单页面 MVP | 标题 "Free Ba Zi Career Reading" + 输入表单（出生日期/时间/性别）+ 结果区（四柱八字 + 五行分布图 + 日主3-4句简析）+ 底部 "Was this helpful?" 反馈按钮 |
| 3 | 技术栈 | Next.js 14 (App Router) + TypeScript + Tailwind CSS + tyme4ts（排盘核心库） |
| 4 | 部署 | 先 `npm run build` 产出 `./out/` 静态文件夹，拖进 Netlify Drop（最快 30s）或上传 Cloudflare Pages / GitHub Pages |
| 5 | 冷启动引流（3 个渠道） | ① Reddit r/astrology / r/taoism 发帖 ② TikTok 1-2 条短视频 ③ Twitter/X 几条带链接推文 |
| 6 | 数据观察窗口 | 2-4 周，核心看 UV / 回访率 / 反馈数 |

**MVP 功能规格（阶段一）详见本 PRD 第七节。**

---

### 阶段二：资产沉淀（第 5-8 周）

**核心动作：**

| # | 动作 | 说明 |
|---|------|------|
| 1 | 排盘结果页改造 | 免费展示前 60% 内容，剩余深度解读需留邮箱解锁 |
| 2 | 接入邮件服务 | Resend / Brevo（免费额度足够） |
| 3 | 欢迎邮件序列 | 3 封自动化邮件：① 解锁报告 ② 八字基础知识 ③ 职业时机小贴士 |
| 4 | 隐私合规 | GDPR / CCPA 友好的 Unsubscribe 链接 |

---

### 阶段三：付费验证（第 9-16 周）

**核心动作：**

| # | 动作 | 说明 |
|---|------|------|
| 1 | 付费报告模板 | 10-20 页 PDF：完整八字拆解 + 五行职业匹配 + 10 年大运流年 + 行动建议 |
| 2 | 支付接入 | Stripe（按交易抽成，无预付），价格点 $14.9（基础）/ $29.9（含流年） |
| 3 | 邮件转化序列 | 订阅后 7 天 5 封转化邮件，免费报告引导付费升级 |
| 4 | 首批内容 | 5 篇高意图 SEO 文章打底（"what is ba zi career" 类） |

---

### 阶段四：有机增长引擎（第 17-36 周）

**四大抓手并行：**

1. **内容规模化**：每周 2-3 篇英文长尾文，50 篇清单按优先级执行，每篇内链排盘工具
2. **SEO 技术优化**：Schema 标记 / Core Web Vitals / Sitemap / 外链（Guest Post + Reddit/Quora）
3. **社交矩阵启动**：TikTok 每周 2-3 条（排盘案例）/ YouTube 每月 2-4 条（深度教学）/ Pinterest 信息图
4. **数据驱动迭代**：每周复盘「流量关键词 / 转化文章 / 付费路径」，资源集中在转化率最高方向

---

### 阶段五：产品矩阵化（月 13-24）

| 方向 | 新 SKU |
|------|--------|
| 横向扩展 | 流年运势报告、合盘报告、风水评估 |
| 纵向深入 | 1对1视频咨询（Calendly + Zoom）、月度会员社群（Discord/Patreon） |
| 运营提效 | A/B 测试落地页、邮件序列优化、复购引导、老客升级 |

---

### 阶段六：品牌化与壁垒（月 25+）

- **内容壁垒**：Kindle 电子书 / Udemy 在线课程 / 术语标准体系 / 从业者内容平台化
- **社区壁垒**：付费社群 / 工作坊 / UGC 排盘故事
- **品牌壁垒**：播客访谈 / 西方占星联名 / "东方命理 = 你的品牌" 心智占领

---

## 五、资源投入与时间分配

### 5.1 阶段投入总览（同前表）

### 5.2 每日时间分配建议（假设每日 2h 可投入）

**阶段一（前 4 周）：**
```
工作日：每日 2h 开发排盘工具
周末：  每日 4h 集中攻坚
合计：  ~80h / 4周
```

**阶段二-三（第 5-16 周）：**
```
工作日：每日 1.5h（开发 + 写文章交替）
周末：  每日 3h（集中开发新功能）
合计：  ~150h / 12周
```

**阶段四（第 17-36 周）：**
```
工作日：每日 1h（写文章 + 数据复盘）
周末：  每日 2-3h（内容生产 + 社交媒体）
合计：  ~300h / 20周
```

---

## 六、关键风险与应对预案

| # | 风险 | 影响 | 应对方案 |
|---|------|------|----------|
| 1 | Google AI Overview 侵蚀 SEO 流量 | 信息型关键词 CTR 持续下降 | ① Day1 锚定工具型流量（排盘工具 AI 替代不了） ② 内容偏个性化解读而非通用科普 ③ 邮件列表 + 社交做流量备份 |
| 2 | 英文内容产出瓶颈 | 50 篇长文非母语负担重 | ① AI 写初稿 + 你审校补案例 ② 优先「高意图 + 低竞争」长尾，不追求篇篇爆款 ③ Fiverr $20-50/篇找母语润色 |
| 3 | 文化翻译翻车 | 直译术语导致英文读者误解 | ① 建立术语对照表（见附录 A） ② 每篇找 1-2 个母语朋友试读 ③ 对齐 Hoseiki / Buddha Stones 用语习惯 |
| 4 | 全职加班挤占时间 | Momentum 断裂 | ① 每阶段设「最低可接受进度」而非理想进度 ② 工作日做轻量（写文/回评）周末攻坚 ③ 连续 2 周零投入允许暂停但不放弃 |
| 5 | 赛道天花板低于预期 | 月 $1-2k 后增长停滞 | ① 阶段五横向扩展（风水/紫微/姓名学）或纵向深入（教育平台/咨询品牌） ② 最坏：作为 Portfolio，技术/SEO/作品集不亏 |

---

## 七、退出机制（提前定义「什么时候该停」）

| 时间节点 | 止损信号 | 退出动作 | 沉没成本 |
|----------|----------|----------|----------|
| 第 4 周末 | 排盘工具周UV < 10 且零用户反馈 | 停止，域名不续费即可 | $0-12 + 40-60h |
| 第 8 周末 | 邮箱转化率 < 2% | 调整价值主张再试 4 周，仍不达标停 | $0-12 + 60-90h |
| 第 16 周末 | 零付费订单 | 转纯流量站（广告变现）或停止 | $0-12 + 120-170h |
| 第 24 周末 | 日均UV < 100 且月收入 < $100 | 认真评估，考虑转型/退出 | $0-200 + 300-500h |
| **任何时候** | 项目严重影响主业或健康 | **无条件暂停** | 健康 > 一切 |

> **沉没成本非零收获**：Next.js 全栈能力 / SEO 实操经验 / 可展示 Side Project——这些不会归零。

---

## 八、决策原则（每个岔路口的判断依据）

1. **先验证需求，再投入资源** —— 门控机制的意义
2. **工具优先于内容** —— 排盘工具是不可替代的核心资产，文章是辅助
3. **资产优先于流量** —— 邮件列表 / 域名 / 品牌是能带走的，平台流量不是
4. **数据优先于直觉** —— 你是工程师，用数据说话
5. **最小可逆投入** —— 每一步选「做错了损失最小」的方案
6. **收入驱动花钱** —— 有收入再升级，不前置投入

---

## 九、MVP 功能规格（阶段一 · 立即执行）

### 9.1 技术栈

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | Next.js 14 (App Router) + TypeScript | Static Export 输出 `./out/`，任何静态托管一键部署 |
| 样式 | Tailwind CSS 3.x | 快速搭 UI，无需写自定义 CSS |
| 排盘引擎 | tyme4ts ^1.5.x | 久经验证的中文历法/干支核心库，see your bz 项目已实战跑通 |
| 图表 | 纯 SVG（五行分布柱状图） | 避免超重依赖 |
| 图标 | lucide-react | 轻量、现代化 |
| 部署 | Netlify Drop / Cloudflare Pages / GitHub Pages（均免费） | 浏览器拖拽 `./out/` 即可上线，零 CLI 登录门槛 |

### 9.2 页面结构（单页应用）

```
<LandingPage />
├── <HeroSection />
│   ├── H1: "Free Ba Zi Career Reading"
│   ├── Subtitle: "Discover your career destiny using ancient Chinese astrology"
│   └── Trust Badge Row: "Based on 2000+ years of Ba Zi (四柱八字) methodology"
│
├── <InputFormSection />
│   ├── Date of Birth (date picker)
│   ├── Time of Birth (time picker, 可选 "Unknown")
│   ├── Gender (Male / Female)
│   ├── [Generate My Reading] 主 CTA
│   └── 下方小字："No email required. 100% free & private."
│
└── <ResultSection />  ← 初始隐藏，计算完后展开 / 滚动锚定
    ├── <FourPillarsCard />   ← 四柱八字卡片（年柱/月柱/日柱/时柱，每柱显示天干+地支+对应五行+生肖）
    ├── <FiveElementsChart /> ← 五行分布可视化（木火土金水计数 + 柱状/饼图 + 强弱标签）
    ├── <DayMasterAnalysis /> ← 日主简析（3-4 句英文：你的日主是 X，X 的性格特质，适合的职业方向速览）
    └── <FeedbackWidget />    ← "Was this helpful?" 👍 / 👎 按钮 + 可选文本框提交

<Footer />
    ├── Brand + Tagline
    └── Copyright 2026
```

### 9.3 核心数据结构（基于 tyme4ts）

```ts
// 输入
interface BaziInput {
  birthDate: Date;      // 本地时区（MVP 默认 UTC+8 或按浏览器时区，后续加时区选择）
  birthTime?: string;   // "HH:mm"，缺省时用 12:00 或标注 "Time Unknown"
  gender: 'male' | 'female';
}

// 输出
interface BaziReading {
  fourPillars: {
    year:  { stem: string; branch: string; element: string; zodiac: string; stemEn: string; branchEn: string };
    month: { stem: string; branch: string; element: string; zodiac: string; stemEn: string; branchEn: string };
    day:   { stem: string; branch: string; element: string; zodiac: string; stemEn: string; branchEn: string };
    hour:  { stem: string; branch: string; element: string; zodiac: string; stemEn: string; branchEn: string } | null; // 时辰未知时为 null
  };
  fiveElements: { wood: number; fire: number; earth: number; metal: number; water: number };
  dayMaster: {
    stem: string;       // 日主天干，如 "甲"
    stemEn: string;     // "Jia Wood"
    element: 'wood' | 'fire' | 'earth' | 'metal' | 'water';
    personality: string;   // 2-3 句英文性格特质
    careerHints: string[]; // 3 条适合职业方向
  };
}
```

### 9.4 术语翻译对照表（节选 · 完整见附录 A）

| 中文 | 英文（推荐） | 备注 |
|------|-------------|------|
| 八字 | Ba Zi (Four Pillars of Destiny) | 首次出现括号注释，后简称 Ba Zi |
| 四柱 | Four Pillars | Year / Month / Day / Hour Pillar |
| 天干 | Heavenly Stem | 10 Stems: Jia, Yi, Bing, Ding, Wu, Ji, Geng, Xin, Ren, Gui |
| 地支 | Earthly Branch | 12 Branches: Zi, Chou, Yin, Mao, Chen, Si, Wu, Wei, Shen, You, Xu, Hai |
| 五行 | Five Elements | Wood / Fire / Earth / Metal / Water |
| 日主 | Day Master | 即日柱天干，八字核心，首译 Day Master |
| 五行缺 X | Weak / Missing X Element | 直译 "lack" 略生硬，用 weak/missing 更自然 |
| 喜用神 | Favorable Element(s) | 避免直译成 "Useful God"，易引起宗教误解 |

### 9.5 埋点 & 数据采集（阶段一最小集合）

| 事件名 | 触发时机 | 采集字段 | 工具 |
|--------|----------|----------|------|
| `page_view` | 落地页加载 | referrer, utm_*, userAgent | 所在平台自带 Analytics（Netlify / Cloudflare 都有免费版） |
| `form_submit` | 点击 Generate My Reading | 性别, 是否填了出生时间 | 自定义事件（存 localStorage） |
| `result_shown` | 结果区成功渲染 | 五行计数（脱敏）, 日主五行 | 自定义事件（存 localStorage） |
| `feedback_click` | 点 👍/👎 | helpful: boolean, optional text | 自定义事件（存 localStorage） |

> 阶段一不接第三方分析平台，用静态托管平台自带 Analytics + localStorage 存反馈即可。数据到第 4 周复盘时，把浏览器导出的 localStorage JSON 复制到本地分析也行。

---

## 十、里程碑 Checklist（阶段一 · 4周）

- [ ] Week 1：项目脚手架 + tyme4ts 排盘算法跑通（本地 ts-node 验证一组已知八字）
- [ ] Week 1：Tailwind + 表单 UI 搭好，静态样式通过
- [ ] Week 2：四柱卡片 + 五行图 + 日主分析 3 个组件联调
- [ ] Week 2：`npm run build` 产出 `./out/` → 拖进 Netlify Drop / Cloudflare Pages 部署上线，公网域名可访问
- [ ] Week 3：Reddit 发帖 + TikTok 视频 + Twitter 推文各至少 1 条
- [ ] Week 3：部署平台自带 Analytics 已开启（Netlify Analytics / Cloudflare Analytics）→ 首波数据回传
- [ ] Week 4：数据复盘，判断是否达标（周UV>30 / 回访>10% / 有反馈）
- [ ] Week 4：做出决策：进阶段二 / 调整 / 止损

---

## 附录 A：术语翻译对照表（完整版 · 持续维护）

### A.1 核心概念

| 中文 | 英文 | 说明 |
|------|------|------|
| 八字命理 | Ba Zi Astrology / Four Pillars of Destiny | 首出现用全称，后用 Ba Zi |
| 四柱 | Four Pillars | Year Pillar / Month Pillar / Day Pillar / Hour Pillar |
| 天干 | Heavenly Stem (Stem) | 简称 Stem |
| 地支 | Earthly Branch (Branch) | 简称 Branch |
| 五行 | Five Elements | 木 Wood / 火 Fire / 土 Earth / 金 Metal / 水 Water |
| 日主 / 日元 | Day Master | 八字命盘核心 |
| 喜用神 | Favorable Element(s) | 避免 Useful God |
| 忌神 | Unfavorable Element(s) | 避免 Enemy God |
| 十神 | Ten Gods | 正印 Direct Resource / 偏印 Indirect Resource 等 |
| 大运 | Major Luck Cycle / Decade Luck | 十年一运 |
| 流年 | Annual Luck / Yearly Fortune | |
| 生肖 | Chinese Zodiac Animal | Rat / Ox / Tiger / Rabbit / Dragon / Snake / Horse / Goat / Monkey / Rooster / Dog / Pig |

### A.2 十天干

| 中文 | 拼音译法 | 五行 |
|------|---------|------|
| 甲 | Jia Yang Wood | Wood |
| 乙 | Yi Yin Wood | Wood |
| 丙 | Bing Yang Fire | Fire |
| 丁 | Ding Yin Fire | Fire |
| 戊 | Wu Yang Earth | Earth |
| 己 | Ji Yin Earth | Earth |
| 庚 | Geng Yang Metal | Metal |
| 辛 | Xin Yin Metal | Metal |
| 壬 | Ren Yang Water | Water |
| 癸 | Gui Yin Water | Water |

### A.3 十二地支

| 中文 | 拼音译法 | 生肖 | 五行 |
|------|---------|------|------|
| 子 | Zi | Rat | Water |
| 丑 | Chou | Ox | Earth |
| 寅 | Yin | Tiger | Wood |
| 卯 | Mao | Rabbit | Wood |
| 辰 | Chen | Dragon | Earth |
| 巳 | Si | Snake | Fire |
| 午 | Wu | Horse | Fire |
| 未 | Wei | Goat | Earth |
| 申 | Shen | Monkey | Metal |
| 酉 | You | Rooster | Metal |
| 戌 | Xu | Dog | Earth |
| 亥 | Hai | Pig | Water |

---

## 附录 B：日主 → 性格/职业速查表（MVP 内置）

> MVP 阶段先用规则表产出硬编码简析，阶段三起再接入 AI / 更复杂算法。

| 日主 | 性格关键词（英文） | 适合职业方向（英文示例） |
|------|-------------------|------------------------|
| Jia Wood | Growth, pioneering, principled, visionary | Education, healthcare, non-profit, creative direction, environmental fields |
| Yi Wood | Adaptable, nurturing, detail-oriented, collaborative | Design, HR, nursing, content creation, small business |
| Bing Fire | Charismatic, expressive, decisive, inspiring | Media, leadership roles, sales, performing arts, public speaking |
| Ding Fire | Passionate, intuitive, persistent, refined | Research, tech innovation, psychology, culinary arts, photography |
| Wu Earth | Reliable, disciplined, structured, patient | Finance, accounting, project management, real estate, civil engineering |
| Ji Earth | Nurturing, practical, empathetic, resourceful | Social work, hospitality, farming, education administration, caregiving |
| Geng Metal | Strong, disciplined, strategic, just | Law, military, engineering, management, mechanical fields |
| Xin Metal | Refined, meticulous, artistic, perceptive | Jewelry, fashion, quality assurance, surgery, writing |
| Ren Water | Wise, adaptable, influential, visionary | Consulting, trading, tech, research, travel industry |
| Gui Water | Intuitive, empathetic, creative, insightful | Psychology, art, spirituality, writing, healing professions |

---

## 附录 C：MVP 阶段目录结构建议

```
mvp-bazi-career/
├── app/
│   ├── layout.tsx         // 全局 layout + metadata + Tailwind
│   ├── page.tsx           // 落地页主组件（Hero + Form + Result）
│   └── globals.css        // Tailwind 指令 + 少量自定义变量
├── components/
│   ├── HeroSection.tsx
│   ├── InputForm.tsx
│   ├── FourPillarsCard.tsx
│   ├── FiveElementsChart.tsx
│   ├── DayMasterAnalysis.tsx
│   └── FeedbackWidget.tsx
├── lib/
│   ├── bazi.ts            // tyme4ts 封装：排盘 + 五行统计 + 日主映射
│   └── constants.ts       // 术语表 + 速查表 + 翻译映射
├── types/
│   └── index.ts           // BaziInput / BaziReading 等类型
├── public/
│   └── favicon.ico
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
└── README.md              // 部署说明
```

---

> **下一步**：根据本 PRD 第九节 / 附录 C 生成 MVP 代码，并在本地验证 `npm run dev` + `npm run build` 产生 `./out/` → 用静态托管（推荐 Netlify Drop，拖拽 30s 上线）上线公网。
