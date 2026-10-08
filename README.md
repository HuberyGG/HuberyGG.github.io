# Hubery · 朱果

HCI × AI × Games 个人网站。采用像素标题、黑白布局与青色细节，正常滚动浏览。主栏目包含个人介绍、实习与研究助理经历、研究论文、项目经历、个人作品集、教育背景、技能与联系。创作区收录 16 件游戏、交互、动画、短片与建模作品，可按类型筛选；禁用 JavaScript 时仍全部显示。

网站：https://huberygg.github.io/

## 本地浏览

直接打开 `index.html`，或者运行：

```sh
python3 -m http.server 4181
```

然后访问 `http://localhost:4181`。不需要安装依赖。

## 内容与样式

- `index.html`：所有简历与项目内容，禁用 JavaScript 仍可阅读和导航。
- `style.css`：像素字体、响应式排版和打印样式。
- `theme.css`：深色主题的完整配色，仅影响屏幕；论文原图不反色。
- `translations-en.js`：网站英文正文、界面、图片说明与无障碍标签的人工译文。
- `preferences.js`：中英文即时切换、动态提示文案、主题偏好保存与系统主题响应。
- `app.js`：目录与导航当前位置同步、手机目录收起、创作类型筛选、复制邮箱，以及旧链接兼容。
- `assets/`：照片、头像、PDF、项目图片与本地字体。

内容更新时保留论文“已发表”“预印本”“已投稿”的准确区分。研究助理任期为 2025.03–2025.09，后续 MPhil 在读研究在教育背景中单独标注。

GitHub Pages 从 `main` 分支根目录发布，推送后自动更新。旧游戏版本在 Git 标签 `playable-portfolio-v1` 中保留。旧 `#resume`、`#play` 链接会回到新版首页。

## 页面目录

完整目录包括首页、关于我、实习经历、研究论文、项目经历、个人作品集、教育背景、技能与工具和联系我。宽屏（1280px 起）固定在右侧，正文为目录留出空间；窄屏使用底部原生折叠目录，选择栏目后收起，也可点外部或按 Escape 关闭。

目录与顶部导航随滚动同步高亮，链接保留原生锚点、浏览器前进/后退与减弱动画设置。无 JavaScript 时目录可手动展开/收起、跳转，正文全部可读；打印时隐藏目录。作品筛选后会重新计算当前位置。

## 语言与主题

右上角 `EN / 中文` 按钮切换整页语言，月亮 / 太阳按钮切换深浅色。选择保存在本机浏览器；未选过主题时跟随系统设置。英文链接可用 `?lang=en`（可与版本参数、栏目锚点一起使用），中文用 `?lang=zh`，显式 URL 语言优先于已保存的偏好。浏览器前进/后退也会同步语言。

正文、目录、筛选计数、复制提示、图片说明、无障碍标签和页面元信息均有英文版本。切换时保留当前作品筛选和阅读位置，英文标题与副标题相同时隐藏重复副标题。下载 PDF 与图片中的原始文字保持原样。存储不可用时仍可切换；无 JavaScript 时提供完整中文静态页面与目录。深色模式不影响打印配色。

## 素材说明

个人原照片、简历、作品集来自作者提供的材料。毕业设计封面与链接经 B 站公开视频核实；桌游和交互原型图片提取自本科作品集，未将它们混同于毕业设计。

### 首页照片与排版

首屏使用作者提供的原照片 `assets/hubery.jpg`，完整保留正方形构图，不做像素化处理。桌面采用左侧介绍、右侧照片；手机将姓名与照片并排，介绍和操作按钮放在下一行。「关于我」改为标题与文字布局，避免重复展示照片。网站保留像素字体与青色细节。

Silkscreen 字体来自 Google Fonts 项目，字体文件在本地提供，授权见 `assets/fonts/OFL.txt`。网站不加载外部字体、追踪脚本或后端服务。

### 个人作品集

`#creative-work` 展示 16 件作品，并提供“我的 B 站主页”中文入口。全部、游戏与交互、动画与短片、场景与建模四个按钮采用普通按钮与 `aria-pressed` 状态；作品数量会同步更新。无 JavaScript 时隐藏筛选按钮并展示全部作品。旧作品锚点仍可访问。

本轮新增 10 件：

