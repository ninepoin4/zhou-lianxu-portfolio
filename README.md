# 周连旭 — AI 影像 / 工作流 / 部署

周连旭的个人作品网站。一个单页作品集：12 部精选短片、25 秒 showreel、
3 个真正跑在业务里的系统，以及完整的经历与联系方式。

整体是**米白纸感 + 墨黑 + 琥珀**的编辑风：中文衬线大字、瑞士式小字标签、
胶片 HUD、时间码、片目索引和可播放的悬浮预览。深色只保留在影像窗、终端卡片
和全屏灯箱里，页面主体是亮的。所有影像都来自 2026 年的真实项目。

- 线上主页：<https://ninepoints.top>
- GitHub：<https://github.com/ninepoin4/zhou-lianxu-portfolio>
- B 站：<https://space.bilibili.com/28594226>
- 小红书：<https://xhslink.cn/o/4wETLUWw4cq>

---

## 本地运行

```bash
pnpm install
pnpm dev
```

打开 `http://127.0.0.1:5279/`。

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
  data/content.ts          所有文案、12 部作品、3 个系统、经历、技能、社交链接
  components/
    Hero.tsx               首屏：巨型标题、竖屏影像窗、HUD、数据、ticker
    Statement.tsx          自述：方法论 + 工作原则 + 词条 marquee
    ReelBand.tsx           25 秒 showreel 入口（视差影像 + 磁吸播放键）
    Works.tsx              片目索引：分类筛选、鼠标跟随预览、灯箱入口
    Lightbox.tsx           全屏播放器：键盘导航、焦点陷阱、要点信息
    Numbers.tsx            数据条：滚动计数
    Pipeline.tsx           生产线：终端打字、步骤高亮、滚动进度线
    Systems.tsx            系统：界面截图 + hover 切换 + 指标
    About.tsx              关于：肖像、经历、技能、社交链接
    Contact.tsx            联系 + B 站/小红书 + 页脚 marquee
    ...                    光标、颗粒、导航、章节导轨、通用动画组件
  index.css                字体、颜色、动效关键帧、减少动效适配
preview/                   首屏 / showreel 区截图（分享用）
public/
  media/clips/             Web 版片段（6–10s）+ 同名海报 + showreel
  media/ui/                图像成片 / 电商工作台 / 素材工厂截图
  media/img/               肖像、场景图
  resume/                  简历 PDF
  fonts/                   拉丁字体 + 中文子集字体
