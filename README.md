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

### 研究项目配图

所有图片从作者提供的论文中直接提取或渲染，保留原始内容与图中标签；页面保持原图比例，并提供高清查看入口。未将所提供的研究 PDF 整体上传。

- `#dental-vr`：`dental-vr-overview.png` 为《On Edge in the Dental Chair》Figure 1（PDF 第 3 页）；`dental-vr-scenes.png` 为 Figure 3（第 13 页）。随机研究在模拟牙科环境中开展；保留预印本 / CHI 2027 已投稿状态。
- `#turing-test`：`human-or-machine-platform.png` 为《Human or Machine? A Preliminary Turing Test for Speech-to-Speech Interaction》Figure 9（PDF 第 22 页）；`human-or-machine-interface.png` 为 Figure 3（第 5 页）。200+ 用户数据来自个人简历的贡献描述，不与论文整体样本量混同。
- `#aisp`：`aisp-concept-workflow.png` 为《Co-Designing AI Standardized Patients》Figure 1（PDF 第 1 页）。这是共创研究提出的概念流程，不表示已部署系统。12 名医学生同时参与访谈及 3 场工作坊。
- AISP 与牙科焦虑论文的作者页均标注 equal contribution，网站据此写为“共同第一作者”；牙科论文为列首，AISP 为并列第一作者中的第二位。
- `#mtalk-bench`：同时提供官方项目主页、Hugging Face 数据集和预印本入口。官方作者列表在两位同等贡献作者后列 Guo Zhu，网站使用“共同作者”避免名次歧义。