| 作品 | 来源页码 / 视频 | 说明 |
| --- | --- | --- |
| 神笔马良的故事 | 新 PDF 24 / BV1sKH46zEyP | Unity + Vuforia，AR 小组课程作业 |
| 灵狐小白 | 新 PDF 23 / BV1nQAHebEaT | Maya 2024 小组动画，个人负责盗贼行窃部分；模型来自网络 |
| Triangle / 三重谜 | BV1qa4y1B78C | 小组自摄悬疑短片，不编造个人分工 |
| 小心落石 | 新 PDF 22 / BV1NqAJecE4Z | AE / Blender / Maya 的团队制作流程，保留 YouTube 灵感链接 |
| 古巴比伦空岛冒险 | 新 PDF 8–9 | 四季小球平台闯关；网络资源 |
| 梦 / Dream | 新 PDF 10–11 | Unity / Pico 4，个人负责四关中的前两关 |
| 遗落之岛 | 新 PDF 12–13 | Unity FPS 与解谜，不推定独立制作 |
| 上城之下 | 新 PDF 14 | 环境与世界观设计，不等同完整可玩游戏 |
| 办公桌 | 新 PDF 19 | Maya 建模 |
| 现代风办公室 | 新 PDF 20 | Maya 家具与场景建模 |

原有六项创作（Horus、灯笼山、UE 环境、雪山之巅、无翼鸟、Let's Recycle）全部保留；无翼鸟与回收原型从折叠区移入作品网格。《门后》补充循环、三幕叙事与资产说明。灯笼山补充 Procreate，Unity / UE 场景明确模型与特效素材来源。

四张新视频封面来自 Hu6ery（UID 35953087）对应 B 站公开视频，视频时长依次为 13:38、2:48、19:11、0:36。其余新图片直接来自提供的作品集；PDF 内嵌原图较小，展示图没有生成或补画细节。

两份作品集分别保留：

- `assets/Hubery-Digital-Media-Portfolio.pdf`：本轮作者提供的 25 页、约 1.3 MB 作品集。新作品页码链接及页尾 PORTFOLIO.PDF 指向此文件。
- `assets/Hubery-Portfolio.pdf`：原 14 MB 作品集，保持字节与原有页码链接不变（Horus 第 6–8 页、灯笼山第 13–15 页），保留详细规则与制作过程。

新 PDF 内部分视频按钮存在模板错链，网站使用作者本轮明确指定的四个 B 站 ID。PDF 里的旧简历、在读状态及旧联系方式不覆盖当前页面资料。

### 项目与研究论文配图

图片按原比例展示，可点击查看完整图面。论文图片从作者提供的 PDF 或官方论文中提取，未重绘；本轮研究 PDF 未整体上传。

项目经历：

- `#dental-vr` 展示 `dental-vr-scenes.png`：《On Edge in the Dental Chair》Figure 3，第 13 页的五类场景与实际系统交互图。论文卡使用 Figure 1。
- `#turing-test` 使用作者本次指定的原始截图 `turing-platform-selected.png`，内容为 Human or Machine? 的 Figure 9。图片原样复制；200+ 用户数据仍按个人简历描述。
- AISP 仅保留在研究论文 `#paper-aisp`，旧链接 `#aisp` 同样定位到论文条目。
- MTalk-Bench 与 HealthTTS 仅放在“研究论文”，不再作为项目卡重复展示。

研究论文共四篇，全部使用各自第一幅图：

- AISP：`aisp-concept-workflow.png`，Figure 1，第 1 页；第一作者，CHI 2026 Extended Abstracts 已发表。
- On Edge in the Dental Chair：`dental-vr-overview.png`，Figure 1，第 3 页；第一作者，arXiv 预印本 / CHI 2027 已投稿。24 人研究在模拟环境中开展。
- MTalk-Bench：`mtalk-bench-figure-1.png`，官方 arXiv v2 第 2 页 Figure 1。保留官方项目主页、Hugging Face 数据集及预印本入口；作者身份使用“第三作者”。
- HealthTTS：`healthtts-figure-1.png`，作者提供的《HealthTTS: Symptom-Aware Text-to-Speech with Clinical Acoustic Cues》第 2 页 Figure 1，直接提取原始 1312×837 像素图片。按作者提供的信息标注“ICLR 2027 在投”和“第三作者”。
