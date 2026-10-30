# 周连旭 — AI 影像 / 工作流 / 部署

周连旭的个人作品网站。一个单页作品集：**5 个项目、25 秒 showreel、一条能复用的 AI 影像产线**，以及完整的经历、联系方式和一个可以走进去的 3D 房间。

整体是**米白纸感 + 墨黑 + 琥珀**的编辑风：中文衬线大字、瑞士式小字标签、胶片 HUD、时间码、片目索引和可播放的影像。深色只保留在影像窗、终端卡片和全屏灯箱里，页面主体是亮的。所有影像都来自 2025–2026 年的真实项目。

- 线上主页：<https://ninepoin4.github.io/zhou-lianxu-portfolio/>
- GitHub：<https://github.com/ninepoin4/zhou-lianxu-portfolio>
- B 站：<https://space.bilibili.com/28594226>
- 小红书：<https://xhslink.cn/o/4wETLUWw4cq>
- 自有域名 ninepoints.top：暂不可用，站内链接与 SEO 先指向 GitHub Pages。

> **当前状态：5 项目版 + 量产矩阵 12 秒示例，已推送并由 GitHub Pages 自动部署。**
> 这一轮加入巴洛克珍珠项链示例成片，清理页面冗余小字与注释性文案；推送到 `main` 后由 Actions 自动发布。

---

## 本地运行

```bash
pnpm install
pnpm dev
```

打开 `http://127.0.0.1:5173/`（Vite 会自动选一个空闲端口，以终端输出为准）。

```bash
pnpm build     # tsc --noEmit && vite build -> dist/
pnpm preview   # 预览生产构建
```

> Windows 上如果 `pnpm install` 提示 `ERR_PNPM_IGNORED_BUILDS`，仓库里的
> `pnpm-workspace.yaml` 已把 `esbuild` 加入 `allowBuilds`；重新执行一次 `pnpm install` 即可。
> 也可以直接用 `npm install`（依赖版本已固定在 `package.json`）。

技术栈：Vite 7 · React 19 · TypeScript · Tailwind CSS 3 · Motion 12 · Lenis · lucide-react。

---

## 目录

```
src/
  data/content.ts          所有文案、5 个项目、数据、经历、技能、社交链接
  components/
    Hero.tsx               首屏：巨型标题、竖屏影像窗、HUD、数据、ticker
    Statement.tsx          自述：方法论 + 工作原则 + 词条 marquee
    ReelBand.tsx           25 秒 showreel 入口（视差影像 + 磁吸播放键）
    Works.tsx              5 个项目章节：宽 / 高画幅交替、悬停影像、灯箱入口
    Lightbox.tsx           全屏播放器：键盘导航、焦点陷阱、要点信息
    Numbers.tsx            数据条：滚动计数
    Pipeline.tsx           生产线：终端打字、步骤高亮、滚动进度线
    About.tsx              关于：肖像、经历、技能、社交链接
    Contact.tsx            联系 + B 站 / 小红书 + 页脚 marquee
    ...                    光标、颗粒、导航、章节导轨、通用动画组件
  index.css                字体、颜色、动效关键帧、减少动效适配
public/
  media/clips/             showreel + 各项目节选（6–10s）+ 同名海报
  media/cases/             图像型项目的 16:10 / 4:5 案例板
  media/ui/                图像成片 / 电商工作台 / 素材工厂截图
  media/img/               肖像、场景图
  resume/                  简历 PDF（2026.10 版）
  room/                    Homecraft 3D 房间（静态站点，MIT）
  fonts/                   拉丁字体 + 中文子集字体
plates.html                案例板桌面版源文件（2000×1250）
plates-mobile.html         案例板手机版源文件（1000×1250）
scripts/subset-fonts.py    按当前页面用字重新生成中文子集
.github/workflows/deploy.yml  GitHub Pages 自动部署
```

---

## 5 个项目

| # | 项目 | 形态 | 关键数据 |
| --- | --- | --- | --- |
| 01 | 影游工坊 / YINGUO STUDIO | 互动影游工作台 | 5 种节点、分支 / 变量、离线导出、196 条自测 |
| 02 | Dara Studio / LOCAL WORKBENCH | 本地短剧工作台 | 5 类素材库、6 类模板、一句话开拍、可独立部署 |
| 03 | 量产矩阵 / PRODUCTION MATRIX | 本地出片台 | 4 条产线、10 环节混剪、28s 成片约 60s、12 秒示例 |
| 04 | 自媒体矩阵 / OWNED MEDIA | B 站 + 小红书内容线 | 300 万+ 播放、百万级浏览、2 个平台 |
| 05 | 内容工厂 / CONTENT ENGINE | 剧情 / 种草内容系统 | 100 篇剧情、60 篇种草、20+ 项目 |

原来的 12 部片目与 3 个系统被收敛成这 5 条能说明方法的章节；旧的片段文件仍留在 `public/media/clips/`，但页面不再引用。

