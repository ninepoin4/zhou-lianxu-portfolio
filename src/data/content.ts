export type ProjectKind = 'film' | 'system' | 'interactive'
export type ProjectRatio = '16:9' | '9:16' | '16:10'

export type Project = {
  id: string
  index: string
  title: string
  en: string
  client: string
  kind: ProjectKind
  category: string
  duration: string
  ratio: ProjectRatio
  year: string
  mediaType: 'video' | 'image'
  src: string
  poster: string
  mobileSrc?: string
  detailImage?: string
  detailCaption?: string
  summary: string
  details: string
  metrics: { value: string; label: string }[]
  tools: string[]
  role: string[]
  deliverables: string[]
  links?: { label: string; url: string }[]
}

const caseImage = (name: string) => `${import.meta.env.BASE_URL}media/cases/${name}`

export const projects: Project[] = [
  {
    id: 'yinguo',
    index: '01',
    title: '影游工坊',
    en: 'YINGUO STUDIO',
    client: '个人项目 · 互动影游工作台',
    kind: 'interactive',
    category: '产品 / 互动叙事',
    duration: 'LOCAL',
    ratio: '16:10',
    year: '2026',
    mediaType: 'image',
    src: caseImage('plate-yinguo.jpg'),
    poster: caseImage('plate-yinguo.jpg'),
    mobileSrc: caseImage('plate-yinguo-mobile.jpg'),
    summary:
      '把 AIGC 视频编排成一部可玩的互动影游。结构图、台词、分支与变量，在浏览器里搭完，一键导出离线网页。',
    details:
      '五种互动节点（剧情、结局、分歧、赋值、片头）搭成可读的结构图；支持分支条件、倒计时、变量与多结局。校验器会解释每条规则、跑通路径测试并统计覆盖率；播放器可直接试玩，导出后是一个纯静态 HTML 包。原生 HTML / CSS / JS，零构建、零后端、零网络依赖，IndexedDB 自动保存与 5 分钟历史快照，196 条自测断言覆盖逻辑、工程库与界面。',
    metrics: [
      { value: '5 种', label: '互动节点' },
      { value: '196 条', label: '自测断言' },
      { value: '0', label: '网络依赖' },
    ],
    tools: ['原生 JS', 'IndexedDB', 'HTML / CSS', 'Playwright'],
    role: ['产品', '前端', '交互', '测试'],
    deliverables: ['结构图编辑器', '分支剧情播放器', '离线 HTML 导出', '196 条自测断言'],
  },
  {
    id: 'studio',
    index: '02',
    title: 'Dara Studio',
    en: 'LOCAL WORKBENCH',
    client: '戴拉珠宝 · 本地短剧工作台',
    kind: 'system',
    category: '产品 / 工作流',
    duration: 'LOCAL',
    ratio: '16:10',
    year: '2026',
    mediaType: 'image',
    src: caseImage('plate-studio.jpg'),
    poster: caseImage('plate-studio.jpg'),
    mobileSrc: caseImage('plate-studio-mobile.jpg'),
    summary:
      '商品简报、剧本、人物与产品参考，接到 Wan 3.0、ASR 字幕、配乐与成片；本地单用户，可独立部署。',
    details:
      '从已审查剧本开始，读取产品、人物、包装与环境参考，生成 Wan 3.0 任务；再完成真实音轨字幕、配乐与成片交付。素材库分人物、声音、产品、背景、Logo 五类；一句话开拍会把模式、时长、语言、货号与人物落到对应格子。带素材与模型打包，换机器解压即用。',
    metrics: [
      { value: '5 类', label: '素材库' },
      { value: '6 类', label: '商品模板' },
      { value: '1 句', label: '一句话开拍' },
    ],
    tools: ['Next.js', 'Wan 3.0', 'ASR', 'HyperFrames'],
    role: ['产品', '工作流', '前端', '部署'],
    deliverables: ['本地短剧工作台', '五类素材库', '任务队列与生成', '字幕 / 配乐 / 成片', '独立部署包'],
  },
  {
    id: 'matrix',
    index: '03',
    title: '量产矩阵',
    en: 'PRODUCTION MATRIX',
    client: '戴拉 · 素材 / 图像 / 字幕产线',
    kind: 'system',
    category: '平台 / 量产',
    duration: '10–25s',
    ratio: '16:10',
    year: '2026',
    mediaType: 'image',
    src: caseImage('plate-matrix.jpg'),
    poster: caseImage('plate-matrix.jpg'),
    summary:
      '四条产线，一台本地出片台。视频混剪、图像成片、AI 补镜、字幕对齐，从一条素材到能发的片。',
    details:
      '素材成片 2.0 把多选素材、目标时长、文案与配音接成 10 环节流水线：4 条 28 秒片端到端约 60 秒，输出 720×1280 H.264；支持批量出片、单条重出、历史记录与监控台。图像成片走 7 环节，15 秒片约 30–35 秒；素材工厂补上 AI 补镜、四帧验收、通用库与 SKU 库、珠宝风格知识；字幕对齐用 TTS 原生时间戳与 ASS 卡拉 OK，按句校准。FastAPI 单机服务，打包即可独立部署。',
    metrics: [
      { value: '10 环节', label: '视频混剪' },
      { value: '60s', label: '端到端 / 28s 片' },
      { value: '4 条', label: '量产线' },
    ],
    tools: ['FastAPI', '豆包 TTS 2.0', 'FFmpeg', 'DeepSeek Flash'],
    role: ['产品', '后端', '工作流', '部署'],
    deliverables: ['视频混剪 10 环节', '图像成片 15/45/60s', 'AI 补镜 / 素材工厂', '字幕对齐 / ASS 卡拉OK', '独立部署包'],
  },
  {
    id: 'social',
    index: '04',
    title: '自媒体矩阵',
    en: 'OWNED MEDIA',
    client: 'B 站 · 小红书',
    kind: 'system',
    category: '内容 / 自媒体',
    duration: '2 个平台',
    ratio: '16:10',
    year: '2026',
    mediaType: 'image',
    src: caseImage('plate-social.jpg'),
    poster: caseImage('plate-social.jpg'),
    mobileSrc: caseImage('plate-social-mobile.jpg'),
    summary:
      'B 站 AI 听书 300 万+ 播放，小红书 AI 资讯百万级浏览；选题、脚本、剪辑、封面与发布，一条内容线自己跑完。',
    details:
      '主理 B 站 AI 听书频道与小红书 AI 资讯号：从选题、标题、脚本、剪辑、封面到发布，自己跑完整条内容线；累计播放 300 万+，小红书浏览百万级。把 AI 用在批量生产，但保留人的判断——先决定什么值得讲，再让工具把它做出来。',
    metrics: [
      { value: '300 万+', label: 'B 站播放' },
      { value: '百万级', label: '小红书浏览' },
      { value: '2 个', label: '内容平台' },
    ],
    tools: ['剪映', 'AI 旁白', '封面', '数据复盘'],
    role: ['选题', '脚本', '剪辑', '运营'],
    deliverables: ['B 站 AI 听书频道', '小红书 AI 资讯号', '300 万+ 播放', '百万级浏览'],
    links: [
      { label: 'B 站', url: 'https://space.bilibili.com/28594226' },
      { label: '小红书', url: 'https://xhslink.cn/o/4wETLUWw4cq' },
    ],
  },
  {
    id: 'factory',
    index: '05',
    title: '内容工厂',
    en: 'CONTENT ENGINE',
    client: '戴拉珍珠 · 内容系统',
    kind: 'system',
    category: '内容 / 编剧',
    duration: '160 篇',
    ratio: '16:10',
    year: '2026',
    mediaType: 'image',
    src: caseImage('plate-factory.jpg'),
    poster: caseImage('plate-factory.jpg'),
    summary:
      '100 篇剧情、60 篇种草，一套对白准则；落到项链、戒指、九款口播与美人片，20 多个项目。',
    details:
      '重写 100 篇剧情与 60 篇种草，建立人味对白准则；把脚本变成可执行的口播、美人片与卡点模板，落地项链、戒指、九款口播、品牌美人片、氛围感卡点等 20 多个项目。先写人为什么开口，再写产品。',
    metrics: [
      { value: '100 篇', label: '剧情' },
      { value: '60 篇', label: '种草' },
      { value: '20+', label: '项目' },
    ],
    tools: ['GPT / Claude', 'Wan 3.0', 'HyperFrames', '剪映'],
    role: ['策略', '编剧', '工作流', '交付'],
    deliverables: ['100 篇剧情', '60 篇种草', '九款口播', '品牌美人片 / 氛围感卡点', '20+ 落地项目'],
  },
]

