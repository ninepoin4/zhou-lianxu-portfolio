export type Category = '全部' | '品牌片' | '竖屏内容' | '实验影像'

export type Film = {
  id: string
  index: string
  title: string
  en: string
  client: string
  category: Exclude<Category, '全部'>
  duration: string
  ratio: '16:9' | '9:16'
  year: string
  clip: string
  poster: string
  desc: string
  tools: string[]
  role: string[]
}

const media = (name: string) => `${import.meta.env.BASE_URL}media/clips/${name}`

export const films: Film[] = [
  {
    id: 'dara',
    index: '01',
    title: '一道弧线',
    en: 'ONE ARC',
    client: '戴拉珠宝 · 品牌片',
    category: '品牌片',
    duration: '112.9s',
    ratio: '16:9',
    year: '2026',
    clip: media('w01-dara.mp4'),
    poster: media('w01-dara.jpg'),
    desc: '12 句 AI 旁白、字幕、调色与落版，汇进一个 112.92 秒的 HyperFrames 工程；另出一版可手改的剪映草稿。故事从一夜舞会开始，落到一个普通工作日的清晨。',
    tools: ['Wan 3.0', 'HyperFrames', '豆包 TTS', '剪映'],
    role: ['脚本', '生成', '合成', '调色'],
  },
  {
    id: 'pearl-story',
    index: '02',
    title: '珠还合浦',
    en: 'THE PEARL RETURNS',
    client: '珍珠品牌故事',
    category: '品牌片',
    duration: '76.5s',
    ratio: '9:16',
    year: '2026',
    clip: media('w02-pearlstory.mp4'),
    poster: media('w02-pearlstory.jpg'),
    desc: '东汉合浦的珍珠传说。HTML / SVG 做的史料页、Wan 3.0 的古装场景、实拍海景，三种材质拼成 77 秒的竖屏叙事。',
    tools: ['HTML / SVG', 'Wan 3.0', 'HyperFrames'],
    role: ['史料整理', '视觉设计', '生成', '剪辑'],
  },
  {
    id: 'pearl-30',
    index: '03',
    title: '一粒沙的光',
    en: 'LIGHT OF A GRAIN',
    client: '珍珠品牌片',
    category: '品牌片',
    duration: '30s',
    ratio: '9:16',
    year: '2026',
    clip: media('w03-pearl30.mp4'),
    poster: media('w03-pearl30.jpg'),
    desc: '用 TTS 旁白与 Mixkit 素材，30 秒讲完一粒沙如何在时间里变成珠。没有演员，只有光和耐心。',
    tools: ['豆包 TTS', 'Mixkit', 'ffmpeg'],
    role: ['文案', '配音', '剪辑'],
  },
  {
    id: 'putuo',
    index: '04',
    title: '普陀禅事',
    en: 'CHAN, IN PUTUO',
    client: '普陀 · 禅意珠宝',
    category: '竖屏内容',
    duration: '30s',
    ratio: '9:16',
    year: '2026',
    clip: media('w04-putuo.mp4'),
    poster: media('w04-putuo.jpg'),
    desc: '8 个镜头，模特做禅事，竖排文案，无口播、无 CTA。把产品放进香火、石阶与海风里，只留氛围。',
    tools: ['Wan 3.0', 'LibTV', 'ffmpeg'],
    role: ['分镜', '生成', '推近', '字幕', '调色'],
  },
  {
    id: 'x9795',
    index: '05',
    title: '霓虹与丝绒',
    en: 'NEON / VELVET',
    client: 'X9795002 · 卡点美人片',
    category: '竖屏内容',
    duration: '20s',
    ratio: '9:16',
    year: '2026',
    clip: media('w05-x9795.mp4'),
    poster: media('w05-x9795.jpg'),
    desc: '同一组素材，四种剪辑结构：交替、组块、往返、对称。没有一句台词，只让景别和 BGM 拍点说话。',
    tools: ['Wan 3.0', 'kadian.py', 'ffmpeg'],
    role: ['素材索引', '六镜工单', '自动剪辑', '验收'],
  },
  {
    id: 'image-to-film',
    index: '06',
    title: '图像成片',
    en: 'IMAGE → FILM',
    client: '产品功能片',
    category: '品牌片',
    duration: '30s',
    ratio: '16:9',
    year: '2026',
    clip: media('w06-promo.mp4'),
    poster: media('w06-promo.jpg'),
    desc: '一张产品图，五种后期模板。15 / 45 / 60 秒三版功能片，所有排版、动效与节奏都由 HyperFrames 生成。',
    tools: ['HyperFrames', 'Remotion', 'Figma'],
    role: ['创意', '分镜', '动效', '合成'],
  },
  {
    id: 'bangle',
    index: '07',
    title: '手镯 · 三十秒',
    en: 'BANGLE, 30s',
    client: 'Wan 3.0 竖屏口播',
    category: '竖屏内容',
    duration: '30s',
    ratio: '9:16',
    year: '2026',
    clip: media('w07-bangle.mp4'),
    poster: media('w07-bangle.jpg'),
    desc: '信息流口播：20–30 秒、9:16、720×1280。HyperFrames 负责字幕、产品花字和贴纸音效，字幕逐句校对后有修正版。',
    tools: ['Wan 3.0', 'HyperFrames', 'ASR'],
    role: ['选题', '口播生成', '字幕', '花字'],
  },
  {
    id: 'guofeng',
    index: '08',
    title: '项链 4 · 古风',
    en: 'GUOFENG',
    client: 'YX9407001D',
    category: '竖屏内容',
    duration: '15s',
    ratio: '9:16',
    year: '2026',
    clip: media('w08-guofeng.mp4'),
    poster: media('w08-guofeng.jpg'),
    desc: '无口播、无字幕，靠景别、运镜和 BGM 拍点推进。15 秒里只有一把折扇、一段颈线和一颗黑珍珠。',
    tools: ['Wan 3.0', 'ffmpeg', 'DAW'],
    role: ['分镜', '生成', '卡点', '调色'],
  },
  {
    id: 'blue-amber',
    index: '09',
    title: '青珀 · 意象流',
    en: 'BLUE AMBER',
    client: '一镜到底实验',
    category: '实验影像',
    duration: '20s',
    ratio: '9:16',
    year: '2026',
    clip: media('w09-yixiang.mp4'),
    poster: media('w09-yixiang.jpg'),
    desc: '不写人物正脸，不给字幕。一次生成 20 秒，把青珀手串放进溪水与卵石之间，让材质自己讲故事。',
    tools: ['Wan 3.0', 'HyperFrames'],
    role: ['导演合同', '生成', '合成'],
  },
  {
    id: 'konbini',
    index: '10',
    title: '便利店雨夜',
    en: 'KONBINI, RAIN',
    client: '纯文生视频',
    category: '实验影像',
    duration: '15s',
    ratio: '16:9',
    year: '2026',
    clip: media('w10-konbini.mp4'),
    poster: media('w10-konbini.jpg'),
    desc: '没有素材，只有一段文字。15 秒的 3D 雨夜，一次生成，用来测试模型对光、湿度和空间的理解。',
    tools: ['Seedance 2.5', 'Wan 3.0'],
    role: ['提示词', '生成', '选片'],
  },
  {
    id: 'craft',
    index: '11',
    title: '工艺 · 触感',
    en: 'CRAFT',
    client: '戴拉珠宝 · 章节',
    category: '品牌片',
    duration: '24s',
    ratio: '16:9',
    year: '2026',
    clip: media('w11-craft.mp4'),
    poster: media('w11-craft.jpg'),
    desc: '珍珠与手、铅笔与纸。把工艺拆成可以被看见的触感：一道弧线，一次比划，一颗珠子落在丝绒上的声音。',
    tools: ['Wan 3.0', 'HyperFrames'],
    role: ['分镜', '生成', '合成'],
  },
  {
    id: 'kx',
    index: '12',
    title: '灰紫 · 单珠',
    en: 'VELVET ORBIT',
    client: 'KX1930001',
    category: '竖屏内容',
    duration: '20s',
    ratio: '9:16',
    year: '2026',
    clip: media('w12-kx.mp4'),
    poster: media('w12-kx.jpg'),
    desc: '同一款单珠，在霓虹与丝绒两种光里各走一遍。真实商品图进，AI 场景出，最后回到品牌落版。',
    tools: ['Kling', 'Wan 3.0', 'HyperFrames'],
    role: ['商品图处理', '生成', '落版'],
  },
]