---

## 3D 房间

`public/room/` 是一个独立的静态 3D 房间：五个展位挂在同一面墙上，走近按 `F` 打开案例。它用 Three.js + 原生 ES modules，没有构建步骤；主站导航、作品底部和联系区各有一个入口，不抢单页作品集的叙事。

- 结构：`world/layout.js` 定义房间尺寸、五个展位和出生点；`world/build.js` 生成墙体、海报、展台、灯光与展签。
- 文案：`index.html` 里的五个 `<article class="page">`；海报在 `assets/posters/`。
- 打开：`pnpm dev` 后访问 `/room/`。开发服务器会把 `/room/` 重写到 `/room/index.html`，生产构建原样复制到 `dist/room/`。
- 视角：开场动画结束后自动切第一人称，按 `V` 可在第一 / 第三人称之间切换。
- 许可：Homecraft（MIT）。见 `public/room/NOTICE.md` 与 `LICENSE`；房间里的文字、海报和项目数据属于本项目。

---

## 怎么改内容

| 想改什么 | 去哪里 |
| --- | --- |
| 标题、作品名、简介、工具、年份 | `src/data/content.ts` |
| 经历 / 技能 / 教育 / 联系方式 / 社交链接 | `src/data/content.ts` |
| 视频与海报 | 替换 `public/media/clips/` 下的同名文件，或在 `content.ts` 里改路径 |
| 图像型案例板 | 替换 `public/media/cases/` 下的同名文件；案例板的源在 `plates.html` / `plates-mobile.html` |
| 简历 PDF | 覆盖 `public/resume/zhou-lianxu-resume.pdf`（当前为 2026.10 版） |
| 主色、字体 | `tailwind.config.js` + `src/index.css` |
| 中文字体 | 改完文案后运行 `python scripts/subset-fonts.py` |

### 中文字体子集

页面里的中文衬线 / 黑体来自系统的 Noto Serif SC / Noto Sans SC（17–24 MB），
构建时只保留实际用到的约 627 个字，压缩成约 352 KB 的 woff2。
新增文案后如果出现字体不一致，运行：

```bash
pip install fonttools brotli
python scripts/subset-fonts.py
```

脚本会扫描 `src/` 和 `index.html`，重新生成
`public/fonts/noto-serif-sc-subset.woff2` 与 `public/fonts/noto-sans-sc-subset.woff2`。
缺字时浏览器会回退到系统中文字体，不会白屏。

---

## 素材来源

项目节选从原成片中截取 6–10 秒，静音、H.264、CRF 27，长边 540–1280 px。
量产矩阵保留一条完整的 12 秒示例，720×1280、H.264 + AAC、约 2.1 MB，按需在灯箱播放，不进入首屏加载。

| 站点文件 | 原始项目 / 文件 |
| --- | --- |
| `cases/plate-yinguo.jpg` | 影游工坊案例板（2000×1250，界面来自 `D:\DSH WORK 4\yinguo\.shots`） |
| `cases/plate-yinguo-mobile.jpg` | 同一案例板的 4:5 手机版（1000×1250） |
| `cases/plate-social.jpg` | 自媒体矩阵案例板（2000×1250，B 站 / 小红书数据与链接） |
| `cases/plate-social-mobile.jpg` | 同一案例板的 4:5 手机版（1000×1250） |
| `w12-kx.mp4` | `zlx\06_项目\2026-10-07-001-KX1930001…\KX1930001-brandfilm-20s-24fps-cut-velvet.mp4` |
| `window.mp4` | `zlx\outputs\YJ6976001-360-20261006\YJ6976001-luxe-orbit-15s-v1.mp4` |
| `showreel.mp4` | 5 个项目片段（01 为影游工坊案例板慢推，04 为自媒体案例板慢推）+ 片头 / 片尾卡，ffmpeg xfade 合成，24.96s |
| `cases/plate-studio.jpg` | Dara Studio 工作台案例板（2000×1250） |
| `cases/plate-studio-mobile.jpg` | 同一案例板的 4:5 手机版（1000×1250） |
| `cases/plate-matrix.jpg` | 量产矩阵案例板（2000×1250；界面为素材成片 2.0） |
| `cases/matrix-video.png` | 素材成片「3 条素材待混剪」界面（1600×1000，2026.10） |
| `clips/matrix-example.mp4` | 量产矩阵 12 秒示例（720×1280，H.264 + AAC，2.1 MB）；源文件 `D:/putuo/普陀轻念流工作流/AI美学反推06-巴洛克珍珠项链-潮汐铸形-12秒/成片/巴洛克珍珠项链-潮汐铸形-卡点变奏版-12秒.mp4` |
| `clips/matrix-example.jpg` | 示例成片海报（720×1280，取自 5.0s） |
| `cases/plate-factory.jpg` | 内容工厂案例板（2000×1250） |
| `ui/app-studio.jpg` 等 | `额外项目\图像成片_宣传物料\promo-video\assets\ui*` |
| `ui/factory.jpg` | `额外项目\素材工厂\work\验收` 的四帧验收拼图 |
| `img/portrait.jpg` | 简历 PDF 内嵌肖像（200×200；页面按 200 px 显示，避免放大发虚） |
| `resume/*.pdf` | 2026.10 重制版，与页面 5 项目口径一致 |

