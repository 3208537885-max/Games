(function(root){
"use strict";
const content={
  "STATS": {
    "iq": [
      "思考力",
      "brain",
      "学习效率与解决问题的能力；不是现实智商测量。"
    ],
    "eq": [
      "情商",
      "chat",
      "倾听、合作与理解他人的能力。"
    ],
    "charm": [
      "外貌气质",
      "spark",
      "影响初次相遇、主动邀约与好感增长，但不能替代信任。"
    ],
    "health": [
      "健康",
      "heart",
      "长期透支会触发恢复月，降低成长效率。"
    ],
    "mood": [
      "幸福感",
      "sun",
      "记录你是否喜欢正在过的生活。"
    ],
    "stress": [
      "压力",
      "cloud",
      "数值越低越好。超过80会影响效率。"
    ],
    "discipline": [
      "自律",
      "clock",
      "把想做的事坚持到最后。"
    ],
    "knowledge": [
      "学业",
      "book",
      "影响学期成绩、科研与升学。"
    ],
    "research": [
      "科研",
      "flask",
      "论文、研究项目与夏令营的基础。"
    ],
    "tech": [
      "专业技能",
      "code",
      "就业、技能、独立开发与创业的底座。"
    ],
    "art": [
      "创作",
      "pen",
      "音乐、影像、写作与内容表达。"
    ],
    "fame": [
      "影响力",
      "flag",
      "社团、创作与创业的传播能力。"
    ],
    "explore": [
      "阅历",
      "compass",
      "在校园外理解世界，也反哺思考力和考试。"
    ],
    "business": [
      "商业",
      "briefcase",
      "把想法变成有人愿意使用的产品。"
    ],
    "exam": [
      "考研准备",
      "book",
      "可以很早积累，最终与学业、思考力等共同决定考试。"
    ],
    "civic": [
      "公共事务",
      "building",
      "公共岗位与基层工作的能力。"
    ],
    "sport": [
      "运动",
      "run",
      "体能训练与赛事表现。"
    ],
    "gaming": [
      "电竞",
      "game",
      "训练、复盘、战术与团队协作，不等同于通宵上分。"
    ],
    "service": [
      "公益",
      "leaf",
      "长期、稳定地帮助他人的经验。"
    ],
    "language": [
      "语言",
      "globe",
      "升学、交流和海外申请的基础。"
    ],
    "data": [
      "数据分析",
      "brain",
      "从样本、误差和对照中找出可靠结论。"
    ],
    "engineering": [
      "工程实现",
      "tools",
      "结构、电路、材料与可复现的测试。"
    ],
    "design": [
      "设计能力",
      "pen",
      "把问题转化为清晰、可用的体验。"
    ],
    "writing": [
      "文字表达",
      "book",
      "访谈、论证、编辑与故事结构。"
    ],
    "photography": [
      "影像能力",
      "camera",
      "观察、构图、拍摄与剪辑。"
    ],
    "performance": [
      "舞台表现",
      "music",
      "排练、节奏、台词与现场应变。"
    ],
    "leadership": [
      "组织力",
      "flag",
      "明确分工，承担责任，而不是替所有人做事。"
    ],
    "teamwork": [
      "协作力",
      "chat",
      "跨专业合作与项目交接。"
    ],
    "negotiation": [
      "协商力",
      "briefcase",
      "听见利益差异，形成能被履行的约定。"
    ],
    "empathy": [
      "共情力",
      "heart",
      "看见情绪，不替对方决定人生。"
    ],
    "resilience": [
      "韧性",
      "leaf",
      "从失败中恢复，及时调整计划。"
    ],
    "finance": [
      "财务素养",
      "wallet",
      "记录现金流、预算与安全边界。"
    ],
    "media": [
      "媒介素养",
      "laptop",
      "核实来源、尊重隐私、建立可信表达。"
    ],
    "ecology": [
      "生态意识",
      "leaf",
      "用观察与记录回应环境问题。"
    ],
    "pedagogy": [
      "教学能力",
      "book",
      "设计课程、反馈与学习支架。"
    ],
    "law": [
      "规则意识",
      "building",
      "理解程序、公平与基本权利；并非法律资质。"
    ],
    "history": [
      "人文积累",
      "building",
      "史料、地方记忆与文化语境。"
    ],
    "cooking": [
      "生活料理",
      "home",
      "预算、营养、食物与照顾日常。"
    ],
    "innovation": [
      "创新思维",
      "spark",
      "跨学科连接与小规模验证。"
    ],
    "planning": [
      "统筹能力",
      "clock",
      "拆解目标、安排节奏、预留余量。"
    ]
  },
  "SCHOOLS": [
    {
      "id": "shu",
      "name": "上海大学",
      "tag": "宝山 · 延长 · 嘉定",
      "mark": "上大",
      "school": "上海大学",
      "text": "全局只有上海大学校园。学习、爱情、创作、创业和探索，在同一段四年生活中发生。数值与人物为非官方游戏设定。",
      "resource": 1.06,
      "gradePenalty": 0,
      "recommendation": 87,
      "money": 0,
      "multiplier": 1,
      "badge": "唯一校园 · 上海大学"
    }
  ],
  "FAMILIES": [
    {
      "id": "modest",
      "name": "精打细算",
      "stipend": 1000,
      "money": 1300,
      "text": "每月生活费1000，勤工助学会让生活更从容。",
      "bonus": {
        "discipline": 8,
        "eq": 3
      }
    },
    {
      "id": "ordinary",
      "name": "普通家庭",
      "stipend": 1500,
      "money": 2200,
      "text": "每月生活费1500，资源和自由度比较均衡。",
      "bonus": {
        "mood": 5
      }
    },
    {
      "id": "comfortable",
      "name": "宽裕家庭",
      "stipend": 2300,
      "money": 4000,
      "text": "每月生活费2300。钱能买来机会，买不来结局。",
      "bonus": {
        "charm": 4
      }
    },
    {
      "id": "working",
      "name": "共同承担",
      "stipend": 1200,
      "money": 2000,
      "text": "每月1200；习惯协商和共同规划。",
      "bonus": {
        "teamwork": 7,
        "finance": 5
      }
    },
    {
      "id": "bookish",
      "name": "书香小家",
      "stipend": 1500,
      "money": 2000,
      "text": "每月1500；对读书与讨论更熟悉。",
      "bonus": {
        "history": 7,
        "writing": 5
      }
    },
    {
      "id": "selfmade",
      "name": "小店家庭",
      "stipend": 1700,
      "money": 2500,
      "text": "每月1700；较早接触顾客与预算。",
      "bonus": {
        "negotiation": 7,
        "finance": 5
      }
    }
  ],
  "TALENTS": [
    {
      "id": "curious",
      "name": "好奇心永动机",
      "icon": "compass",
      "text": "思考力+9，探索成长+20%。",
      "stats": {
        "iq": 9
      },
      "tags": [
        "explore"
      ],
      "boost": 0.2
    },
    {
      "id": "scholar",
      "name": "会学一点",
      "icon": "book",
      "text": "学业+10，学业类成长+15%。",
      "stats": {
        "knowledge": 10
      },
      "tags": [
        "study"
      ],
      "boost": 0.15
    },
    {
      "id": "listener",
      "name": "认真听你说",
      "icon": "chat",
      "text": "情商+12，互动信任额外+1。",
      "stats": {
        "eq": 12
      }
    },
    {
      "id": "photogenic",
      "name": "人群中的亮点",
      "icon": "spark",
      "text": "外貌气质+14，但关系仍要用心经营。",
      "stats": {
        "charm": 14
      }
    },
    {
      "id": "maker",
      "name": "拆了再装回去",
      "icon": "code",
      "text": "专业技能+12，技术成长+15%。",
      "stats": {
        "tech": 12
      },
      "tags": [
        "tech"
      ],
      "boost": 0.15
    },
    {
      "id": "artist",
      "name": "脑内小剧场",
      "icon": "pen",
      "text": "创作+12，创作成长+15%。",
      "stats": {
        "art": 12
      },
      "tags": [
        "art"
      ],
      "boost": 0.15
    },
    {
      "id": "athlete",
      "name": "操场常驻人口",
      "icon": "run",
      "text": "健康+10、运动+10，运动成长+10%。",
      "stats": {
        "health": 10,
        "sport": 10
      },
      "tags": [
        "sport"
      ],
      "boost": 0.1
    },
    {
      "id": "planner",
      "name": "手帐规划师",
      "icon": "clock",
      "text": "自律+15，重复行动衰减较轻。",
      "stats": {
        "discipline": 15
      }
    },
    {
      "id": "merchant",
      "name": "小生意直觉",
      "icon": "briefcase",
      "text": "商业+12，项目收入+15%。",
      "stats": {
        "business": 12
      }
    },
    {
      "id": "gamer",
      "name": "天生会复盘",
      "icon": "game",
      "text": "电竞+14，正规训练成长+15%。",
      "stats": {
        "gaming": 14
      },
      "tags": [
        "gaming"
      ],
      "boost": 0.15
    },
    {
      "id": "linguist",
      "name": "耳朵很灵",
      "icon": "globe",
      "text": "语言+15，语言类成长+15%。",
      "stats": {
        "language": 15
      },
      "tags": [
        "language"
      ],
      "boost": 0.15
    },
    {
      "id": "resilient",
      "name": "不急，再来",
      "icon": "leaf",
      "text": "幸福感+10，月末压力额外-2。",
      "stats": {
        "mood": 10
      }
    },
    {
      "id": "analyst",
      "name": "数据显微镜",
      "icon": "brain",
      "text": "数据分析+12，数据类成长+15%。",
      "stats": {
        "data": 12
      },
      "tags": [
        "data"
      ],
      "boost": 0.15
    },
    {
      "id": "engineer",
      "name": "随身小工具箱",
      "icon": "tools",
      "text": "工程实现+12，工程类成长+15%。",
      "stats": {
        "engineering": 12
      },
      "tags": [
        "engineering"
      ],
      "boost": 0.15
    },
    {
      "id": "designer",
      "name": "看见另一种解法",
      "icon": "pen",
      "text": "设计能力+12，设计类成长+15%。",
      "stats": {
        "design": 12
      },
      "tags": [
        "design"
      ],
      "boost": 0.15
    },
    {
      "id": "storyteller",
      "name": "故事收集员",
      "icon": "book",
      "text": "文字表达+12，人文类成长+15%。",
      "stats": {
        "writing": 12
      },
      "tags": [
        "humanity"
      ],
      "boost": 0.15
    },
    {
      "id": "director",
      "name": "镜头后的眼睛",
      "icon": "camera",
      "text": "影像能力+12，影像类成长+15%。",
      "stats": {
        "photography": 12
      },
      "tags": [
        "film"
      ],
      "boost": 0.15
    },
    {
      "id": "stageborn",
      "name": "开场不用倒数",
      "icon": "music",
      "text": "舞台表现+12，舞台类成长+15%。",
      "stats": {
        "performance": 12
      },
      "tags": [
        "stage"
      ],
      "boost": 0.15
    },
    {
      "id": "organizer",
      "name": "把人聚在一起",
      "icon": "flag",
      "text": "组织力+10、协作力+6，团队类成长+12%。",
      "stats": {
        "leadership": 10,
        "teamwork": 6
      },
      "tags": [
        "team"
      ],
      "boost": 0.12
    },
    {
      "id": "negotiator",
      "name": "先把话说清楚",
      "icon": "chat",
      "text": "协商力+12，公共协商类成长+15%。",
      "stats": {
        "negotiation": 12
      },
      "tags": [
        "public"
      ],
      "boost": 0.15
    },
    {
      "id": "budgeter",
      "name": "月底还有余额",
      "icon": "wallet",
      "text": "财务素养+12，商业类成长+12%。",
      "stats": {
        "finance": 12
      },
      "tags": [
        "business"
      ],
      "boost": 0.12
    },
    {
      "id": "ecologist",
      "name": "阳台上的小森林",
      "icon": "leaf",
      "text": "生态意识+12，生态类成长+15%。",
      "stats": {
        "ecology": 12
      },
      "tags": [
        "eco"
      ],
      "boost": 0.15
    },
    {
      "id": "educator",
      "name": "讲到你听懂",
      "icon": "book",
      "text": "教学能力+12，教学类成长+15%。",
      "stats": {
        "pedagogy": 12
      },
      "tags": [
        "education"
      ],
      "boost": 0.15
    },
    {
      "id": "homemaker",
      "name": "认真吃一顿饭",
      "icon": "home",
      "text": "生活料理+12、统筹能力+5，生活技能成长+12%。",
      "stats": {
        "cooking": 12,
        "planning": 5
      },
      "tags": [
        "wellbeing"
      ],
      "boost": 0.12
    }
  ],
  "ROUTES": [
    {
      "id": "baoyan",
      "name": "保研科研",
      "group": "education",
      "icon": "flask",
      "color": "teal",
      "guide": "保持学期均分；科研≥55，完成论文。第36月参加夏令营，第37月确认去向。跨专业方向不开放本作推免。",
      "actions": [
        "library",
        "seminar",
        "research",
        "project",
        "language"
      ]
    },
    {
      "id": "kaoyan",
      "name": "考研逆袭",
      "group": "education",
      "icon": "book",
      "color": "teal",
      "guide": "积累备考、学业、思考力和自律。游戏第38月报名、40月初试、43月复试；这些时点与门槛仅为玩法抽象。",
      "actions": [
        "exam",
        "library",
        "logic",
        "hike",
        "language"
      ]
    },
    {
      "id": "startup",
      "name": "创业新星",
      "group": "career",
      "icon": "briefcase",
      "color": "gold",
      "guide": "做出产品、接触客户、再决定投入规模。S级需要商业85、产品2、合作支持1、现金3000与至少3个盈利月。",
      "actions": [
        "product",
        "interview",
        "code",
        "pitch",
        "project"
      ]
    },
    {
      "id": "love",
      "name": "双向奔赴",
      "group": "relationship",
      "icon": "heart",
      "color": "rose",
      "guide": "先认识，再倾听、共同活动、约会。外貌增加好感效率，信任与陪伴决定长期关系。",
      "actions": [
        "style",
        "club",
        "listen",
        "date",
        "confess"
      ]
    },
    {
      "id": "richlove",
      "name": "富有，也相爱",
      "group": "relationship",
      "icon": "spark",
      "color": "rose",
      "guide": "在创业市集认识沈南枝或程予安。建立真实关系并推进共同事业，不是无限索取资助。",
      "actions": [
        "interview",
        "style",
        "listen",
        "date",
        "project"
      ]
    },
    {
      "id": "career",
      "name": "职场启航",
      "group": "career",
      "icon": "code",
      "color": "teal",
      "guide": "专业技能、自律与沟通；完成作品集、积累至少4次实习，秋招投递并接受录用。",
      "actions": [
        "code",
        "intern",
        "portfolio",
        "project",
        "network"
      ]
    },
    {
      "id": "civil",
      "name": "公共服务",
      "group": "public",
      "icon": "building",
      "color": "gold",
      "guide": "公共事务、学业和表达共同提升。第39月选择报考，第44月接受录用。",
      "actions": [
        "policy",
        "debate",
        "volunteer",
        "library"
      ]
    },
    {
      "id": "creator",
      "name": "原创出圈",
      "group": "creative",
      "icon": "pen",
      "color": "rose",
      "guide": "创作与传播一起练。完成独立作品项目；可以走影像、音乐、写作或独立游戏。",
      "actions": [
        "write",
        "music",
        "vlog",
        "project",
        "exhibition"
      ]
    },
    {
      "id": "esports",
      "name": "电竞职业",
      "group": "competition",
      "icon": "game",
      "color": "teal",
      "guide": "正规训练＋复盘＋团队沟通，参加赛事。通宵排位有收益，也会损害健康和自律。",
      "actions": [
        "train",
        "review",
        "esport",
        "run"
      ]
    },
    {
      "id": "sport",
      "name": "赛场发光",
      "group": "competition",
      "icon": "run",
      "color": "gold",
      "guide": "训练、营养、自律；完成半马项目或取得运动赛事奖牌。",
      "actions": [
        "run",
        "gym",
        "sportmatch",
        "project"
      ]
    },
    {
      "id": "service",
      "name": "温柔改变",
      "group": "public",
      "icon": "leaf",
      "color": "teal",
      "guide": "持续志愿服务、理解他人，并完成长期公益项目。不是一次打卡照片。",
      "actions": [
        "volunteer",
        "teach",
        "listen",
        "project"
      ]
    },
    {
      "id": "travel",
      "name": "世界很大",
      "group": "life",
      "icon": "compass",
      "color": "gold",
      "guide": "探索世界、记录、语言与户外；完成远行计划，至少留下6处旅行记忆。",
      "actions": [
        "hike",
        "travel",
        "museum",
        "language",
        "project"
      ]
    },
    {
      "id": "overseas",
      "name": "远方求学",
      "group": "education",
      "icon": "globe",
      "color": "teal",
      "guide": "语言、成绩、科研或作品集。第39月提交申请，第44月揭晓结果；出色能力可赢得游戏内奖学金。",
      "actions": [
        "language",
        "research",
        "library",
        "project"
      ]
    },
    {
      "id": "craft",
      "name": "技术立身",
      "group": "career",
      "icon": "tools",
      "color": "gold",
      "guide": "专业技能与自律；拿到专业认证、作品集。跨专业方向有技术成长加成。",
      "actions": [
        "workshop",
        "code",
        "certificate",
        "project"
      ]
    },
    {
      "id": "freelance",
      "name": "自由职业",
      "group": "creative",
      "icon": "laptop",
      "color": "rose",
      "guide": "技能、创作、商业兼修，做作品，积累至少6次真实接单。收入依靠交付而非空想。",
      "actions": [
        "freelance",
        "write",
        "code",
        "product",
        "project"
      ]
    },
    {
      "id": "balanced",
      "name": "自己的节奏",
      "group": "life",
      "icon": "sun",
      "color": "teal",
      "guide": "不用每条路都拿满分。健康、幸福、多样体验与几项稳定专长，足以拼出精彩四年。",
      "actions": [
        "library",
        "club",
        "hike",
        "rest",
        "project"
      ]
    },
    {
      "id": "data",
      "name": "开放数据与工具",
      "group": "career",
      "icon": "code",
      "color": "gold",
      "guide": "核心能力：数据分析；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "datawork",
        "opensource",
        "reproduce",
        "project",
        "factcheck"
      ],
      "skill": "data",
      "proof": "dataTools",
      "secondary": "media"
    },
    {
      "id": "materials",
      "name": "材料与工程研究",
      "group": "education",
      "icon": "flask",
      "color": "teal",
      "guide": "核心能力：工程实现；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "material",
        "reproduce",
        "research",
        "project",
        "oraldefense"
      ],
      "skill": "engineering",
      "proof": "materialStudies",
      "secondary": "research"
    },
    {
      "id": "robotics",
      "name": "跨学科机器人工程",
      "group": "career",
      "icon": "tools",
      "color": "gold",
      "guide": "核心能力：工程实现；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "robotbuild",
        "prototype",
        "code",
        "project",
        "studygroup"
      ],
      "skill": "engineering",
      "proof": "robots",
      "secondary": "teamwork"
    },
    {
      "id": "design",
      "name": "无障碍体验设计",
      "group": "creative",
      "icon": "pen",
      "color": "rose",
      "guide": "核心能力：设计能力；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "uxlab",
        "volunteermap",
        "curation",
        "project",
        "prototype"
      ],
      "skill": "design",
      "proof": "accessDesigns",
      "secondary": "empathy"
    },
    {
      "id": "film",
      "name": "纪录片与影像",
      "group": "creative",
      "icon": "camera",
      "color": "rose",
      "guide": "核心能力：影像能力；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "filmcrew",
        "documentary",
        "soundwalk",
        "project",
        "editing"
      ],
      "skill": "photography",
      "proof": "films",
      "secondary": "writing"
    },
    {
      "id": "stage",
      "name": "剧场与舞台制作",
      "group": "creative",
      "icon": "music",
      "color": "rose",
      "guide": "核心能力：舞台表现；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "stageplay",
        "chorus",
        "music",
        "project",
        "cluboffice"
      ],
      "skill": "performance",
      "proof": "plays",
      "secondary": "teamwork"
    },
    {
      "id": "journalism",
      "name": "可信写作与编辑",
      "group": "creative",
      "icon": "book",
      "color": "rose",
      "guide": "核心能力：文字表达；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "editing",
        "factcheck",
        "oralhistory",
        "project",
        "write"
      ],
      "skill": "writing",
      "proof": "reportsDone",
      "secondary": "media"
    },
    {
      "id": "heritage",
      "name": "地方记忆与策展",
      "group": "life",
      "icon": "building",
      "color": "teal",
      "guide": "核心能力：人文积累；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "oralhistory",
        "jiadingwalk",
        "curation",
        "project",
        "qwcread"
      ],
      "skill": "history",
      "proof": "archives",
      "secondary": "writing"
    },
    {
      "id": "green",
      "name": "生态与绿色行动",
      "group": "public",
      "icon": "leaf",
      "color": "teal",
      "guide": "核心能力：生态意识；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "ecoaudit",
        "repaircafe",
        "jufestival",
        "project",
        "publicspace"
      ],
      "skill": "ecology",
      "proof": "greenPlans",
      "secondary": "data"
    },
    {
      "id": "diplomacy",
      "name": "跨文化合作",
      "group": "relationship",
      "icon": "globe",
      "color": "teal",
      "guide": "核心能力：语言；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "languagepair",
        "language",
        "communitywalk",
        "project",
        "debate"
      ],
      "skill": "language",
      "proof": "exchanges",
      "secondary": "empathy"
    },
    {
      "id": "education",
      "name": "课程与学习设计",
      "group": "public",
      "icon": "book",
      "color": "teal",
      "guide": "核心能力：教学能力；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "peerteach",
        "teachingdesign",
        "teach",
        "project",
        "studygroup"
      ],
      "skill": "pedagogy",
      "proof": "curricula",
      "secondary": "knowledge"
    },
    {
      "id": "mediation",
      "name": "公共协商与程序",
      "group": "public",
      "icon": "building",
      "color": "teal",
      "guide": "核心能力：规则意识；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "legalclinic",
        "debatejudge",
        "repairtalk",
        "project",
        "policy"
      ],
      "skill": "law",
      "proof": "mediations",
      "secondary": "negotiation"
    },
    {
      "id": "campus",
      "name": "校园文化组织",
      "group": "life",
      "icon": "flag",
      "color": "teal",
      "guide": "核心能力：组织力；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "cluboffice",
        "springconcert",
        "jufestival",
        "project",
        "curation"
      ],
      "skill": "leadership",
      "proof": "campusSeasons",
      "secondary": "teamwork"
    },
    {
      "id": "socialbiz",
      "name": "有公共价值的小事业",
      "group": "career",
      "icon": "briefcase",
      "color": "gold",
      "guide": "核心能力：商业；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。 S级还需至少3个盈利月，证明项目能够持续运作。",
      "actions": [
        "markettest",
        "budgetlab",
        "communitywalk",
        "project",
        "incubation"
      ],
      "skill": "business",
      "proof": "socialVentures",
      "secondary": "finance"
    },
    {
      "id": "urban",
      "name": "城市与公共空间",
      "group": "life",
      "icon": "compass",
      "color": "teal",
      "guide": "核心能力：设计能力；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "publicspace",
        "volunteermap",
        "campuswalk",
        "project",
        "ecoaudit"
      ],
      "skill": "design",
      "proof": "accessDesigns",
      "secondary": "ecology"
    },
    {
      "id": "food",
      "name": "料理与日常创作",
      "group": "creative",
      "icon": "home",
      "color": "rose",
      "guide": "核心能力：生活料理；完成对应长期项目并积累真实行动，达到80进入S级、60进入A级。健康与毕业要求同样重要。",
      "actions": [
        "cook",
        "mealplan",
        "foodstory",
        "project",
        "budgetlab"
      ],
      "skill": "cooking",
      "proof": "foodBooks",
      "secondary": "planning"
    },
    {
      "id": "shu_reader",
      "name": "跨馆阅读与知识策划",
      "group": "education",
      "icon": "book",
      "color": "teal",
      "skill": "knowledge",
      "secondary": "writing",
      "proof": "readingDossiers",
      "actions": [
        "libraryresearch",
        "bookcircle",
        "unionstudy",
        "project",
        "qwcread"
      ],
      "guide": "能力、持续行动和对应项目共同计分；A级需60分与1份成果，S级需80分与2份成果。高阶还需保持健康、持续投入并完成毕业。"
    },
    {
      "id": "shu_collab",
      "name": "跨专业协作与产品",
      "group": "career",
      "icon": "tools",
      "color": "teal",
      "skill": "teamwork",
      "secondary": "innovation",
      "proof": "jointPrototypes",
      "actions": [
        "crosscampus",
        "jointseminar",
        "openprototype",
        "project",
        "peerhandoff"
      ],
      "guide": "能力、持续行动和对应项目共同计分；A级需60分与1份成果，S级需80分与2份成果。高阶还需保持健康、持续投入并完成毕业。"
    },
    {
      "id": "shu_memory",
      "name": "上大记忆与公共叙事",
      "group": "creative",
      "icon": "book",
      "color": "teal",
      "skill": "history",
      "secondary": "writing",
      "proof": "shuArchives",
      "actions": [
        "historyvisit",
        "archivewalk",
        "wenhuistudy",
        "project",
        "oralhistory"
      ],
      "guide": "能力、持续行动和对应项目共同计分；A级需60分与1份成果，S级需80分与2份成果。高阶还需保持健康、持续投入并完成毕业。"
    },
    {
      "id": "shu_inclusive",
      "name": "友好校园与无障碍创作",
      "group": "public",
      "icon": "heart",
      "color": "teal",
      "skill": "design",
      "secondary": "empathy",
      "proof": "inclusiveShows",
      "actions": [
        "captionlab",
        "volunteermap",
        "peerhandoff",
        "project",
        "uxlab"
      ],
      "guide": "能力、持续行动和对应项目共同计分；A级需60分与1份成果，S级需80分与2份成果。高阶还需保持健康、持续投入并完成毕业。"
    }
  ],
  "ACTIONS": [
    {
      "id": "lecture",
      "name": "认真上课",
      "cat": "study",
      "icon": "book",
      "desc": "听懂比抄满笔记更有用。积累学业，也训练表达。",
      "cost": 0,
      "stats": {
        "knowledge": 4.3,
        "iq": 1,
        "eq": 0.6,
        "discipline": 1.6,
        "stress": 3,
        "pedagogy": 1,
        "planning": 1
      },
      "tags": [
        "study"
      ],
      "maxRepeat": 2,
      "location": "classroom",
      "meet": []
    },
    {
      "id": "library",
      "name": "图书馆内卷",
      "cat": "study",
      "icon": "book",
      "desc": "借一张靠窗的桌子，把难题拆成小问题。",
      "cost": 0,
      "stats": {
        "knowledge": 6,
        "iq": 1.5,
        "exam": 1.8,
        "discipline": 1,
        "stress": 6,
        "mood": -1,
        "writing": 1.5,
        "data": 1
      },
      "tags": [
        "study"
      ],
      "maxRepeat": 2,
      "location": "library",
      "meet": [
        "yuan"
      ]
    },
    {
      "id": "studygroup",
      "name": "学习小组",
      "cat": "study",
      "icon": "chat",
      "desc": "讲给别人听，是另一种把知识学会的方法。",
      "cost": 30,
      "stats": {
        "knowledge": 4,
        "eq": 2,
        "iq": 1,
        "stress": 2,
        "teamwork": 3,
        "pedagogy": 2
      },
      "tags": [
        "study",
        "team",
        "education"
      ],
      "maxRepeat": 2,
      "location": "library",
      "meet": []
    },
    {
      "id": "seminar",
      "name": "旁听研究讲座",
      "cat": "study",
      "icon": "flask",
      "desc": "从“这是什么”走到“为什么会这样”。",
      "cost": 0,
      "stats": {
        "research": 4,
        "iq": 2,
        "language": 0.6,
        "stress": 2,
        "innovation": 2,
        "data": 1
      },
      "tags": [
        "study",
        "data"
      ],
      "maxRepeat": 2,
      "req": {
        "knowledge": 22
      },
      "meet": [
        "gu"
      ],
      "location": "lab"
    },
    {
      "id": "research",
      "name": "进入实验室",
      "cat": "study",
      "icon": "flask",
      "desc": "失败的实验也需要认真记录。",
      "cost": 60,
      "stats": {
        "research": 6,
        "tech": 1.7,
        "iq": 1.2,
        "stress": 7,
        "data": 2,
        "resilience": 1
      },
      "tags": [
        "study",
        "data"
      ],
      "maxRepeat": 2,
      "req": {
        "knowledge": 35
      },
      "minMonth": 7,
      "location": "lab",
      "meet": []
    },
    {
      "id": "exam",
      "name": "考研系统复习",
      "cat": "study",
      "icon": "book",
      "desc": "真题、错题、复盘。比单纯熬夜更有效。",
      "cost": 40,
      "stats": {
        "exam": 7,
        "knowledge": 2.6,
        "discipline": 1.5,
        "stress": 6,
        "planning": 2
      },
      "tags": [
        "study"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "library"
    },
    {
      "id": "logic",
      "name": "逻辑与思维训练",
      "cat": "study",
      "icon": "brain",
      "desc": "换一种角度做题，也换一种角度看生活。",
      "cost": 0,
      "stats": {
        "iq": 4.5,
        "exam": 2.7,
        "knowledge": 1,
        "stress": 3,
        "data": 2,
        "innovation": 1
      },
      "tags": [
        "study",
        "data"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "classroom"
    },
    {
      "id": "language",
      "name": "语言角与精读",
      "cat": "study",
      "icon": "globe",
      "desc": "用另一种语言认识更大的世界。",
      "cost": 30,
      "stats": {
        "language": 6,
        "iq": 1,
        "eq": 1.4,
        "exam": 1.1,
        "empathy": 1.5
      },
      "tags": [
        "study",
        "language"
      ],
      "maxRepeat": 2,
      "meet": [
        "lin",
        "gu",
        "ji"
      ],
      "location": "international"
    },
    {
      "id": "remedial",
      "name": "补修与重整",
      "cat": "study",
      "icon": "book",
      "desc": "补上缺口，重新出发。可修复一门未通过的课程。",
      "cost": 100,
      "stats": {
        "knowledge": 4,
        "discipline": 3,
        "stress": 2
      },
      "tags": [
        "study"
      ],
      "maxRepeat": 1,
      "special": "remedial",
      "meet": [],
      "location": "classroom"
    },
    {
      "id": "club",
      "name": "社团活动",
      "cat": "social",
      "icon": "flag",
      "desc": "招新、活动和临时救场，朋友就在这些琐碎里。",
      "cost": 80,
      "stats": {
        "eq": 3.5,
        "fame": 4,
        "mood": 3,
        "stress": -3,
        "leadership": 2,
        "teamwork": 2
      },
      "tags": [
        "social",
        "team"
      ],
      "maxRepeat": 2,
      "meet": [
        "su",
        "lu",
        "zhou",
        "pei"
      ],
      "location": "club"
    },
    {
      "id": "debate",
      "name": "辩论与表达",
      "cat": "social",
      "icon": "chat",
      "desc": "不只是赢下争论，也学着理解不同立场。",
      "cost": 20,
      "stats": {
        "eq": 4,
        "iq": 1.5,
        "civic": 4,
        "fame": 2,
        "stress": 2,
        "law": 2,
        "negotiation": 2
      },
      "tags": [
        "social",
        "public"
      ],
      "maxRepeat": 2,
      "meet": [
        "su",
        "gu"
      ],
      "location": "forum"
    },
    {
      "id": "network",
      "name": "校友交流",
      "cat": "social",
      "icon": "briefcase",
      "desc": "认真介绍自己的作品，而不是只交换联系方式。",
      "cost": 100,
      "stats": {
        "eq": 3.5,
        "business": 3,
        "tech": 1,
        "fame": 2,
        "negotiation": 2
      },
      "tags": [
        "social",
        "business",
        "team"
      ],
      "maxRepeat": 2,
      "minMonth": 7,
      "meet": [
        "shen",
        "cheng",
        "xu"
      ],
      "location": "hub"
    },
    {
      "id": "hangout",
      "name": "和朋友去玩",
      "cat": "social",
      "icon": "sun",
      "desc": "夜市、落日、路边摊：这也是大学的一部分。",
      "cost": 140,
      "stats": {
        "eq": 3,
        "mood": 8,
        "stress": -9,
        "explore": 2
      },
      "tags": [
        "social",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "meet": [
        "tang",
        "jiang"
      ],
      "location": "garden"
    },
    {
      "id": "listen",
      "name": "认真聊聊天",
      "cat": "social",
      "icon": "chat",
      "desc": "记住对方在意的事，不急着证明自己。",
      "cost": 20,
      "stats": {
        "eq": 2.5,
        "mood": 3,
        "stress": -3,
        "empathy": 3
      },
      "tags": [
        "social",
        "team"
      ],
      "maxRepeat": 2,
      "special": "relationship",
      "mode": "listen",
      "target": true,
      "meet": [],
      "location": "garden"
    },
    {
      "id": "date",
      "name": "一起约会",
      "cat": "social",
      "icon": "heart",
      "desc": "散步也可以是好约会，重要的是两个人都愿意。",
      "cost": 180,
      "stats": {
        "eq": 1.5,
        "mood": 7,
        "stress": -7,
        "empathy": 2
      },
      "tags": [
        "social",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "special": "relationship",
      "mode": "date",
      "target": true,
      "meet": [],
      "location": "city"
    },
    {
      "id": "gift",
      "name": "用心准备礼物",
      "cat": "social",
      "icon": "gift",
      "desc": "不是越贵越好。礼物只能补充陪伴，不能代替陪伴。",
      "cost": 260,
      "stats": {
        "mood": 2
      },
      "tags": [
        "social"
      ],
      "maxRepeat": 1,
      "special": "relationship",
      "mode": "gift",
      "target": true,
      "meet": [],
      "location": "dorm"
    },
    {
      "id": "confess",
      "name": "认真表达喜欢",
      "cat": "social",
      "icon": "heart",
      "desc": "邀请，不是索取答案。对方有权接受，也有权拒绝。",
      "cost": 60,
      "stats": {
        "eq": 1
      },
      "tags": [
        "social"
      ],
      "maxRepeat": 1,
      "special": "relationship",
      "mode": "confess",
      "target": true,
      "meet": [],
      "location": "garden"
    },
    {
      "id": "breakup",
      "name": "坦诚结束关系",
      "cat": "social",
      "icon": "chat",
      "desc": "不再合适时，好好告别，不用失联替代沟通。",
      "cost": 0,
      "stats": {
        "eq": 2,
        "stress": -2
      },
      "tags": [
        "social"
      ],
      "maxRepeat": 1,
      "special": "relationship",
      "mode": "breakup",
      "target": true,
      "meet": [],
      "location": "garden"
    },
    {
      "id": "code",
      "name": "专业技能训练",
      "cat": "career",
      "icon": "code",
      "desc": "做出能运行、能验证的小东西。",
      "cost": 40,
      "stats": {
        "tech": 6,
        "iq": 1.5,
        "discipline": 1,
        "stress": 4,
        "engineering": 1,
        "innovation": 2
      },
      "tags": [
        "career",
        "tech",
        "engineering"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "maker"
    },
    {
      "id": "workshop",
      "name": "实训工作坊",
      "cat": "career",
      "icon": "tools",
      "desc": "从图纸到实物，在手上形成经验。",
      "cost": 80,
      "stats": {
        "tech": 6.5,
        "discipline": 2,
        "business": 1,
        "stress": 3,
        "engineering": 3
      },
      "tags": [
        "career",
        "tech",
        "engineering"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "maker"
    },
    {
      "id": "intern",
      "name": "实习与见习",
      "cat": "career",
      "icon": "briefcase",
      "desc": "接触真实工作，学着把任务做完整。",
      "cost": 0,
      "stats": {
        "tech": 4.5,
        "eq": 2,
        "discipline": 1.8,
        "stress": 5,
        "teamwork": 2,
        "planning": 1
      },
      "tags": [
        "career",
        "tech",
        "team"
      ],
      "maxRepeat": 2,
      "minMonth": 13,
      "req": {
        "tech": 25
      },
      "income": 500,
      "special": "intern",
      "meet": [],
      "location": "hub"
    },
    {
      "id": "parttime",
      "name": "勤工助学",
      "cat": "career",
      "icon": "wallet",
      "desc": "一份脚踏实地的小工作，换来一点经济自由。",
      "cost": 0,
      "stats": {
        "eq": 2,
        "discipline": 2,
        "health": -1,
        "stress": 3,
        "finance": 1,
        "negotiation": 1
      },
      "tags": [
        "career",
        "business"
      ],
      "maxRepeat": 2,
      "income": 520,
      "special": "work",
      "meet": [],
      "location": "kitchen"
    },
    {
      "id": "tutor",
      "name": "课后家教",
      "cat": "career",
      "icon": "book",
      "desc": "把复杂的知识说清楚，顺便挣一笔生活费。",
      "cost": 0,
      "stats": {
        "knowledge": 2,
        "eq": 2.5,
        "discipline": 1,
        "stress": 3
      },
      "tags": [
        "career",
        "education",
        "business"
      ],
      "maxRepeat": 2,
      "req": {
        "knowledge": 40
      },
      "income": 750,
      "special": "work",
      "meet": [],
      "location": "community"
    },
    {
      "id": "product",
      "name": "产品与商业学习",
      "cat": "career",
      "icon": "briefcase",
      "desc": "好点子很多，让人愿意用才是下一步。",
      "cost": 60,
      "stats": {
        "business": 6,
        "tech": 1.5,
        "eq": 1.5,
        "stress": 3,
        "finance": 2,
        "innovation": 2
      },
      "tags": [
        "career",
        "business",
        "tech"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "hub"
    },
    {
      "id": "interview",
      "name": "创业市集与访谈",
      "cat": "career",
      "icon": "chat",
      "desc": "别只问“你喜不喜欢”，问问真实的麻烦是什么。",
      "cost": 120,
      "stats": {
        "business": 5,
        "eq": 3,
        "fame": 1.5,
        "explore": 1,
        "negotiation": 2,
        "empathy": 1
      },
      "tags": [
        "career",
        "business"
      ],
      "maxRepeat": 2,
      "meet": [
        "xu",
        "shen",
        "cheng"
      ],
      "location": "community"
    },
    {
      "id": "pitch",
      "name": "路演与合作洽谈",
      "cat": "career",
      "icon": "flag",
      "desc": "带着产品、数据和可执行的计划上台。",
      "cost": 220,
      "stats": {
        "business": 3,
        "eq": 3,
        "fame": 3,
        "stress": 4,
        "performance": 2,
        "finance": 1
      },
      "tags": [
        "career",
        "business",
        "stage"
      ],
      "maxRepeat": 1,
      "minMonth": 13,
      "req": {
        "business": 35
      },
      "special": "pitch",
      "meet": [],
      "location": "hub"
    },
    {
      "id": "freelance",
      "name": "接一份小委托",
      "cat": "career",
      "icon": "laptop",
      "desc": "报价、沟通、交付，缺一步都算不上完成。",
      "cost": 0,
      "stats": {
        "tech": 3,
        "art": 2,
        "business": 2.5,
        "discipline": 1,
        "stress": 4,
        "negotiation": 2,
        "finance": 1
      },
      "tags": [
        "career",
        "tech",
        "business"
      ],
      "maxRepeat": 2,
      "req": {
        "tech": 30
      },
      "income": 650,
      "special": "freelance",
      "meet": [],
      "location": "hub"
    },
    {
      "id": "portfolio",
      "name": "打磨作品集",
      "cat": "career",
      "icon": "laptop",
      "desc": "认真解释你解决了什么，而不只是堆图片。",
      "cost": 50,
      "stats": {
        "tech": 4,
        "art": 3,
        "fame": 1.5,
        "stress": 2,
        "design": 3
      },
      "tags": [
        "career",
        "tech",
        "design"
      ],
      "maxRepeat": 2,
      "location": "designlab",
      "meet": []
    },
    {
      "id": "certificate",
      "name": "专业认证挑战",
      "cat": "career",
      "icon": "medal",
      "desc": "需要扎实技能；每六个月只能参加一次。",
      "cost": 260,
      "stats": {
        "tech": 2,
        "discipline": 2,
        "stress": 3
      },
      "tags": [
        "career",
        "tech"
      ],
      "maxRepeat": 1,
      "req": {
        "tech": 45
      },
      "special": "certificate",
      "meet": [],
      "location": "maker"
    },
    {
      "id": "policy",
      "name": "公共事务研习",
      "cat": "career",
      "icon": "building",
      "desc": "理解政策与基层问题，练习清楚、准确地表达。",
      "cost": 0,
      "stats": {
        "civic": 7,
        "knowledge": 2,
        "eq": 1,
        "discipline": 1.2,
        "stress": 3,
        "law": 3
      },
      "tags": [
        "career",
        "public"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "forum"
    },
    {
      "id": "project",
      "name": "推进长期项目",
      "cat": "career",
      "icon": "flag",
      "desc": "让一个想法跨过“开始了”到“做完了”的距离。",
      "cost": 60,
      "stats": {
        "discipline": 1,
        "iq": 1,
        "stress": 4
      },
      "tags": [
        "career"
      ],
      "maxRepeat": 2,
      "special": "project",
      "meet": [],
      "location": "maker"
    },
    {
      "id": "write",
      "name": "写作与创作",
      "cat": "interest",
      "icon": "pen",
      "desc": "把看见的生活变成别人也能读懂的故事。",
      "cost": 0,
      "stats": {
        "art": 6,
        "iq": 1,
        "eq": 1,
        "fame": 1,
        "stress": -2,
        "writing": 4
      },
      "tags": [
        "interest",
        "art",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "newsroom",
      "meet": []
    },
    {
      "id": "music",
      "name": "乐队排练",
      "cat": "interest",
      "icon": "music",
      "desc": "一起跑调，再一起找到节奏。",
      "cost": 100,
      "stats": {
        "art": 5,
        "fame": 2,
        "eq": 2,
        "mood": 4,
        "stress": -5,
        "performance": 3
      },
      "tags": [
        "interest",
        "art",
        "stage"
      ],
      "maxRepeat": 2,
      "meet": [
        "lu",
        "su"
      ],
      "location": "theatre"
    },
    {
      "id": "vlog",
      "name": "校园影像记录",
      "cat": "interest",
      "icon": "camera",
      "desc": "镜头不是生活本身，但能留下一点回声。",
      "cost": 80,
      "stats": {
        "art": 4.5,
        "fame": 5,
        "explore": 1.5,
        "mood": 3,
        "photography": 3,
        "media": 2
      },
      "tags": [
        "interest",
        "art",
        "film",
        "media"
      ],
      "maxRepeat": 2,
      "meet": [
        "jiang",
        "an"
      ],
      "location": "film"
    },
    {
      "id": "exhibition",
      "name": "参加作品展",
      "cat": "interest",
      "icon": "pen",
      "desc": "让作品走出自己的文件夹。",
      "cost": 160,
      "stats": {
        "art": 2,
        "fame": 5,
        "eq": 2,
        "stress": 3,
        "design": 2
      },
      "tags": [
        "interest",
        "design",
        "art"
      ],
      "maxRepeat": 1,
      "req": {
        "art": 40
      },
      "special": "artshow",
      "location": "gallery",
      "meet": []
    },
    {
      "id": "game",
      "name": "和室友打游戏",
      "cat": "interest",
      "icon": "game",
      "desc": "赢一把，笑一晚。适度娱乐不会自动毁掉人生。",
      "cost": 20,
      "stats": {
        "gaming": 3.5,
        "eq": 1.5,
        "mood": 7,
        "stress": -8
      },
      "tags": [
        "interest"
      ],
      "maxRepeat": 2,
      "meet": [
        "tang"
      ],
      "location": "dorm"
    },
    {
      "id": "nightgame",
      "name": "通宵冲分",
      "cat": "interest",
      "icon": "moon",
      "desc": "短期涨分快，身体与课业会记账。",
      "cost": 30,
      "stats": {
        "gaming": 6,
        "mood": 3,
        "health": -7,
        "discipline": -3,
        "knowledge": -2,
        "stress": 3
      },
      "tags": [
        "interest"
      ],
      "maxRepeat": 2,
      "special": "nightgame",
      "meet": [],
      "location": "dorm"
    },
    {
      "id": "train",
      "name": "电竞战术训练",
      "cat": "interest",
      "icon": "game",
      "desc": "不是机械排位：配合、沟通、训练计划。",
      "cost": 60,
      "stats": {
        "gaming": 6,
        "eq": 1.7,
        "discipline": 1.4,
        "stress": 4,
        "teamwork": 2
      },
      "tags": [
        "interest",
        "gaming",
        "team"
      ],
      "maxRepeat": 2,
      "meet": [
        "tang"
      ],
      "location": "club"
    },
    {
      "id": "review",
      "name": "录像复盘",
      "cat": "interest",
      "icon": "brain",
      "desc": "找出自己能改变的失误，不把输赢都归咎队友。",
      "cost": 0,
      "stats": {
        "gaming": 4.5,
        "iq": 1.8,
        "discipline": 2,
        "stress": 1,
        "data": 2,
        "resilience": 1
      },
      "tags": [
        "interest",
        "gaming",
        "data"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "dorm"
    },
    {
      "id": "esport",
      "name": "报名电竞联赛",
      "cat": "interest",
      "icon": "medal",
      "desc": "每六个月可参赛一次；训练与协作共同决定结果。",
      "cost": 180,
      "stats": {
        "gaming": 2,
        "fame": 2,
        "stress": 5
      },
      "tags": [
        "interest",
        "gaming"
      ],
      "maxRepeat": 1,
      "req": {
        "gaming": 40
      },
      "special": "esport",
      "meet": [],
      "location": "club"
    },
    {
      "id": "run",
      "name": "操场与户外跑",
      "cat": "life",
      "icon": "run",
      "desc": "把长长的一圈跑完，脑子也清醒一些。",
      "cost": 0,
      "stats": {
        "health": 5,
        "sport": 5,
        "iq": 1,
        "discipline": 1.5,
        "stress": -7,
        "mood": 4,
        "resilience": 1
      },
      "tags": [
        "life",
        "sport",
        "explore",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "meet": [
        "zhou"
      ],
      "location": "track"
    },
    {
      "id": "gym",
      "name": "健身与体态",
      "cat": "life",
      "icon": "run",
      "desc": "规律比猛练更有效。健康、体态、气质一起变好。",
      "cost": 100,
      "stats": {
        "health": 5,
        "sport": 4,
        "charm": 3,
        "discipline": 1,
        "stress": -4
      },
      "tags": [
        "life",
        "sport",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "track",
      "meet": []
    },
    {
      "id": "sportmatch",
      "name": "校际运动赛事",
      "cat": "life",
      "icon": "medal",
      "desc": "把训练带上赛场，每六个月可报名一次。",
      "cost": 120,
      "stats": {
        "sport": 2,
        "fame": 3,
        "mood": 3,
        "stress": 3
      },
      "tags": [
        "life",
        "sport"
      ],
      "maxRepeat": 1,
      "req": {
        "sport": 40
      },
      "special": "sportmatch",
      "location": "track",
      "meet": []
    },
    {
      "id": "hike",
      "name": "徒步与观星",
      "cat": "life",
      "icon": "compass",
      "desc": "走过山路，也走出原来的思维惯性。",
      "cost": 180,
      "stats": {
        "explore": 6,
        "iq": 2.5,
        "eq": 1.5,
        "exam": 1.5,
        "health": 2,
        "mood": 5,
        "stress": -8,
        "ecology": 2
      },
      "tags": [
        "life",
        "explore",
        "eco",
        "practice"
      ],
      "maxRepeat": 2,
      "meet": [
        "jiang",
        "zhou"
      ],
      "special": "place",
      "location": "city"
    },
    {
      "id": "travel",
      "name": "探索陌生城市",
      "cat": "life",
      "icon": "globe",
      "desc": "先做预算，再把地图折起来出发。",
      "cost": 480,
      "stats": {
        "explore": 9,
        "eq": 3,
        "iq": 2,
        "language": 1.5,
        "art": 2,
        "mood": 7,
        "stress": -9,
        "planning": 2,
        "history": 2
      },
      "tags": [
        "life",
        "explore",
        "humanity",
        "practice"
      ],
      "maxRepeat": 2,
      "minMonth": 4,
      "special": "place",
      "location": "city",
      "meet": []
    },
    {
      "id": "museum",
      "name": "博物馆与旧书店",
      "cat": "life",
      "icon": "building",
      "desc": "看一件旧物，也许会想到一个全新的问题。",
      "cost": 80,
      "stats": {
        "explore": 4.5,
        "iq": 2.5,
        "art": 2.5,
        "mood": 4,
        "stress": -5,
        "history": 4
      },
      "tags": [
        "life",
        "explore",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "heritage",
      "meet": [
        "ji"
      ]
    },
    {
      "id": "volunteer",
      "name": "社区志愿服务",
      "cat": "life",
      "icon": "leaf",
      "desc": "一次小小的可靠，比一句宏大的口号更有用。",
      "cost": 30,
      "stats": {
        "service": 6,
        "eq": 3,
        "civic": 2,
        "mood": 4,
        "stress": -3,
        "empathy": 2,
        "teamwork": 1
      },
      "tags": [
        "life",
        "public",
        "team"
      ],
      "maxRepeat": 2,
      "meet": [
        "su",
        "lin"
      ],
      "location": "community"
    },
    {
      "id": "teach",
      "name": "乡村课堂与陪伴",
      "cat": "life",
      "icon": "book",
      "desc": "不急着扮演拯救者，先问清对方真正需要什么。",
      "cost": 100,
      "stats": {
        "service": 7,
        "eq": 3,
        "knowledge": 1.5,
        "explore": 2,
        "mood": 3,
        "pedagogy": 3
      },
      "tags": [
        "life",
        "education"
      ],
      "maxRepeat": 2,
      "minMonth": 7,
      "location": "community",
      "meet": []
    },
    {
      "id": "style",
      "name": "穿搭与形象管理",
      "cat": "life",
      "icon": "spark",
      "desc": "找到适合自己的样子，不必变成另一个人。",
      "cost": 200,
      "stats": {
        "charm": 7,
        "mood": 4,
        "eq": 1,
        "stress": -3,
        "design": 1
      },
      "tags": [
        "life",
        "design"
      ],
      "maxRepeat": 2,
      "meet": [],
      "location": "dorm"
    },
    {
      "id": "rest",
      "name": "认真休息",
      "cat": "life",
      "icon": "moon",
      "desc": "睡够、吃好、散步。恢复不是浪费回合。",
      "cost": 0,
      "stats": {
        "health": 7,
        "mood": 9,
        "stress": -17,
        "resilience": 1
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "dorm",
      "meet": []
    },
    {
      "id": "home",
      "name": "和家人相处",
      "cat": "life",
      "icon": "home",
      "desc": "电话那头的人，也在学习与你的独立相处。",
      "cost": 60,
      "stats": {
        "eq": 2,
        "mood": 8,
        "stress": -12,
        "health": 2,
        "empathy": 2
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "special": "home",
      "location": "dorm",
      "meet": []
    },
    {
      "id": "qwcread",
      "name": "钱伟长馆专题阅读",
      "cat": "study",
      "icon": "book",
      "desc": "围绕一个问题阅读、摘录与讨论；跨校区借阅时先核对馆藏与服务要求。",
      "cost": 0,
      "stats": {
        "knowledge": 4,
        "research": 2,
        "history": 3,
        "writing": 2,
        "stress": 3
      },
      "tags": [
        "study",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "library",
      "meet": [
        "yuan"
      ]
    },
    {
      "id": "datawork",
      "name": "数据分析工作坊",
      "cat": "study",
      "icon": "brain",
      "desc": "先问抽样偏差，再画结论。错误也要能被复现。",
      "cost": 40,
      "stats": {
        "data": 7,
        "iq": 1.5,
        "research": 2,
        "tech": 2,
        "stress": 4
      },
      "tags": [
        "study",
        "data"
      ],
      "maxRepeat": 2,
      "location": "lab",
      "meet": []
    },
    {
      "id": "material",
      "name": "材料与结构实验",
      "cat": "study",
      "icon": "flask",
      "desc": "设计对照、记录失败，少一个漂亮但不可靠的结论。",
      "cost": 100,
      "stats": {
        "engineering": 6,
        "research": 3,
        "innovation": 2,
        "stress": 5
      },
      "tags": [
        "study",
        "engineering"
      ],
      "maxRepeat": 2,
      "location": "lab",
      "meet": [
        "ye"
      ]
    },
    {
      "id": "reproduce",
      "name": "科研复现日",
      "cat": "study",
      "icon": "flask",
      "desc": "把别人的方法真正跑通，留下失败条件与版本。",
      "cost": 40,
      "stats": {
        "research": 5,
        "data": 4,
        "resilience": 2,
        "stress": 4
      },
      "tags": [
        "study",
        "data"
      ],
      "maxRepeat": 2,
      "location": "lab",
      "meet": [
        "ye"
      ]
    },
    {
      "id": "peerteach",
      "name": "同伴微课堂",
      "cat": "study",
      "icon": "book",
      "desc": "用一个例子讲清一个概念，再根据反馈改教法。",
      "cost": 0,
      "stats": {
        "pedagogy": 6,
        "knowledge": 3,
        "eq": 2,
        "writing": 2,
        "stress": 2
      },
      "tags": [
        "study",
        "education"
      ],
      "maxRepeat": 2,
      "location": "classroom",
      "meet": []
    },
    {
      "id": "oraldefense",
      "name": "模拟答辩",
      "cat": "study",
      "icon": "chat",
      "desc": "让朋友故意问难题，把不会的部分标出来。",
      "cost": 20,
      "stats": {
        "research": 3,
        "language": 2,
        "eq": 2,
        "performance": 3,
        "stress": 3
      },
      "tags": [
        "study",
        "public"
      ],
      "maxRepeat": 2,
      "location": "classroom",
      "meet": []
    },
    {
      "id": "interdiscipline",
      "name": "跨学科选修",
      "cat": "study",
      "icon": "spark",
      "desc": "暂时离开熟悉的工具箱，和另一个专业共同解题。",
      "cost": 30,
      "stats": {
        "innovation": 6,
        "iq": 2,
        "teamwork": 3,
        "knowledge": 2,
        "stress": 3
      },
      "tags": [
        "study",
        "team"
      ],
      "maxRepeat": 2,
      "location": "classroom",
      "meet": [
        "pei"
      ]
    },
    {
      "id": "summerlab",
      "name": "夏季实践研修",
      "cat": "study",
      "icon": "flask",
      "desc": "短期集中实践；暑期有额外成长，但全年均可准备。",
      "cost": 120,
      "stats": {
        "research": 4,
        "engineering": 4,
        "planning": 3,
        "tech": 2,
        "stress": 5
      },
      "tags": [
        "study",
        "engineering",
        "practice"
      ],
      "maxRepeat": 2,
      "location": "lab",
      "summer": true,
      "meet": []
    },
    {
      "id": "cluboffice",
      "name": "社团项目值班",
      "cat": "social",
      "icon": "flag",
      "desc": "与其一个人熬夜，不如把任务拆开、把交接写清。",
      "cost": 30,
      "stats": {
        "leadership": 6,
        "teamwork": 4,
        "fame": 2,
        "eq": 1,
        "stress": 3
      },
      "tags": [
        "social",
        "team"
      ],
      "maxRepeat": 2,
      "location": "club",
      "meet": []
    },
    {
      "id": "roommeeting",
      "name": "宿舍圆桌会",
      "cat": "social",
      "icon": "chat",
      "desc": "把作息、公共空间与分工谈清；提高宿舍和谐。",
      "cost": 0,
      "stats": {
        "negotiation": 4,
        "empathy": 3,
        "eq": 2,
        "stress": -5
      },
      "tags": [
        "social",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "dorm",
      "special": "dorm",
      "meet": []
    },
    {
      "id": "partnerproject",
      "name": "共同完成小计划",
      "cat": "social",
      "icon": "heart",
      "desc": "和选中的朋友一起做一件小事，也记得保留各自时间。",
      "cost": 80,
      "stats": {
        "teamwork": 4,
        "planning": 2,
        "mood": 4,
        "stress": -4
      },
      "tags": [
        "social",
        "team"
      ],
      "maxRepeat": 2,
      "location": "club",
      "special": "relationship",
      "mode": "listen",
      "target": true,
      "meet": []
    },
    {
      "id": "repairtalk",
      "name": "冲突后的修复对话",
      "cat": "social",
      "icon": "chat",
      "desc": "说出感受和具体请求，不把对方当成待优化的项目。",
      "cost": 0,
      "stats": {
        "empathy": 4,
        "negotiation": 3,
        "eq": 2,
        "stress": -4
      },
      "tags": [
        "social",
        "public"
      ],
      "maxRepeat": 2,
      "location": "garden",
      "special": "relationship",
      "mode": "listen",
      "target": true,
      "meet": []
    },
    {
      "id": "alumnitable",
      "name": "校友小圆桌",
      "cat": "social",
      "icon": "briefcase",
      "desc": "不用急着索要机会，先问一次真实的失败经历。",
      "cost": 100,
      "stats": {
        "negotiation": 4,
        "business": 3,
        "finance": 2,
        "fame": 2
      },
      "tags": [
        "social",
        "business"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": []
    },
    {
      "id": "languagepair",
      "name": "跨文化伙伴计划",
      "cat": "social",
      "icon": "globe",
      "desc": "轮流用彼此不熟悉的语言解释家乡日常。",
      "cost": 40,
      "stats": {
        "language": 5,
        "empathy": 3,
        "history": 2,
        "eq": 2
      },
      "tags": [
        "social",
        "language"
      ],
      "maxRepeat": 2,
      "location": "international",
      "meet": [
        "milo"
      ]
    },
    {
      "id": "debatejudge",
      "name": "模拟协商听证",
      "cat": "social",
      "icon": "building",
      "desc": "先把各方意见记完整，再提出能执行的折中方案。",
      "cost": 30,
      "stats": {
        "law": 6,
        "negotiation": 4,
        "civic": 2,
        "eq": 1
      },
      "tags": [
        "social",
        "public"
      ],
      "maxRepeat": 2,
      "location": "forum",
      "meet": [
        "liang"
      ]
    },
    {
      "id": "communitywalk",
      "name": "社区走访与倾听",
      "cat": "social",
      "icon": "leaf",
      "desc": "征得同意再记录；把问题交还给真正生活在这里的人。",
      "cost": 50,
      "stats": {
        "empathy": 4,
        "service": 4,
        "history": 3,
        "ecology": 2
      },
      "tags": [
        "social",
        "public",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "community",
      "meet": []
    },
    {
      "id": "opensource",
      "name": "维护开源小工具",
      "cat": "career",
      "icon": "code",
      "desc": "写测试、回问题、修文档；维护不是只看星标数。",
      "cost": 20,
      "stats": {
        "tech": 5,
        "data": 4,
        "teamwork": 2,
        "media": 2,
        "stress": 3
      },
      "tags": [
        "career",
        "tech",
        "data"
      ],
      "maxRepeat": 2,
      "location": "maker",
      "meet": []
    },
    {
      "id": "robotbuild",
      "name": "机器人协同调试",
      "cat": "career",
      "icon": "tools",
      "desc": "机械、控制与程序都需要交流；先让机器稳定完成一件事。",
      "cost": 100,
      "stats": {
        "engineering": 6,
        "tech": 3,
        "teamwork": 3,
        "innovation": 2,
        "stress": 5
      },
      "tags": [
        "career",
        "engineering",
        "team"
      ],
      "maxRepeat": 2,
      "location": "maker",
      "meet": [
        "bai"
      ]
    },
    {
      "id": "uxlab",
      "name": "无障碍体验设计",
      "cat": "career",
      "icon": "pen",
      "desc": "邀请真实使用者反馈，不把“好看”当成“好用”。",
      "cost": 50,
      "stats": {
        "design": 7,
        "empathy": 3,
        "tech": 2,
        "art": 2,
        "stress": 3
      },
      "tags": [
        "career",
        "design"
      ],
      "maxRepeat": 2,
      "location": "designlab",
      "meet": [
        "wen"
      ]
    },
    {
      "id": "budgetlab",
      "name": "现金流与预算复盘",
      "cat": "career",
      "icon": "wallet",
      "desc": "把利润和账户余额分开，给下一月留一条退路。",
      "cost": 0,
      "stats": {
        "finance": 7,
        "business": 3,
        "planning": 2,
        "discipline": 1
      },
      "tags": [
        "career",
        "business"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": []
    },
    {
      "id": "markettest",
      "name": "小规模需求验证",
      "cat": "career",
      "icon": "briefcase",
      "desc": "先访谈再收集订单意向，不用大规模投钱证明点子。",
      "cost": 80,
      "stats": {
        "business": 5,
        "negotiation": 4,
        "data": 3,
        "innovation": 2
      },
      "tags": [
        "career",
        "business",
        "data"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": []
    },
    {
      "id": "prototype",
      "name": "快速原型迭代",
      "cat": "career",
      "icon": "tools",
      "desc": "先做一个能试用的版本，再根据反馈改。",
      "cost": 150,
      "stats": {
        "design": 4,
        "tech": 4,
        "engineering": 3,
        "innovation": 4,
        "stress": 5
      },
      "tags": [
        "career",
        "tech",
        "design"
      ],
      "maxRepeat": 2,
      "location": "maker",
      "meet": []
    },
    {
      "id": "clienttalk",
      "name": "交付与需求澄清",
      "cat": "career",
      "icon": "chat",
      "desc": "把验收范围、修改次数和时间写进约定。",
      "cost": 0,
      "stats": {
        "negotiation": 5,
        "law": 3,
        "business": 3,
        "planning": 2
      },
      "tags": [
        "career",
        "business",
        "public"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": []
    },
    {
      "id": "incubation",
      "name": "孵化项目公开日",
      "cat": "career",
      "icon": "flag",
      "desc": "和别的团队互相拆解商业模式；不是默认获得投资。",
      "cost": 100,
      "stats": {
        "business": 4,
        "leadership": 3,
        "finance": 3,
        "fame": 3
      },
      "tags": [
        "career",
        "business",
        "team"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": []
    },
    {
      "id": "teachingdesign",
      "name": "课程设计与试讲",
      "cat": "career",
      "icon": "book",
      "desc": "设定一个小目标，观察学习者是否真的理解。",
      "cost": 50,
      "stats": {
        "pedagogy": 7,
        "writing": 3,
        "service": 3,
        "knowledge": 2,
        "stress": 3
      },
      "tags": [
        "career",
        "education"
      ],
      "maxRepeat": 2,
      "location": "classroom",
      "meet": []
    },
    {
      "id": "legalclinic",
      "name": "规则案例研讨",
      "cat": "career",
      "icon": "building",
      "desc": "用虚构案例训练程序意识；不提供真实法律代理。",
      "cost": 0,
      "stats": {
        "law": 7,
        "writing": 3,
        "civic": 3,
        "negotiation": 2,
        "stress": 3
      },
      "tags": [
        "career",
        "public"
      ],
      "maxRepeat": 2,
      "location": "forum",
      "meet": [
        "liang"
      ]
    },
    {
      "id": "editing",
      "name": "校刊采访与编辑",
      "cat": "interest",
      "icon": "pen",
      "desc": "核实引语，向被采访者说明记录用途。",
      "cost": 40,
      "stats": {
        "writing": 6,
        "media": 5,
        "art": 2,
        "eq": 2
      },
      "tags": [
        "interest",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "newsroom",
      "meet": [
        "he"
      ]
    },
    {
      "id": "factcheck",
      "name": "信息核验练习",
      "cat": "interest",
      "icon": "laptop",
      "desc": "追溯原始来源，区分证据、观点与推测。",
      "cost": 0,
      "stats": {
        "media": 7,
        "data": 3,
        "writing": 2,
        "iq": 1
      },
      "tags": [
        "interest",
        "data",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "newsroom",
      "meet": [
        "he"
      ]
    },
    {
      "id": "filmcrew",
      "name": "延长影像工坊",
      "cat": "interest",
      "icon": "camera",
      "desc": "以延长校区为灵感的虚构片场；认真完成分镜、收音与剪辑。",
      "cost": 120,
      "stats": {
        "photography": 7,
        "art": 4,
        "teamwork": 2,
        "stress": 4
      },
      "tags": [
        "interest",
        "film"
      ],
      "maxRepeat": 2,
      "location": "film",
      "meet": [
        "song"
      ]
    },
    {
      "id": "documentary",
      "name": "纪录片田野观察",
      "cat": "interest",
      "icon": "camera",
      "desc": "拍摄前谈授权，拍摄后保留人物的复杂性。",
      "cost": 100,
      "stats": {
        "photography": 5,
        "writing": 3,
        "empathy": 3,
        "explore": 3
      },
      "tags": [
        "interest",
        "film",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "community",
      "meet": []
    },
    {
      "id": "stageplay",
      "name": "剧场台词与走位",
      "cat": "interest",
      "icon": "music",
      "desc": "从台前到幕后，为每一次排练做好准备。",
      "cost": 80,
      "stats": {
        "performance": 7,
        "art": 3,
        "teamwork": 3,
        "mood": 3,
        "stress": -2
      },
      "tags": [
        "interest",
        "stage"
      ],
      "maxRepeat": 2,
      "location": "theatre",
      "meet": [
        "qiao"
      ]
    },
    {
      "id": "chorus",
      "name": "合唱与合奏",
      "cat": "interest",
      "icon": "music",
      "desc": "不是让自己的声音最大，而是找到共同的呼吸。",
      "cost": 40,
      "stats": {
        "performance": 5,
        "art": 3,
        "teamwork": 4,
        "mood": 5,
        "stress": -5
      },
      "tags": [
        "interest",
        "stage",
        "team"
      ],
      "maxRepeat": 2,
      "location": "theatre",
      "meet": [
        "qiao"
      ]
    },
    {
      "id": "curation",
      "name": "策展与视觉叙事",
      "cat": "interest",
      "icon": "pen",
      "desc": "把不同作品连成可理解的叙事，说明每一次取舍。",
      "cost": 100,
      "stats": {
        "design": 5,
        "history": 3,
        "art": 4,
        "leadership": 2
      },
      "tags": [
        "interest",
        "design",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "gallery",
      "meet": []
    },
    {
      "id": "oralhistory",
      "name": "地方口述史记录",
      "cat": "interest",
      "icon": "book",
      "desc": "先问是否愿意讲，再把记忆与可核实材料分开。",
      "cost": 50,
      "stats": {
        "history": 7,
        "writing": 4,
        "empathy": 2,
        "explore": 2
      },
      "tags": [
        "interest",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "community",
      "meet": [
        "xuanzhi"
      ]
    },
    {
      "id": "jufestival",
      "name": "菊文化活动协作",
      "cat": "interest",
      "icon": "leaf",
      "desc": "在游戏里的秋季活动中参与布展、照看绿植与讲述校园记忆；不代表当年官方日程。",
      "cost": 30,
      "stats": {
        "ecology": 4,
        "history": 3,
        "photography": 3,
        "art": 2,
        "mood": 5
      },
      "tags": [
        "interest",
        "eco",
        "film"
      ],
      "maxRepeat": 2,
      "location": "garden",
      "festival": "jufestival",
      "meet": [
        "an"
      ]
    },
    {
      "id": "springconcert",
      "name": "伟长楼演出实践",
      "cat": "interest",
      "icon": "music",
      "desc": "选择排练、舞台协作或认真观演。借真实场地串联虚构演出，不复刻真实演职人员。",
      "cost": 20,
      "stats": {
        "performance": 3,
        "service": 4,
        "teamwork": 3,
        "art": 3,
        "mood": 4
      },
      "tags": [
        "interest",
        "stage",
        "team"
      ],
      "maxRepeat": 2,
      "location": "theatre",
      "festival": "springconcert",
      "meet": []
    },
    {
      "id": "gamecraft",
      "name": "独立游戏机制设计",
      "cat": "interest",
      "icon": "game",
      "desc": "先做一个完整循环，再加特效；请朋友真实试玩。",
      "cost": 50,
      "stats": {
        "design": 5,
        "tech": 3,
        "art": 3,
        "innovation": 4,
        "gaming": 2
      },
      "tags": [
        "interest",
        "design",
        "tech"
      ],
      "maxRepeat": 2,
      "location": "maker",
      "meet": []
    },
    {
      "id": "soundwalk",
      "name": "城市声音采集",
      "cat": "interest",
      "icon": "camera",
      "desc": "不打扰他人地记录声音，把街道听成另一张地图。",
      "cost": 50,
      "stats": {
        "photography": 4,
        "media": 3,
        "art": 3,
        "explore": 4
      },
      "tags": [
        "interest",
        "film",
        "explore"
      ],
      "maxRepeat": 2,
      "location": "city",
      "meet": [
        "song"
      ]
    },
    {
      "id": "campuswalk",
      "name": "三校区文化漫步",
      "cat": "life",
      "icon": "compass",
      "desc": "在虚构化的校园地图间移动，留下自己的观察手册。",
      "cost": 80,
      "stats": {
        "explore": 5,
        "history": 4,
        "planning": 2,
        "mood": 5,
        "stress": -6
      },
      "tags": [
        "life",
        "explore",
        "humanity"
      ],
      "maxRepeat": 2,
      "location": "city",
      "meet": []
    },
    {
      "id": "ecoaudit",
      "name": "校园生态小调查",
      "cat": "life",
      "icon": "leaf",
      "desc": "记录样点和不确定性，让环保提案有可以比较的数据。",
      "cost": 30,
      "stats": {
        "ecology": 7,
        "data": 3,
        "service": 2,
        "iq": 1
      },
      "tags": [
        "life",
        "eco",
        "data"
      ],
      "maxRepeat": 2,
      "location": "garden",
      "meet": [
        "milo"
      ]
    },
    {
      "id": "repaircafe",
      "name": "旧物维修小站",
      "cat": "life",
      "icon": "tools",
      "desc": "不拆未知危险设备；从简单维修和减少浪费开始。",
      "cost": 40,
      "stats": {
        "engineering": 4,
        "ecology": 4,
        "service": 3,
        "tech": 2
      },
      "tags": [
        "life",
        "engineering",
        "eco"
      ],
      "maxRepeat": 2,
      "location": "maker",
      "meet": [
        "bai"
      ]
    },
    {
      "id": "cook",
      "name": "寝室外的周末厨房",
      "cat": "life",
      "icon": "home",
      "desc": "在合规公共厨房做饭，不在寝室使用违禁电器。",
      "cost": 80,
      "stats": {
        "cooking": 7,
        "health": 3,
        "mood": 6,
        "finance": 2,
        "stress": -7
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "kitchen",
      "meet": [
        "tao"
      ]
    },
    {
      "id": "mealplan",
      "name": "营养与一周备餐",
      "cat": "life",
      "icon": "home",
      "desc": "先算预算再准备食物，把日常照顾变成可持续的习惯。",
      "cost": 60,
      "stats": {
        "cooking": 5,
        "planning": 4,
        "health": 5,
        "discipline": 2,
        "stress": -5
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "kitchen",
      "meet": []
    },
    {
      "id": "mindful",
      "name": "情绪整理与散步",
      "cat": "life",
      "icon": "leaf",
      "desc": "写下事实、感受和下一件小事；这不是心理诊断或治疗。",
      "cost": 0,
      "stats": {
        "resilience": 6,
        "empathy": 2,
        "mood": 6,
        "stress": -12
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "garden",
      "meet": []
    },
    {
      "id": "weekreview",
      "name": "一周回顾与留白",
      "cat": "life",
      "icon": "clock",
      "desc": "删掉一些不重要的目标，给意外留出空间。",
      "cost": 0,
      "stats": {
        "planning": 6,
        "discipline": 3,
        "resilience": 3,
        "stress": -7
      },
      "tags": [
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "dorm",
      "meet": []
    },
    {
      "id": "jiadingwalk",
      "name": "嘉定人文观察",
      "cat": "life",
      "icon": "building",
      "desc": "以嘉定校区与地方生活为灵感，完成一段城市观察。",
      "cost": 100,
      "stats": {
        "history": 5,
        "explore": 4,
        "writing": 3,
        "mood": 4
      },
      "tags": [
        "life",
        "humanity",
        "explore"
      ],
      "maxRepeat": 2,
      "location": "heritage",
      "meet": [
        "xuanzhi"
      ]
    },
    {
      "id": "publicspace",
      "name": "公共空间共创",
      "cat": "life",
      "icon": "building",
      "desc": "和使用者一起讨论座椅、动线和安静角落的需要。",
      "cost": 80,
      "stats": {
        "design": 4,
        "ecology": 3,
        "leadership": 3,
        "service": 3
      },
      "tags": [
        "life",
        "design",
        "eco"
      ],
      "maxRepeat": 2,
      "location": "community",
      "meet": []
    },
    {
      "id": "runningclub",
      "name": "跑团配速协作",
      "cat": "life",
      "icon": "run",
      "desc": "按队友状态调整配速，抵达比逞强重要。",
      "cost": 0,
      "stats": {
        "sport": 5,
        "teamwork": 3,
        "health": 4,
        "planning": 2,
        "stress": -6
      },
      "tags": [
        "life",
        "sport",
        "team"
      ],
      "maxRepeat": 2,
      "location": "track",
      "meet": []
    },
    {
      "id": "foodstory",
      "name": "食物与家乡故事",
      "cat": "life",
      "icon": "home",
      "desc": "一道菜和一段记忆；征得同意后再拍摄和分享。",
      "cost": 100,
      "stats": {
        "cooking": 5,
        "writing": 3,
        "photography": 3,
        "eq": 2,
        "mood": 5
      },
      "tags": [
        "life",
        "wellbeing",
        "film"
      ],
      "maxRepeat": 2,
      "location": "kitchen",
      "meet": [
        "tao"
      ]
    },
    {
      "id": "volunteermap",
      "name": "无障碍地图共建",
      "cat": "life",
      "icon": "compass",
      "desc": "实地核验坡道与路线，不把未经确认的信息当成承诺。",
      "cost": 60,
      "stats": {
        "design": 3,
        "service": 4,
        "data": 3,
        "empathy": 3
      },
      "tags": [
        "life",
        "design",
        "public"
      ],
      "maxRepeat": 2,
      "location": "community",
      "meet": [
        "wen"
      ]
    },
    {
      "id": "summerpractice",
      "name": "暑期社会实践",
      "cat": "life",
      "icon": "leaf",
      "desc": "先调查、再行动、最后交接；夏季实践期有额外成长。",
      "cost": 120,
      "stats": {
        "service": 4,
        "leadership": 3,
        "explore": 3,
        "planning": 3,
        "resilience": 2
      },
      "tags": [
        "life",
        "public",
        "practice"
      ],
      "maxRepeat": 2,
      "location": "community",
      "summer": true,
      "meet": []
    },
    {
      "id": "libraryresearch",
      "name": "校本部馆文献检索",
      "cat": "study",
      "icon": "book",
      "desc": "从题目、关键词到来源记录，让学习留下可追查的依据。",
      "cost": 0,
      "stats": {
        "knowledge": 3,
        "research": 3,
        "media": 2,
        "stress": 2
      },
      "tags": [
        "study",
        "library"
      ],
      "maxRepeat": 2,
      "location": "mainlib",
      "meet": [
        "yuan"
      ]
    },
    {
      "id": "bookcircle",
      "name": "书香谷主题共读",
      "cat": "social",
      "icon": "chat",
      "desc": "读同一篇文章，也给不同的理解留下空间。",
      "cost": 0,
      "stats": {
        "writing": 3,
        "eq": 2,
        "knowledge": 2,
        "mood": 2
      },
      "tags": [
        "study",
        "social",
        "library"
      ],
      "maxRepeat": 2,
      "location": "bookvalley",
      "meet": [
        "yuan",
        "lin"
      ]
    },
    {
      "id": "wenhuistudy",
      "name": "文荟馆影像资料研读",
      "cat": "interest",
      "icon": "camera",
      "desc": "阅读背景资料再创作，不把旧照片只当装饰。",
      "cost": 0,
      "stats": {
        "photography": 3,
        "art": 2,
        "history": 2,
        "stress": 1
      },
      "tags": [
        "art",
        "media",
        "library"
      ],
      "maxRepeat": 2,
      "location": "wenhui",
      "meet": [
        "an"
      ]
    },
    {
      "id": "unionstudy",
      "name": "联合馆语言研读",
      "cat": "study",
      "icon": "globe",
      "desc": "语言和人文资料交叉阅读，把不熟悉的概念讲给同伴。",
      "cost": 0,
      "stats": {
        "language": 3.5,
        "history": 2,
        "iq": 1,
        "stress": 1
      },
      "tags": [
        "study",
        "language",
        "library"
      ],
      "maxRepeat": 2,
      "location": "unionlib",
      "meet": [
        "ji"
      ]
    },
    {
      "id": "historyvisit",
      "name": "钱伟长与校史研学",
      "cat": "life",
      "icon": "building",
      "desc": "从校史资料中提问，分清有记录的事实与自己的理解。",
      "cost": 0,
      "stats": {
        "history": 3.5,
        "research": 1,
        "explore": 2,
        "mood": 1
      },
      "tags": [
        "history",
        "study",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "historyhall",
      "meet": [
        "ji",
        "yuan"
      ]
    },
    {
      "id": "servicecheck",
      "name": "新生服务入口核验",
      "cat": "life",
      "icon": "compass",
      "desc": "核对通知来源、整理办事清单，不转发未经证实的消息。",
      "cost": 0,
      "stats": {
        "planning": 3,
        "media": 2,
        "law": 1,
        "stress": -2
      },
      "tags": [
        "life",
        "campus",
        "media"
      ],
      "maxRepeat": 2,
      "location": "studentservice",
      "meet": [
        "pei"
      ]
    },
    {
      "id": "crosscampus",
      "name": "跨校区合作交流",
      "cat": "social",
      "icon": "chat",
      "desc": "先约好要做的事，再安排一次有准备的跨校区交流。",
      "cost": 35,
      "stats": {
        "teamwork": 3.5,
        "planning": 2,
        "eq": 2,
        "stress": 2
      },
      "tags": [
        "social",
        "team",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "unionlib",
      "meet": [
        "pei",
        "ji"
      ]
    },
    {
      "id": "jointseminar",
      "name": "上大跨学科研讨",
      "cat": "study",
      "icon": "flask",
      "desc": "不同专业给同一个问题提出解释，再讨论怎样验证。",
      "cost": 0,
      "stats": {
        "innovation": 3,
        "research": 2,
        "teamwork": 2,
        "stress": 3
      },
      "tags": [
        "study",
        "team",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "lab",
      "meet": [
        "pei",
        "lin"
      ]
    },
    {
      "id": "flowerrecord",
      "name": "菊文化观察手帐",
      "cat": "interest",
      "icon": "leaf",
      "desc": "记录形态、维护和展陈，不摘取、不破坏校园植物。",
      "cost": 20,
      "stats": {
        "ecology": 3,
        "photography": 2,
        "history": 1,
        "mood": 2
      },
      "tags": [
        "eco",
        "art",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "garden",
      "meet": [
        "an",
        "su"
      ]
    },
    {
      "id": "stagecrew",
      "name": "伟长楼幕后协作",
      "cat": "interest",
      "icon": "music",
      "desc": "练习舞台分工、观众沟通和散场交接。",
      "cost": 20,
      "stats": {
        "performance": 3,
        "teamwork": 3,
        "planning": 1,
        "stress": 2
      },
      "tags": [
        "art",
        "team",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "theatre",
      "meet": [
        "an"
      ]
    },
    {
      "id": "captionlab",
      "name": "影像字幕与无障碍说明",
      "cat": "interest",
      "icon": "pen",
      "desc": "给短片补上准确字幕，为不同观众写清展陈说明。",
      "cost": 0,
      "stats": {
        "design": 3,
        "media": 2,
        "empathy": 2,
        "stress": 1
      },
      "tags": [
        "design",
        "media",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "designlab",
      "meet": [
        "an",
        "wen"
      ]
    },
    {
      "id": "campusbudget",
      "name": "上大生活账本",
      "cat": "life",
      "icon": "wallet",
      "desc": "看清食宿、通勤和项目支出，留出应急余量。",
      "cost": 0,
      "stats": {
        "finance": 3,
        "planning": 3,
        "stress": -2
      },
      "tags": [
        "business",
        "life",
        "wellbeing"
      ],
      "maxRepeat": 2,
      "location": "dorm",
      "meet": [
        "pei"
      ]
    },
    {
      "id": "archivewalk",
      "name": "嘉定校区口述整理",
      "cat": "interest",
      "icon": "book",
      "desc": "经同意记录校园记忆，并注明回忆可能存在误差。",
      "cost": 0,
      "stats": {
        "history": 3,
        "writing": 3,
        "eq": 1,
        "stress": 1
      },
      "tags": [
        "history",
        "media",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "heritage",
      "meet": [
        "ji"
      ]
    },
    {
      "id": "openprototype",
      "name": "校园需求原型验证",
      "cat": "career",
      "icon": "code",
      "desc": "找自愿参与的同学试用小工具，记录失败，不搜集敏感资料。",
      "cost": 40,
      "stats": {
        "innovation": 3,
        "tech": 2,
        "business": 2,
        "data": 1,
        "stress": 3
      },
      "tags": [
        "tech",
        "business",
        "practice"
      ],
      "maxRepeat": 2,
      "location": "hub",
      "meet": [
        "pei"
      ]
    },
    {
      "id": "peerhandoff",
      "name": "社团资料与经验交接",
      "cat": "social",
      "icon": "flag",
      "desc": "把规则、资料和未完成事项交给下一位，而不是只留一句加油。",
      "cost": 0,
      "stats": {
        "leadership": 3,
        "teamwork": 2,
        "service": 2,
        "stress": 1
      },
      "tags": [
        "social",
        "service",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "club",
      "meet": [
        "yuan",
        "pei"
      ]
    },
    {
      "id": "graduationwalk",
      "name": "上大毕业故事采集",
      "cat": "life",
      "icon": "heart",
      "desc": "和朋友整理一段四年记忆，尊重不愿公开的部分。",
      "cost": 15,
      "stats": {
        "writing": 2,
        "eq": 2,
        "explore": 2,
        "mood": 4,
        "stress": -3
      },
      "tags": [
        "life",
        "social",
        "campus"
      ],
      "maxRepeat": 2,
      "location": "historyhall",
      "meet": [
        "yuan",
        "pei",
        "an",
        "ji"
      ],
      "minMonth": 37
    }
  ],
  "PROJECTS": [
    {
      "id": "paper",
      "name": "第一篇研究论文",
      "icon": "flask",
      "steps": 6,
      "cost": 180,
      "req": {
        "research": 22
      },
      "reward": {
        "research": 15,
        "knowledge": 5,
        "fame": 3
      },
      "flag": "papers",
      "text": "提出问题 → 查文献 → 设计方法 → 验证 → 修改 → 完成。",
      "repeat": 3,
      "location": "lab",
      "tags": [
        "study",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "product",
      "name": "从零到一的校园产品",
      "icon": "briefcase",
      "steps": 7,
      "cost": 1100,
      "req": {
        "business": 22,
        "tech": 20
      },
      "reward": {
        "business": 15,
        "tech": 8,
        "fame": 5
      },
      "flag": "products",
      "income": 1800,
      "text": "从真实需求出发。只有完成产品，路演才可能获得支持。",
      "repeat": 3,
      "location": "hub",
      "tags": [
        "business",
        "tech"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "album",
      "name": "原创作品发布计划",
      "icon": "pen",
      "steps": 6,
      "cost": 350,
      "req": {
        "art": 20
      },
      "reward": {
        "art": 15,
        "fame": 12
      },
      "flag": "works",
      "income": 700,
      "text": "一本短篇集、一张EP或一部短片；把你的表达交给观众。",
      "repeat": 3,
      "location": "gallery",
      "tags": [
        "art",
        "stage"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "portfolio",
      "name": "可展示的专业作品集",
      "icon": "laptop",
      "steps": 5,
      "cost": 200,
      "req": {
        "tech": 25
      },
      "reward": {
        "tech": 14,
        "art": 5,
        "discipline": 4
      },
      "flag": "portfolios",
      "text": "问题说明、过程记录、可用成品与复盘，一份都不少。",
      "repeat": 2,
      "location": "maker",
      "tags": [
        "tech",
        "design"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "team",
      "name": "校园电竞战队",
      "icon": "game",
      "steps": 6,
      "cost": 400,
      "req": {
        "gaming": 25
      },
      "reward": {
        "gaming": 14,
        "eq": 7,
        "fame": 5
      },
      "flag": "teams",
      "text": "组队、排训练、制定战术、参加训练赛；冠军不是一个人的游戏。",
      "repeat": 1,
      "location": "club",
      "tags": [
        "team",
        "gaming"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "marathon",
      "name": "人生第一场半马",
      "icon": "run",
      "steps": 6,
      "cost": 280,
      "req": {
        "sport": 25
      },
      "reward": {
        "sport": 14,
        "health": 7,
        "discipline": 5
      },
      "flag": "marathons",
      "text": "循序渐进的训练计划，而不是报名后才开始焦虑。",
      "repeat": 1,
      "location": "track",
      "tags": [
        "sport",
        "wellbeing"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "charity",
      "name": "一整个学年的公益计划",
      "icon": "leaf",
      "steps": 7,
      "cost": 220,
      "req": {
        "service": 20
      },
      "reward": {
        "service": 17,
        "eq": 8,
        "civic": 6
      },
      "flag": "charities",
      "text": "先调查需求，再持续服务，最后把项目交接好。",
      "repeat": 2,
      "location": "community",
      "tags": [
        "public",
        "team"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "expedition",
      "name": "给自己的远行计划",
      "icon": "compass",
      "steps": 6,
      "cost": 650,
      "req": {
        "explore": 25
      },
      "reward": {
        "explore": 17,
        "iq": 5,
        "art": 6
      },
      "flag": "expeditions",
      "text": "预算、路线、观察、记录、安全返程，再把故事讲出来。",
      "repeat": 2,
      "location": "city",
      "tags": [
        "practice",
        "eco"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "language",
      "name": "语言能力认证",
      "icon": "globe",
      "steps": 5,
      "cost": 500,
      "req": {
        "language": 25
      },
      "reward": {
        "language": 16,
        "discipline": 4
      },
      "flag": "languageCerts",
      "text": "完整练习、模拟测试与复盘。游戏中的能力认证，不对应真实考试分数。",
      "repeat": 1,
      "location": "international",
      "tags": [
        "language",
        "study"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "bridge",
      "name": "跨专业基础补强",
      "icon": "book",
      "steps": 6,
      "cost": 650,
      "req": {
        "knowledge": 35
      },
      "minMonth": 13,
      "reward": {
        "knowledge": 10,
        "tech": 7,
        "language": 4
      },
      "flag": "bridge",
      "text": "整理先修知识、完成桥接练习。为跨学科学习留下证据，不是现实学历或报考资格认证。",
      "repeat": 1,
      "location": "classroom",
      "tags": [
        "study"
      ]
    },
    {
      "id": "thesis",
      "name": "毕业论文／毕业设计",
      "icon": "book",
      "steps": 5,
      "cost": 120,
      "minMonth": 37,
      "reward": {
        "knowledge": 7,
        "tech": 7,
        "discipline": 4
      },
      "flag": "thesis",
      "text": "从选题到答辩。所有专业都需要完成；请至少留下数次项目行动。",
      "repeat": 1,
      "location": "library",
      "tags": [
        "study",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "club",
      "name": "一场属于我们的校园节",
      "icon": "flag",
      "steps": 6,
      "cost": 300,
      "req": {
        "fame": 20
      },
      "reward": {
        "fame": 17,
        "eq": 10,
        "art": 4
      },
      "flag": "festivals",
      "text": "预算、场地、分工、突发情况……学会带着大家一起完成。",
      "repeat": 1,
      "location": "club",
      "tags": [
        "team"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "gamejam",
      "name": "独立小游戏挑战",
      "icon": "game",
      "steps": 7,
      "cost": 400,
      "req": {
        "tech": 25,
        "art": 15
      },
      "reward": {
        "tech": 12,
        "art": 12,
        "fame": 8,
        "business": 5
      },
      "flag": "indieGames",
      "income": 1000,
      "text": "一个小而完整的作品，比十个永远开不了工的史诗更好。",
      "repeat": 2,
      "location": "maker",
      "tags": [
        "tech",
        "art",
        "design"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "patent",
      "name": "实用技术改进",
      "icon": "tools",
      "steps": 6,
      "cost": 450,
      "req": {
        "tech": 40,
        "research": 20
      },
      "reward": {
        "tech": 12,
        "research": 8,
        "business": 8
      },
      "flag": "patents",
      "income": 600,
      "text": "围绕一个真实问题做改进；有测试、有对照、有可复用成果。",
      "repeat": 2,
      "location": "lab",
      "tags": [
        "engineering",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "hometown",
      "name": "家乡的小小新计划",
      "icon": "home",
      "steps": 6,
      "cost": 450,
      "req": {
        "business": 25,
        "service": 15
      },
      "reward": {
        "business": 10,
        "service": 12,
        "eq": 8
      },
      "flag": "hometowns",
      "income": 600,
      "text": "用四年学到的本领，回应一个你熟悉的地方的需要。",
      "repeat": 1,
      "location": "community",
      "tags": [
        "business",
        "public"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "datatool",
      "name": "可复现的开放数据工具",
      "icon": "code",
      "steps": 7,
      "cost": 350,
      "req": {
        "data": 25,
        "tech": 25
      },
      "reward": {
        "data": 16,
        "tech": 10,
        "media": 5
      },
      "flag": "dataTools",
      "text": "从数据清理、偏差说明到开源维护，交付一个能被复现的工具。",
      "income": 700,
      "repeat": 2,
      "domains": [
        "data",
        "tech"
      ],
      "location": "maker",
      "tags": [
        "data",
        "tech"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "materialpaper",
      "name": "材料与结构研究档案",
      "icon": "flask",
      "steps": 7,
      "cost": 500,
      "req": {
        "engineering": 25,
        "research": 20
      },
      "reward": {
        "engineering": 17,
        "research": 12,
        "data": 6
      },
      "flag": "materialStudies",
      "text": "对照试验、失败记录与规范复现；研究成果不以迎合预期为目标。",
      "income": 0,
      "repeat": 2,
      "domains": [
        "engineering",
        "research"
      ],
      "location": "lab",
      "tags": [
        "study",
        "engineering",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "robot",
      "name": "跨专业机器人作品",
      "icon": "tools",
      "steps": 8,
      "cost": 800,
      "req": {
        "engineering": 25,
        "tech": 25
      },
      "reward": {
        "engineering": 18,
        "tech": 10,
        "teamwork": 10
      },
      "flag": "robots",
      "text": "拆解需求、约定接口、联合调试，最后完成一场可重复的演示。",
      "income": 900,
      "repeat": 2,
      "domains": [
        "engineering",
        "tech"
      ],
      "location": "maker",
      "tags": [
        "engineering",
        "team",
        "tech"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "accessdesign",
      "name": "无障碍产品改造",
      "icon": "pen",
      "steps": 7,
      "cost": 300,
      "req": {
        "design": 25,
        "empathy": 15
      },
      "reward": {
        "design": 18,
        "empathy": 10,
        "tech": 5
      },
      "flag": "accessDesigns",
      "text": "邀请真实使用者参与测试，写清楚哪些问题已经解决，哪些还没有。",
      "income": 500,
      "repeat": 2,
      "domains": [
        "design",
        "empathy"
      ],
      "location": "designlab",
      "tags": [
        "design",
        "public"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "film",
      "name": "校园短纪录片",
      "icon": "camera",
      "steps": 8,
      "cost": 600,
      "req": {
        "photography": 25,
        "writing": 15
      },
      "reward": {
        "photography": 18,
        "writing": 10,
        "art": 10
      },
      "flag": "films",
      "text": "访谈授权、拍摄、收音、剪辑与审片；不给真实人物贴简单标签。",
      "income": 800,
      "repeat": 2,
      "domains": [
        "photography",
        "writing"
      ],
      "location": "film",
      "tags": [
        "film",
        "humanity",
        "art"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "play",
      "name": "一场完整的原创剧目",
      "icon": "music",
      "steps": 8,
      "cost": 550,
      "req": {
        "performance": 25,
        "teamwork": 15
      },
      "reward": {
        "performance": 18,
        "art": 10,
        "leadership": 8
      },
      "flag": "plays",
      "text": "剧本、排练、舞美、现场与复盘；让幕后工作也被看见。",
      "income": 600,
      "repeat": 2,
      "domains": [
        "performance",
        "teamwork"
      ],
      "location": "theatre",
      "tags": [
        "stage",
        "team",
        "art"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "investigation",
      "name": "有来源的校园专题",
      "icon": "book",
      "steps": 6,
      "cost": 150,
      "req": {
        "writing": 25,
        "media": 20
      },
      "reward": {
        "writing": 16,
        "media": 14,
        "law": 6
      },
      "flag": "reportsDone",
      "text": "访谈、交叉核验、授权与更正机制，比一个耸动的标题重要。",
      "income": 250,
      "repeat": 2,
      "domains": [
        "writing",
        "media"
      ],
      "location": "newsroom",
      "tags": [
        "humanity",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "archive",
      "name": "嘉定记忆微档案",
      "icon": "building",
      "steps": 7,
      "cost": 250,
      "req": {
        "history": 25,
        "writing": 15
      },
      "reward": {
        "history": 18,
        "writing": 10,
        "service": 6
      },
      "flag": "archives",
      "text": "以公开地方文化为灵感的虚构档案：标注来源、保留分歧、交还社区。",
      "income": 0,
      "repeat": 2,
      "domains": [
        "history",
        "writing"
      ],
      "location": "heritage",
      "tags": [
        "humanity"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "greenplan",
      "name": "可追踪的绿色校园方案",
      "icon": "leaf",
      "steps": 7,
      "cost": 280,
      "req": {
        "ecology": 25,
        "data": 15
      },
      "reward": {
        "ecology": 18,
        "data": 10,
        "service": 8
      },
      "flag": "greenPlans",
      "text": "先测量基线，再小规模试点，留下下一届可以继续观察的记录。",
      "income": 300,
      "repeat": 2,
      "domains": [
        "ecology",
        "data"
      ],
      "location": "community",
      "tags": [
        "eco",
        "data"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "exchange",
      "name": "跨文化合作展",
      "icon": "globe",
      "steps": 7,
      "cost": 400,
      "req": {
        "language": 30,
        "teamwork": 15
      },
      "reward": {
        "language": 14,
        "empathy": 12,
        "leadership": 8
      },
      "flag": "exchanges",
      "text": "让不同语言的人共同决定主题，不把彼此当作展品。",
      "income": 0,
      "repeat": 2,
      "domains": [
        "language",
        "teamwork"
      ],
      "location": "international",
      "tags": [
        "language",
        "team"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "curriculum",
      "name": "一套能被接手的小课程",
      "icon": "book",
      "steps": 7,
      "cost": 200,
      "req": {
        "pedagogy": 25,
        "knowledge": 25
      },
      "reward": {
        "pedagogy": 18,
        "writing": 10,
        "service": 8
      },
      "flag": "curricula",
      "text": "目标、活动、练习、反馈和交接；不是讲完就算教会。",
      "income": 400,
      "repeat": 2,
      "domains": [
        "pedagogy",
        "knowledge"
      ],
      "location": "community",
      "tags": [
        "education",
        "study"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "mediation",
      "name": "社区协商模拟提案",
      "icon": "building",
      "steps": 7,
      "cost": 180,
      "req": {
        "law": 25,
        "negotiation": 20
      },
      "reward": {
        "law": 17,
        "negotiation": 13,
        "civic": 7
      },
      "flag": "mediations",
      "text": "用虚构案例完成平等陈述、利益梳理与可执行约定，不构成执业资格。",
      "income": 0,
      "repeat": 2,
      "domains": [
        "law",
        "negotiation"
      ],
      "location": "forum",
      "tags": [
        "public",
        "team"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "festivaldesign",
      "name": "三校区共创文化季",
      "icon": "flag",
      "steps": 8,
      "cost": 500,
      "req": {
        "leadership": 25,
        "design": 15
      },
      "reward": {
        "leadership": 18,
        "teamwork": 14,
        "fame": 10
      },
      "flag": "campusSeasons",
      "text": "跨校区协作是游戏设定；公开文化活动只提供主题灵感。",
      "income": 600,
      "repeat": 2,
      "domains": [
        "leadership",
        "design"
      ],
      "location": "garden",
      "tags": [
        "team",
        "design"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "socialbiz",
      "name": "可持续的社区小事业",
      "icon": "briefcase",
      "steps": 8,
      "cost": 650,
      "req": {
        "business": 25,
        "service": 20
      },
      "reward": {
        "business": 14,
        "service": 12,
        "finance": 12
      },
      "flag": "socialVentures",
      "text": "在公共价值与可持续收入间找到可解释的平衡，算清不能依赖的补贴。",
      "income": 1000,
      "repeat": 2,
      "domains": [
        "business",
        "service"
      ],
      "location": "hub",
      "tags": [
        "business",
        "public"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "foodbook",
      "name": "校园食物与城市地图",
      "icon": "home",
      "steps": 7,
      "cost": 300,
      "req": {
        "cooking": 25,
        "photography": 15
      },
      "reward": {
        "cooking": 18,
        "photography": 8,
        "history": 10,
        "design": 6
      },
      "flag": "foodBooks",
      "text": "合规烹饪、透明预算、拍摄授权与可访问的路线，留下日常生活的温度。",
      "income": 500,
      "repeat": 2,
      "domains": [
        "cooking",
        "photography"
      ],
      "location": "kitchen",
      "tags": [
        "wellbeing",
        "design",
        "humanity"
      ],
      "context": "在上海大学校园学习与社会实践中完成；项目为游戏设计。"
    },
    {
      "id": "shureader",
      "name": "上大跨馆阅读专题",
      "icon": "book",
      "steps": 7,
      "cost": 60,
      "req": {
        "knowledge": 30
      },
      "reward": {
        "research": 8,
        "writing": 6
      },
      "flag": "readingDossiers",
      "location": "mainlib",
      "tags": [
        "study",
        "library"
      ],
      "text": "把钱伟长馆、校本部馆等阅读经历汇成有来源的专题，而不是堆砌书名。",
      "repeat": 2
    },
    {
      "id": "shucollab",
      "name": "上大跨专业合作原型",
      "icon": "tools",
      "steps": 8,
      "cost": 280,
      "req": {
        "teamwork": 25,
        "innovation": 20
      },
      "reward": {
        "tech": 8,
        "teamwork": 6,
        "innovation": 5
      },
      "flag": "jointPrototypes",
      "location": "maker",
      "tags": [
        "tech",
        "team"
      ],
      "text": "先约定接口、分工与验收，再把一个校园小问题做成可用原型。",
      "repeat": 2
    },
    {
      "id": "shumemory",
      "name": "上大校园口述记忆集",
      "icon": "book",
      "steps": 7,
      "cost": 100,
      "req": {
        "history": 25,
        "writing": 20
      },
      "reward": {
        "history": 8,
        "writing": 7,
        "media": 3
      },
      "flag": "shuArchives",
      "location": "heritage",
      "tags": [
        "history",
        "media"
      ],
      "text": "经讲述者同意整理校园记忆，保留出处、撤回方式和不确定性。",
      "repeat": 2
    },
    {
      "id": "shuexhibit",
      "name": "上大多感官校园展",
      "icon": "pen",
      "steps": 8,
      "cost": 180,
      "req": {
        "design": 25,
        "empathy": 20
      },
      "reward": {
        "design": 8,
        "art": 5,
        "service": 4
      },
      "flag": "inclusiveShows",
      "location": "gallery",
      "tags": [
        "design",
        "art"
      ],
      "text": "把字幕、清晰说明和可达动线一起设计，邀请不同观众给反馈。",
      "repeat": 2
    },
    {
      "id": "shugreen",
      "name": "菊文化与校园生态记录",
      "icon": "leaf",
      "steps": 6,
      "cost": 80,
      "req": {
        "ecology": 22
      },
      "reward": {
        "ecology": 8,
        "photography": 5,
        "history": 4
      },
      "flag": "flowerJournals",
      "location": "garden",
      "tags": [
        "eco",
        "art"
      ],
      "text": "从校园文化出发建立观察记录，既不编造物种鉴定，也不干扰植物。",
      "repeat": 2
    },
    {
      "id": "shustage",
      "name": "伟长楼演出协作手册",
      "icon": "music",
      "steps": 7,
      "cost": 160,
      "req": {
        "performance": 25,
        "teamwork": 20
      },
      "reward": {
        "performance": 8,
        "planning": 6,
        "leadership": 4
      },
      "flag": "stageManuals",
      "location": "theatre",
      "tags": [
        "art",
        "team"
      ],
      "text": "把一次虚构演出的排练、沟通和交接写成下一组也用得上的手册。",
      "repeat": 2
    },
    {
      "id": "shuservice",
      "name": "上大新生服务小工具",
      "icon": "code",
      "steps": 8,
      "cost": 200,
      "req": {
        "tech": 25,
        "media": 20
      },
      "reward": {
        "tech": 8,
        "business": 5,
        "media": 5
      },
      "flag": "campusTools",
      "location": "hub",
      "tags": [
        "tech",
        "business"
      ],
      "text": "聚合已核验的公开入口，不收集账号密码、不冒充官方平台。",
      "repeat": 2
    },
    {
      "id": "shuyearbook",
      "name": "上大四年共同纪念册",
      "icon": "heart",
      "steps": 8,
      "cost": 100,
      "req": {
        "writing": 25,
        "planning": 25
      },
      "reward": {
        "writing": 6,
        "eq": 6,
        "mood": 7
      },
      "flag": "yearbooks",
      "location": "historyhall",
      "tags": [
        "life",
        "social"
      ],
      "text": "只收录取得同意的内容，让不同路线的四年都能被认真记录。",
      "repeat": 1,
      "minMonth": 37
    }
  ],
  "NPCS": [
    {
      "id": "lin",
      "name": "林知夏",
      "gender": "female",
      "age": 18,
      "role": "上大校园 · 图书馆里的研究搭子",
      "icon": "book",
      "color": "#8d9a74",
      "affinity": "knowledge",
      "places": [
        "language",
        "volunteer"
      ],
      "intro": "习惯把书签留在最喜欢的一页。比起正确答案，她更想知道你为什么这样想。",
      "like": "一起读书与认真倾听",
      "chapters": [
        [
          "被划掉的研究选题",
          "她的选题被导师否定了三次，开始怀疑自己是不是不适合做研究。",
          "一起拆解问题，不替她做决定",
          "research"
        ],
        [
          "未发送的夏令营邮件",
          "她担心自己的履历不够好，邮件写完又删掉。",
          "陪她核对材料，然后把选择交还给她",
          "knowledge"
        ],
        [
          "两座城市的车票",
          "毕业可能把你们带去不同的城市。她问：我们能具体谈谈以后吗？",
          "认真讨论距离、时间和各自的梦想",
          "eq"
        ]
      ],
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "su",
      "name": "苏晚晴",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 忙得脚不沾地的社长",
      "icon": "flag",
      "color": "#bc8467",
      "affinity": "fame",
      "places": [
        "club",
        "debate",
        "music"
      ],
      "intro": "舞台前很耀眼，舞台后也会疲惫。她希望有人看见没那么能干的自己。",
      "like": "一起筹办活动与真诚支持",
      "chapters": [
        [
          "活动前夜的灯",
          "海报印错了日期，她仍在强撑着安排每个人。",
          "分担一项具体任务，让她休息一下",
          "eq"
        ],
        [
          "卸任以后是谁",
          "不再当社长以后，她忽然不知道如何介绍自己。",
          "聊聊那些不需要头衔的爱好",
          "art"
        ],
        [
          "不是所有人都满意",
          "毕业活动留下了争议。她开始怀疑这四年的付出。",
          "一起复盘，也保留那些真实的好",
          "service"
        ]
      ],
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "xu",
      "name": "许星遥",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 总在验证点子的同学",
      "icon": "briefcase",
      "color": "#b7a157",
      "affinity": "business",
      "places": [
        "interview",
        "network"
      ],
      "intro": "包里有一叠用户访谈笔记。她能聊梦想，也愿意听你认真指出问题。",
      "like": "真实产品与平等合作",
      "chapters": [
        [
          "没人使用的第一版",
          "做了很久的小程序，上线后只有室友在用。",
          "陪她找三个真实用户聊一聊",
          "business"
        ],
        [
          "分工需要说清",
          "合伙人的投入越来越不一样，大家都不好意思谈。",
          "一起写清责任、时间与退出机制",
          "eq"
        ],
        [
          "选择继续还是停下",
          "项目没有想象中成功，但也并非一无是处。",
          "先算清投入，再讨论彼此想过的生活",
          "business"
        ]
      ],
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "tang",
      "name": "唐可可",
      "gender": "female",
      "age": 18,
      "role": "上大校园 · 战术笔记比课本还厚",
      "icon": "game",
      "color": "#ab8fae",
      "affinity": "gaming",
      "places": [
        "game",
        "train",
        "hangout"
      ],
      "intro": "赢了会庆祝，输了会看录像。她讨厌把所有失误都甩给队友。",
      "like": "合作、复盘与尊重",
      "chapters": [
        [
          "一场没打好的决赛",
          "最后一波团战失误，她在聊天频道沉默了。",
          "先陪她缓一缓，再一起看录像",
          "gaming"
        ],
        [
          "喜欢也需要边界",
          "一起打游戏很快乐，但她也想留一些独处时间。",
          "把陪伴与独处都放进计划",
          "eq"
        ],
        [
          "职业与热爱的距离",
          "训练赛成绩不错，但职业道路仍然不确定。",
          "把机会、成本和退路一起讨论清楚",
          "discipline"
        ]
      ],
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "jiang",
      "name": "江沐野",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 总带着相机的旅行者",
      "icon": "camera",
      "color": "#759c96",
      "affinity": "explore",
      "places": [
        "vlog",
        "hike",
        "hangout"
      ],
      "intro": "喜欢给不起眼的街角拍照。她不急着把远方变成打卡清单。",
      "like": "散步、观察与分享",
      "chapters": [
        [
          "拍糊的一张照片",
          "她最喜欢的照片偏偏是糊的，因为那一刻真的快乐。",
          "听她讲那天发生的事",
          "art"
        ],
        [
          "出发之前的犹豫",
          "她攒好了路费，却担心旅行回来落后于同学。",
          "一起做预算，也认真谈谈担忧",
          "explore"
        ],
        [
          "我们想住的地方",
          "她想要能看到树的窗户，你想要方便的通勤。",
          "找出彼此真正不能放弃的部分",
          "eq"
        ]
      ],
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "shen",
      "name": "沈南枝",
      "gender": "female",
      "age": 26,
      "role": "上大校友社交圈 · 经济独立的创业校友",
      "icon": "spark",
      "color": "#6b8780",
      "affinity": "business",
      "rich": true,
      "places": [
        "network",
        "interview"
      ],
      "intro": "同学口中的“富婆学姐”。她很清楚钱能做什么，也清楚感情不该变成单方面依附。",
      "like": "有边界、有行动的平等关系",
      "chapters": [
        [
          "标签之外的名字",
          "每个人都在谈她的资源，却很少有人问她最近是否开心。",
          "不谈融资，认真问她过得怎么样",
          "eq"
        ],
        [
          "合作以前先谈清楚",
          "她愿意支持你的项目，但希望关系与账目分开。",
          "明确预算与责任，保留彼此的独立",
          "business"
        ],
        [
          "一起，也各自完整",
          "有人开玩笑说你可以不再努力。她看着你，没有接话。",
          "说出自己的计划，也认真回应她的期待",
          "discipline"
        ]
      ],
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "gu",
      "name": "顾行舟",
      "gender": "male",
      "age": 20,
      "role": "上大校园 · 安静而认真的实验室同伴",
      "icon": "flask",
      "color": "#788eaa",
      "affinity": "research",
      "places": [
        "seminar",
        "language",
        "debate"
      ],
      "intro": "表达感情有点慢，但总会认真回复每一条长消息。",
      "like": "共同思考与坦诚沟通",
      "chapters": [
        [
          "实验室的凌晨",
          "一组数据迟迟复现不了，他觉得自己拖累了大家。",
          "一起排查流程，不把失败归因于人",
          "research"
        ],
        [
          "不擅长说出口",
          "他准备了一段心里话，又觉得太笨拙。",
          "告诉他你愿意听完整",
          "eq"
        ],
        [
          "去更远的实验室",
          "新的研究机会意味着更远的距离。",
          "讨论联系的安排，也支持各自成长",
          "language"
        ]
      ],
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "lu",
      "name": "陆星河",
      "gender": "male",
      "age": 19,
      "role": "上大校园 · 礼堂侧门的吉他手",
      "icon": "music",
      "color": "#a88973",
      "affinity": "art",
      "places": [
        "club",
        "music"
      ],
      "intro": "弹吉他时很自信，介绍自己的原创时反而有点紧张。",
      "like": "原创表达与真实反馈",
      "chapters": [
        [
          "第一次唱原创",
          "台下的人不多，他却准备了很久。",
          "听完再说出一个具体喜欢的细节",
          "art"
        ],
        [
          "理想也要付房租",
          "音乐计划与实习录用同时摆在桌上。",
          "一起寻找能维持创作的实际安排",
          "business"
        ],
        [
          "这首歌的最后一句",
          "写给大学的歌迟迟没有结尾。",
          "聊聊最舍不得的一段日常",
          "explore"
        ]
      ],
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "zhou",
      "name": "周屿",
      "gender": "male",
      "age": 19,
      "role": "上大校园 · 跑道上的可靠队友",
      "icon": "run",
      "color": "#9da16c",
      "affinity": "sport",
      "places": [
        "run",
        "hike",
        "club"
      ],
      "intro": "习惯在终点等队友。看起来总有精神，也需要有人允许他慢下来。",
      "like": "规律运动与互相照顾",
      "chapters": [
        [
          "错过的一场比赛",
          "状态不佳让他必须退出一场期待很久的比赛。",
          "支持恢复，而不是劝他硬撑",
          "health"
        ],
        [
          "不当第一名的时候",
          "以前靠成绩认识他的人，似乎渐渐走远了。",
          "约一次没有成绩目标的散步",
          "eq"
        ],
        [
          "终点线以外",
          "毕业以后，未必还有固定的跑道和队友。",
          "一起设计能坚持的小小习惯",
          "discipline"
        ]
      ],
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "cheng",
      "name": "程予安",
      "gender": "male",
      "age": 25,
      "role": "上大校友社交圈 · 做事有分寸的青年校友",
      "icon": "briefcase",
      "color": "#a19c8b",
      "affinity": "tech",
      "rich": true,
      "places": [
        "network",
        "interview"
      ],
      "intro": "已经做成过一个小产品，但更愿意聊最近在学什么。",
      "like": "独立、真诚与共同创造",
      "chapters": [
        [
          "成功故事里的删减部分",
          "他承认那次成功也有很多运气。",
          "分享自己的失误，不急着把他神化",
          "eq"
        ],
        [
          "不同步的生活",
          "收入和时间安排的差异开始影响相处。",
          "把预算与相处时间谈具体",
          "business"
        ],
        [
          "不是谁带谁走",
          "未来的城市与工作都还没确定。",
          "把两个人的目标一起写下来",
          "tech"
        ]
      ],
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "he",
      "name": "何予墨",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 校刊里的事实核查员",
      "affinity": "writing",
      "location": "newsroom",
      "places": [
        "editing",
        "factcheck"
      ],
      "intro": "把漂亮句子划掉，只为了不让别人被一句未经核实的话误伤。",
      "like": "有来源的表达与尊重隐私",
      "chapters": [
        [
          "不该公开的一页",
          "一份采访录音里出现了受访者不愿公开的家庭细节。",
          "删去敏感段落，重新征求授权",
          "media"
        ],
        [
          "没人转发的澄清",
          "旧报道的错误更正没什么流量，她仍想放在显眼位置。",
          "陪她把更正过程写清楚",
          "writing"
        ],
        [
          "下一份署名",
          "她收到一份要用耸动标题换点击的工作邀请。",
          "先问清底线，再讨论可承受的选择",
          "law"
        ]
      ],
      "icon": "pen",
      "color": "#62bfa6",
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "wen",
      "name": "温以宁",
      "gender": "female",
      "age": 20,
      "role": "上大校园 · 无障碍设计小组成员",
      "affinity": "design",
      "location": "designlab",
      "places": [
        "uxlab",
        "volunteermap"
      ],
      "intro": "她总会蹲下来看看轮椅使用者的视线，也会承认自己不懂。",
      "like": "可用的设计与具体反馈",
      "chapters": [
        [
          "漂亮但进不去",
          "展示页很好看，却被读屏软件读成一串空白。",
          "请使用者参与测试，而不是替他们想象",
          "design"
        ],
        [
          "设计者的执念",
          "她和伙伴争执于一个并不影响使用的视觉细节。",
          "先列真正影响体验的问题",
          "teamwork"
        ],
        [
          "让方案留下来",
          "毕业设计获奖了，但维护者还没找到。",
          "一起把使用说明与交接写完",
          "planning"
        ]
      ],
      "icon": "spark",
      "color": "#bb9aed",
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "qiao",
      "name": "乔初棠",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 剧场后台的舞监",
      "affinity": "performance",
      "location": "theatre",
      "places": [
        "stageplay",
        "chorus"
      ],
      "intro": "她记得每一道追光灯的位置，却偶尔忘记给自己的情绪留一个位置。",
      "like": "准时排练与温柔的边界",
      "chapters": [
        [
          "缺席的主演",
          "演出前三小时，有人因生病不能登台。",
          "先关心身体，再与大家重排节目",
          "leadership"
        ],
        [
          "掌声响起之后",
          "演出成功，没人提到整晚没坐下的后台。",
          "给每一位幕后伙伴留下具体感谢",
          "empathy"
        ],
        [
          "不是所有梦想都在台前",
          "她想做幕后工作，却被劝去寻找更耀眼的道路。",
          "一起看真实岗位，而不是只比较掌声",
          "planning"
        ]
      ],
      "icon": "music",
      "color": "#dd9cba",
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "ye",
      "name": "叶栖迟",
      "gender": "female",
      "age": 20,
      "role": "上大校园 · 材料实验的耐心搭档",
      "affinity": "engineering",
      "location": "lab",
      "places": [
        "material",
        "reproduce"
      ],
      "intro": "实验记录本里最多的是失败。她说，这样别人就不用踩同样的坑。",
      "like": "可复现的结果与坦诚合作",
      "chapters": [
        [
          "不漂亮的数据",
          "一组数据与预期相反，赶截止的伙伴想把它当作异常删掉。",
          "留下数据，补充误差与限制说明",
          "data"
        ],
        [
          "谁写在前面",
          "合作研究对署名贡献产生了分歧。",
          "按事先约定重新核对贡献",
          "negotiation"
        ],
        [
          "一次不再逞强的暂停",
          "连续实验让她很疲惫，担心暂停就是落后。",
          "帮她安排交接，把恢复写进计划",
          "resilience"
        ]
      ],
      "icon": "flask",
      "color": "#d1b678",
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "tao",
      "name": "陶夏禾",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 社区厨房的组织者",
      "affinity": "cooking",
      "location": "kitchen",
      "places": [
        "cook",
        "foodstory"
      ],
      "intro": "愿意分享配方，但更在意一起吃饭的人有没有被照顾到。",
      "like": "食物、预算与平等分工",
      "chapters": [
        [
          "第一次做糊了",
          "公开活动的一锅饭出了差错，她有点不敢面对大家。",
          "说明情况并补做简餐，不偷偷掩盖",
          "resilience"
        ],
        [
          "热情也要算账",
          "材料费越来越高，免费活动难以继续。",
          "一起设计透明预算与分摊办法",
          "finance"
        ],
        [
          "家的味道不只有一种",
          "参与者对什么叫正宗争论不休。",
          "邀请每个人讲自己的版本",
          "history"
        ]
      ],
      "icon": "home",
      "color": "#81bca0",
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "bai",
      "name": "白屿川",
      "gender": "male",
      "age": 20,
      "role": "上大校园 · 机器人队的机械负责人",
      "affinity": "engineering",
      "location": "maker",
      "places": [
        "robotbuild",
        "repaircafe"
      ],
      "intro": "把测试失败叫作机器给的回信，但也在学着别把队友当机器。",
      "like": "明确接口与互相补位",
      "chapters": [
        [
          "三种接口都不通",
          "机械、硬件和程序各自完成，却无法一起工作。",
          "先统一接口，再做最小联调",
          "teamwork"
        ],
        [
          "功劳属于谁",
          "比赛时他的模块最显眼，但基础代码来自另一个队友。",
          "公开每一块模块的真实贡献",
          "law"
        ],
        [
          "最后一次交接",
          "他担心毕业后社团的机器人会变成陈列品。",
          "带新成员独立修好一次故障",
          "pedagogy"
        ]
      ],
      "icon": "tools",
      "color": "#83adcc",
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "song",
      "name": "宋知远",
      "gender": "male",
      "age": 21,
      "role": "上大校园 · 延长片场的收音师",
      "affinity": "photography",
      "location": "film",
      "places": [
        "filmcrew",
        "soundwalk"
      ],
      "intro": "他说好声音很容易被忽略，直到它消失。",
      "like": "不打扰的观察与认真倾听",
      "chapters": [
        [
          "不能重拍的现场",
          "拍摄对象忽然情绪低落，导演还想继续。",
          "先停机询问意愿，不抢夺情绪",
          "empathy"
        ],
        [
          "一段被覆盖的声音",
          "一次操作失误覆盖了当天最重要的声音文件。",
          "坦诚说明，寻找被允许的补救方式",
          "resilience"
        ],
        [
          "要不要剪掉犹豫",
          "成片里的停顿不够流畅，却很真实。",
          "讨论叙事与真实之间的边界",
          "media"
        ]
      ],
      "icon": "camera",
      "color": "#ab9cd6",
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "liang",
      "name": "梁景澄",
      "gender": "male",
      "age": 19,
      "role": "上大校园 · 社区调解模拟小组成员",
      "affinity": "law",
      "location": "forum",
      "places": [
        "legalclinic",
        "debatejudge"
      ],
      "intro": "不急着当裁判，先问两个人各自害怕失去什么。",
      "like": "程序、公平与认真协商",
      "chapters": [
        [
          "谁的声音更响",
          "模拟听证中，安静一方总被打断。",
          "给每一方同等陈述时间",
          "law"
        ],
        [
          "朋友也需要拒绝",
          "熟人希望他为一件没有依据的事公开背书。",
          "拒绝不实背书，仍保留朋友的关心",
          "negotiation"
        ],
        [
          "答案不是一句话",
          "毕业去向没有想象中光鲜，他开始怀疑投入。",
          "回顾具体帮助过谁，再谈下一步",
          "resilience"
        ]
      ],
      "icon": "building",
      "color": "#d59f80",
      "campus": "jiading",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "xuanzhi",
      "name": "许砚之",
      "gender": "male",
      "age": 20,
      "role": "上大校园 · 嘉定口述史记录者",
      "affinity": "history",
      "location": "heritage",
      "places": [
        "oralhistory",
        "jiadingwalk"
      ],
      "intro": "先在纸上记日期和出处，然后才写下自己的感受。",
      "like": "地方记忆与耐心求证",
      "chapters": [
        [
          "两份相反的记忆",
          "同一件往事，两位讲述者的记忆完全不同。",
          "保留差异，标注来源与不确定性",
          "history"
        ],
        [
          "一张照片的授权",
          "展览用到的旧照片，权利归属还没核清。",
          "先撤下，核实后再决定如何呈现",
          "law"
        ],
        [
          "离开以后谁来听",
          "他不想把熟悉的人变成毕业作品里的素材。",
          "把副本交还社区，商量后续维护",
          "service"
        ]
      ],
      "icon": "book",
      "color": "#8fb296",
      "campus": "baoshan",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "milo",
      "name": "米洛",
      "gender": "male",
      "age": 22,
      "role": "上大校园 · 跨文化伙伴与生态志愿者",
      "affinity": "language",
      "location": "international",
      "places": [
        "languagepair",
        "ecoaudit"
      ],
      "intro": "在陌生语言里说话很慢，但从不把听不懂伪装成理解。",
      "like": "互相学习而不是单向帮助",
      "chapters": [
        [
          "被笑过的发音",
          "语言角的一句玩笑让他不再愿意开口。",
          "明确表达支持，也尊重他暂时休息",
          "empathy"
        ],
        [
          "翻译不了的家乡",
          "他发现某些习俗很难用一个词解释。",
          "用故事代替简单标签",
          "history"
        ],
        [
          "回去还是留下",
          "毕业带来新的迁移，他担心朋友只在同一座城市才成立。",
          "商量具体联系方式，不替他决定去向",
          "planning"
        ]
      ],
      "icon": "globe",
      "color": "#76b8b5",
      "campus": "yanchang",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "yuan",
      "name": "袁书宁",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 书香谷阅读伙伴",
      "affinity": "writing",
      "places": [
        "libraryresearch",
        "bookcircle"
      ],
      "intro": "她会把读书笔记分成“原文说了什么”和“我还不知道什么”。",
      "like": "有出处的表达，也喜欢听不成熟的新问题。",
      "chapters": [
        [
          "第一页不是答案",
          "在书香谷讨论时，她把你断言的一句话轻轻划了问号。你们决定一起查来源，而不是争输赢。",
          "一起追到原始资料",
          "research"
        ],
        [
          "愿意读你的草稿",
          "她寄来一份写得磕绊的评论，请你别只说“挺好的”。认真给反馈的那一晚，你们都放下了防备。",
          "指出一处具体优点和一处疑问",
          "empathy"
        ],
        [
          "把书还回去，把问题留下",
          "临近结课，你们把借来的书整理归还。她说真正留住的是两个人可以继续讨论的耐心。",
          "为彼此写下一份阅读清单",
          "writing"
        ]
      ],
      "campus": "baoshan",
      "icon": "book",
      "color": "#90cbbd",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "pei",
      "name": "裴见微",
      "gender": "male",
      "age": 20,
      "role": "上大校园 · 跨校区合作搭子",
      "affinity": "planning",
      "places": [
        "crosscampus",
        "jointseminar"
      ],
      "intro": "他会为一次合作预留改稿和通勤的余量，不把准时全交给运气。",
      "like": "清楚的约定，遇到变动时尽早说。",
      "chapters": [
        [
          "被取消的集合",
          "一次交流临时改了地点。与其让所有人白跑，他先核实信息，再联系每个人。",
          "一起更新集合说明",
          "planning"
        ],
        [
          "并不擅长所有事情",
          "工程任务到了验收，他坦承有一部分不懂。你们重新分工，把求助也写进计划。",
          "找合适的人共同验证",
          "teamwork"
        ],
        [
          "不再需要一个人兜底",
          "合作结束后，每个人都能接手材料。他终于不再在群里通宵回复一切。",
          "把交接和休息都留在计划里",
          "leadership"
        ]
      ],
      "campus": "baoshan",
      "icon": "tools",
      "color": "#d5ae70",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "an",
      "name": "安栖",
      "gender": "female",
      "age": 19,
      "role": "上大校园 · 延长影像与展陈伙伴",
      "affinity": "design",
      "places": [
        "wenhuistudy",
        "captionlab"
      ],
      "intro": "她在文荟馆寻找旧影像，也会问一场展览到底有没有照顾没看懂的人。",
      "like": "有解释的设计，不把晦涩当成高级。",
      "chapters": [
        [
          "给展品换一句说明",
          "你们站在一块读不懂的展板前，她提议把术语换成一个观众真正会问的问题。",
          "重写一条说明并请人试读",
          "design"
        ],
        [
          "镜头外的那个人",
          "受访者不愿意公开一段影像。她停下剪辑，先确认授权，而不是拿故事完整当理由。",
          "保留边界，换一种表达",
          "media"
        ],
        [
          "可以一起沉默的展厅",
          "布展结束，最后一位观众走了。你们没有急着谈成绩，而是一起把座椅摆回去。",
          "记住每个参与者的劳动",
          "empathy"
        ]
      ],
      "campus": "yanchang",
      "icon": "camera",
      "color": "#c6a5cd",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    },
    {
      "id": "ji",
      "name": "季闻舟",
      "gender": "male",
      "age": 21,
      "role": "上大校园 · 嘉定校区语言与人文伙伴",
      "affinity": "language",
      "places": [
        "unionstudy",
        "historyvisit"
      ],
      "intro": "他喜欢把校园散步中的疑问带回联合图书馆，用不同语言寻找不同解释。",
      "like": "认真倾听，允许一个问题暂时没有答案。",
      "chapters": [
        [
          "没有马上翻译的词",
          "他在交流中遇见一个说不明白的词。你们用各自的生活举例，发现慢一点也能靠近。",
          "从对方的经历听起",
          "language"
        ],
        [
          "同一张照片的两种记忆",
          "两位讲述者对一段校园往事记忆不同。他没有随意选一边，而是把差异写下来。",
          "注明来源与不确定之处",
          "history"
        ],
        [
          "离开前再走一次",
          "离校前的交流活动结束，你们又走了一遍初识时的路。熟悉的地方，因为认真记录而有了新意义。",
          "交换一份彼此看过的校园",
          "explore"
        ]
      ],
      "campus": "jiading",
      "icon": "globe",
      "color": "#8db8c8",
      "setting": "上海大学校园生活中的虚构成年角色，不对应真实师生。"
    }
  ],
  "EVENTS": [
    {
      "id": "orientation",
      "title": "你好，陌生的校园",
      "text": "你站在校门口，行李箱的轮子卡进了一道砖缝。迎新牌后面，是还没写下的四年。",
      "options": [
        {
          "label": "先认识一个同学",
          "stats": {
            "eq": 3,
            "mood": 4
          },
          "meet": "su"
        },
        {
          "label": "先去图书馆看看",
          "stats": {
            "knowledge": 4,
            "iq": 2
          },
          "meet": "lin"
        },
        {
          "label": "先绕校园走一圈",
          "stats": {
            "explore": 4,
            "health": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "fixed": 1,
      "once": true
    },
    {
      "id": "dorm",
      "title": "寝室的第一份公约",
      "text": "有人习惯早睡，有人喜欢夜里打游戏。寝室需要一份大家都愿意遵守的约定。",
      "options": [
        {
          "label": "一起讨论安静时段",
          "stats": {
            "eq": 4,
            "discipline": 2
          }
        },
        {
          "label": "先听听每个人的习惯",
          "stats": {
            "eq": 5,
            "mood": 2
          }
        },
        {
          "label": "买一副耳塞并说明边界",
          "stats": {
            "mood": 4,
            "stress": -4
          },
          "cost": 40
        }
      ],
      "minMonth": 2,
      "cooldown": 10
    },
    {
      "id": "clubfair",
      "title": "百团大战",
      "text": "招新广场像一场小型游园会。你在几张报名表之间犹豫。",
      "options": [
        {
          "label": "去学术社碰碰运气",
          "stats": {
            "research": 4,
            "knowledge": 2
          },
          "meet": "gu"
        },
        {
          "label": "去舞台社帮忙",
          "stats": {
            "art": 4,
            "fame": 3
          },
          "meet": "lu"
        },
        {
          "label": "去户外社问路线",
          "stats": {
            "explore": 4,
            "sport": 2
          },
          "meet": "jiang"
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "presentation",
      "title": "突然被点名的展示",
      "text": "老师请你用三分钟讲清小组方案。你还有一点紧张。",
      "options": [
        {
          "label": "试着讲，不怕停顿",
          "stats": {
            "eq": 4,
            "knowledge": 2,
            "stress": 3
          }
        },
        {
          "label": "邀请同学一起补充",
          "stats": {
            "eq": 3,
            "fame": 2
          }
        },
        {
          "label": "认真准备后再作补充",
          "stats": {
            "discipline": 3,
            "knowledge": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "rain",
      "title": "大雨里的两把伞",
      "text": "校门口下起大雨，你发现身边有人没带伞。",
      "options": [
        {
          "label": "主动问问是否需要帮助",
          "stats": {
            "eq": 3,
            "mood": 3
          }
        },
        {
          "label": "分享避雨的地方",
          "stats": {
            "eq": 2,
            "explore": 2
          }
        },
        {
          "label": "把多带的一把伞借出去",
          "stats": {
            "service": 3,
            "eq": 2
          },
          "cost": 30
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "sale",
      "title": "想买很久的新设备",
      "text": "购物车里的设备正在促销。它可能让创作方便一点，也可能让月底变紧。",
      "options": [
        {
          "label": "确有需求，预算内购买",
          "stats": {
            "tech": 4,
            "art": 4,
            "mood": 2
          },
          "cost": 450
        },
        {
          "label": "借用学校设备先做起来",
          "stats": {
            "tech": 3,
            "discipline": 3
          }
        },
        {
          "label": "关掉购物车，出去走走",
          "stats": {
            "mood": 4,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "scholarship",
      "title": "奖学金申请窗口",
      "text": "公告栏贴出了申请通知。你决定如何整理这一学期的记录？",
      "options": [
        {
          "label": "认真梳理成绩和成果",
          "stats": {
            "discipline": 3,
            "knowledge": 2
          },
          "check": {
            "stat": "knowledge",
            "threshold": 55,
            "success": {
              "money": 700,
              "fame": 3
            },
            "failure": {
              "discipline": 2
            },
            "successText": "申请通过，你收到了700元游戏内奖励。",
            "failureText": "这次没有入选，但材料整理好了。"
          }
        },
        {
          "label": "请同学互相检查材料",
          "stats": {
            "eq": 3,
            "discipline": 3
          }
        },
        {
          "label": "暂时把时间留给手头项目",
          "stats": {
            "tech": 3,
            "art": 2
          }
        }
      ],
      "minMonth": 6,
      "cooldown": 10
    },
    {
      "id": "burnouttalk",
      "title": "我好像有点跟不上",
      "text": "同学们分享着成果，你忽然觉得自己一直在原地。",
      "options": [
        {
          "label": "把别人的节奏放下，整理自己的进步",
          "stats": {
            "mood": 7,
            "stress": -10,
            "discipline": 2
          }
        },
        {
          "label": "约信任的人聊聊",
          "stats": {
            "eq": 3,
            "mood": 5,
            "stress": -7
          }
        },
        {
          "label": "给接下来列一个能完成的小目标",
          "stats": {
            "discipline": 5,
            "stress": -4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "scam",
      "title": "“包过”私信",
      "text": "一个陌生账号承诺付钱就能拿到比赛证书。越看越不对劲。",
      "options": [
        {
          "label": "拒绝并提醒同学",
          "stats": {
            "eq": 2,
            "service": 3
          }
        },
        {
          "label": "通过正规渠道核实",
          "stats": {
            "iq": 3,
            "discipline": 2
          }
        },
        {
          "label": "不理会，把时间用来练习",
          "stats": {
            "tech": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "teamconflict",
      "title": "小组作业的分工",
      "text": "一位组员迟迟没有进展，其他人开始抱怨。",
      "options": [
        {
          "label": "先确认困难，重新拆分任务",
          "stats": {
            "eq": 5,
            "discipline": 2
          }
        },
        {
          "label": "把时间节点和交付写清楚",
          "stats": {
            "business": 3,
            "discipline": 4
          }
        },
        {
          "label": "自己多做一部分，之后再复盘",
          "stats": {
            "tech": 4,
            "stress": 5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "hackathon",
      "title": "周末的限时挑战",
      "text": "有同学拉你参加一个小型创新赛。没人期待史诗级产品，但大家想真正做完。",
      "options": [
        {
          "label": "负责原型实现",
          "stats": {
            "tech": 5,
            "iq": 2,
            "stress": 3
          }
        },
        {
          "label": "负责需求与展示",
          "stats": {
            "business": 4,
            "eq": 4
          }
        },
        {
          "label": "负责视觉与叙事",
          "stats": {
            "art": 5,
            "fame": 2
          }
        }
      ],
      "minMonth": 5,
      "cooldown": 10
    },
    {
      "id": "sunset",
      "title": "操场上的晚霞",
      "text": "晚霞很好看。这个傍晚，暂时没有任何必须完成的事。",
      "options": [
        {
          "label": "慢慢跑两圈",
          "stats": {
            "health": 4,
            "sport": 3,
            "stress": -5
          }
        },
        {
          "label": "拍下来，留给以后的自己",
          "stats": {
            "art": 3,
            "mood": 5
          }
        },
        {
          "label": "坐着发一会儿呆",
          "stats": {
            "mood": 7,
            "stress": -8
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "hometownletter",
      "title": "家里寄来的箱子",
      "text": "箱子里塞满了你提过一次的小零食，纸条上只写着“照顾好自己”。",
      "options": [
        {
          "label": "打电话聊聊最近的生活",
          "stats": {
            "eq": 3,
            "mood": 6
          },
          "flag": "familyMemories"
        },
        {
          "label": "分给室友一起吃",
          "stats": {
            "eq": 4,
            "mood": 4
          }
        },
        {
          "label": "写封信认真回复",
          "stats": {
            "art": 3,
            "mood": 4
          },
          "flag": "familyMemories"
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "secondhand",
      "title": "旧书摊的一张纸条",
      "text": "一本二手书里夹着前主人留下的复习清单。",
      "options": [
        {
          "label": "整理成自己的错题框架",
          "stats": {
            "exam": 5,
            "discipline": 2
          }
        },
        {
          "label": "沿着书单多读一点",
          "stats": {
            "knowledge": 4,
            "iq": 2
          }
        },
        {
          "label": "写一句鼓励，留给下一位读者",
          "stats": {
            "art": 2,
            "service": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "mentor",
      "title": "老师多问了一句",
      "text": "课后，老师问你：愿不愿意来听听我们组的讨论？",
      "options": [
        {
          "label": "去旁听，记下不懂的问题",
          "stats": {
            "research": 5,
            "iq": 2
          }
        },
        {
          "label": "先补一点基础再去",
          "stats": {
            "knowledge": 5,
            "discipline": 2
          }
        },
        {
          "label": "坦诚说更想尝试实践项目",
          "stats": {
            "tech": 4,
            "business": 2
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 10,
      "req": {
        "knowledge": 30
      }
    },
    {
      "id": "unexpectedbill",
      "title": "计划外的一笔开销",
      "text": "常用设备出了小故障，你得在预算里腾出一点空间。",
      "options": [
        {
          "label": "修好继续用",
          "stats": {
            "tech": 2,
            "mood": 2
          },
          "cost": 180
        },
        {
          "label": "借用备用设备，先学着排查",
          "stats": {
            "tech": 4,
            "iq": 2
          }
        },
        {
          "label": "卖掉闲置，顺便整理生活",
          "stats": {
            "discipline": 3
          },
          "money": 100
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "publicspeaking",
      "title": "临时的主持人",
      "text": "活动主持临时缺席。有人把话筒递到了你面前。",
      "options": [
        {
          "label": "接过来，按流程慢慢讲",
          "stats": {
            "eq": 5,
            "fame": 3,
            "stress": 3
          }
        },
        {
          "label": "和朋友一起主持",
          "stats": {
            "eq": 4,
            "mood": 2
          }
        },
        {
          "label": "留在后台把流程保住",
          "stats": {
            "discipline": 4,
            "business": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "travelinvite",
      "title": "说走之前先做计划",
      "text": "朋友提议去邻城过周末，预算和路线还都没定。",
      "options": [
        {
          "label": "认真做计划后出发",
          "stats": {
            "explore": 6,
            "eq": 3,
            "mood": 3
          },
          "cost": 240,
          "place": true
        },
        {
          "label": "改成当天能回来的短途",
          "stats": {
            "explore": 4,
            "health": 2
          },
          "cost": 80,
          "place": true
        },
        {
          "label": "这次不去，留出休息时间",
          "stats": {
            "health": 4,
            "stress": -7
          }
        }
      ],
      "minMonth": 4,
      "cooldown": 10
    },
    {
      "id": "grant",
      "title": "校园微型项目资助",
      "text": "学校有一笔支持小项目的经费，不要求宏大，但要求能落地。",
      "options": [
        {
          "label": "提交一个真实需求方案",
          "stats": {
            "business": 3,
            "discipline": 2
          },
          "check": {
            "stat": "business",
            "threshold": 45,
            "success": {
              "money": 500
            },
            "failure": {
              "business": 2
            },
            "successText": "方案获批，收到500元支持。",
            "failureText": "这次没有入选，评审建议先缩小问题。"
          }
        },
        {
          "label": "提交一个公益计划",
          "stats": {
            "service": 4,
            "eq": 2
          }
        },
        {
          "label": "提交一个原创作品方案",
          "stats": {
            "art": 4,
            "fame": 2
          }
        }
      ],
      "minMonth": 10,
      "cooldown": 10
    },
    {
      "id": "jobfair",
      "title": "招聘会门口",
      "text": "展位上的岗位名称有些陌生，你终于要把“以后”变成具体的问题。",
      "options": [
        {
          "label": "拿出作品请人给建议",
          "stats": {
            "tech": 4,
            "eq": 3
          }
        },
        {
          "label": "认真了解岗位的日常",
          "stats": {
            "business": 3,
            "discipline": 3
          }
        },
        {
          "label": "记录差距，安排下一阶段练习",
          "stats": {
            "discipline": 4,
            "knowledge": 2
          }
        }
      ],
      "minMonth": 25,
      "cooldown": 10
    },
    {
      "id": "ethics",
      "title": "看起来漂亮的数据",
      "text": "项目里有一组结果很不理想。有人提议只展示好看的部分。",
      "options": [
        {
          "label": "完整报告，包括不理想的结果",
          "stats": {
            "research": 4,
            "discipline": 4
          }
        },
        {
          "label": "补充验证，再讨论局限",
          "stats": {
            "research": 5,
            "stress": 3
          }
        },
        {
          "label": "调整目标，不伪造成果",
          "stats": {
            "business": 3,
            "eq": 3
          }
        }
      ],
      "minMonth": 10,
      "cooldown": 10
    },
    {
      "id": "viral",
      "title": "一条内容突然被看见",
      "text": "你分享的一段校园记录获得了意外的关注。",
      "options": [
        {
          "label": "继续做有内容的更新",
          "stats": {
            "art": 4,
            "fame": 5,
            "discipline": 2
          }
        },
        {
          "label": "认真回复真实的讨论",
          "stats": {
            "eq": 4,
            "fame": 3
          }
        },
        {
          "label": "不追热度，留下正常生活",
          "stats": {
            "mood": 5,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "req": {
        "art": 25
      }
    },
    {
      "id": "frienddown",
      "title": "朋友失落的一天",
      "text": "朋友发来一句“最近有点难”。你不知道如何把问题解决。",
      "options": [
        {
          "label": "先听，不急着给答案",
          "stats": {
            "eq": 5,
            "service": 2
          }
        },
        {
          "label": "问问有没有具体能帮的忙",
          "stats": {
            "eq": 4,
            "discipline": 2
          }
        },
        {
          "label": "约一顿简单的饭",
          "stats": {
            "eq": 3,
            "mood": 4
          },
          "cost": 70
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "labfail",
      "title": "重新做一遍",
      "text": "实验没有得到预期结果。你翻开记录本，发现自己漏记了一个条件。",
      "options": [
        {
          "label": "补全记录，重做对照",
          "stats": {
            "research": 5,
            "discipline": 3,
            "stress": 2
          }
        },
        {
          "label": "向组员请教并交叉检查",
          "stats": {
            "eq": 3,
            "research": 4
          }
        },
        {
          "label": "先休息，清醒后再排查",
          "stats": {
            "health": 3,
            "iq": 2,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "req": {
        "research": 20
      }
    },
    {
      "id": "newcafe",
      "title": "教学楼旁的新咖啡店",
      "text": "店里正招募周末的小型分享会。你可以只是来坐坐，也可以带点东西。",
      "options": [
        {
          "label": "分享一个读过的观点",
          "stats": {
            "knowledge": 3,
            "eq": 3
          }
        },
        {
          "label": "拿出一段原创",
          "stats": {
            "art": 4,
            "fame": 2
          }
        },
        {
          "label": "观察客流，聊聊经营",
          "stats": {
            "business": 4,
            "explore": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "fitnesscomparison",
      "title": "别人的配速很快",
      "text": "运动软件上的数字让你有点心急。你的身体却在提醒你慢一点。",
      "options": [
        {
          "label": "按自己的计划来",
          "stats": {
            "sport": 3,
            "discipline": 3,
            "health": 3
          }
        },
        {
          "label": "学习科学安排训练的常识",
          "stats": {
            "iq": 3,
            "sport": 3
          }
        },
        {
          "label": "今天散步，也算出门了",
          "stats": {
            "health": 4,
            "mood": 3,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "exampractice",
      "title": "模拟卷上的红色叉号",
      "text": "模拟结果不理想，但它至少告诉了你问题在哪里。",
      "options": [
        {
          "label": "分类整理错题",
          "stats": {
            "exam": 6,
            "discipline": 2
          }
        },
        {
          "label": "和同学互相讲题",
          "stats": {
            "exam": 4,
            "eq": 3
          }
        },
        {
          "label": "回到基础，再做一遍",
          "stats": {
            "knowledge": 5,
            "exam": 2
          }
        }
      ],
      "minMonth": 20,
      "cooldown": 10,
      "req": {
        "exam": 20
      }
    },
    {
      "id": "winterbreak",
      "title": "一个没有闹钟的早晨",
      "text": "假期终于来了。你决定给自己怎样的一天？",
      "options": [
        {
          "label": "睡够以后整理书桌",
          "stats": {
            "health": 5,
            "mood": 4,
            "stress": -8
          }
        },
        {
          "label": "和老朋友见一面",
          "stats": {
            "eq": 4,
            "explore": 2,
            "mood": 3
          }
        },
        {
          "label": "做一件一直想做的小作品",
          "stats": {
            "art": 4,
            "tech": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "season": [
        5,
        6,
        11,
        12
      ]
    },
    {
      "id": "campustree",
      "title": "银杏叶落下来的时候",
      "text": "你经过同一条路，却第一次发现树已经变了颜色。",
      "options": [
        {
          "label": "记下这一刻",
          "stats": {
            "art": 3,
            "explore": 2,
            "mood": 4
          }
        },
        {
          "label": "发消息约朋友散步",
          "stats": {
            "eq": 3,
            "mood": 4
          }
        },
        {
          "label": "停下来，什么都不做",
          "stats": {
            "stress": -8,
            "mood": 5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "season": [
        2,
        3,
        4
      ]
    },
    {
      "id": "roommatewin",
      "title": "室友拿到了一份录用",
      "text": "寝室里一边庆祝，一边有人偷偷打开了招聘软件。",
      "options": [
        {
          "label": "真心祝贺，再问问准备经验",
          "stats": {
            "eq": 4,
            "tech": 3
          }
        },
        {
          "label": "整理自己的作品和节奏",
          "stats": {
            "discipline": 4,
            "stress": -3
          }
        },
        {
          "label": "请大家吃顿小小庆功饭",
          "stats": {
            "eq": 4,
            "mood": 4
          },
          "cost": 120
        }
      ],
      "minMonth": 29,
      "cooldown": 10
    },
    {
      "id": "summerheat",
      "title": "热得不想出门的一天",
      "text": "天气很热，大家把学习桌搬到了有空调的公共空间。",
      "options": [
        {
          "label": "安静学一个小章节",
          "stats": {
            "knowledge": 4,
            "exam": 2
          }
        },
        {
          "label": "和旁边的人聊聊项目",
          "stats": {
            "eq": 3,
            "business": 3
          }
        },
        {
          "label": "早点回去休息",
          "stats": {
            "health": 4,
            "stress": -6
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "season": [
        10,
        11,
        12
      ]
    },
    {
      "id": "failedpitch",
      "title": "路演之后的走廊",
      "text": "台上的反馈有点尖锐，但并非全无道理。",
      "options": [
        {
          "label": "把批评拆成可验证的假设",
          "stats": {
            "business": 5,
            "iq": 2
          }
        },
        {
          "label": "找潜在用户重新确认需求",
          "stats": {
            "business": 4,
            "eq": 3
          }
        },
        {
          "label": "先消化情绪，再决定下一步",
          "stats": {
            "mood": 5,
            "stress": -7
          }
        }
      ],
      "minMonth": 13,
      "cooldown": 10,
      "req": {
        "business": 30
      }
    },
    {
      "id": "tinyincome",
      "title": "第一笔靠作品赚的钱",
      "text": "数额并不大，但你忍不住又看了一眼到账提示。",
      "options": [
        {
          "label": "留作下一个项目的预算",
          "stats": {
            "business": 3,
            "discipline": 2
          },
          "money": 150
        },
        {
          "label": "和朋友分享喜悦",
          "stats": {
            "eq": 3,
            "mood": 5
          },
          "money": 100
        },
        {
          "label": "为自己留一份小纪念",
          "stats": {
            "art": 3,
            "mood": 4
          },
          "money": 80
        }
      ],
      "minMonth": 10,
      "cooldown": 10,
      "req": {
        "tech": 25
      },
      "once": true
    },
    {
      "id": "bookclub",
      "title": "一句话引发的讨论",
      "text": "读书会上，同一句话被大家读出了不同的意思。",
      "options": [
        {
          "label": "认真理解另一个角度",
          "stats": {
            "iq": 4,
            "eq": 2
          }
        },
        {
          "label": "补充自己查到的背景",
          "stats": {
            "knowledge": 4,
            "language": 2
          }
        },
        {
          "label": "把讨论写成一篇短文",
          "stats": {
            "art": 4,
            "fame": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "loneliness",
      "title": "一个人的食堂",
      "text": "今天没有约到朋友。你端着盘子坐到窗边，忽然觉得有些孤单。",
      "options": [
        {
          "label": "给自己安排喜欢的晚饭",
          "stats": {
            "mood": 5,
            "stress": -5
          },
          "cost": 30
        },
        {
          "label": "主动发起一个周末邀约",
          "stats": {
            "eq": 4,
            "mood": 2
          }
        },
        {
          "label": "独自走走，允许今天慢一点",
          "stats": {
            "explore": 3,
            "mood": 4,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "lostitem",
      "title": "公告群里的失物消息",
      "text": "你在路边捡到一个学生证，失主正着急地在群里寻找。",
      "options": [
        {
          "label": "联系对方并约安全地点归还",
          "stats": {
            "service": 4,
            "eq": 2
          }
        },
        {
          "label": "送到校园服务台",
          "stats": {
            "service": 3,
            "discipline": 2
          }
        },
        {
          "label": "帮忙把失物信息转到正确的群",
          "stats": {
            "eq": 3,
            "fame": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "budgetday",
      "title": "月底预算复盘",
      "text": "你开始能从账目里看见自己的生活习惯。",
      "options": [
        {
          "label": "削减不需要的开销",
          "stats": {
            "discipline": 4,
            "business": 2
          },
          "money": 100
        },
        {
          "label": "为在意的事设一个小预算",
          "stats": {
            "discipline": 3,
            "mood": 3
          }
        },
        {
          "label": "学着清楚地表达经济边界",
          "stats": {
            "eq": 4,
            "stress": -3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "boundaries",
      "title": "一个不太想参加的聚会",
      "text": "朋友很热情，但你实在需要休息。",
      "options": [
        {
          "label": "诚实拒绝，另约时间",
          "stats": {
            "eq": 4,
            "health": 3,
            "stress": -5
          }
        },
        {
          "label": "只去短暂打个招呼",
          "stats": {
            "eq": 3,
            "mood": 2
          },
          "cost": 40
        },
        {
          "label": "改成安静的小聚",
          "stats": {
            "mood": 4,
            "eq": 3
          },
          "cost": 60
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "alumni",
      "title": "十年后的大学生活",
      "text": "一位校友回校分享。他最怀念的不是某个头衔，而是当年一起做事的人。",
      "options": [
        {
          "label": "问问职业道路如何转弯",
          "stats": {
            "business": 4,
            "eq": 2
          }
        },
        {
          "label": "问问怎样保持持续学习",
          "stats": {
            "discipline": 3,
            "iq": 3
          }
        },
        {
          "label": "问问如何珍惜长期关系",
          "stats": {
            "eq": 4,
            "mood": 3
          }
        }
      ],
      "minMonth": 13,
      "cooldown": 10
    },
    {
      "id": "community",
      "title": "社区里的一张需求单",
      "text": "志愿站不是缺照片，而是缺每周能稳定来的人。",
      "options": [
        {
          "label": "承诺一件自己能坚持的事",
          "stats": {
            "service": 5,
            "discipline": 3
          }
        },
        {
          "label": "帮忙把任务拆给合适的人",
          "stats": {
            "eq": 4,
            "civic": 3
          }
        },
        {
          "label": "做一份可交接的操作说明",
          "stats": {
            "tech": 3,
            "service": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "creativeblock",
      "title": "写不下去的一页",
      "text": "你删掉了三次开头。也许问题不在词句，而在最近没有新的观察。",
      "options": [
        {
          "label": "去逛一次旧街区",
          "stats": {
            "explore": 4,
            "art": 3
          },
          "cost": 40
        },
        {
          "label": "写一个不准备发布的小片段",
          "stats": {
            "art": 5,
            "stress": -3
          }
        },
        {
          "label": "给自己放半天假",
          "stats": {
            "mood": 5,
            "stress": -7
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10,
      "req": {
        "art": 20
      }
    },
    {
      "id": "roomrepair",
      "title": "寝室的小修小补",
      "text": "桌灯松了，椅子响了，大家决定周末一起收拾。",
      "options": [
        {
          "label": "查清结构再动手",
          "stats": {
            "tech": 4,
            "iq": 2
          }
        },
        {
          "label": "整理公共空间",
          "stats": {
            "discipline": 3,
            "mood": 4
          }
        },
        {
          "label": "分配任务并照顾大家的习惯",
          "stats": {
            "eq": 4,
            "mood": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "sportsday",
      "title": "运动会看台上的声音",
      "text": "你没有报名这场比赛，但看台上的同学也在认真加油。",
      "options": [
        {
          "label": "下次试着报名一个项目",
          "stats": {
            "sport": 4,
            "discipline": 2
          }
        },
        {
          "label": "帮忙做志愿工作",
          "stats": {
            "service": 4,
            "eq": 2
          }
        },
        {
          "label": "记录运动员的故事",
          "stats": {
            "art": 4,
            "fame": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "applicationessay",
      "title": "个人陈述的空白页",
      "text": "“请介绍你自己。”这么短的一句话，反而最难回答。",
      "options": [
        {
          "label": "从真正做过的一件事写起",
          "stats": {
            "language": 4,
            "discipline": 3
          }
        },
        {
          "label": "请熟悉自己的人提建议",
          "stats": {
            "eq": 3,
            "language": 3
          }
        },
        {
          "label": "先列出问题与反思，不堆形容词",
          "stats": {
            "iq": 3,
            "art": 3
          }
        }
      ],
      "minMonth": 25,
      "cooldown": 10
    },
    {
      "id": "lastfestival",
      "title": "也许是最后一次校园节",
      "text": "你突然意识到，熟悉的摊位和笑声并不会永远保持原样。",
      "options": [
        {
          "label": "认真和朋友留一张合照",
          "stats": {
            "eq": 3,
            "mood": 5
          }
        },
        {
          "label": "在留言墙写一句话",
          "stats": {
            "art": 3,
            "mood": 4
          }
        },
        {
          "label": "帮学弟学妹把活动做好",
          "stats": {
            "service": 4,
            "fame": 3
          }
        }
      ],
      "minMonth": 37,
      "cooldown": 10
    },
    {
      "id": "chancecourse",
      "title": "一门跨专业选修课",
      "text": "课程表里有门与你的专业毫不相关的课，你却被介绍吸引了。",
      "options": [
        {
          "label": "去听，允许兴趣暂时没用",
          "stats": {
            "iq": 4,
            "explore": 3
          }
        },
        {
          "label": "找出它和专业的联系",
          "stats": {
            "tech": 3,
            "art": 3
          }
        },
        {
          "label": "先借本入门书看看",
          "stats": {
            "knowledge": 3,
            "language": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "qualitytime",
      "title": "忙碌日历里的一格",
      "text": "计划排得越来越满，你想为重要的人和事留一格空白。",
      "options": [
        {
          "label": "约一次不看手机的聊天",
          "stats": {
            "eq": 4,
            "mood": 4
          }
        },
        {
          "label": "给自己一段完整休息",
          "stats": {
            "health": 4,
            "stress": -8
          }
        },
        {
          "label": "完成一件拖了很久的小事",
          "stats": {
            "discipline": 4,
            "mood": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 10
    },
    {
      "id": "graduationphoto",
      "title": "站在毕业照的边缘",
      "text": "有人说站中间才好看。你却发现，自己最想站在熟悉的人旁边。",
      "options": [
        {
          "label": "和一路陪伴的人站一起",
          "stats": {
            "eq": 3,
            "mood": 6
          }
        },
        {
          "label": "也邀请有点落单的同学",
          "stats": {
            "service": 4,
            "eq": 3
          }
        },
        {
          "label": "给自己拍一张不那么标准的照片",
          "stats": {
            "art": 3,
            "mood": 5
          }
        }
      ],
      "minMonth": 43,
      "cooldown": 10,
      "once": true
    },
    {
      "id": "letterfuture",
      "title": "写给未来的一封信",
      "text": "你翻出大一留下的愿望清单。有些实现了，有些已经不再重要。",
      "options": [
        {
          "label": "谢谢当年那个笨拙的自己",
          "stats": {
            "mood": 7,
            "stress": -8
          }
        },
        {
          "label": "写下想继续坚持的三件小事",
          "stats": {
            "discipline": 4,
            "mood": 3
          }
        },
        {
          "label": "给未来留下一句开放的问题",
          "stats": {
            "iq": 3,
            "explore": 3
          }
        }
      ],
      "minMonth": 37,
      "cooldown": 10,
      "once": true
    },
    {
      "id": "v2_shu_welcome",
      "title": "上大灵感篇 · 三个校园",
      "text": "宝山、延长、嘉定出现在迎新地图上。本作借用公开校园文化作为灵感，不复刻真实教学安排。",
      "options": [
        {
          "label": "先读校园文化手册",
          "stats": {
            "history": 4,
            "planning": 3
          }
        },
        {
          "label": "约新同学一起认路",
          "stats": {
            "eq": 3,
            "explore": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "once": true
    },
    {
      "id": "v2_library_seat",
      "title": "钱图里的一张桌子",
      "text": "同伴想用书包占住几个小时不用的座位。旁边有人正在找位置。",
      "options": [
        {
          "label": "把不用的位置让出来",
          "stats": {
            "law": 3,
            "empathy": 3
          }
        },
        {
          "label": "提议轮换并约定时间",
          "stats": {
            "planning": 4,
            "teamwork": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_library_group",
      "title": "研讨室不是聊天包间",
      "text": "预约研讨空间后，组员想把讨论临时改成聚会。",
      "options": [
        {
          "label": "先完成讨论，另找聚会地点",
          "stats": {
            "discipline": 3,
            "planning": 3
          }
        },
        {
          "label": "明确使用规则，重新协调时间",
          "stats": {
            "negotiation": 4,
            "law": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_chrysanthemum",
      "title": "菊花背后的劳动",
      "text": "你正想拍一张照片，遇见照顾花木的工作人员。",
      "options": [
        {
          "label": "先问是否方便，再听养护故事",
          "stats": {
            "history": 4,
            "empathy": 3
          }
        },
        {
          "label": "记录品种与观察，不打扰工作",
          "stats": {
            "ecology": 5,
            "photography": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "season": [
        3,
        4
      ]
    },
    {
      "id": "v2_spring_stage",
      "title": "春日音乐会的侧门",
      "text": "演出准备的最后一小时，一箱节目单还没分好。",
      "options": [
        {
          "label": "帮忙分工，交接给下一班",
          "stats": {
            "teamwork": 4,
            "service": 3
          }
        },
        {
          "label": "认真排练，确保自己的部分到位",
          "stats": {
            "performance": 5,
            "discipline": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "season": [
        7,
        8
      ]
    },
    {
      "id": "v2_term_choice",
      "title": "选课不是抢到就好",
      "text": "热门选修和本专业必修有冲突，你已经点开了收藏。",
      "options": [
        {
          "label": "先核对培养计划，再做取舍",
          "stats": {
            "planning": 5,
            "discipline": 2
          }
        },
        {
          "label": "向教学秘书咨询规则再决定",
          "stats": {
            "law": 3,
            "eq": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "season": [
        1,
        6
      ]
    },
    {
      "id": "v2_summer_question",
      "title": "实践小学期 · 到底做什么",
      "text": "暑期看起来很长，你的小组却列了三个来不及完成的大目标。",
      "options": [
        {
          "label": "缩成一个能被验证的小问题",
          "stats": {
            "research": 4,
            "planning": 4
          }
        },
        {
          "label": "先联系需求方确认真实需要",
          "stats": {
            "service": 4,
            "negotiation": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "season": [
        11,
        12
      ]
    },
    {
      "id": "v2_campus_transfer",
      "title": "跨校区的一天",
      "text": "两场有兴趣的活动不在同一校区。游戏里的通勤也会消耗精力。",
      "options": [
        {
          "label": "集中参加同一区域的活动",
          "stats": {
            "planning": 4,
            "health": 2
          }
        },
        {
          "label": "只保留最想参加的一场",
          "stats": {
            "discipline": 3,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_yanchang_sound",
      "title": "片场里多出来的声音",
      "text": "你在以延长校区为灵感的片场练习时，录到了路人的私人谈话。",
      "options": [
        {
          "label": "删除不必要的声音片段",
          "stats": {
            "media": 4,
            "law": 3
          }
        },
        {
          "label": "改用另一次授权的环境采集",
          "stats": {
            "photography": 4,
            "planning": 2
          }
        }
      ],
      "minMonth": 5,
      "cooldown": 16
    },
    {
      "id": "v2_jiading_story",
      "title": "一条街的两种讲法",
      "text": "嘉定人文观察中，两位讲述者给出了不同记忆。",
      "options": [
        {
          "label": "分别记录，不强行合成唯一版本",
          "stats": {
            "history": 5,
            "media": 2
          }
        },
        {
          "label": "补充公开资料并标注不确定性",
          "stats": {
            "data": 3,
            "writing": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_archive_rule",
      "title": "校史不是背景贴图",
      "text": "同学想把没核实的传闻写进入学介绍。",
      "options": [
        {
          "label": "删掉传闻，保留可查的出处",
          "stats": {
            "media": 4,
            "history": 3
          }
        },
        {
          "label": "把问题留作待考，不做定论",
          "stats": {
            "research": 3,
            "writing": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_readingshare",
      "title": "一本书，不同的入口",
      "text": "读书分享会上，一个同学和你对结局的理解完全不同。",
      "options": [
        {
          "label": "让对方先说完证据",
          "stats": {
            "empathy": 4,
            "writing": 2
          }
        },
        {
          "label": "一起回到原文找线索",
          "stats": {
            "knowledge": 3,
            "history": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_data_leak",
      "title": "不要把原始数据随手发群",
      "text": "项目数据包含可以识别个人的信息，组员图方便想直接公开。",
      "options": [
        {
          "label": "先去标识并核对授权范围",
          "stats": {
            "media": 4,
            "law": 4
          }
        },
        {
          "label": "改用合成示例展示方法",
          "stats": {
            "data": 4,
            "innovation": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "data": 15
      }
    },
    {
      "id": "v2_model_error",
      "title": "准确率很高，为什么不好用",
      "text": "工具在训练样本上表现不错，换一批数据却经常出错。",
      "options": [
        {
          "label": "建立独立验证集",
          "stats": {
            "data": 5,
            "research": 3
          }
        },
        {
          "label": "缩小使用范围并写明限制",
          "stats": {
            "media": 3,
            "tech": 3
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 16
    },
    {
      "id": "v2_replication_fail",
      "title": "复现失败之后",
      "text": "连续三次没得到同样结果，你想直接改参数凑一个答案。",
      "options": [
        {
          "label": "保存失败过程，逐项排查",
          "stats": {
            "research": 5,
            "resilience": 3
          }
        },
        {
          "label": "请同伴独立检查一次流程",
          "stats": {
            "teamwork": 4,
            "data": 3
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 16
    },
    {
      "id": "v2_robot_interface",
      "title": "三个模块，一台不动的机器",
      "text": "三个方向都说自己完成了，机器人却还不能启动。",
      "options": [
        {
          "label": "先制定接口协议再联调",
          "stats": {
            "engineering": 4,
            "teamwork": 4
          }
        },
        {
          "label": "做一个最小可运行组合",
          "stats": {
            "tech": 4,
            "innovation": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "engineering": 15
      }
    },
    {
      "id": "v2_prototype_user",
      "title": "你喜欢的，不一定有人需要",
      "text": "展示原型时，真正使用者提出了与你设想完全不同的问题。",
      "options": [
        {
          "label": "暂时放下漂亮界面，观察使用",
          "stats": {
            "design": 5,
            "empathy": 3
          }
        },
        {
          "label": "做一个小实验验证差异",
          "stats": {
            "data": 4,
            "business": 3
          }
        }
      ],
      "minMonth": 5,
      "cooldown": 16
    },
    {
      "id": "v2_access_caption",
      "title": "视频缺少字幕",
      "text": "朋友指出，你发布的视频让听不到声音的人很难理解。",
      "options": [
        {
          "label": "补字幕并检查阅读节奏",
          "stats": {
            "design": 4,
            "media": 3
          }
        },
        {
          "label": "邀请对方测试改过的版本",
          "stats": {
            "empathy": 4,
            "teamwork": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_cash_confusion",
      "title": "有订单，但付不起材料费",
      "text": "项目账面有收入，到账却在下个月。",
      "options": [
        {
          "label": "区分利润与现金流",
          "stats": {
            "finance": 5,
            "planning": 3
          }
        },
        {
          "label": "协商分期交付和验收",
          "stats": {
            "negotiation": 4,
            "business": 3
          }
        }
      ],
      "minMonth": 10,
      "cooldown": 16
    },
    {
      "id": "v2_team_equity",
      "title": "先把合作规则谈清",
      "text": "合伙人提出先别谈分工，“熟人之间不用这么正式”。",
      "options": [
        {
          "label": "把职责与退出条件写下来",
          "stats": {
            "law": 4,
            "finance": 3
          }
        },
        {
          "label": "先试做一个小周期再讨论",
          "stats": {
            "planning": 4,
            "teamwork": 3
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 16
    },
    {
      "id": "v2_client_scope",
      "title": "顺手再加一个功能",
      "text": "客户觉得只需要多做一点，验收日期却没有变化。",
      "options": [
        {
          "label": "重新确认范围和工期",
          "stats": {
            "negotiation": 5,
            "planning": 2
          }
        },
        {
          "label": "提供明确的后续迭代方案",
          "stats": {
            "business": 4,
            "design": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "tech": 20
      }
    },
    {
      "id": "v2_no_sponsor",
      "title": "赞助没有如期到位",
      "text": "活动预算出现缺口，继续原计划可能让同学垫钱。",
      "options": [
        {
          "label": "缩减非必要环节，公开调整",
          "stats": {
            "finance": 4,
            "leadership": 4
          }
        },
        {
          "label": "延后活动并向参与者说明",
          "stats": {
            "law": 3,
            "planning": 4
          }
        }
      ],
      "minMonth": 5,
      "cooldown": 16
    },
    {
      "id": "v2_night_boundary",
      "title": "室友想再打一把",
      "text": "明天有早课，你也很想继续。耳机里有人开始劝留。",
      "options": [
        {
          "label": "说明作息，约好下次时间",
          "stats": {
            "discipline": 3,
            "negotiation": 3,
            "health": 2
          }
        },
        {
          "label": "先结束语音，让自己安静休息",
          "stats": {
            "resilience": 3,
            "stress": -6
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_quiet_room",
      "title": "同一间宿舍，不同的时钟",
      "text": "一个人赶作品，一个人准备早睡。双方都觉得自己没错。",
      "options": [
        {
          "label": "划分安静时段和公共空间",
          "stats": {
            "planning": 4,
            "law": 2
          }
        },
        {
          "label": "组织一次不指责人的圆桌",
          "stats": {
            "empathy": 4,
            "negotiation": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_romance_time",
      "title": "陪伴也需要提前商量",
      "text": "朋友说你忙完才想起对方，而你觉得已经尽力。",
      "options": [
        {
          "label": "先听具体失落，再排一次共同时间",
          "stats": {
            "empathy": 5,
            "planning": 2
          }
        },
        {
          "label": "坦诚解释余力，不许无法兑现的愿",
          "stats": {
            "negotiation": 4,
            "eq": 3
          }
        }
      ],
      "minMonth": 5,
      "cooldown": 16
    },
    {
      "id": "v2_friend_not_tool",
      "title": "不是只有有事才联系",
      "text": "你打开聊天框准备请朋友帮忙，发现上次聊天也是请求。",
      "options": [
        {
          "label": "先关心对方近况，不急着开口",
          "stats": {
            "empathy": 4,
            "eq": 3
          }
        },
        {
          "label": "自己承担任务，约一次单纯见面",
          "stats": {
            "resilience": 3,
            "teamwork": 3
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 16
    },
    {
      "id": "v2_stage_credit",
      "title": "节目单漏了幕后人员",
      "text": "演出成功，节目单却只印了台前名字。",
      "options": [
        {
          "label": "补充所有贡献者并公开致谢",
          "stats": {
            "leadership": 4,
            "law": 3
          }
        },
        {
          "label": "整理完整制作记录交给团队",
          "stats": {
            "writing": 3,
            "teamwork": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "performance": 15
      }
    },
    {
      "id": "v2_performance_pause",
      "title": "掌声之外的休息",
      "text": "连续排练让你的状态下降，但停一下会让你有罪恶感。",
      "options": [
        {
          "label": "与团队安排轮替和恢复",
          "stats": {
            "planning": 4,
            "health": 3
          }
        },
        {
          "label": "把重点缩到一段最需要练的内容",
          "stats": {
            "performance": 3,
            "stress": -5
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_interview_withdraw",
      "title": "受访者撤回了同意",
      "text": "片子快剪完，对方说有些内容不希望公开。",
      "options": [
        {
          "label": "尊重撤回，重新组织结构",
          "stats": {
            "media": 5,
            "empathy": 3
          }
        },
        {
          "label": "询问允许范围，不施加压力",
          "stats": {
            "negotiation": 4,
            "law": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "photography": 15
      }
    },
    {
      "id": "v2_misleading_title",
      "title": "这标题一定有流量",
      "text": "朋友帮你起了一个夸张标题，但内容并不支持那个判断。",
      "options": [
        {
          "label": "改成准确标题，解释证据",
          "stats": {
            "media": 5,
            "writing": 3
          }
        },
        {
          "label": "把标题留作问题而非结论",
          "stats": {
            "writing": 4,
            "data": 2
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_public_correction",
      "title": "错误被别人指出",
      "text": "一篇文章的数据引用错了，你担心更正影响声誉。",
      "options": [
        {
          "label": "显著更正并标注时间与原因",
          "stats": {
            "media": 5,
            "resilience": 3
          }
        },
        {
          "label": "联系被影响的人说明并修订",
          "stats": {
            "law": 3,
            "empathy": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_heritage_owner",
      "title": "谁有权讲这个故事",
      "text": "你想把社区故事做成作品，却发现参与者对呈现有不同想法。",
      "options": [
        {
          "label": "让讲述者参与审阅",
          "stats": {
            "history": 4,
            "empathy": 4
          }
        },
        {
          "label": "保留多种声音与清楚出处",
          "stats": {
            "writing": 4,
            "law": 3
          }
        }
      ],
      "minMonth": 7,
      "cooldown": 16
    },
    {
      "id": "v2_green_baseline",
      "title": "环保提案缺了一个数字",
      "text": "大家都说改造有效，却没有留下改造前的记录。",
      "options": [
        {
          "label": "补做基线，暂不宣称效果",
          "stats": {
            "ecology": 4,
            "data": 4
          }
        },
        {
          "label": "缩成一个可比较的小试点",
          "stats": {
            "innovation": 3,
            "planning": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_rain_cancel",
      "title": "计划遇上一场雨",
      "text": "户外调查当天遇到大雨。继续出行可能没有好数据。",
      "options": [
        {
          "label": "改做资料整理和安全检查",
          "stats": {
            "planning": 4,
            "research": 2
          }
        },
        {
          "label": "通知参与者延期，不冒险赶进度",
          "stats": {
            "leadership": 3,
            "health": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_green_cost",
      "title": "可持续也要考虑成本",
      "text": "环保替代品更贵，有同学难以承担。",
      "options": [
        {
          "label": "比较全周期成本和可负担方案",
          "stats": {
            "finance": 4,
            "ecology": 4
          }
        },
        {
          "label": "让受影响的人参与选择",
          "stats": {
            "empathy": 4,
            "negotiation": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_language_silence",
      "title": "语言角里安静的同学",
      "text": "一个同学一直不说话，旁人想替他回答所有问题。",
      "options": [
        {
          "label": "给等待时间，询问他想怎样参与",
          "stats": {
            "empathy": 4,
            "language": 3
          }
        },
        {
          "label": "改成结对交流，降低开口压力",
          "stats": {
            "pedagogy": 4,
            "teamwork": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_translation_context",
      "title": "有些词，不能直接翻译",
      "text": "交流作业里一个词翻得正确，却让读者误解了整个场景。",
      "options": [
        {
          "label": "补充语境与故事",
          "stats": {
            "language": 4,
            "history": 3
          }
        },
        {
          "label": "找不同背景的人共同审阅",
          "stats": {
            "teamwork": 4,
            "media": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_class_missed",
      "title": "学生没懂，不代表没听",
      "text": "试讲后测试结果不理想，你讲得很认真。",
      "options": [
        {
          "label": "检查例子与学习目标是否匹配",
          "stats": {
            "pedagogy": 5,
            "data": 3
          }
        },
        {
          "label": "请学习者说出真正卡住的地方",
          "stats": {
            "empathy": 4,
            "knowledge": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16,
      "req": {
        "pedagogy": 15
      }
    },
    {
      "id": "v2_handover_teacher",
      "title": "你离开后，谁继续上课",
      "text": "公益课程受到欢迎，但目前只有你会使用材料。",
      "options": [
        {
          "label": "整理课程包并培训接手者",
          "stats": {
            "pedagogy": 4,
            "planning": 4
          }
        },
        {
          "label": "邀请当地伙伴共同修改课程",
          "stats": {
            "service": 4,
            "teamwork": 3
          }
        }
      ],
      "minMonth": 13,
      "cooldown": 16
    },
    {
      "id": "v2_fair_hearing",
      "title": "安静一方还没说完",
      "text": "模拟协商中，声音大的参与者不断占据时间。",
      "options": [
        {
          "label": "按规则分配相等陈述时间",
          "stats": {
            "law": 5,
            "leadership": 2
          }
        },
        {
          "label": "逐方复述意见并确认准确性",
          "stats": {
            "negotiation": 4,
            "empathy": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_procedure_friend",
      "title": "熟人的方便",
      "text": "朋友希望你跳过某个公开报名步骤替他留位。",
      "options": [
        {
          "label": "按统一规则处理并说明原因",
          "stats": {
            "law": 5,
            "resilience": 2
          }
        },
        {
          "label": "提供公开可用的报名信息",
          "stats": {
            "service": 3,
            "eq": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_food_budget",
      "title": "一顿饭的预算",
      "text": "聚餐点菜时有人一直说都可以，却悄悄查看余额。",
      "options": [
        {
          "label": "先确认预算，再一起选菜",
          "stats": {
            "finance": 3,
            "empathy": 4
          }
        },
        {
          "label": "提议一次自愿参与的平价聚餐",
          "stats": {
            "cooking": 4,
            "planning": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_allergy_note",
      "title": "配方之外的细节",
      "text": "准备公共餐食时，有人提醒可能存在食物过敏。",
      "options": [
        {
          "label": "清楚标注原料，保留选择权",
          "stats": {
            "cooking": 4,
            "law": 3
          }
        },
        {
          "label": "先询问需求，准备独立替代餐",
          "stats": {
            "empathy": 4,
            "planning": 3
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_family_distance",
      "title": "家里的电话",
      "text": "家人希望你早点确定未来，你其实还没想清。",
      "options": [
        {
          "label": "具体分享已尝试与下一步",
          "stats": {
            "writing": 3,
            "eq": 3,
            "planning": 2
          }
        },
        {
          "label": "坦诚说需要时间，约定再沟通",
          "stats": {
            "negotiation": 4,
            "stress": -4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_burnout_signal",
      "title": "清单越长，完成越少",
      "text": "你发现自己每天在换目标，却很少真正做完一件事。",
      "options": [
        {
          "label": "删掉次要目标，留出恢复时间",
          "stats": {
            "planning": 5,
            "stress": -6
          }
        },
        {
          "label": "请朋友帮忙看一遍现实日程",
          "stats": {
            "teamwork": 3,
            "resilience": 4
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_comparison",
      "title": "朋友圈里的成功合集",
      "text": "别人发布录取、实习和旅行，你忽然觉得自己一无是处。",
      "options": [
        {
          "label": "回看自己的真实进步与成本",
          "stats": {
            "resilience": 5,
            "mood": 3
          }
        },
        {
          "label": "暂时放下比较，完成眼前小事",
          "stats": {
            "discipline": 3,
            "stress": -6
          }
        }
      ],
      "minMonth": 1,
      "cooldown": 16
    },
    {
      "id": "v2_project_fork",
      "title": "继续，还是体面结束",
      "text": "一个项目投入很多，却一直没有真实进展。",
      "options": [
        {
          "label": "复盘证据，缩小范围再试一次",
          "stats": {
            "innovation": 4,
            "resilience": 3
          }
        },
        {
          "label": "记录经验，主动结束不可行部分",
          "stats": {
            "planning": 4,
            "finance": 3
          }
        }
      ],
      "minMonth": 13,
      "cooldown": 16
    },
    {
      "id": "v2_graduation_handover",
      "title": "交接不是发一个压缩包",
      "text": "临近毕业，社团新成员不知道文件夹里哪个版本能用。",
      "options": [
        {
          "label": "整理入口、操作步骤与已知问题",
          "stats": {
            "planning": 4,
            "pedagogy": 4
          }
        },
        {
          "label": "约一次现场演示，让对方独立操作",
          "stats": {
            "teamwork": 4,
            "leadership": 3
          }
        }
      ],
      "minMonth": 37,
      "cooldown": 16,
      "once": true
    },
    {
      "id": "v2_after_failure",
      "title": "那封没有录取的邮件",
      "text": "一次申请没有通过。你一时不想打开任何人的消息。",
      "options": [
        {
          "label": "允许自己难过，再列可行选择",
          "stats": {
            "resilience": 5,
            "mood": 3
          }
        },
        {
          "label": "向信任的朋友说出需要的支持",
          "stats": {
            "empathy": 4,
            "eq": 3
          }
        }
      ],
      "minMonth": 30,
      "cooldown": 16,
      "once": true
    },
    {
      "id": "shu_calendar_arrival",
      "title": "新学期，先找到入口",
      "text": "把通知来源核对清楚，再和同行的同学讨论新的计划。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 9,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "planning": 2,
            "eq": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_reading",
      "title": "一起把书读厚一点",
      "text": "这次阅读遇到一个解释不通的地方，你决定把它留在讨论中。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 10,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "research": 2,
            "writing": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_flowers",
      "title": "秋日菊文化记录",
      "text": "游戏里的校园秋季活动开始了。你可以帮忙布展，也可以留下不打扰植物的观察。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 11,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "ecology": 2,
            "art": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_review",
      "title": "期末之前，先整理问题",
      "text": "你发现同学问的问题，正好是自己跳过的那一步。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 12,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "knowledge": 2,
            "teamwork": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_handoff",
      "title": "收尾不等于消失",
      "text": "假期前把材料、约定和待办交代清楚，比一句“年后再说”更轻松。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 1,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "planning": 2,
            "stress": -2
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_budget",
      "title": "让生活有一点余量",
      "text": "你重新看看这个月的计划，决定留出一笔钱和一点不安排的时间。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 2,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "finance": 2,
            "mood": 2
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_stage",
      "title": "春天的舞台协作",
      "text": "游戏中的演出需要有人练习，也需要有人照看幕后和观众。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 3,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "performance": 2,
            "teamwork": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_library",
      "title": "读书与分享的春日",
      "text": "一份阅读笔记可以变成报告、作品，也可以只是一次有意思的聊天。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 4,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "writing": 2,
            "eq": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_joint",
      "title": "不同专业，同一个问题",
      "text": "当不同专业的词汇撞在一起，你们决定先画清楚真正的问题。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 5,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "innovation": 2,
            "teamwork": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_memory",
      "title": "把校园故事写下来",
      "text": "采集故事之前，你们先问对方愿意留下什么、愿意怎样被呈现。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 6,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "history": 2,
            "media": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_practice",
      "title": "夏季实践，走进具体生活",
      "text": "这次实践不以去了多远计分，而是看你是否听懂对方的需要。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 7,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "service": 2,
            "explore": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_calendar_return",
      "title": "把经历带回上大",
      "text": "暑期快结束了。你把有用的经验整理成别人也能接着使用的材料。（游戏活动，不代表现实当年安排。）",
      "calendarMonth": 8,
      "minMonth": 1,
      "cooldown": 0,
      "options": [
        {
          "label": "和同伴一起把这一步做好",
          "stats": {
            "planning": 2,
            "resilience": 1
          }
        },
        {
          "label": "留下一份自己的记录",
          "stats": {
            "writing": 1,
            "planning": 1
          }
        },
        {
          "label": "这次先休息，按自己的节奏来",
          "stats": {
            "mood": 2,
            "stress": -2
          }
        }
      ]
    },
    {
      "id": "shu_reserved",
      "title": "研讨室的预约",
      "text": "想讨论的时间已经有人预约。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "换一个空闲时段，提前确认",
          "stats": {
            "planning": 2,
            "eq": 1
          }
        },
        {
          "label": "改成在线文档协作",
          "stats": {
            "teamwork": 2,
            "media": 1
          }
        },
        {
          "label": "今天先各自阅读",
          "stats": {
            "knowledge": 2,
            "stress": -1
          }
        }
      ]
    },
    {
      "id": "shu_borrow",
      "title": "书在另一个校区",
      "text": "检索发现所需图书不在眼前这个馆。先核对馆藏与借阅服务，再决定下一步。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "查询可用的预约／委托服务",
          "stats": {
            "media": 2,
            "planning": 1
          }
        },
        {
          "label": "找同主题的可用资料",
          "stats": {
            "research": 2
          }
        },
        {
          "label": "记下需求，调整阅读顺序",
          "stats": {
            "planning": 2,
            "stress": -1
          }
        }
      ]
    },
    {
      "id": "shu_permissions",
      "title": "展览之前，先问一句",
      "text": "一份很适合展出的采访还没有取得公开授权。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "联系对方确认使用范围",
          "stats": {
            "media": 3,
            "law": 1
          }
        },
        {
          "label": "换成已获授权的材料",
          "stats": {
            "planning": 2
          }
        },
        {
          "label": "保留空白，说明暂未公开",
          "stats": {
            "empathy": 2,
            "writing": 1
          }
        }
      ]
    },
    {
      "id": "shu_travel",
      "title": "不是每件事都必须跨校区",
      "text": "几项活动挤在同一天，你开始怀疑奔波是不是比交流还多。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "把同校区安排放在一起",
          "stats": {
            "planning": 3
          }
        },
        {
          "label": "保留最重要的一次交流",
          "stats": {
            "stress": -3,
            "mood": 1
          }
        },
        {
          "label": "邀请伙伴一起调整时间",
          "stats": {
            "teamwork": 2,
            "eq": 1
          }
        }
      ]
    },
    {
      "id": "shu_source",
      "title": "旧通知被重新转发",
      "text": "群里传来一张没有日期的通知截图。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "找到官网原文与日期",
          "stats": {
            "media": 3
          }
        },
        {
          "label": "提醒大家不要急着传播",
          "stats": {
            "law": 1,
            "eq": 1
          }
        },
        {
          "label": "向发布方核验再整理摘要",
          "stats": {
            "writing": 2,
            "planning": 1
          }
        }
      ]
    },
    {
      "id": "shu_caption",
      "title": "字幕里漏掉的声音",
      "text": "短片字幕只记了对白，却漏掉影响理解的环境声音。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "重新检查必要声音信息",
          "stats": {
            "design": 3,
            "media": 1
          }
        },
        {
          "label": "请不同观众试着观看",
          "stats": {
            "empathy": 2,
            "teamwork": 1
          }
        },
        {
          "label": "标记待改处，按计划补齐",
          "stats": {
            "planning": 2,
            "art": 1
          }
        }
      ]
    },
    {
      "id": "shu_credit",
      "title": "谁的名字应该写在上面",
      "text": "作品完成时，你发现幕后同学没有出现在署名中。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "按实际贡献补上署名",
          "stats": {
            "law": 2,
            "teamwork": 1
          }
        },
        {
          "label": "一起确认贡献和公开意愿",
          "stats": {
            "empathy": 2,
            "leadership": 1
          }
        },
        {
          "label": "修正后给团队一份完整记录",
          "stats": {
            "writing": 2,
            "planning": 1
          }
        }
      ]
    },
    {
      "id": "shu_nextclass",
      "title": "下一届问起了你的经验",
      "text": "新同学问你该选什么路线。你知道没有一种四年适合所有人。",
      "minMonth": 1,
      "cooldown": 12,
      "options": [
        {
          "label": "讲自己的取舍，不替对方决定",
          "stats": {
            "pedagogy": 2,
            "eq": 1
          }
        },
        {
          "label": "给出核实信息的方法",
          "stats": {
            "media": 2,
            "service": 1
          }
        },
        {
          "label": "先听听对方在意什么",
          "stats": {
            "empathy": 3
          }
        }
      ]
    }
  ],
  "ENDINGS": [
    {
      "id": "baoyan_top",
      "title": "把好奇心带进顶尖实验室",
      "route": "baoyan",
      "tier": "S",
      "hint": "顶尖推免录取、科研≥75、论文≥1",
      "story": "研究不再只是履历上的一行字。你带着问题走进新的实验室，也带着四年里学会的诚实与耐心。"
    },
    {
      "id": "baoyan_regular",
      "title": "推免，是新的起点",
      "route": "baoyan",
      "tier": "A",
      "hint": "获得推免录取并完成毕业要求",
      "story": "那些认真上过的课、修改过的方案，终于汇成一封邀请函。新的旅程并不意味着答案已经写好。"
    },
    {
      "id": "kaoyan_top",
      "title": "逆风翻页，顶尖上岸",
      "route": "kaoyan",
      "tier": "S",
      "hint": "考研顶尖档录取并完成毕业要求",
      "story": "你知道那封录取通知的重量：不是一夜逆袭，而是一次次愿意把不会的题重新做完。"
    },
    {
      "id": "kaoyan_up",
      "title": "下一站，更辽阔",
      "route": "kaoyan",
      "tier": "A",
      "hint": "考研成功录取",
      "story": "你从出发的地方走到了新的校园。起点没有消失，但它不再替你定义终点。"
    },
    {
      "id": "kaoyan_again",
      "title": "再战不是句号",
      "route": "kaoyan",
      "tier": "B",
      "hint": "参加考研但未录取，备考≥45",
      "story": "结果没有如愿，努力也没有归零。你决定在了解成本和退路之后，再做一次自己的选择。"
    },
    {
      "id": "startup_legend",
      "title": "从寝室走出的新公司",
      "route": "startup",
      "tier": "S",
      "hint": "商业≥85、产品≥2、融资支持≥1、现金≥3000、至少3个盈利月",
      "story": "最初那个被说“已经有人做过”的想法，因为你的认真交付长成了一间真正服务用户的小公司。"
    },
    {
      "id": "startup_studio",
      "title": "我们的第一间工作室",
      "route": "startup",
      "tier": "A",
      "hint": "商业≥65、完成产品、现金≥1200",
      "story": "没有一夜暴富的神话。你有真实的产品、愿意继续合作的人，以及可以算清的下一步。"
    },
    {
      "id": "love_lifetime",
      "title": "四年之后，依然是你",
      "route": "love",
      "tier": "S",
      "hint": "恋爱≥12个月、好感≥90、信任≥85、共同回忆≥8",
      "story": "你们不是彼此的毕业奖励，而是两个不断长大、仍愿意认真选择对方的人。"
    },
    {
      "id": "love_story",
      "title": "双向奔赴的校园恋人",
      "route": "love",
      "tier": "A",
      "hint": "拥有伴侣，好感≥70、信任≥60",
      "story": "一起走过的路、说清的误会、认真听完的心事，让大学不只剩下成绩和去向。"
    },
    {
      "id": "richlove",
      "title": "富婆／富哥，也为真心心动",
      "route": "richlove",
      "tier": "S",
      "hint": "与富有校友恋爱≥10月，好感≥90、信任≥85，商业≥50或技能≥60",
      "story": "室友开玩笑说你少走四十年。你笑着把自己的计划拿给对方看：一起生活，但谁都不必缩小自己。"
    },
    {
      "id": "job_top",
      "title": "把作品递给未来",
      "route": "career",
      "tier": "S",
      "hint": "技能≥80、作品集≥1、实习≥4、接受职场录用",
      "story": "你的面试没有只讲“我愿意学”，而是打开了一件件真实做完的作品。第一份录用，是新的练习场。"
    },
    {
      "id": "freelancer",
      "title": "自由不是不用负责",
      "route": "freelance",
      "tier": "S",
      "hint": "接单≥6、技能≥65、创作≥45、独立作品或作品集",
      "story": "你拥有了安排时间的自由，也愿意承担报价、沟通、交付和空窗期的责任。日历终于有了自己的形状。"
    },
    {
      "id": "civil_servant",
      "title": "把理想落在具体的岗位",
      "route": "civil",
      "tier": "S",
      "hint": "公共事务≥75，获得公共岗位录用",
      "story": "你走进一个具体的岗位，面对具体的人和问题。所谓意义，开始藏进一件件被认真处理的小事里。"
    },
    {
      "id": "creator_star",
      "title": "名字出现在片尾",
      "route": "creator",
      "tier": "S",
      "hint": "创作≥85、影响力≥75、原创作品≥2或独立游戏≥1",
      "story": "作品没有替你说尽一切，却替你遇见了很多愿意听的人。下一页，还可以继续写。"
    },
    {
      "id": "creator_indie",
      "title": "原创的小小宇宙",
      "route": "creator",
      "tier": "A",
      "hint": "创作≥65，完成原创作品或独立游戏",
      "story": "你没有等到所有条件都完美才开始。那个小而完整的作品，成了你能继续相信自己的理由。"
    },
    {
      "id": "esports_champion",
      "title": "不只会赢，也会复盘",
      "route": "esports",
      "tier": "S",
      "hint": "电竞≥85，电竞奖牌≥1、组建战队、自律≥55",
      "story": "你终于穿上战队队服。被看见的是操作，托住操作的却是计划、沟通与输过以后愿意复盘的耐心。"
    },
    {
      "id": "sports_athlete",
      "title": "跑过属于自己的终点",
      "route": "sport",
      "tier": "S",
      "hint": "运动≥85，运动奖牌或半马项目，健康≥65",
      "story": "你没有把自己跑成别人。终点线后，你最熟悉的依然是那种认真完成训练的踏实。"
    },
    {
      "id": "volunteer_light",
      "title": "微光，也能照见远处",
      "route": "service",
      "tier": "S",
      "hint": "公益≥85、长期公益项目≥1、情商≥60",
      "story": "你留下的不是一组漂亮的照片，而是一件即使你离开也有人能继续做下去的事。"
    },
    {
      "id": "traveler",
      "title": "世界地图上的手写字",
      "route": "travel",
      "tier": "S",
      "hint": "阅历≥85、旅行记忆≥6、远行项目≥1",
      "story": "你没有把世界变成收集清单。每个地方都留下了具体的人、问题与让你重新思考的瞬间。"
    },
    {
      "id": "overseas_scholar",
      "title": "去远方，把问题继续问完",
      "route": "overseas",
      "tier": "S",
      "hint": "获得海外申请录取、语言≥80",
      "story": "你带走的不只是行李，还有清楚表达、独立生活，以及承认自己仍有许多不知道的勇气。"
    },
    {
      "id": "craft_master",
      "title": "一身本领，就是底气",
      "route": "craft",
      "tier": "S",
      "hint": "技能≥85、自律≥65、专业认证≥1、作品集或技术改进项目",
      "story": "起点只是一张入场券。你交出的是能验证、能维护、能真正派上用场的本领。"
    },
    {
      "id": "bridge_rebirth",
      "title": "换一条跑道，继续向前",
      "route": "kaoyan",
      "tier": "A",
      "hint": "完成跨专业基础补强，获得考研或海外录取",
      "story": "你把原有积累带进新的学科。决定转向的时候，没有把之前的四年当成白走的路。"
    },
    {
      "id": "allrounder",
      "title": "不止一面，都很精彩",
      "route": "balanced",
      "tier": "S",
      "hint": "至少8种能力≥55、健康≥65、幸福感≥65，顺利毕业",
      "story": "你的四年没有被一个标签装下。认真、热爱、朋友、冒险和休息，在同一本手帐里互相成全。"
    },
    {
      "id": "steady_life",
      "title": "把普通日子过成喜欢的样子",
      "route": "balanced",
      "tier": "A",
      "hint": "健康≥70、幸福感≥75、体验≥18种行动，顺利毕业",
      "story": "没有宏大叙事，也没有必须证明的传奇。你有能力照顾自己，也愿意为喜欢的日常认真努力。"
    },
    {
      "id": "hometown",
      "title": "带着本领回到熟悉的地方",
      "route": "service",
      "tier": "S",
      "hint": "完成家乡项目、商业≥55、公益≥60",
      "story": "不是所有出发都为了永远离开。你把学来的东西放回熟悉的土地，开始一件小而真实的改变。"
    },
    {
      "id": "social_leader",
      "title": "我们都记得你",
      "route": "balanced",
      "tier": "A",
      "hint": "影响力≥80、情商≥75，完成校园节项目",
      "story": "你最好的作品，也许是把一群原本陌生的人变成了能一起做成事的伙伴。"
    },
    {
      "id": "teacher",
      "title": "后来，你也点亮一间教室",
      "route": "service",
      "tier": "A",
      "hint": "公益≥70、学业≥65、乡村课堂行动≥6",
      "story": "你终于明白，教学不只是把知识说出来，还要看见对面那个正在努力理解的人。"
    },
    {
      "id": "gapyear",
      "title": "认真准备的一次暂停",
      "route": "travel",
      "tier": "A",
      "hint": "阅历≥65、现金≥3000、自律≥50，未接受升学或职场录用",
      "story": "你不是什么都不做，而是给探索留出一段有预算、有期限、也有退出方案的时间。"
    },
    {
      "id": "late_bloom",
      "title": "花会晚开，但不会因此无效",
      "route": "balanced",
      "tier": "B",
      "hint": "毕业要求尚未完成",
      "story": "学分或毕业设计还有缺口。故事没有被取消，只是下一阶段需要先把这些具体的问题补完。"
    },
    {
      "id": "reset",
      "title": "把自己找回来",
      "route": "balanced",
      "tier": "B",
      "hint": "健康过低或压力长期累积，尚未建立成熟方向",
      "story": "你开始承认透支不是勇敢。比一个看起来漂亮的结局更重要的，是愿意重新照顾自己。"
    },
    {
      "id": "gaming_drift",
      "title": "存档之外，还要有生活",
      "route": "esports",
      "tier": "C",
      "hint": "通宵行动≥18，缺少成熟路线",
      "story": "你记得很多战绩，却差点忘了这四年也可以有别的风景。下一次开局，或许能把热爱和生活一起安排好。"
    },
    {
      "id": "ordinary",
      "title": "毕业了，故事还在继续",
      "route": "balanced",
      "tier": "B",
      "hint": "完成毕业要求，尚未满足其他专长结局",
      "story": "你交回钥匙，背包比来时轻了一点。四年并不负责给人生定型，它只是教你怎样开始下一段。"
    },
    {
      "id": "data_s",
      "title": "让数据能被复查",
      "route": "data",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你的工具没有替所有人回答问题，却让别人能看清答案怎样得来。"
    },
    {
      "id": "data_a",
      "title": "有人持续维护的小工具",
      "route": "data",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "第一次收到真实的使用反馈，你发现维护比发布更需要耐心。"
    },
    {
      "id": "materials_s",
      "title": "把失败写进成果的人",
      "route": "materials",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "实验没有总是如愿。你把边界和失败一起交出去，留下了可被继续使用的知识。"
    },
    {
      "id": "materials_a",
      "title": "实验台上的第一份档案",
      "route": "materials",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "这一份记录不够惊艳，却足够可靠。新的研究从这里接上。"
    },
    {
      "id": "robotics_s",
      "title": "让接口真正连起来",
      "route": "robotics",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "机器走起来的那天，每个队友都知道自己完成了什么。你的作品，也是你们的合作方式。"
    },
    {
      "id": "robotics_a",
      "title": "第一次稳定的演示",
      "route": "robotics",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "没有炫目的噱头，只有一次又一次能够重复的成功。"
    },
    {
      "id": "design_s",
      "title": "让更多人被设计看见",
      "route": "design",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "最有意义的反馈不是好看，而是有人说，终于能自己完成这件小事了。"
    },
    {
      "id": "design_a",
      "title": "把一个问题改好",
      "route": "design",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "你学会不再替使用者想象，而是让他们进入设计过程。"
    },
    {
      "id": "film_s",
      "title": "镜头后面的人",
      "route": "film",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "片尾滚过许多名字。你的作者意识里，终于有了倾听、授权与真实的分量。"
    },
    {
      "id": "film_a",
      "title": "完成第一次公映",
      "route": "film",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "灯亮时你仍然紧张，但那个未命名文件终于成了一部完整作品。"
    },
    {
      "id": "stage_s",
      "title": "掌声也属于幕后",
      "route": "stage",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "每一次准时亮起的灯，都有具体的人。你把他们写进了谢幕。"
    },
    {
      "id": "stage_a",
      "title": "今晚，准时开场",
      "route": "stage",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "你们没有等到所有条件完美，却一起把演出做完了。"
    },
    {
      "id": "journalism_s",
      "title": "把名字写在事实后面",
      "route": "journalism",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你的署名意味着核实、授权和出错后愿意更正，不只是写得动听。"
    },
    {
      "id": "journalism_a",
      "title": "第一篇负责任的专题",
      "route": "journalism",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "没有爆款的轰动，但有人被准确地理解了。"
    },
    {
      "id": "heritage_s",
      "title": "让记忆回到讲述者手中",
      "route": "heritage",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你没有把一个地方装进简单的故事。档案里保留了出处，也保留了分歧。"
    },
    {
      "id": "heritage_a",
      "title": "一座微型记忆馆",
      "route": "heritage",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "旧照片被妥善标注，新的问题还在等待后来的人。"
    },
    {
      "id": "green_s",
      "title": "下一届还在继续的绿色计划",
      "route": "green",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "当你离校，记录仍有人更新。比一次响亮的倡议更难的，是让改变持续。"
    },
    {
      "id": "green_a",
      "title": "从一个样点开始",
      "route": "green",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "你带走了宏大承诺，留下了清楚的基线和可执行的下一步。"
    },
    {
      "id": "diplomacy_s",
      "title": "跨越语言，仍然认真相处",
      "route": "diplomacy",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你们不是彼此的语言工具。不同的来处在共同完成的事情里被看见。"
    },
    {
      "id": "diplomacy_a",
      "title": "把陌生聊成理解",
      "route": "diplomacy",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "你不再假装听懂，也不再害怕说得缓慢。"
    },
    {
      "id": "education_s",
      "title": "你教会的，不只是一道题",
      "route": "education",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "课程被另一位老师接手时，你知道自己留下的是能继续使用的方法。"
    },
    {
      "id": "education_a",
      "title": "一间被认真准备的教室",
      "route": "education",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "你开始听见学习者真正卡住的地方，而不只是自己的讲稿。"
    },
    {
      "id": "mediation_s",
      "title": "给每一种声音留位置",
      "route": "mediation",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你没有成为替别人裁决一切的人。你学会让程序透明，让约定可以履行。"
    },
    {
      "id": "mediation_a",
      "title": "第一次平等的圆桌",
      "route": "mediation",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "安静的那个人终于说完了自己的话。改变先从这里发生。"
    },
    {
      "id": "campus_s",
      "title": "离开时，舞台仍会亮",
      "route": "campus",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "组织力不再等于你不能缺席。交接完成后，更多人有了自己登台的机会。"
    },
    {
      "id": "campus_a",
      "title": "属于我们的文化季",
      "route": "campus",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "散场以后留下的不只是照片，还有真的一起做过事的人。"
    },
    {
      "id": "socialbiz_s",
      "title": "把善意做成可持续的事",
      "route": "socialbiz",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45；还需至少3个盈利月",
      "story": "你学会不把热情当预算。服务能够继续，因为它有透明的账和可以接手的人。"
    },
    {
      "id": "socialbiz_a",
      "title": "小事业，第一位回头客",
      "route": "socialbiz",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "没有一夜成功，却有一个问题被稳定地回应了。"
    },
    {
      "id": "urban_s",
      "title": "城市里，多了一处可以停留",
      "route": "urban",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你们改造的角落很小。有人从此不必匆忙经过，或绕一个很大的圈。"
    },
    {
      "id": "urban_a",
      "title": "一张被核实过的地图",
      "route": "urban",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "路线背后是你走过的路、问过的人和愿意继续更新的承诺。"
    },
    {
      "id": "food_s",
      "title": "日常也有自己的作品",
      "route": "food",
      "tier": "S",
      "hint": "方向分≥80、核心能力≥80、对应项目≥1、该方向行动≥12次、次能力≥50、健康≥45",
      "story": "你把味道、预算和故事连在一起，学会照顾自己，也不抹去每个人的来处。"
    },
    {
      "id": "food_a",
      "title": "一份有温度的食物手册",
      "route": "food",
      "tier": "A",
      "hint": "方向分≥60、核心能力≥60、对应项目≥1、该方向行动≥6次",
      "story": "那些平凡的一餐，被认真记成了可以分享的方法。"
    },
    {
      "id": "shu_reader_a",
      "title": "把阅读变成问题",
      "route": "shu_reader",
      "tier": "A",
      "hint": "方向分达到60，完成对应项目1次并持续实践；以方向面板实时条件为准",
      "story": "四年后，跨馆阅读与知识策划不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。这不是终点，而是你真正愿意继续做的事情。"
    },
    {
      "id": "shu_reader_s",
      "title": "从书香谷走向更大的问题",
      "route": "shu_reader",
      "tier": "S",
      "hint": "方向分达到80，完成对应项目2次并持续实践；以方向面板实时条件为准",
      "story": "四年后，跨馆阅读与知识策划不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。留下可交接的材料，比一次热闹的结束更长久。"
    },
    {
      "id": "shu_collab_a",
      "title": "一个人做不完的作品",
      "route": "shu_collab",
      "tier": "A",
      "hint": "方向分达到60，完成对应项目1次并持续实践；以方向面板实时条件为准",
      "story": "四年后，跨专业协作与产品不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。这不是终点，而是你真正愿意继续做的事情。"
    },
    {
      "id": "shu_collab_s",
      "title": "让不同专业真正合作",
      "route": "shu_collab",
      "tier": "S",
      "hint": "方向分达到80，完成对应项目2次并持续实践；以方向面板实时条件为准",
      "story": "四年后，跨专业协作与产品不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。留下可交接的材料，比一次热闹的结束更长久。"
    },
    {
      "id": "shu_memory_a",
      "title": "为校园留一页记忆",
      "route": "shu_memory",
      "tier": "A",
      "hint": "方向分达到60，完成对应项目1次并持续实践；以方向面板实时条件为准",
      "story": "四年后，上大记忆与公共叙事不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。这不是终点，而是你真正愿意继续做的事情。"
    },
    {
      "id": "shu_memory_s",
      "title": "把没有被听见的故事留下",
      "route": "shu_memory",
      "tier": "S",
      "hint": "方向分达到80，完成对应项目2次并持续实践；以方向面板实时条件为准",
      "story": "四年后，上大记忆与公共叙事不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。留下可交接的材料，比一次热闹的结束更长久。"
    },
    {
      "id": "shu_inclusive_a",
      "title": "让更多人看见与参与",
      "route": "shu_inclusive",
      "tier": "A",
      "hint": "方向分达到60，完成对应项目1次并持续实践；以方向面板实时条件为准",
      "story": "四年后，友好校园与无障碍创作不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。这不是终点，而是你真正愿意继续做的事情。"
    },
    {
      "id": "shu_inclusive_s",
      "title": "每个人都能走进这场展",
      "route": "shu_inclusive",
      "tier": "S",
      "hint": "方向分达到80，完成对应项目2次并持续实践；以方向面板实时条件为准",
      "story": "四年后，友好校园与无障碍创作不再只是你点过的一组按钮。你在上海大学遇见同伴、完成作品，也学会把成果与生活放在一起。留下可交接的材料，比一次热闹的结束更长久。"
    }
  ],
  "PLACES": [
    "宝山校区清晨的树影",
    "钱伟长图书馆外的晚霞",
    "书香谷的一页批注",
    "校本部馆借书后的午后",
    "文荟馆的一次资料发现",
    "联合馆里的语言摘录",
    "宝山校园绿地的秋色",
    "伟长楼散场后的对话",
    "延长校区的创作草稿",
    "嘉定校区的一次漫步",
    "校史学习后留下的问题",
    "跨校区交流的共同便签",
    "上海雨后的一段步行",
    "校外社区里的志愿记录",
    "暑期实践的第一份访谈",
    "返乡路上的一次停留",
    "城市展览中看懂的细节",
    "徒步之后的复盘页",
    "和朋友交换的旅行计划",
    "公共空间的一张观察图",
    "放下手机看见的日落",
    "独自吃饭也自在的一天",
    "给未来同学写的一条提醒",
    "四年后仍然想再走的路"
  ],
  "LOCATIONS": [
    {
      "id": "dorm",
      "name": "宿舍与生活区",
      "icon": "home",
      "campus": "baoshan",
      "x": 12,
      "y": 20,
      "text": "照顾作息，协商共享空间，留一点自己的时间。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "gift",
        "game",
        "nightgame",
        "review",
        "style",
        "rest",
        "home",
        "roommeeting",
        "weekreview",
        "campusbudget"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "library",
      "name": "钱伟长图书馆",
      "icon": "book",
      "campus": "baoshan",
      "x": 31,
      "y": 20,
      "text": "真实馆名；研读与研讨玩法是虚构化设计。",
      "actions": [
        "library",
        "studygroup",
        "exam",
        "qwcread"
      ],
      "sourceIds": [
        "shu-library"
      ]
    },
    {
      "id": "lab",
      "name": "上大学生科研空间",
      "icon": "flask",
      "campus": "baoshan",
      "x": 50,
      "y": 20,
      "text": "从失败记录到复现，让研究有下一步。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "seminar",
        "research",
        "datawork",
        "material",
        "reproduce",
        "summerlab",
        "jointseminar"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "classroom",
      "name": "上大课堂",
      "icon": "book",
      "campus": "baoshan",
      "x": 69,
      "y": 20,
      "text": "选课、试讲与答辩，把知识讲清楚。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "lecture",
        "logic",
        "remedial",
        "peerteach",
        "oraldefense",
        "interdiscipline",
        "teachingdesign"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "garden",
      "name": "宝山校园绿地",
      "icon": "leaf",
      "campus": "baoshan",
      "x": 88,
      "y": 20,
      "text": "菊文化节传统启发的虚构校园花园。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "hangout",
        "listen",
        "confess",
        "breakup",
        "repairtalk",
        "jufestival",
        "ecoaudit",
        "mindful",
        "flowerrecord"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "track",
      "name": "操场与跑道",
      "icon": "run",
      "campus": "baoshan",
      "x": 12,
      "y": 40,
      "text": "有目标地训练，也尊重恢复与队友节奏。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "run",
        "gym",
        "sportmatch",
        "runningclub"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "club",
      "name": "上大学生社团活动空间",
      "icon": "flag",
      "campus": "baoshan",
      "x": 31,
      "y": 40,
      "text": "贡献、分工与交接，让社团不是一个标签。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "club",
        "train",
        "esport",
        "cluboffice",
        "partnerproject",
        "peerhandoff"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "hub",
      "name": "上大创新创业实践空间",
      "icon": "briefcase",
      "campus": "baoshan",
      "x": 50,
      "y": 40,
      "text": "虚构孵化空间；访谈、预算、原型与现金流。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "network",
        "intern",
        "product",
        "pitch",
        "freelance",
        "alumnitable",
        "budgetlab",
        "markettest",
        "clienttalk",
        "incubation",
        "openprototype"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "maker",
      "name": "上大学生工程实践空间",
      "icon": "tools",
      "campus": "baoshan",
      "x": 69,
      "y": 40,
      "text": "明确接口，先做能运行的小系统。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "code",
        "workshop",
        "certificate",
        "project",
        "opensource",
        "robotbuild",
        "prototype",
        "gamecraft",
        "repaircafe"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "international",
      "name": "上大跨文化交流空间",
      "icon": "globe",
      "campus": "baoshan",
      "x": 88,
      "y": 40,
      "text": "语言交流与理解，不把朋友当练习工具。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "language",
        "languagepair"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "film",
      "name": "延长校区影像实践",
      "icon": "camera",
      "campus": "yanchang",
      "x": 12,
      "y": 60,
      "text": "延长校区为真实地名，工坊与剧情为原创虚构。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "vlog",
        "filmcrew"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "theatre",
      "name": "伟长楼剧场",
      "icon": "music",
      "campus": "baoshan",
      "x": 31,
      "y": 60,
      "text": "真实剧场曾承载公开音乐活动；本作节目与角色虚构。",
      "actions": [
        "music",
        "stageplay",
        "chorus",
        "springconcert",
        "stagecrew"
      ],
      "sourceIds": [
        "shu-music"
      ]
    },
    {
      "id": "designlab",
      "name": "延长校区设计实践",
      "icon": "pen",
      "campus": "yanchang",
      "x": 50,
      "y": 60,
      "text": "让反馈改变作品，而不仅仅装饰作品。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "portfolio",
        "uxlab",
        "captionlab"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "gallery",
      "name": "延长校区作品展示",
      "icon": "pen",
      "campus": "yanchang",
      "x": 69,
      "y": 60,
      "text": "把作品、背景与人的观看方式放在一起。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "exhibition",
        "curation"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "newsroom",
      "name": "上大学生写作与编辑",
      "icon": "pen",
      "campus": "baoshan",
      "x": 88,
      "y": 60,
      "text": "没有真实学校媒体授权，所有文章与情节均虚构。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "write",
        "editing",
        "factcheck"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "forum",
      "name": "上大学生议题讨论",
      "icon": "building",
      "campus": "baoshan",
      "x": 12,
      "y": 80,
      "text": "使用虚构案例训练公平程序，不构成法律服务。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "debate",
        "policy",
        "debatejudge",
        "legalclinic"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "heritage",
      "name": "嘉定校区人文观察",
      "icon": "building",
      "campus": "jiading",
      "x": 31,
      "y": 80,
      "text": "嘉定校区为真实地名，观察任务与档案虚构。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "museum",
        "jiadingwalk",
        "archivewalk"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "community",
      "name": "社区共创点",
      "icon": "leaf",
      "campus": "city",
      "x": 50,
      "y": 80,
      "text": "事先沟通与授权，事后交接与持续维护。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "tutor",
        "interview",
        "volunteer",
        "teach",
        "communitywalk",
        "documentary",
        "oralhistory",
        "publicspace",
        "volunteermap",
        "summerpractice"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "kitchen",
      "name": "校外合规共享厨房",
      "icon": "home",
      "campus": "city",
      "x": 69,
      "y": 80,
      "text": "仅在允许的公共厨房做饭，宿舍不使用违禁电器。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "parttime",
        "cook",
        "mealplan",
        "foodstory"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "city",
      "name": "城市漫步集合点",
      "icon": "compass",
      "campus": "city",
      "x": 88,
      "y": 80,
      "text": "示意性的观察地图，不提供实际通勤路线。（游戏功能分区，不是官方场馆名称或位置标注。）",
      "actions": [
        "date",
        "hike",
        "travel",
        "soundwalk",
        "campuswalk"
      ],
      "sourceIds": [
        "shu-campus"
      ]
    },
    {
      "id": "mainlib",
      "name": "校本部图书馆",
      "campus": "baoshan",
      "icon": "book",
      "text": "查找基础文献，把摘录连成问题。",
      "sourceIds": [
        "shu-mainlib"
      ],
      "actions": [
        "libraryresearch"
      ],
      "x": 12,
      "y": 20
    },
    {
      "id": "wenhui",
      "name": "文荟图书馆",
      "campus": "yanchang",
      "icon": "book",
      "text": "在人文、影视与艺术资料中寻找论证和创作线索。",
      "sourceIds": [
        "shu-wenhui"
      ],
      "actions": [
        "wenhuistudy"
      ],
      "x": 47,
      "y": 20
    },
    {
      "id": "unionlib",
      "name": "联合图书馆",
      "campus": "jiading",
      "icon": "book",
      "text": "把语言学习、资料检索与校区观察放进同一次安排。",
      "sourceIds": [
        "shu-unionlib"
      ],
      "actions": [
        "unionstudy",
        "crosscampus"
      ],
      "x": 82,
      "y": 20
    },
    {
      "id": "historyhall",
      "name": "钱伟长纪念馆与校史学习",
      "campus": "baoshan",
      "icon": "building",
      "text": "以校史与科学精神学习为线索；参访安排是游戏抽象。",
      "sourceIds": [
        "shu-history"
      ],
      "actions": [
        "historyvisit",
        "graduationwalk"
      ],
      "x": 12,
      "y": 65
    },
    {
      "id": "bookvalley",
      "name": "钱伟长馆·书香谷",
      "campus": "baoshan",
      "icon": "chat",
      "text": "一个主题、几位读者，留下可检验的阅读记录。",
      "sourceIds": [
        "shu-library"
      ],
      "actions": [
        "bookcircle"
      ],
      "x": 47,
      "y": 65
    },
    {
      "id": "studentservice",
      "name": "校园服务与信息核验",
      "campus": "baoshan",
      "icon": "compass",
      "text": "熟悉办事入口，先核验再转发。这是功能入口，不是指定建筑。",
      "sourceIds": [
        "shu-life"
      ],
      "actions": [
        "servicecheck"
      ],
      "x": 82,
      "y": 65
    }
  ],
  "CLUBS": [
    {
      "id": "science",
      "name": "研究与复现社",
      "icon": "flask",
      "tags": [
        "study",
        "data"
      ],
      "stat": "research",
      "text": "研讨、复现和开源记录。"
    },
    {
      "id": "maker",
      "name": "工程创客社",
      "icon": "tools",
      "tags": [
        "tech",
        "engineering"
      ],
      "stat": "engineering",
      "text": "让不同模块共同运行。"
    },
    {
      "id": "arts",
      "name": "影像与剧场社",
      "icon": "camera",
      "tags": [
        "film",
        "stage"
      ],
      "stat": "art",
      "text": "台前幕后都能被看见。"
    },
    {
      "id": "public",
      "name": "公共议题研习社",
      "icon": "building",
      "tags": [
        "public",
        "education"
      ],
      "stat": "law",
      "text": "程序、倾听与共同学习。"
    },
    {
      "id": "green",
      "name": "绿色校园小组",
      "icon": "leaf",
      "tags": [
        "eco",
        "practice"
      ],
      "stat": "ecology",
      "text": "能交接、能追踪的行动。"
    },
    {
      "id": "language",
      "name": "跨文化伙伴社",
      "icon": "globe",
      "tags": [
        "language",
        "humanity"
      ],
      "stat": "language",
      "text": "在差异中一起完成事情。"
    },
    {
      "id": "sport",
      "name": "运动与电竞协作社",
      "icon": "game",
      "tags": [
        "sport",
        "gaming"
      ],
      "stat": "teamwork",
      "text": "训练、复盘与长期健康。"
    },
    {
      "id": "design",
      "name": "设计与生活共创社",
      "icon": "pen",
      "tags": [
        "design",
        "wellbeing"
      ],
      "stat": "design",
      "text": "从身边一个真实问题开始。"
    }
  ],
  "COURSES": [
    {
      "id": "method",
      "name": "研究方法与复现",
      "tags": [
        "study",
        "data"
      ],
      "reward": {
        "research": 5,
        "data": 4
      },
      "text": "本学期完成4次研究/数据活动，获得一次结课成长。"
    },
    {
      "id": "engineering",
      "name": "工程设计导论",
      "tags": [
        "engineering",
        "tech"
      ],
      "reward": {
        "engineering": 5,
        "tech": 4
      },
      "text": "用4次工程/技术行动完成课堂作业。"
    },
    {
      "id": "media",
      "name": "影像与媒介伦理",
      "tags": [
        "film",
        "humanity"
      ],
      "reward": {
        "media": 5,
        "photography": 4
      },
      "text": "4次影像/人文行动，在表达中学会责任。"
    },
    {
      "id": "stage",
      "name": "舞台与协同制作",
      "tags": [
        "stage",
        "team"
      ],
      "reward": {
        "performance": 5,
        "teamwork": 4
      },
      "text": "4次排练/团队行动，理解舞台前后。"
    },
    {
      "id": "design",
      "name": "包容性设计",
      "tags": [
        "design",
        "public"
      ],
      "reward": {
        "design": 5,
        "empathy": 4
      },
      "text": "4次设计/公共行动，练习理解使用者。"
    },
    {
      "id": "business",
      "name": "创业财务基础",
      "tags": [
        "business",
        "career"
      ],
      "reward": {
        "finance": 5,
        "business": 4
      },
      "text": "4次商业/事业实践，区分利润与现金流。"
    },
    {
      "id": "localhistory",
      "name": "地方记忆与档案",
      "tags": [
        "humanity",
        "explore"
      ],
      "reward": {
        "history": 5,
        "writing": 4
      },
      "text": "4次人文/探索行动，学会保留出处。"
    },
    {
      "id": "education",
      "name": "教学设计与反馈",
      "tags": [
        "education",
        "study"
      ],
      "reward": {
        "pedagogy": 5,
        "knowledge": 4
      },
      "text": "4次教学/学习行动，检验是否真正理解。"
    },
    {
      "id": "law",
      "name": "公共协商与规则",
      "tags": [
        "public",
        "social"
      ],
      "reward": {
        "law": 5,
        "negotiation": 4
      },
      "text": "4次公共/社交行动，练习平等协商。"
    },
    {
      "id": "eco",
      "name": "可持续生活",
      "tags": [
        "eco",
        "practice"
      ],
      "reward": {
        "ecology": 5,
        "data": 4
      },
      "text": "4次生态/实践行动，观察可比较的变化。"
    },
    {
      "id": "wellbeing",
      "name": "生活与时间管理",
      "tags": [
        "wellbeing",
        "life"
      ],
      "reward": {
        "planning": 5,
        "cooking": 4
      },
      "text": "4次生活行动，练习照顾日常。"
    },
    {
      "id": "communication",
      "name": "跨文化表达",
      "tags": [
        "language",
        "social"
      ],
      "reward": {
        "language": 5,
        "empathy": 4
      },
      "text": "4次语言/社交行动，理解不熟悉的处境。"
    },
    {
      "id": "shulibrary",
      "name": "主题阅读与来源核验",
      "tags": [
        "library",
        "study"
      ],
      "reward": {
        "writing": 5,
        "research": 4
      },
      "text": "以4次阅读/学习行动完成专题，课程为游戏自拟，不是实际选课目录。"
    },
    {
      "id": "shuteam",
      "name": "跨专业协作实践",
      "tags": [
        "team",
        "tech"
      ],
      "reward": {
        "teamwork": 5,
        "innovation": 4
      },
      "text": "以4次协作/技术行动结课，把分工变成实际练习。"
    },
    {
      "id": "shumemory",
      "name": "校园记忆与叙事",
      "tags": [
        "history",
        "media"
      ],
      "reward": {
        "history": 5,
        "writing": 4
      },
      "text": "以4次历史/媒介行动结课，标清材料来源。"
    },
    {
      "id": "shuinclusive",
      "name": "友好设计与沟通",
      "tags": [
        "design",
        "social"
      ],
      "reward": {
        "design": 5,
        "empathy": 4
      },
      "text": "以4次设计/社交行动结课，练习让表达被更多人理解。"
    }
  ],
  "SKILL_NODES": [
    {
      "id": "study_1",
      "branch": "study",
      "branchName": "学习",
      "name": "间隔复习",
      "icon": "book",
      "stat": "knowledge",
      "req": 20,
      "cost": 1,
      "tags": [
        "study"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，学习相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "study_2",
      "branch": "study",
      "branchName": "学习",
      "name": "知识结构网",
      "icon": "book",
      "stat": "knowledge",
      "req": 50,
      "cost": 2,
      "tags": [
        "study"
      ],
      "boost": 0.22,
      "prerequisite": "study_1",
      "level": 2,
      "text": "装备后，学习相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "research_1",
      "branch": "research",
      "branchName": "科研",
      "name": "复现清单",
      "icon": "flask",
      "stat": "research",
      "req": 20,
      "cost": 1,
      "tags": [
        "data",
        "study"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，科研相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "research_2",
      "branch": "research",
      "branchName": "科研",
      "name": "证据闭环",
      "icon": "flask",
      "stat": "research",
      "req": 50,
      "cost": 2,
      "tags": [
        "data",
        "study"
      ],
      "boost": 0.22,
      "prerequisite": "research_1",
      "level": 2,
      "text": "装备后，科研相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "tech_1",
      "branch": "tech",
      "branchName": "技术",
      "name": "接口意识",
      "icon": "code",
      "stat": "tech",
      "req": 20,
      "cost": 1,
      "tags": [
        "tech"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，技术相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "tech_2",
      "branch": "tech",
      "branchName": "技术",
      "name": "可维护系统",
      "icon": "code",
      "stat": "tech",
      "req": 50,
      "cost": 2,
      "tags": [
        "tech"
      ],
      "boost": 0.22,
      "prerequisite": "tech_1",
      "level": 2,
      "text": "装备后，技术相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "engineering_1",
      "branch": "engineering",
      "branchName": "工程",
      "name": "最小联调",
      "icon": "tools",
      "stat": "engineering",
      "req": 20,
      "cost": 1,
      "tags": [
        "engineering"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，工程相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "engineering_2",
      "branch": "engineering",
      "branchName": "工程",
      "name": "系统可靠性",
      "icon": "tools",
      "stat": "engineering",
      "req": 50,
      "cost": 2,
      "tags": [
        "engineering"
      ],
      "boost": 0.22,
      "prerequisite": "engineering_1",
      "level": 2,
      "text": "装备后，工程相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "design_1",
      "branch": "design",
      "branchName": "设计",
      "name": "体验走查",
      "icon": "pen",
      "stat": "design",
      "req": 20,
      "cost": 1,
      "tags": [
        "design"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，设计相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "design_2",
      "branch": "design",
      "branchName": "设计",
      "name": "包容性原型",
      "icon": "pen",
      "stat": "design",
      "req": 50,
      "cost": 2,
      "tags": [
        "design"
      ],
      "boost": 0.22,
      "prerequisite": "design_1",
      "level": 2,
      "text": "装备后，设计相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "film_1",
      "branch": "film",
      "branchName": "影像",
      "name": "镜头笔记",
      "icon": "camera",
      "stat": "photography",
      "req": 20,
      "cost": 1,
      "tags": [
        "film"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，影像相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "film_2",
      "branch": "film",
      "branchName": "影像",
      "name": "叙事与授权",
      "icon": "camera",
      "stat": "photography",
      "req": 50,
      "cost": 2,
      "tags": [
        "film"
      ],
      "boost": 0.22,
      "prerequisite": "film_1",
      "level": 2,
      "text": "装备后，影像相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "stage_1",
      "branch": "stage",
      "branchName": "舞台",
      "name": "排练节拍",
      "icon": "music",
      "stat": "performance",
      "req": 20,
      "cost": 1,
      "tags": [
        "stage"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，舞台相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "stage_2",
      "branch": "stage",
      "branchName": "舞台",
      "name": "舞台统筹",
      "icon": "music",
      "stat": "performance",
      "req": 50,
      "cost": 2,
      "tags": [
        "stage"
      ],
      "boost": 0.22,
      "prerequisite": "stage_1",
      "level": 2,
      "text": "装备后，舞台相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "humanity_1",
      "branch": "humanity",
      "branchName": "人文",
      "name": "来源卡片",
      "icon": "book",
      "stat": "writing",
      "req": 20,
      "cost": 1,
      "tags": [
        "humanity"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，人文相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "humanity_2",
      "branch": "humanity",
      "branchName": "人文",
      "name": "多声部叙事",
      "icon": "book",
      "stat": "writing",
      "req": 50,
      "cost": 2,
      "tags": [
        "humanity"
      ],
      "boost": 0.22,
      "prerequisite": "humanity_1",
      "level": 2,
      "text": "装备后，人文相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "business_1",
      "branch": "business",
      "branchName": "商业",
      "name": "预算底线",
      "icon": "briefcase",
      "stat": "business",
      "req": 20,
      "cost": 1,
      "tags": [
        "business"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，商业相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "business_2",
      "branch": "business",
      "branchName": "商业",
      "name": "小步验证",
      "icon": "briefcase",
      "stat": "business",
      "req": 50,
      "cost": 2,
      "tags": [
        "business"
      ],
      "boost": 0.22,
      "prerequisite": "business_1",
      "level": 2,
      "text": "装备后，商业相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "team_1",
      "branch": "team",
      "branchName": "团队",
      "name": "交接清单",
      "icon": "flag",
      "stat": "teamwork",
      "req": 20,
      "cost": 1,
      "tags": [
        "team"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，团队相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "team_2",
      "branch": "team",
      "branchName": "团队",
      "name": "分布式协作",
      "icon": "flag",
      "stat": "teamwork",
      "req": 50,
      "cost": 2,
      "tags": [
        "team"
      ],
      "boost": 0.22,
      "prerequisite": "team_1",
      "level": 2,
      "text": "装备后，团队相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "public_1",
      "branch": "public",
      "branchName": "公共",
      "name": "轮流陈述",
      "icon": "building",
      "stat": "law",
      "req": 20,
      "cost": 1,
      "tags": [
        "public"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，公共相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "public_2",
      "branch": "public",
      "branchName": "公共",
      "name": "可执行共识",
      "icon": "building",
      "stat": "law",
      "req": 50,
      "cost": 2,
      "tags": [
        "public"
      ],
      "boost": 0.22,
      "prerequisite": "public_1",
      "level": 2,
      "text": "装备后，公共相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "education_1",
      "branch": "education",
      "branchName": "教学",
      "name": "反馈问题",
      "icon": "book",
      "stat": "pedagogy",
      "req": 20,
      "cost": 1,
      "tags": [
        "education"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，教学相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "education_2",
      "branch": "education",
      "branchName": "教学",
      "name": "学习支架",
      "icon": "book",
      "stat": "pedagogy",
      "req": 50,
      "cost": 2,
      "tags": [
        "education"
      ],
      "boost": 0.22,
      "prerequisite": "education_1",
      "level": 2,
      "text": "装备后，教学相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "eco_1",
      "branch": "eco",
      "branchName": "生态",
      "name": "样点记录",
      "icon": "leaf",
      "stat": "ecology",
      "req": 20,
      "cost": 1,
      "tags": [
        "eco"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，生态相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "eco_2",
      "branch": "eco",
      "branchName": "生态",
      "name": "长期可追踪",
      "icon": "leaf",
      "stat": "ecology",
      "req": 50,
      "cost": 2,
      "tags": [
        "eco"
      ],
      "boost": 0.22,
      "prerequisite": "eco_1",
      "level": 2,
      "text": "装备后，生态相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "language_1",
      "branch": "language",
      "branchName": "语言",
      "name": "语境练习",
      "icon": "globe",
      "stat": "language",
      "req": 20,
      "cost": 1,
      "tags": [
        "language"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，语言相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "language_2",
      "branch": "language",
      "branchName": "语言",
      "name": "跨文化合作",
      "icon": "globe",
      "stat": "language",
      "req": 50,
      "cost": 2,
      "tags": [
        "language"
      ],
      "boost": 0.22,
      "prerequisite": "language_1",
      "level": 2,
      "text": "装备后，语言相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "sport_1",
      "branch": "sport",
      "branchName": "竞技",
      "name": "训练日志",
      "icon": "run",
      "stat": "sport",
      "req": 20,
      "cost": 1,
      "tags": [
        "sport",
        "gaming"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，竞技相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "sport_2",
      "branch": "sport",
      "branchName": "竞技",
      "name": "恢复周期",
      "icon": "run",
      "stat": "sport",
      "req": 50,
      "cost": 2,
      "tags": [
        "sport",
        "gaming"
      ],
      "boost": 0.22,
      "prerequisite": "sport_1",
      "level": 2,
      "text": "装备后，竞技相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "wellbeing_1",
      "branch": "wellbeing",
      "branchName": "生活",
      "name": "留白日历",
      "icon": "home",
      "stat": "planning",
      "req": 20,
      "cost": 1,
      "tags": [
        "wellbeing"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后，生活相关行动正向能力成长 +12%。压力不会被当成能力放大。技能点有限，可跨方向搭配；最多同时装备3项。"
    },
    {
      "id": "wellbeing_2",
      "branch": "wellbeing",
      "branchName": "生活",
      "name": "可持续日常",
      "icon": "home",
      "stat": "planning",
      "req": 50,
      "cost": 2,
      "tags": [
        "wellbeing"
      ],
      "boost": 0.22,
      "prerequisite": "wellbeing_1",
      "level": 2,
      "text": "装备后，生活相关行动正向能力成长 +22%。压力不会被当成能力放大。进阶需先学基础；同支装备只计算最高级。"
    },
    {
      "id": "libraryskills_1",
      "branch": "libraryskills",
      "branchName": "阅读策划",
      "name": "检索与摘录",
      "icon": "book",
      "stat": "writing",
      "req": 20,
      "cost": 1,
      "tags": [
        "library",
        "study"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后相关行动能力成长增加12%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "libraryskills_2",
      "branch": "libraryskills",
      "branchName": "阅读策划",
      "name": "问题驱动阅读",
      "icon": "spark",
      "stat": "writing",
      "req": 50,
      "cost": 2,
      "tags": [
        "library",
        "study"
      ],
      "boost": 0.22,
      "prerequisite": "libraryskills_1",
      "level": 2,
      "text": "装备后相关行动能力成长增加22%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "campusteam_1",
      "branch": "campusteam",
      "branchName": "校园协同",
      "name": "跨专业分工",
      "icon": "book",
      "stat": "teamwork",
      "req": 20,
      "cost": 1,
      "tags": [
        "team",
        "campus"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后相关行动能力成长增加12%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "campusteam_2",
      "branch": "campusteam",
      "branchName": "校园协同",
      "name": "可复用的协作",
      "icon": "spark",
      "stat": "teamwork",
      "req": 50,
      "cost": 2,
      "tags": [
        "team",
        "campus"
      ],
      "boost": 0.22,
      "prerequisite": "campusteam_1",
      "level": 2,
      "text": "装备后相关行动能力成长增加22%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "publicmemory_1",
      "branch": "publicmemory",
      "branchName": "记忆整理",
      "name": "标注出处",
      "icon": "book",
      "stat": "history",
      "req": 20,
      "cost": 1,
      "tags": [
        "history",
        "media"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后相关行动能力成长增加12%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "publicmemory_2",
      "branch": "publicmemory",
      "branchName": "记忆整理",
      "name": "尊重差异的叙事",
      "icon": "spark",
      "stat": "history",
      "req": 50,
      "cost": 2,
      "tags": [
        "history",
        "media"
      ],
      "boost": 0.22,
      "prerequisite": "publicmemory_1",
      "level": 2,
      "text": "装备后相关行动能力成长增加22%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "inclusive_1",
      "branch": "inclusive",
      "branchName": "包容创作",
      "name": "可理解的说明",
      "icon": "book",
      "stat": "empathy",
      "req": 20,
      "cost": 1,
      "tags": [
        "design",
        "social"
      ],
      "boost": 0.12,
      "prerequisite": null,
      "level": 1,
      "text": "装备后相关行动能力成长增加12%；占用有限技能槽，同分支只计算最高级。"
    },
    {
      "id": "inclusive_2",
      "branch": "inclusive",
      "branchName": "包容创作",
      "name": "共同参与设计",
      "icon": "spark",
      "stat": "empathy",
      "req": 50,
      "cost": 2,
      "tags": [
        "design",
        "social"
      ],
      "boost": 0.22,
      "prerequisite": "inclusive_1",
      "level": 2,
      "text": "装备后相关行动能力成长增加22%；占用有限技能槽，同分支只计算最高级。"
    }
  ],
  "MAJORS": [
    {
      "id": "general",
      "name": "还在探索",
      "bonus": {
        "explore": 5,
        "innovation": 5
      },
      "text": "保留跨专业探索空间。"
    },
    {
      "id": "science",
      "name": "数理与研究",
      "bonus": {
        "data": 8,
        "research": 5
      },
      "text": "研究方法与可靠证据。"
    },
    {
      "id": "engineering",
      "name": "工程与技术",
      "bonus": {
        "engineering": 8,
        "tech": 5
      },
      "text": "接口、测试与实际交付。"
    },
    {
      "id": "arts",
      "name": "影像与艺术",
      "bonus": {
        "photography": 7,
        "performance": 6
      },
      "text": "表达与台前幕后。"
    },
    {
      "id": "business",
      "name": "商业与管理",
      "bonus": {
        "finance": 8,
        "business": 5
      },
      "text": "需求、组织与现金流。"
    },
    {
      "id": "humanity",
      "name": "人文与社会",
      "bonus": {
        "history": 7,
        "writing": 6
      },
      "text": "来源、语境与人的生活。"
    },
    {
      "id": "public",
      "name": "公共与教育",
      "bonus": {
        "law": 7,
        "pedagogy": 6
      },
      "text": "程序、倾听与学习。"
    },
    {
      "id": "design",
      "name": "设计与环境",
      "bonus": {
        "design": 7,
        "ecology": 6
      },
      "text": "从真实使用者出发。"
    }
  ],
  "SOURCES": [
    {
      "id": "shu-campus",
      "title": "上海大学 · 校园风景与三校区栏目",
      "url": "https://www.shu.edu.cn/xyfj/bsxqdq.htm",
      "fact": "宝山、延长、嘉定校区名称。",
      "adaptation": "地图位置、路程、场所功能与通勤数值为游戏设计。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-calendar",
      "title": "上海大学学期制优化改革Q&A",
      "url": "https://www.shu.edu.cn/shdxxqzyhggQ_Ajjjyjjyfk.htm",
      "fact": "公开改革说明使用“两长一短”：秋季、春季与夏季实践小学期。",
      "adaptation": "游戏压缩为秋春评估与7—8月实践加成，不是实际校历或课程时数。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-library",
      "title": "上海大学图书馆 · 钱伟长图书馆",
      "url": "https://lib.shu.edu.cn/fuwu/jyfw/dzfwzl1/qwztsg.htm",
      "fact": "钱伟长图书馆及其主题馆藏与借阅服务。",
      "adaptation": "游戏研读奖励、成长与角色均为原创虚构。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-room",
      "title": "上海大学图书馆 · 钱伟长馆空间预约",
      "url": "https://lib.shu.edu.cn/fuwu/kjfw/qwzgkjyy.htm",
      "fact": "钱伟长馆提供研讨空间预约信息。",
      "adaptation": "事件只是对公共空间使用的原创讨论，不复刻预约制度。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-chrysanthemum",
      "title": "上海大学十年菊文化节回眸",
      "url": "https://xxgk.shu.edu.cn/info/1557/7118.htm",
      "fact": "2003年首届菊文化节与校园菊文化传统。",
      "adaptation": "每年游戏10—11月主题加成属设计，不表示2026实际开放日期。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-music",
      "title": "2025上海之春国际音乐节 · 上海大学艺术教学成果展示",
      "url": "https://news.shu.edu.cn/info/1014/151995.htm",
      "fact": "历史公开音乐活动、音乐厅与伟长楼剧场。",
      "adaptation": "游戏节目、排演剧情与奖励不对应真实活动结果。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-research",
      "title": "钱伟长学院 · 2022年本科生科研创新论坛",
      "url": "https://weichangcol.shu.edu.cn/info/1037/1006.htm",
      "fact": "公开本科生科研论坛、项目交流与书院育人活动。",
      "adaptation": "研究社团、导师协作机制与所有同学为虚构。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-courses",
      "title": "上海大学2026级本科新生秋季学期选课通知",
      "url": "https://bksy.shu.edu.cn/info/1015/321714.htm",
      "fact": "2026通知提醒核对培养计划、课程先修与开课校区。",
      "adaptation": "游戏16门专题课、四次匹配行动结课与加分为玩法抽象，不是实际课程目录或选课建议。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-mainlib",
      "title": "上海大学图书馆 · 校本部图书馆",
      "url": "https://lib.shu.edu.cn/gybengua/bggk/xbbtsg.htm",
      "fact": "校本部图书馆位于宝山校区，提供文献阅读、学习空间与专项服务。",
      "adaptation": "用于场景名称或背景；数值、任务、人物、场地分配与循环活动日程是游戏改编，并非官方规定。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-wenhui",
      "title": "上海大学图书馆 · 文荟图书馆",
      "url": "https://lib.shu.edu.cn/gybengua/bggk/whtsg.htm",
      "fact": "文荟图书馆位于延长校区，提供学习与交流空间及相关学科资源。",
      "adaptation": "用于场景名称或背景；数值、任务、人物、场地分配与循环活动日程是游戏改编，并非官方规定。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-unionlib",
      "title": "上海大学图书馆 · 联合图书馆",
      "url": "https://lib.shu.edu.cn/gybengua/bggk/lhtsg.htm",
      "fact": "联合图书馆位于嘉定校区。",
      "adaptation": "用于场景名称或背景；数值、任务、人物、场地分配与循环活动日程是游戏改编，并非官方规定。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-history",
      "title": "上海大学 · 图书馆科普与文化空间",
      "url": "https://news.shu.edu.cn/info/1021/64708.htm",
      "fact": "2022年报道提及钱伟长纪念馆、校史馆等学习空间。",
      "adaptation": "用于场景名称或背景；数值、任务、人物、场地分配与循环活动日程是游戏改编，并非官方规定。",
      "checkedAt": "2026-09-12"
    },
    {
      "id": "shu-life",
      "title": "上海大学 · 校园生活",
      "url": "https://www.shu.edu.cn/xysheng_huo.htm",
      "fact": "校园生活与服务信息入口。",
      "adaptation": "用于场景名称或背景；数值、任务、人物、场地分配与循环活动日程是游戏改编，并非官方规定。",
      "checkedAt": "2026-09-12"
    }
  ],
  "EXTRA_SYNERGIES": [
    [
      "datawork",
      "reproduce",
      "数据不是结论，复现才是下一步",
      {
        "data": 3,
        "research": 2
      }
    ],
    [
      "robotbuild",
      "studygroup",
      "统一接口，减少返工",
      {
        "engineering": 3,
        "teamwork": 2
      }
    ],
    [
      "uxlab",
      "volunteermap",
      "把体验反馈变成下一版",
      {
        "design": 3,
        "empathy": 2
      }
    ],
    [
      "filmcrew",
      "editing",
      "影像与文字互相校准",
      {
        "photography": 3,
        "media": 2
      }
    ],
    [
      "stageplay",
      "cluboffice",
      "台前幕后准时相遇",
      {
        "performance": 3,
        "leadership": 2
      }
    ],
    [
      "ecoaudit",
      "datawork",
      "环保提案有了对照",
      {
        "ecology": 3,
        "data": 2
      }
    ],
    [
      "cook",
      "budgetlab",
      "好好吃饭，也留下余量",
      {
        "cooking": 3,
        "finance": 2
      }
    ],
    [
      "peerteach",
      "studygroup",
      "教与学形成反馈",
      {
        "pedagogy": 3,
        "knowledge": 2
      }
    ],
    [
      "languagepair",
      "oralhistory",
      "把来处讲得更清楚",
      {
        "language": 3,
        "history": 2
      }
    ],
    [
      "legalclinic",
      "repairtalk",
      "理解规则，也理解人",
      {
        "law": 3,
        "negotiation": 2
      }
    ],
    [
      "libraryresearch",
      "library",
      "先检索，再带着问题阅读",
      {
        "knowledge": 2,
        "research": 2
      }
    ],
    [
      "crosscampus",
      "studygroup",
      "把跨校区交流带回学习小组",
      {
        "teamwork": 3,
        "planning": 2
      }
    ],
    [
      "historyvisit",
      "oralhistory",
      "让校史记录与口述相互校验",
      {
        "history": 3,
        "media": 2
      }
    ],
    [
      "captionlab",
      "filmcrew",
      "拍摄与可理解的呈现一起完成",
      {
        "design": 3,
        "empathy": 2
      }
    ]
  ],
  "CAMPUS_PROFILES": [
    {
      "id": "shu",
      "name": "上海大学",
      "text": "一个校园世界，三处校区生活圈。全部人物、技能、项目、路线在同一局中开放。"
    }
  ],
  "HOME_CAMPUSES": [
    {
      "id": "baoshan",
      "name": "宝山生活圈"
    },
    {
      "id": "yanchang",
      "name": "延长生活圈"
    },
    {
      "id": "jiading",
      "name": "嘉定生活圈"
    }
  ],
  "CONTENT_BASELINE": {
    "version": "2.0.0",
    "stats": 40,
    "actions": 102,
    "npcs": 20,
    "chapters": 60,
    "skills": 32,
    "projects": 30,
    "events": 98,
    "routes": 32,
    "endings": 64,
    "locations": 20,
    "courses": 12,
    "talents": 24
  },
  "VERSION": "3.0.0",
  "RULES_VERSION": "uy-shu-3.0.0",
  "SCHEMA_VERSION": 3,
  "CATEGORIES": [
    [
      "all",
      "全部",
      "spark"
    ],
    [
      "study",
      "学业成长",
      "book"
    ],
    [
      "social",
      "人际关系",
      "heart"
    ],
    [
      "career",
      "事业实践",
      "briefcase"
    ],
    [
      "interest",
      "兴趣创作",
      "pen"
    ],
    [
      "life",
      "生活探索",
      "compass"
    ]
  ],
  "DIFFICULTIES": [
    {
      "id": "explore",
      "name": "自由探索",
      "mark": "探索",
      "tag": "成长宽松 · 先找到喜欢的事",
      "text": "资源成长稍快、学业压力较低，适合首次游玩。",
      "resource": 1.08,
      "gradePenalty": 0,
      "multiplier": 1,
      "money": 250
    },
    {
      "id": "balanced",
      "name": "均衡成长",
      "mark": "均衡",
      "tag": "标准节奏 · 多条路都能走",
      "text": "标准成长速度与学业要求，平衡专长、关系和生活。",
      "resource": 1,
      "gradePenalty": 2,
      "multiplier": 1.04,
      "money": 0
    },
    {
      "id": "focused",
      "name": "自律挑战",
      "mark": "自律",
      "tag": "安排更精细 · 取舍更重要",
      "text": "成长稍慢、学期评定更严格，依靠技能与合作提高效率。",
      "resource": 0.96,
      "gradePenalty": 3,
      "multiplier": 1.09,
      "money": 0
    },
    {
      "id": "headwind",
      "name": "逆风起步",
      "mark": "逆风",
      "tag": "有限余量 · 主动寻找支持",
      "text": "开局余量更少、成长压力更高。家庭资源另选；不改变学校身份。",
      "resource": 0.92,
      "gradePenalty": 4,
      "multiplier": 1.14,
      "money": -200
    }
  ],
  "SHU_CHAPTERS": [
    {
      "id": 1,
      "name": "初到上大",
      "text": "认路、阅读、相遇，把陌生变成可生活的地方。"
    },
    {
      "id": 2,
      "name": "一起做成一件事",
      "text": "选课、社团和伙伴，把兴趣变成可交接的成果。"
    },
    {
      "id": 3,
      "name": "走出自己的半径",
      "text": "在实践、研究、创作与关系里找到一项愿意持续的事。"
    },
    {
      "id": 4,
      "name": "把四年交给明天",
      "text": "完成毕业，整理记忆，把经验留给后来的人。"
    }
  ],
  "SHU_TASKS": [
    {
      "id": "arrival",
      "chapter": 1,
      "name": "先认路，再赶路",
      "text": "上大生活开始，不必一天认识所有地方。",
      "goals": [
        {
          "kind": "counts",
          "label": "核验或整理服务信息",
          "target": 2,
          "ids": [
            "servicecheck",
            "campusbudget"
          ]
        },
        {
          "kind": "visited",
          "label": "实际去过的生活地点",
          "target": 3
        }
      ],
      "reward": {
        "planning": 3,
        "mood": 3
      },
      "money": 0
    },
    {
      "id": "firstreading",
      "chapter": 1,
      "name": "第一次把问题读明白",
      "text": "让旧图书馆行动和新跨馆活动共同计入阅读积累。",
      "goals": [
        {
          "kind": "counts",
          "label": "阅读与讨论",
          "target": 5,
          "ids": [
            "library",
            "qwcread",
            "libraryresearch",
            "bookcircle",
            "wenhuistudy",
            "unionstudy"
          ]
        },
        {
          "kind": "courses",
          "label": "完成专题课",
          "target": 1
        }
      ],
      "reward": {
        "knowledge": 3,
        "writing": 3
      },
      "money": 80
    },
    {
      "id": "firstfriend",
      "chapter": 1,
      "name": "有人可以认真说话",
      "text": "友谊与恋爱都可以完成这一页。",
      "goals": [
        {
          "kind": "friends",
          "label": "认识且信任≥20的伙伴",
          "target": 2
        },
        {
          "kind": "counts",
          "label": "倾听或社团相处",
          "target": 3,
          "ids": [
            "listen",
            "club",
            "bookcircle",
            "hangout"
          ]
        }
      ],
      "reward": {
        "eq": 3,
        "empathy": 3
      },
      "money": 0
    },
    {
      "id": "timetable",
      "chapter": 2,
      "name": "一份能持续的时间表",
      "text": "学会把上课、休息和生活管理放在同一个月里。",
      "goals": [
        {
          "kind": "counts",
          "label": "学习行动",
          "target": 8,
          "ids": [
            "lecture",
            "library",
            "studygroup",
            "exam"
          ]
        },
        {
          "kind": "counts",
          "label": "恢复与生活整理",
          "target": 6,
          "ids": [
            "rest",
            "run",
            "home",
            "weekreview",
            "campusbudget"
          ]
        },
        {
          "kind": "courses",
          "label": "完成专题课",
          "target": 2
        }
      ],
      "reward": {
        "planning": 4,
        "resilience": 3
      },
      "money": 100
    },
    {
      "id": "sharedwork",
      "chapter": 2,
      "name": "让合作留下成果",
      "text": "与可信赖的人共同完成，而非只在群聊里宣布开工。",
      "goals": [
        {
          "kind": "collabProjects",
          "label": "有合作伙伴的完成项目",
          "target": 1
        },
        {
          "kind": "counts",
          "label": "协作或社团实践",
          "target": 4,
          "ids": [
            "crosscampus",
            "jointseminar",
            "club",
            "partnerproject",
            "peerhandoff"
          ]
        }
      ],
      "reward": {
        "teamwork": 4,
        "leadership": 3
      },
      "money": 120
    },
    {
      "id": "campusstory",
      "chapter": 2,
      "name": "看见校园的不同侧面",
      "text": "地点不必全部打卡，阅读、文化或公益都能留下自己的上大故事。",
      "goals": [
        {
          "kind": "counts",
          "label": "校园文化与观察",
          "target": 6,
          "ids": [
            "historyvisit",
            "archivewalk",
            "flowerrecord",
            "jufestival",
            "springconcert",
            "stagecrew",
            "qwcread",
            "volunteer"
          ]
        },
        {
          "kind": "visited",
          "label": "实际去过的地点",
          "target": 7
        }
      ],
      "reward": {
        "history": 3,
        "explore": 3
      },
      "money": 80
    },
    {
      "id": "bridgeworld",
      "chapter": 3,
      "name": "从校园走向具体的人",
      "text": "先理解真实需要，再用自己的能力回应。",
      "goals": [
        {
          "kind": "counts",
          "label": "社会实践或需求交流",
          "target": 6,
          "ids": [
            "summerpractice",
            "volunteer",
            "teach",
            "intern",
            "clienttalk",
            "communitywalk",
            "openprototype"
          ]
        },
        {
          "kind": "projects",
          "label": "完成项目总数",
          "target": 2
        }
      ],
      "reward": {
        "service": 3,
        "business": 3
      },
      "money": 150
    },
    {
      "id": "ownspecialty",
      "chapter": 3,
      "name": "一项拿得出手的专长",
      "text": "这张任务页不规定你必须保研、创业或谈恋爱。",
      "goals": [
        {
          "kind": "skills",
          "label": "已掌握技能",
          "target": 3
        },
        {
          "kind": "quality",
          "label": "最高项目质量",
          "target": 55
        },
        {
          "kind": "counts",
          "label": "复盘与学术/作品表达",
          "target": 4,
          "ids": [
            "weekreview",
            "review",
            "seminar",
            "oraldefense",
            "exhibition",
            "peerhandoff"
          ]
        }
      ],
      "reward": {
        "discipline": 3,
        "innovation": 3
      },
      "money": 100
    },
    {
      "id": "careothers",
      "chapter": 3,
      "name": "把信任变成支持",
      "text": "关系不只是好感数字，稳定相处也是四年的成果。",
      "goals": [
        {
          "kind": "trusted",
          "label": "信任≥45的伙伴",
          "target": 2
        },
        {
          "kind": "counts",
          "label": "倾听、交流或公益陪伴",
          "target": 8,
          "ids": [
            "listen",
            "repairtalk",
            "volunteer",
            "bookcircle",
            "languagepair",
            "date"
          ]
        }
      ],
      "reward": {
        "empathy": 4,
        "eq": 3
      },
      "money": 0
    },
    {
      "id": "graduationwork",
      "chapter": 4,
      "name": "把最后一页写完整",
      "text": "任何路线都需要为毕业成果预留时间。",
      "goals": [
        {
          "kind": "flag",
          "label": "完成毕业论文／设计",
          "target": 1,
          "id": "thesis"
        },
        {
          "kind": "courses",
          "label": "完成专题课",
          "target": 3
        },
        {
          "kind": "counts",
          "label": "交接、复盘或毕业记录",
          "target": 4,
          "ids": [
            "peerhandoff",
            "graduationwalk",
            "weekreview",
            "oraldefense"
          ]
        }
      ],
      "reward": {
        "planning": 3,
        "mood": 4
      },
      "money": 120
    },
    {
      "id": "threecampuses",
      "chapter": 4,
      "name": "不同校区，同一段四年",
      "text": "借合作、阅读与观察访问三个校区；不要求同月奔波。",
      "goals": [
        {
          "kind": "areas",
          "label": "到访校区数（不含校外）",
          "target": 3
        },
        {
          "kind": "counts",
          "label": "跨馆或跨校区实践",
          "target": 6,
          "ids": [
            "crosscampus",
            "unionstudy",
            "wenhuistudy",
            "libraryresearch",
            "archivewalk"
          ]
        }
      ],
      "reward": {
        "explore": 4,
        "language": 3
      },
      "money": 100
    },
    {
      "id": "leavekindly",
      "chapter": 4,
      "name": "离开时，让下一位更容易",
      "text": "把经验交接给下一届，也带走生活可以继续的余量。",
      "goals": [
        {
          "kind": "counts",
          "label": "资料交接与共同纪念",
          "target": 5,
          "ids": [
            "peerhandoff",
            "graduationwalk",
            "servicecheck"
          ]
        },
        {
          "kind": "projects",
          "label": "完成项目总数",
          "target": 3
        },
        {
          "kind": "health",
          "label": "当前健康",
          "target": 55
        }
      ],
      "reward": {
        "mood": 5,
        "service": 3
      },
      "money": 0
    }
  ],
  "SHU_AGENDA": [
    {
      "id": "arrival",
      "month": 9,
      "title": "新学期，先找到入口",
      "actions": [
        "servicecheck",
        "lecture",
        "club",
        "campuswalk"
      ],
      "eventId": "shu_calendar_arrival",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "reading",
      "month": 10,
      "title": "一起把书读厚一点",
      "actions": [
        "library",
        "qwcread",
        "bookcircle",
        "libraryresearch"
      ],
      "eventId": "shu_calendar_reading",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "flowers",
      "month": 11,
      "title": "秋日菊文化记录",
      "actions": [
        "jufestival",
        "flowerrecord",
        "curation",
        "ecoaudit"
      ],
      "eventId": "shu_calendar_flowers",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "review",
      "month": 12,
      "title": "期末之前，先整理问题",
      "actions": [
        "lecture",
        "studygroup",
        "weekreview",
        "libraryresearch"
      ],
      "eventId": "shu_calendar_review",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "handoff",
      "month": 1,
      "title": "收尾不等于消失",
      "actions": [
        "peerhandoff",
        "project",
        "roommeeting",
        "weekreview"
      ],
      "eventId": "shu_calendar_handoff",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "budget",
      "month": 2,
      "title": "让生活有一点余量",
      "actions": [
        "campusbudget",
        "home",
        "rest",
        "mealplan"
      ],
      "eventId": "shu_calendar_budget",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "stage",
      "month": 3,
      "title": "春天的舞台协作",
      "actions": [
        "springconcert",
        "stagecrew",
        "music",
        "chorus"
      ],
      "eventId": "shu_calendar_stage",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "library",
      "month": 4,
      "title": "读书与分享的春日",
      "actions": [
        "libraryresearch",
        "bookcircle",
        "wenhuistudy",
        "unionstudy"
      ],
      "eventId": "shu_calendar_library",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "joint",
      "month": 5,
      "title": "不同专业，同一个问题",
      "actions": [
        "jointseminar",
        "crosscampus",
        "openprototype",
        "partnerproject"
      ],
      "eventId": "shu_calendar_joint",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "memory",
      "month": 6,
      "title": "把校园故事写下来",
      "actions": [
        "archivewalk",
        "historyvisit",
        "graduationwalk",
        "documentary"
      ],
      "eventId": "shu_calendar_memory",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "practice",
      "month": 7,
      "title": "夏季实践，走进具体生活",
      "actions": [
        "summerpractice",
        "volunteer",
        "intern",
        "communitywalk"
      ],
      "eventId": "shu_calendar_practice",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    },
    {
      "id": "return",
      "month": 8,
      "title": "把经历带回上大",
      "actions": [
        "peerhandoff",
        "weekreview",
        "project",
        "languagepair"
      ],
      "eventId": "shu_calendar_return",
      "note": "游戏中的循环活动提示，不是学校当年官方日程。"
    }
  ]
};
if(typeof module==="object"&&module.exports)module.exports=content;else root.FourYearsContent=content;
})(typeof globalThis!=="undefined"?globalThis:this);