export const stats = [
  { value: 196, suffix: ' 条', label: '自测断言', note: '影游工坊 · 逻辑 + 界面' },
  { value: 5, suffix: ' 种', label: '互动节点', note: '影游工坊 · 结构图' },
  { value: 160, suffix: '', label: '剧情 / 种草脚本', note: '100 + 60' },
  { value: 20, suffix: '+', label: '落地项目', note: '内容工厂 / 量产矩阵' },
]

export const microStats = [
  { value: '05', label: '精选项目', note: '8 个项目里挑 5 条' },
  { value: '04', label: '条量产线', note: '素材 / 图像 / 工厂 / 字幕' },
  { value: '300 万+', label: 'B 站播放', note: 'AI 听书频道' },
  { value: '百万级', label: '小红书浏览', note: 'AI 资讯号' },
]

export const pipeline = [
  {
    index: '01',
    key: 'script',
    title: '剧本与参考',
    en: 'SCRIPT',
    desc: '100 篇剧情与 60 篇种草沉淀成人味对白准则；参考片先拆成镜头，再写分镜合同。',
    tools: ['100 + 60 脚本', '分镜合同'],
  },
  {
    index: '02',
    key: 'generate',
    title: '生成',
    en: 'GENERATE',
    desc: 'Wan 3.0、LibTV 批量跑；缺口规划、断点续跑，按 SKU 命名归档。',
    tools: ['Wan 3.0', 'LibTV', 'Seedance'],
  },
  {
    index: '03',
    key: 'voice',
    title: '配音',
    en: 'VOICE',
    desc: '豆包 TTS 2.0，20 个音色试听；逐句校准语速、响度与时长，再同步回全片。',
    tools: ['TTS 2.0', '播音版'],
  },
  {
    index: '04',
    key: 'subtitle',
    title: '字幕',
    en: 'SUBTITLE',
    desc: 'GPU ASR 对齐，语义分句，烧录成片；口播还能切出一条全日语的分支。',
    tools: ['GPU ASR', 'SRT', '语义分句'],
  },
  {
    index: '05',
    key: 'compose',
    title: '花字与音效',
    en: 'COMPOSE',
    desc: 'HyperFrames 排版、贴纸与拍点卡剪，调色、落版、BGM 自动闪避人声。',
    tools: ['HyperFrames', 'ffmpeg'],
  },
  {
    index: '06',
    key: 'deliver',
    title: '交付与部署',
    en: 'DEPLOY',
    desc: '9:16 竖屏、互动影游与本地工作台；FastAPI 出片台独立部署，草稿可手改。',
    tools: ['FastAPI', 'Next.js', '剪映草稿'],
  },
]