片头 / 片尾卡与 showreel 由 ffmpeg 现场生成；画面卡字体为 Instrument Serif / Noto Serif SC。
页头使用本名「周连旭 / ZHOU LIANXU」。

### 字体与音乐授权

- **Instrument Serif** — SIL Open Font License，通过 Google Fonts 下载并自托管。
- **DM Mono** — SIL Open Font License，同上。
- **Noto Serif SC / Noto Sans SC** — SIL Open Font License，从本机字体子集化。
- **音乐**：`The Great Sea` — Scott Buckley，**CC BY 3.0**。
  署名已写入 showreel 灯箱简介与联系区版权说明；如果要改曲目，请保留同等署名。
- 片中影像版权归项目方 / 周连旭所有，仅用于本作品集展示。

---

## 动效与可访问性

- Lenis 平滑滚动；Motion 处理入场、视差、滚动联动、灯箱过渡。
- `prefers-reduced-motion` 下：跳过开场动画、暂停所有视频、把滚动动效简化为静态。
- 全站键盘可达；灯箱有焦点陷阱、Esc 关闭、左右方向键切换。
- 自定义光标只在 `pointer: fine` 下启用，触屏不隐藏系统光标。
- 图片有 alt，装饰性影像标记 aria-hidden；跳转链接、章节导轨、aria-label 齐全。
- 视频默认静音、`playsInline`，点击后可在灯箱里开声音。
- 手机端：图像案例自动切换为 4:5；量产矩阵保留 16:10 全幅界面，避免裁掉关键信息。

---

## 部署（确认后再执行）

### GitHub Pages

当前 **未推送**。确认本地版本后：

```bash
git add .
git commit -m "Redesign portfolio around five selected projects"
git push origin main
```

`.github/workflows/deploy.yml` 会自动：

1. 安装 pnpm / Node 22；
2. `pnpm install --frozen-lockfile && pnpm build`；
3. 把 `dist/` 发布到 GitHub Pages。

仓库 Settings → Pages 的 Source 已设为 **GitHub Actions**。
站点地址：`https://ninepoin4.github.io/zhou-lianxu-portfolio/`

### ninepoints.top（以后）

当前 ninepoints.top 指向旧站，暂不使用。等域名可用后：
`pnpm build` 生成 `dist/`，把整个目录上传到 `ninepoints.top` 根目录；
GitHub Pages 也可以在 Settings → Pages 里把 Custom domain 设为 `ninepoints.top`，
再把 `index.html`、`robots.txt`、`sitemap.xml` 里的 GitHub Pages 地址换回自有域名。
`vite.config.ts` 里 `base: './'`，根目录或子路径都能工作。

- Nginx 需要为 `.mp4` 设置 `video/mp4`、`.woff2` 设置 `font/woff2`；
- 静态资源文件名带 hash，可长缓存；`media/` 下的视频建议
  `Cache-Control: public, max-age=31536000, immutable`；
- Vercel / Netlify / Cloudflare Pages：build command `pnpm build`，output `dist`；
- `public/robots.txt` 与 `public/sitemap.xml` 已按当前 Pages 地址写好；切回自有域名时一并替换。

---

## 还可以更好 / 需要你确认的

1. **更高清的肖像**：现在只有简历里的 200×200，页面按 200 px 显示，已不发虚；
   有原图（800×800 以上）可以替换 `public/media/img/portrait.jpg`，再放大展示。
2. **完整成片**：目前灯箱播放的是 6–10 秒节选；如果需要放完整版，
   建议压成 720p（单部 20–40 MB）并单独做「完整版」按钮。
3. **作品排序与文案**：5 个项目的顺序、角色可以按投递岗位再调；
   数据都在 `content.ts`，改完刷新即可。
4. **社交链接**：B 站 / 小红书已接上，TikTok 还没有链接。
5. **预约 / 表单**：目前用 `mailto:` 与复制联系方式；若要收简历 / 线索，
   可以接 Formspree 或自建接口，但会引入第三方与隐私说明。
6. **统计**：没有加任何分析脚本；需要的话建议用轻量的 Umami / Plausible。

---

## 致谢

文案与数据来自周连旭的简历，以及 `近期任务新.txt` 里 2026 年 9–10 月的项目记录
（戴拉、自媒体、zlx、codex2、额外项目五条工作线）。影像、界面与工程细节均来自这些真实项目。