export const categories: Category[] = ['全部', '品牌片', '竖屏内容', '实验影像']

export const stats = [
  { value: 400, suffix: '万+', label: '全平台累计播放', note: 'B 站 / 小红书 / 海外' },
  { value: 200, suffix: '%', label: '美工部整体提效', note: 'ComfyUI 工作台落地' },
  { value: 300, suffix: '万+', label: 'B 站频道播放', note: 'AI 听书频道' },
  { value: 7000, suffix: '+', label: '全平台粉丝', note: '从 0 起号' },
]

export const microStats = [
  { value: '92', label: '镜头逐镜拆解', note: '206 秒加盟片' },
  { value: '300+', label: '成片 MP4', note: '可交付 / 可复盘' },
  { value: '20', label: 'TTS 音色试听', note: '10 秒口播样音 + SRT' },
  { value: '4', label: '帧一组验收', note: '素材工厂质检' },
]

export const pipeline = [
  {
    index: '01',
    key: 'script',
    title: '剧本与参考',
    en: 'SCRIPT',
    desc: '50 条剧情库与人味对白准则；206 秒参考片拆成 92 个镜头，先看清再动笔。',
    tools: ['参考片拆解', '分镜合同'],
  },
  {
    index: '02',
    key: 'generate',
    title: '生成',
    en: 'GENERATE',
    desc: 'Wan 3.0、Seedance 2.5、LibTV 批量跑；缺口规划、断点续跑，按 SKU 命名归档。',
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
    title: '交付',
    en: 'DELIVER',
    desc: '9:16 竖屏、720×1280、批量队列；署名分目录，草稿可手改，明天还能再跑一遍。',
    tools: ['FastAPI', '剪映草稿'],
  },
]

