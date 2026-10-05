# Hubery · 朱果

HCI × AI × Games 个人网站。采用像素标题、黑白布局与青色细节，正常滚动浏览。主栏目包含个人介绍、实习与研究助理经历、项目经历、研究论文、教育背景、技能与联系。早期作品可通过原生折叠区展开。

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
- `app.js`：导航当前位置提示、复制邮箱，以及旧链接兼容。
- `assets/`：照片、头像、PDF、项目图片与本地字体。

内容更新时保留论文“已发表”“预印本”“已投稿”的准确区分。研究助理任期为 2025.03–2025.09，后续 MPhil 在读研究在教育背景中单独标注。

GitHub Pages 从 `main` 分支根目录发布，推送后自动更新。旧游戏版本在 Git 标签 `playable-portfolio-v1` 中保留。旧 `#resume`、`#play` 链接会回到新版首页。

## 素材说明

个人原照片、简历、作品集来自作者提供的材料。毕业设计封面与链接经 B 站公开视频核实；桌游和交互原型图片提取自本科作品集，未将它们混同于毕业设计。

### 像素头像

文件：`assets/hubery-pixel.png`。使用内置 imagegen 根据作者提供的照片生成；原照片同时保留在“关于我”中。

生成提示词要点：基于授权照片保留黑短发、黑框眼镜、笑脸、黑 T 恤与可识别面部特征；居中正面胸像；约 64×64 逻辑像素风格、硬边大色块；透明背景；无照片边框、相机文字、水印和额外物品；仅一个结果。

Silkscreen 字体来自 Google Fonts 项目，字体文件在本地提供，授权见 `assets/fonts/OFL.txt`。网站不加载外部字体、追踪脚本或后端服务。

### 游戏与视觉创作

`#creative-work` 直接进入四项作品的展示区：

- Escape from the Pyramid of Horus：实物照片提取自本科作品集第 7 页；作品介绍与规则链接至 PDF 第 6–8 页。
- 灯笼山：Adobe Animate 手绘逐帧动画，小组课程作品；视频为 `BV16eAoeoExM`；PDF 第 13–15 页展示故事板与制作过程。
- 开放世界冒险游戏 / UE 环境搭建：个人课程作品，模型素材来自网络；视频为 `BV1oZAHeWEXV`。
- 雪山之巅 / Unity 环境展示：个人地编作品，参考老君山，风雪等特效素材来自 Unity Asset Store；视频为 `BV1owAoeUEAU`。

三张视频封面与简介均来自作者 Hu6ery（UID 35953087）的 B 站公开视频资料。页面显示的视频时长采用 B 站播放器数据。作品归属与外部素材来源按原始说明保留。

### 项目与研究论文配图

图片按原比例展示，可点击查看完整图面。论文图片从作者提供的 PDF 或官方论文中提取，未重绘；本轮研究 PDF 未整体上传。

项目经历：

- `#dental-vr` 展示 `dental-vr-scenes.png`：《On Edge in the Dental Chair》Figure 3，第 13 页的五类场景与实际系统交互图。论文卡使用 Figure 1。
- `#turing-test` 使用作者本次指定的原始截图 `turing-platform-selected.png`，内容为 Human or Machine? 的 Figure 9。图片原样复制；200+ 用户数据仍按个人简历描述。
- `#aisp` 保留独立共创项目，使用论文 Figure 1 概念流程图；不表述为已部署系统。
- MTalk-Bench 与 HealthTTS 仅放在“研究论文”，不再作为项目卡重复展示。

研究论文共四篇，全部使用各自第一幅图：

- AISP：`aisp-concept-workflow.png`，Figure 1，第 1 页；共同第一作者，CHI 2026 Extended Abstracts 已发表。
- On Edge in the Dental Chair：`dental-vr-overview.png`，Figure 1，第 3 页；共同第一作者（列首），arXiv 预印本 / CHI 2027 已投稿。24 人研究在模拟环境中开展。
- MTalk-Bench：`mtalk-bench-figure-1.png`，官方 arXiv v2 第 2 页 Figure 1。保留官方项目主页、Hugging Face 数据集及预印本入口；作者身份使用“共同作者”。
- HealthTTS：`healthtts-figure-1.png`，作者提供的《HealthTTS: Symptom-Aware Text-to-Speech with Clinical Acoustic Cues》第 2 页 Figure 1，直接提取原始 1312×837 像素图片。标注“在投论文”；匿名稿不用于推断作者排名。替换旧 MedTTS 描述，不沿用旧的说话人数、小时数或后期事件插入作为最终方法。