export const experience = [
  {
    period: '2025.09 — 2026.08',
    company: '临沂斯塔克电商',
    role: 'AI 应用工程师',
    note: 'IT 部 · 服务美工部与运营部',
    bullets: [
      '从 0 搭 ComfyUI 后端服务 + WebUI 前端，交付可直接协作的 AI 出图工作台。',
      '基于 Coze / Dify 搭建部门级工作流，重复设计任务效率提升近 60%。',
      '用 Cursor、Trae 开发内部自动化工具，需求到上线以天计。',
      '建立 AI 工具使用规范与培训体系，输出手册并组织内训。',
    ],
    highlight: '美工部整体提效 200% · 薪资 4500 → 7000',
  },
  {
    period: '2025.06 — 2025.09',
    company: '临沂火元素科技',
    role: '新媒体运营',
    note: '海外短视频 · AIGC 内容出海',
    bullets: [
      '负责海外短视频账号的内容策划与日常运营，以完播率、互动率为核心指标做迭代。',
      '探索 AI 在剪辑、字幕与文案生成中的落地路径，沉淀出海方法论。',
    ],
  },
  {
    period: '2024.10 — 至今',
    company: '个人创作矩阵',
    role: '视频运营 · 主理',
    note: 'B 站 / 小红书 / 海外平台',
    bullets: [
      'B 站 AI 听书频道累计播放 300 万+；小红书 AI 资讯号浏览百万级。',
      '独立完成选题、脚本、剪辑与发布，具备从 0 起号到稳定涨粉的方法论。',
    ],
  },
]

export const education = {
  period: '2021.09 — 2025.06',
  school: '烟台南山学院',
  major: '本科 · 营销管理',
}

export const skillGroups = [
  {
    label: 'AI 工具链',
    items: ['ComfyUI', 'Stable Diffusion', 'LoRA 训练', 'Wan 3.0', 'LibTV', 'HyperFrames', '豆包 TTS', 'ASR'],
  },
  {
    label: '开发与工程',
    items: ['Python', 'FastAPI', 'Next.js', 'TypeScript', 'React', 'Cursor / Codex', '独立部署'],
  },
  {
    label: '内容与叙事',
    items: ['AI 短剧', '口播 / 种草', 'B 站', '小红书', 'TikTok / 出海', '数据驱动'],
  },
  {
    label: '创意与创作',
    items: ['音乐编曲', 'DAW', '网文写作', '跨媒介叙事', '视觉设计'],
  },
]

export const socials = [
  {
    label: 'B 站',
    note: 'AI 听书频道',
    stat: '300 万+ 播放',
    url: 'https://space.bilibili.com/28594226',
  },
  {
    label: '小红书',
    note: 'AI 资讯号',
    stat: '百万级浏览',
    url: 'https://xhslink.cn/o/4wETLUWw4cq',
  },
]

export const contact = {
  email: '15666835265@163.com',
  phone: '133 7129 2462',
  phoneRaw: '13371292462',
  wechat: 'ly2336520586',
  site: 'ninepoin4.github.io/zhou-lianxu-portfolio',
  siteUrl: 'https://ninepoin4.github.io/zhou-lianxu-portfolio/',
  github: 'https://github.com/ninepoin4/zhou-lianxu-portfolio',
  city: '杭州',
}

export const terminalLines = [
  { kind: 'cmd', text: '$ dara-studio run --brief "KH1466001 / 25s / 中文口播"' },
  { kind: 'ok', text: '✓ brief       货号 · 人群 · 卖点' },
  { kind: 'ok', text: '✓ script      25s · 人味对白' },
  { kind: 'ok', text: '✓ generate    8/8 · wan 3.0' },
  { kind: 'ok', text: '✓ voice       女声 · 12 lines' },
  { kind: 'ok', text: '✓ subtitle    gpu-asr → semantic split' },
  { kind: 'ok', text: '✓ compose     hyperframes · burn-in' },
  { kind: 'out', text: '→ out/KH1466001-25s.mp4   25.04s' },
]