export const systems = [
  {
    id: 'image-film',
    index: '01',
    title: '图像成片',
    en: 'IMAGE → FILM',
    image: 'media/ui/app-studio.jpg',
    desc: '单品图导入，选风格与后期，素材工厂补齐镜头，最后合成成片。独立配置、历史记录与花字渲染都在里面。',
    tags: ['WebUI', '素材工厂', 'HyperFrames'],
    metric: '15 / 45 / 60s',
    metricLabel: '三版功能片',
  },
  {
    id: 'comfy',
    index: '02',
    title: '电商 AI 出图工作台',
    en: 'COMFYUI + WEBUI',
    image: 'media/ui/app-studio-v2.jpg',
    desc: '从 0 搭 ComfyUI 后端与 WebUI 前端，封装工作流和参数预设。美工与运营从「不会用」到「每天用」，成为部门的基础设施。',
    tags: ['ComfyUI', 'Stable Diffusion', 'LoRA'],
    metric: '200%',
    metricLabel: '美工部提效',
  },
  {
    id: 'factory',
    index: '03',
    title: '素材工厂',
    en: 'SKU FACTORY',
    image: 'media/ui/factory.jpg',
    desc: 'LibTV 批量生成 AI 人物、场景与产品镜头，分通用库与 SKU 库。缺口规划、断点续跑、四帧验收、命名归档。',
    tags: ['LibTV', '四帧验收', '命名归档'],
    metric: '4 帧',
    metricLabel: '一组验收',
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
    items: ['ComfyUI', 'Stable Diffusion', 'LoRA 训练', 'Coze', 'Dify', 'LLM 微调'],
  },
  {
    label: '开发与工程',
    items: ['Cursor', 'Trae', 'Codex', 'Claude Code', 'Python', '快速原型'],
  },
  {
    label: '内容运营',
    items: ['B 站', '小红书', 'TikTok / 出海', 'AI 短剧', '短视频剪辑', '数据驱动'],
  },
  {
    label: '创意与创作',
    items: ['音乐编曲', 'DAW', '电子音乐', '网文写作', '跨媒介叙事'],
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
  { kind: 'cmd', text: '$ python build.py --project putuo --shots 8 --ratio 9:16' },
  { kind: 'ok', text: '✓ script      8 shots · director contract' },
  { kind: 'ok', text: '✓ generate    8/8 · wan 3.0' },
  { kind: 'ok', text: '✓ voice       知性灿灿 · 42 lines aligned' },
  { kind: 'ok', text: '✓ subtitle    gpu-asr → semantic split' },
  { kind: 'ok', text: '✓ compose     hyperframes · burn-in' },
  { kind: 'ok', text: '♪ bgm         70 bpm · ducking −12 dB' },
  { kind: 'out', text: '→ out/普陀禅事-氛围感样片-06B.mp4   30.08s' },
]