scripts/subset-fonts.py    按当前页面用字重新生成中文子集
.github/workflows/deploy.yml  GitHub Pages 自动部署
```

---

## 怎么改内容

| 想改什么 | 去哪里 |
| --- | --- |
| 标题、作品名、简介、工具、年份 | `src/data/content.ts` |
| 经历 / 技能 / 教育 / 联系方式 / 社交链接 | `src/data/content.ts` |
| 视频与海报 | 替换 `public/media/clips/` 下的同名文件，或在 `content.ts` 里改路径 |
| 简历 PDF | 覆盖 `public/resume/zhou-lianxu-resume.pdf` |
| App 截图 | 替换 `public/media/ui/` 下的文件 |
| 主色、字体 | `tailwind.config.js` + `src/index.css` |
| 中文字体 | 改完文案后运行 `python scripts/subset-fonts.py` |

### 中文字体子集

页面里的中文衬线 / 黑体来自系统的 Noto Serif SC / Noto Sans SC（17–24 MB），
构建时只保留实际用到的约 680 个字，压缩成约 380 KB 的 woff2。
新增文案后如果出现字体不一致，运行：

```bash
pip install fonttools brotli
python scripts/subset-fonts.py
```

脚本会扫描 `src/` 和 `index.html`，重新生成
`public/fonts/noto-serif-sc-subset.woff2` 与 `noto-sans-sc-subset.woff2`。
缺字时浏览器会回退到系统中文字体，不会白屏。

---

## 素材来源

所有片段都从原项目成片中截取 6–10 秒，静音、H.264、CRF 27，长边 540–1280 px。
完整成片没有放进站点，以免首屏过重；如需完整版可在灯箱里加「完整版」按钮或外链。

| 站点文件 | 原始项目 / 文件 |
| --- | --- |
| `w01-dara.mp4` | `D:\codex2\Dara_宣传片_全片_112.92s_1080p25.mp4`（13s 起） |
| `w02-pearlstory.mp4` | `D:\putuo\pearl-30s\成片2\珠还合浦_76s.mp4` |
| `w03-pearl30.mp4` | `D:\putuo\pearl-30s\成片\一粒沙的光_30s.mp4` |
| `w04-putuo.mp4` | `D:\putuo\成片合集\普陀禅事-氛围感样片-06B.mp4` |
| `w05-x9795.mp4` | `zlx\06_项目\2026-10-07-002-X9795002…\X9795002-brandfilm-20s-24fps-cut-b-velvet.mp4` |
| `w06-promo.mp4` | `额外项目\图像成片_宣传物料\promo-video\image-to-film-promo-v2.mp4` |
| `w07-bangle.mp4` | `D:\codex2\videos\wan30-bangle-30s\30s主片.mp4` |
| `w08-guofeng.mp4` | `zlx\06_项目\2026-09-24-001…\YX9407001D-guofeng-novoice-master-v1.mp4` |
| `w09-yixiang.mp4` | `D:\putuo\样片09-意象流-青珀手串\素材\01-一镜到底-wan3-20s-v1.mp4` |
| `w10-konbini.mp4` | `D:\codex2\videos\konbini-rainy-corner-15s.mp4` |
| `w11-craft.mp4` | `D:\codex2\Dara_04-06\Dara_宣传片_04-06_工艺氛围_24s_1080p25.mp4` |
| `w12-kx.mp4` | `zlx\06_项目\2026-10-07-001-KX1930001…\KX1930001-brandfilm-20s-24fps-cut-velvet.mp4` |
| `window.mp4` | `zlx\outputs\YJ6976001-360-20261006\YJ6976001-luxe-orbit-15s-v1.mp4` |
| `showreel.mp4` | 8 个片段 + 片头 / 片尾卡，ffmpeg xfade 合成，25.5s |
| `ui/app-studio.jpg` 等 | `额外项目\图像成片_宣传物料\promo-video\assets\ui*` |
| `ui/factory.jpg` | `额外项目\素材工厂\work\验收` 的四帧验收拼图 |
| `img/portrait.jpg` | 简历 PDF 内嵌肖像（200×200，暖灰双色调） |
| `resume/*.pdf` | 原简历文件 |

片头 / 片尾卡与 showreel 由 ffmpeg 现场生成；标签字体为 Consolas，画面卡字体为
Instrument Serif / Noto Serif SC。页头已改为本名「周连旭 / ZHOU LIANXU」，
域名仍保留 ninepoints.top。

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

---

## 部署

### GitHub Pages（已配置）

推送 `main` 后，`.github/workflows/deploy.yml` 会自动：

1. 安装 pnpm / Node 22；
2. `pnpm install --frozen-lockfile && pnpm build`；
3. 把 `dist/` 发布到 GitHub Pages。

仓库 Settings → Pages 的 Source 需选择 **GitHub Actions**。
站点地址：`https://ninepoin4.github.io/zhou-lianxu-portfolio/`

### ninepoints.top

`pnpm build` 生成 `dist/`，把整个目录上传到 `ninepoints.top` 根目录即可。
`vite.config.ts` 里 `base: './'`，根目录或子路径都能工作。

- Nginx 需要为 `.mp4` 设置 `video/mp4`、`.woff2` 设置 `font/woff2`；
- 静态资源文件名带 hash，可长缓存；`media/` 下的视频建议
  `Cache-Control: public, max-age=31536000, immutable`；
- Vercel / Netlify / Cloudflare Pages：build command `pnpm build`，output `dist`；
- `public/robots.txt` 与 `public/sitemap.xml` 已按 `https://ninepoints.top/` 写好。

---

## 还可以更好 / 需要你确认的

1. **更高清的肖像**：现在只有简历里的 200×200，放到 350 px 宽略软；
   有原图（哪怕 800×800）可以直接替换 `public/media/img/portrait.jpg`。
2. **完整成片**：目前灯箱播放的是 6–10 秒节选；如果需要放完整版，
   建议压成 720p（单部 20–40 MB）并单独做「完整版」按钮。
3. **社交链接**：B 站 / 小红书已接上，TikTok 还没有链接；
   后续给我 URL 就可以补进去。
4. **作品排序与文案**：12 部作品的顺序、标题、角色可以按投递岗位再调；
   数据都在 `content.ts`，改完刷新即可。
5. **预约/表单**：目前用 `mailto:` 与复制联系方式。若要收简历/线索，
   可以接 Formspree 或自建接口，但会引入第三方与隐私说明。
6. **统计**：没有加任何分析脚本；需要的话建议用轻量的 Umami / Plausible。

---

## 致谢

文案与数据来自周连旭的简历，以及 `近期任务.txt` 里 2026 年 9–10 月的项目记录
（戴拉、普陀、zlx、codex2 四条工作线）。影像、界面与工程细节均来自这些真实项目。
