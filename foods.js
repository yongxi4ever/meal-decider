// 干饭贩卖机 · 美食库数据源
// ------------------------------------------------------------------
// 维度说明
//   meal  时段：早餐 / 正餐 / 下午茶 / 夜宵   （决定食物在哪个时段可被抽中）
//   taste 口味：辣 清淡 甜 酸 咸鲜 麻
//   meat  荤素：纯素 有肉 海鲜 轻食
//   temp  冷热：热食 凉食 带汤
//   staple 主食：米饭 面 粉 汤 饼 包子饺子
//   scene 场景：一人食 聚餐 约会
//
// 时段规则（业务约束，已在数据中体现）
//   1. 甜品饮品 仅出现在【下午茶 / 夜宵】→ 早餐、正餐不出现
//   2. 轻食健康 不出现于【夜宵】
//   3. 早餐类食物同时可用于【正餐】（如手抓饼、小笼汤包）
// ------------------------------------------------------------------

const FOODS_DATA = [
  /* ===== 早餐 ===== */
  { id:1,  cat:'早餐', name:'豆浆油条',   emoji:'🥖', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:2,  cat:'早餐', name:'皮蛋瘦肉粥', emoji:'🥣', meal:['早餐','正餐'],        tags:{taste:['清淡'],meat:['有肉'],temp:['热食'],staple:['汤'],scene:['一人食']} },
  { id:3,  cat:'早餐', name:'白粥小菜',   emoji:'🥣', meal:['早餐','正餐'],        tags:{taste:['清淡'],meat:['纯素'],temp:['热食'],staple:['汤'],scene:['一人食']} },
  { id:4,  cat:'早餐', name:'鸡蛋灌饼',   emoji:'🥞', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:5,  cat:'早餐', name:'手抓饼',     emoji:'🥞', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:6,  cat:'早餐', name:'烧饼夹肉',   emoji:'🥙', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:7,  cat:'早餐', name:'豆腐脑',     emoji:'🥣', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['纯素'],temp:['热食'],staple:['汤'],scene:['一人食']} },
  { id:8,  cat:'早餐', name:'煎饼果子',   emoji:'🥞', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:9,  cat:'早餐', name:'小笼汤包',   emoji:'🥟', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:10, cat:'早餐', name:'鲜肉包',     emoji:'🥟', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:13, cat:'早餐', name:'云吞',       emoji:'🥟', meal:['早餐','正餐'],        tags:{taste:['清淡'],meat:['有肉'],temp:['热食','带汤'],staple:['包子饺子','汤'],scene:['一人食']} },
  { id:11, cat:'早餐', name:'茶叶蛋',     emoji:'🥚', meal:['早餐'],               tags:{taste:['咸鲜'],meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:12, cat:'早餐', name:'三明治早餐', emoji:'🥪', meal:['早餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['凉食'],staple:['饼'],scene:['一人食']} },

  /* ===== 盖饭快餐 ===== */
  { id:20, cat:'盖饭快餐', name:'黄焖鸡米饭', emoji:'🍗', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:21, cat:'盖饭快餐', name:'咖喱鸡饭',   emoji:'🍛', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:22, cat:'盖饭快餐', name:'卤肉饭',     emoji:'🍚', meal:['正餐','夜宵'],     tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:23, cat:'盖饭快餐', name:'猪脚饭',     emoji:'🍖', meal:['正餐','夜宵'],     tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:24, cat:'盖饭快餐', name:'鸡腿饭',     emoji:'🍗', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:25, cat:'盖饭快餐', name:'煲仔饭',     emoji:'🍚', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:26, cat:'盖饭快餐', name:'盖浇饭',     emoji:'🍛', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:27, cat:'盖饭快餐', name:'蛋炒饭',     emoji:'🍚', meal:['正餐','夜宵'],     tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:28, cat:'盖饭快餐', name:'扬州炒饭',   emoji:'🍚', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:29, cat:'盖饭快餐', name:'新疆手抓饭', emoji:'🍚', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:30, cat:'盖饭快餐', name:'烤肉拌饭',   emoji:'🍚', meal:['正餐'],            tags:{taste:['辣'],  meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:31, cat:'盖饭快餐', name:'铁板炒饭',   emoji:'🍚', meal:['正餐','夜宵'],     tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:32, cat:'盖饭快餐', name:'咖喱牛腩饭', emoji:'🍛', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:33, cat:'盖饭快餐', name:'台式便当',   emoji:'🍱', meal:['正餐'],            tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },

  /* ===== 面食粉面 ===== */
  { id:40, cat:'面食粉面', name:'兰州拉面', emoji:'🍜', meal:['早餐','正餐','夜宵'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:41, cat:'面食粉面', name:'重庆小面', emoji:'🍜', meal:['早餐','正餐','夜宵'], tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:42, cat:'面食粉面', name:'热干面',   emoji:'🍜', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:43, cat:'面食粉面', name:'炸酱面',   emoji:'🍜', meal:['正餐'],               tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:44, cat:'面食粉面', name:'刀削面',   emoji:'🍜', meal:['正餐'],               tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:45, cat:'面食粉面', name:'牛肉面',   emoji:'🍜', meal:['早餐','正餐','夜宵'], tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:46, cat:'面食粉面', name:'阳春面',   emoji:'🍜', meal:['早餐','正餐'],        tags:{taste:['清淡'],  meat:['纯素'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:47, cat:'面食粉面', name:'担担面',   emoji:'🍜', meal:['正餐'],               tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:48, cat:'面食粉面', name:'油泼面',   emoji:'🍜', meal:['正餐'],               tags:{taste:['辣'],    meat:['纯素'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:49, cat:'面食粉面', name:'云吞面',   emoji:'🍜', meal:['早餐','正餐'],        tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['面','包子饺子'],scene:['一人食']} },
  { id:50, cat:'面食粉面', name:'螺蛳粉',   emoji:'🍜', meal:['正餐','夜宵'],        tags:{taste:['辣','酸'],meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:51, cat:'面食粉面', name:'桂林米粉', emoji:'🍜', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:52, cat:'面食粉面', name:'过桥米线', emoji:'🍲', meal:['正餐'],               tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['粉','汤'],scene:['一人食']} },
  { id:53, cat:'面食粉面', name:'酸辣粉',   emoji:'🌶️', meal:['正餐','夜宵'],        tags:{taste:['辣','酸'],meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:54, cat:'面食粉面', name:'炒河粉',   emoji:'🍜', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['粉'],scene:['一人食']} },
  { id:55, cat:'面食粉面', name:'炒面',     emoji:'🍜', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:56, cat:'面食粉面', name:'牛肉粉',   emoji:'🍜', meal:['早餐','正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },

  /* ===== 包子饺子 ===== */
  { id:60, cat:'包子饺子', name:'小笼包', emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:61, cat:'包子饺子', name:'生煎包', emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:62, cat:'包子饺子', name:'水饺',   emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:63, cat:'包子饺子', name:'蒸饺',   emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:64, cat:'包子饺子', name:'灌汤包', emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:65, cat:'包子饺子', name:'叉烧包', emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['甜','咸鲜'],meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:66, cat:'包子饺子', name:'烧麦',   emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:67, cat:'包子饺子', name:'锅贴',   emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:68, cat:'包子饺子', name:'虾饺',   emoji:'🥟', meal:['早餐','正餐'], tags:{taste:['咸鲜'],   meat:['海鲜'],temp:['热食'],staple:['包子饺子'],scene:['一人食','约会']} },
  { id:69, cat:'包子饺子', name:'肠粉',   emoji:'🍥', meal:['早餐','正餐'], tags:{taste:['清淡'],   meat:['有肉'],temp:['热食'],staple:['粉'],scene:['一人食']} },
  { id:70, cat:'包子饺子', name:'豆沙包', emoji:'🥟', meal:['早餐'],        tags:{taste:['甜'],     meat:['纯素'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },

  /* ===== 火锅烧烤 ===== */
  { id:80, cat:'火锅烧烤', name:'川渝火锅',     emoji:'🍲', meal:['正餐','夜宵'], tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:81, cat:'火锅烧烤', name:'潮汕牛肉火锅', emoji:'🍲', meal:['正餐','夜宵'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:82, cat:'火锅烧烤', name:'椰子鸡火锅',   emoji:'🥥', meal:['正餐','夜宵'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:83, cat:'火锅烧烤', name:'猪肚鸡',       emoji:'🍲', meal:['正餐','夜宵'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:84, cat:'火锅烧烤', name:'冒菜',         emoji:'🌶️', meal:['正餐','夜宵'], tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食']} },
  { id:85, cat:'火锅烧烤', name:'串串香',       emoji:'🍢', meal:['正餐','夜宵'], tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:86, cat:'火锅烧烤', name:'烤肉',         emoji:'🍖', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:87, cat:'火锅烧烤', name:'烧烤撸串',     emoji:'🍢', meal:['正餐','夜宵'], tags:{taste:['辣','咸鲜'],meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:88, cat:'火锅烧烤', name:'铁板烧',       emoji:'🍳', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:89, cat:'火锅烧烤', name:'小龙虾',       emoji:'🦞', meal:['正餐','夜宵'], tags:{taste:['辣'],    meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:90, cat:'火锅烧烤', name:'烤鱼',         emoji:'🐟', meal:['正餐','夜宵'], tags:{taste:['辣'],    meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },

  /* ===== 日料 ===== */
  { id:100, cat:'日料', name:'寿司拼盘',   emoji:'🍣', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['海鲜'],temp:['凉食'],staple:['米饭'],scene:['一人食','约会']} },
  { id:101, cat:'日料', name:'刺身',       emoji:'🍣', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['海鲜'],temp:['凉食'],staple:[],scene:['一人食','约会']} },
  { id:102, cat:'日料', name:'日式拉面',   emoji:'🍜', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:103, cat:'日料', name:'咖喱猪排饭', emoji:'🍛', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:104, cat:'日料', name:'牛丼',       emoji:'🍚', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:105, cat:'日料', name:'天妇罗',     emoji:'🍤', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:106, cat:'日料', name:'鳗鱼饭',     emoji:'🍱', meal:['正餐'],        tags:{taste:['甜','咸鲜'],meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','约会']} },
  { id:107, cat:'日料', name:'日式便当',   emoji:'🍱', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['凉食'],staple:['米饭'],scene:['一人食']} },
  { id:108, cat:'日料', name:'章鱼小丸子', emoji:'🐙', meal:['下午茶','夜宵'],tags:{taste:['咸鲜'],meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:109, cat:'日料', name:'关东煮',     emoji:'🍢', meal:['正餐','夜宵'], tags:{taste:['清淡'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食']} },

  /* ===== 韩餐 ===== */
  { id:115, cat:'韩餐', name:'石锅拌饭', emoji:'🍚', meal:['正餐'],        tags:{taste:['辣'],    meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:116, cat:'韩餐', name:'部队锅',   emoji:'🍲', meal:['正餐','夜宵'], tags:{taste:['辣'],    meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:117, cat:'韩餐', name:'韩式炸鸡', emoji:'🍗', meal:['正餐','夜宵'], tags:{taste:['辣','咸鲜'],meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','聚餐','约会']} },
  { id:118, cat:'韩餐', name:'泡菜汤',   emoji:'🍲', meal:['正餐'],        tags:{taste:['辣','酸'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食']} },
  { id:119, cat:'韩餐', name:'韩式冷面', emoji:'🍜', meal:['正餐'],        tags:{taste:['酸'],    meat:['有肉'],temp:['凉食','带汤'],staple:['面'],scene:['一人食']} },
  { id:120, cat:'韩餐', name:'炒年糕',   emoji:'🌶️', meal:['下午茶','夜宵'],tags:{taste:['辣'],    meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:121, cat:'韩餐', name:'紫菜包饭', emoji:'🍙', meal:['正餐','下午茶'],tags:{taste:['咸鲜'],meat:['有肉'],temp:['凉食'],staple:['米饭'],scene:['一人食']} },

  /* ===== 西餐 ===== */
  { id:130, cat:'西餐', name:'汉堡薯条', emoji:'🍔', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:131, cat:'西餐', name:'披萨',     emoji:'🍕', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食','聚餐']} },
  { id:132, cat:'西餐', name:'意面',     emoji:'🍝', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食','约会']} },
  { id:133, cat:'西餐', name:'牛排',     emoji:'🥩', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','约会']} },
  { id:134, cat:'西餐', name:'三明治',   emoji:'🥪', meal:['早餐','正餐','下午茶'],tags:{taste:['咸鲜'],meat:['有肉'],temp:['凉食'],staple:['饼'],scene:['一人食']} },
  { id:135, cat:'西餐', name:'炸鸡',     emoji:'🍗', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:136, cat:'西餐', name:'热狗',     emoji:'🌭', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:137, cat:'西餐', name:'焗饭',     emoji:'🧀', meal:['正餐'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:138, cat:'西餐', name:'薯条',     emoji:'🍟', meal:['下午茶','夜宵'],tags:{taste:['咸鲜'],meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },

  /* ===== 东南亚 ===== */
  { id:145, cat:'东南亚', name:'冬阴功汤面', emoji:'🍤', meal:['正餐'], tags:{taste:['酸','辣'],meat:['海鲜'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:146, cat:'东南亚', name:'泰式炒河粉', emoji:'🍜', meal:['正餐'], tags:{taste:['酸','甜'],meat:['有肉'],temp:['热食'],staple:['粉'],scene:['一人食']} },
  { id:147, cat:'东南亚', name:'越南河粉',   emoji:'🍜', meal:['正餐'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:148, cat:'东南亚', name:'咖喱蟹',     emoji:'🦀', meal:['正餐'], tags:{taste:['辣'],    meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:149, cat:'东南亚', name:'菠萝炒饭',   emoji:'🍍', meal:['正餐'], tags:{taste:['甜','咸鲜'],meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:150, cat:'东南亚', name:'海南鸡饭',   emoji:'🍗', meal:['正餐'], tags:{taste:['清淡'],  meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },

  /* ===== 轻食健康（不出现于夜宵）===== */
  { id:160, cat:'轻食健康', name:'牛油果沙拉', emoji:'🥗', meal:['早餐','正餐','下午茶'], tags:{taste:['清淡'],meat:['纯素','轻食'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:161, cat:'轻食健康', name:'鸡胸肉沙拉', emoji:'🥗', meal:['正餐','下午茶'],        tags:{taste:['清淡'],meat:['轻食'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:162, cat:'轻食健康', name:'藜麦碗',     emoji:'🥗', meal:['正餐','下午茶'],        tags:{taste:['清淡'],meat:['纯素','轻食'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:163, cat:'轻食健康', name:'全麦三明治', emoji:'🥪', meal:['早餐','正餐','下午茶'], tags:{taste:['清淡'],meat:['轻食'],temp:['凉食'],staple:['饼'],scene:['一人食']} },
  { id:164, cat:'轻食健康', name:'酸奶碗',     emoji:'🥣', meal:['早餐','下午茶'],        tags:{taste:['甜'],  meat:['轻食'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:165, cat:'轻食健康', name:'蔬果汁',     emoji:'🥤', meal:['早餐','下午茶'],        tags:{taste:['甜'],  meat:['纯素','轻食'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:166, cat:'轻食健康', name:'水煮鸡胸套餐',emoji:'🍗',meal:['正餐'],                 tags:{taste:['清淡'],meat:['轻食'],temp:['热食'],staple:['米饭'],scene:['一人食']} },

  /* ===== 夜宵小吃 ===== */
  { id:175, cat:'夜宵小吃', name:'烤冷面',   emoji:'🥞', meal:['夜宵','正餐'], tags:{taste:['酸','甜'],meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食']} },
  { id:176, cat:'夜宵小吃', name:'炸串',     emoji:'🍢', meal:['夜宵','正餐'], tags:{taste:['辣'],    meat:['有肉'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:177, cat:'夜宵小吃', name:'臭豆腐',   emoji:'🍢', meal:['夜宵'],        tags:{taste:['辣'],    meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:178, cat:'夜宵小吃', name:'铁板鱿鱼', emoji:'🦑', meal:['夜宵'],        tags:{taste:['辣'],    meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:179, cat:'夜宵小吃', name:'生蚝',     emoji:'🦪', meal:['夜宵'],        tags:{taste:['咸鲜'],  meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:180, cat:'夜宵小吃', name:'炸鸡柳',   emoji:'🍗', meal:['夜宵','下午茶'],tags:{taste:['咸鲜'], meat:['有肉'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:181, cat:'夜宵小吃', name:'狼牙土豆', emoji:'🥔', meal:['夜宵','下午茶'],tags:{taste:['辣'],   meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:182, cat:'夜宵小吃', name:'烤肠',     emoji:'🌭', meal:['夜宵','下午茶'],tags:{taste:['咸鲜'], meat:['有肉'],temp:['热食'],staple:[],scene:['一人食']} },

  /* ===== 甜品饮品（仅下午茶 / 夜宵）===== */
  { id:190, cat:'甜品饮品', name:'奶茶',   emoji:'🧋', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:191, cat:'甜品饮品', name:'蛋糕',   emoji:'🍰', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食','约会']} },
  { id:192, cat:'甜品饮品', name:'冰淇淋', emoji:'🍦', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:193, cat:'甜品饮品', name:'糖水',   emoji:'🍮', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:194, cat:'甜品饮品', name:'水果捞', emoji:'🍓', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:195, cat:'甜品饮品', name:'蛋挞',   emoji:'🥧', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:196, cat:'甜品饮品', name:'双皮奶', emoji:'🍮', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:197, cat:'甜品饮品', name:'泡芙',   emoji:'🧁', meal:['下午茶','夜宵'], tags:{taste:['甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },

  /* ===== 连锁品牌 ===== */
  { id:210, cat:'连锁品牌', name:'麦当劳',     emoji:'🍔', meal:['早餐','正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:211, cat:'连锁品牌', name:'肯德基',     emoji:'🍗', meal:['早餐','正餐','夜宵'], tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:212, cat:'连锁品牌', name:'汉堡王',     emoji:'🍔', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:213, cat:'连锁品牌', name:'必胜客',     emoji:'🍕', meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食','聚餐']} },
  { id:214, cat:'连锁品牌', name:'华莱士',     emoji:'🍗', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:215, cat:'连锁品牌', name:'塔斯汀',     emoji:'🍔', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:218, cat:'连锁品牌', name:'真功夫',     emoji:'🍚', meal:['正餐'],               tags:{taste:['清淡'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:219, cat:'连锁品牌', name:'吉野家',     emoji:'🍚', meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
  { id:220, cat:'连锁品牌', name:'萨莉亚',     emoji:'🍝', meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['面'],scene:['一人食','聚餐']} },
  { id:221, cat:'连锁品牌', name:'和府捞面',   emoji:'🍜', meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:222, cat:'连锁品牌', name:'遇见小面',   emoji:'🍜', meal:['正餐','夜宵'],        tags:{taste:['辣'],  meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:223, cat:'连锁品牌', name:'陈香贵牛肉面',emoji:'🍜',meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:224, cat:'连锁品牌', name:'张亮麻辣烫', emoji:'🌶️', meal:['正餐','夜宵'],        tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食']} },
  { id:225, cat:'连锁品牌', name:'杨国福麻辣烫',emoji:'🌶️',meal:['正餐','夜宵'],        tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食']} },
  { id:226, cat:'连锁品牌', name:'海底捞',     emoji:'🍲', meal:['正餐','夜宵'],        tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['聚餐']} },
  { id:227, cat:'连锁品牌', name:'西贝莜面村', emoji:'🍜', meal:['正餐'],               tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['面'],scene:['聚餐']} },
  { id:228, cat:'连锁品牌', name:'太二酸菜鱼', emoji:'🐟', meal:['正餐'],               tags:{taste:['辣','酸'],meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['聚餐']} },
  { id:229, cat:'连锁品牌', name:'蜜雪冰城',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:230, cat:'连锁品牌', name:'瑞幸咖啡',   emoji:'☕', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:231, cat:'连锁品牌', name:'星巴克',     emoji:'☕', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:232, cat:'连锁品牌', name:'喜茶',       emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:233, cat:'连锁品牌', name:'奈雪的茶',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:234, cat:'连锁品牌', name:'茶百道',     emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:235, cat:'连锁品牌', name:'古茗',       emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:236, cat:'连锁品牌', name:'沪上阿姨',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:237, cat:'连锁品牌', name:'绝味鸭脖',   emoji:'🦆', meal:['夜宵'],               tags:{taste:['辣'],  meat:['有肉'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:238, cat:'连锁品牌', name:'周黑鸭',     emoji:'🦆', meal:['夜宵'],               tags:{taste:['辣'],  meat:['有肉'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:239, cat:'连锁品牌', name:'德克士',     emoji:'🍗', meal:['正餐','夜宵'],        tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:240, cat:'连锁品牌', name:'沙县小吃',   emoji:'🍜', meal:['早餐','正餐','夜宵'], tags:{taste:['清淡'],meat:['有肉'],temp:['热食','带汤'],staple:['面','包子饺子'],scene:['一人食']} },
  { id:241, cat:'连锁品牌', name:'一点点',     emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:242, cat:'连锁品牌', name:'霸王茶姬',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:243, cat:'连锁品牌', name:'CoCo都可',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:244, cat:'连锁品牌', name:'书亦烧仙草', emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:245, cat:'连锁品牌', name:'手打柠檬茶', emoji:'🍋', meal:['下午茶'],             tags:{taste:['酸','甜'],meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:246, cat:'连锁品牌', name:'爷爷不泡茶', emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:247, cat:'连锁品牌', name:'茶理宜世',   emoji:'🧋', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:248, cat:'连锁品牌', name:'库迪咖啡',   emoji:'☕', meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:249, cat:'连锁品牌', name:'Manner Coffee',emoji:'☕',meal:['下午茶'],             tags:{taste:['甜'],  meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },

  /* ===== 地方菜 ===== */
  { id:250, cat:'地方菜', name:'回锅肉',       emoji:'🥓', meal:['正餐'],        tags:{taste:['辣','咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:251, cat:'地方菜', name:'麻婆豆腐',     emoji:'🌶️', meal:['正餐'],        tags:{taste:['辣','麻'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:252, cat:'地方菜', name:'水煮鱼',       emoji:'🐟', meal:['正餐'],        tags:{taste:['辣','麻'],meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:253, cat:'地方菜', name:'宫保鸡丁',     emoji:'🍗', meal:['正餐'],        tags:{taste:['辣','甜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:254, cat:'地方菜', name:'白切鸡',       emoji:'🍗', meal:['正餐'],        tags:{taste:['清淡'],  meat:['有肉'],temp:['凉食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:255, cat:'地方菜', name:'烧鹅',         emoji:'🦢', meal:['正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:283, cat:'地方菜', name:'北京烤鸭',     emoji:'🦆', meal:['正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食','聚餐']} },
  { id:256, cat:'地方菜', name:'叉烧',         emoji:'🍖', meal:['正餐'],        tags:{taste:['甜','咸鲜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:257, cat:'地方菜', name:'干炒牛河',     emoji:'🍜', meal:['正餐','夜宵'], tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['粉'],scene:['一人食']} },
  { id:258, cat:'地方菜', name:'剁椒鱼头',     emoji:'🐟', meal:['正餐'],        tags:{taste:['辣'],    meat:['海鲜'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:259, cat:'地方菜', name:'辣椒炒肉',     emoji:'🌶️', meal:['正餐'],        tags:{taste:['辣'],    meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:260, cat:'地方菜', name:'锅包肉',       emoji:'🥓', meal:['正餐'],        tags:{taste:['酸','甜'],meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:261, cat:'地方菜', name:'地三鲜',       emoji:'🍆', meal:['正餐'],        tags:{taste:['咸鲜'],  meat:['纯素'],temp:['热食'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:262, cat:'地方菜', name:'猪肉炖粉条',   emoji:'🥘', meal:['正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['粉','汤'],scene:['一人食','聚餐']} },
  { id:263, cat:'地方菜', name:'羊肉泡馍',     emoji:'🥘', meal:['正餐'],        tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食','带汤'],staple:['饼','汤'],scene:['一人食']} },
  { id:264, cat:'地方菜', name:'肉夹馍',       emoji:'🥙', meal:['早餐','正餐','夜宵'],tags:{taste:['咸鲜'],meat:['有肉'],temp:['热食'],staple:['饼'],scene:['一人食']} },
  { id:265, cat:'地方菜', name:'凉皮',         emoji:'🍜', meal:['正餐','下午茶'],tags:{taste:['辣','酸'],meat:['纯素'],temp:['凉食'],staple:['面'],scene:['一人食']} },
  { id:266, cat:'地方菜', name:'臊子面',       emoji:'🍜', meal:['早餐','正餐'],  tags:{taste:['酸','辣'],meat:['有肉'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:267, cat:'地方菜', name:'新疆大盘鸡',   emoji:'🍗', meal:['正餐'],        tags:{taste:['辣'],    meat:['有肉'],temp:['热食'],staple:['面','米饭'],scene:['一人食','聚餐']} },
  { id:268, cat:'地方菜', name:'烤包子',       emoji:'🥟', meal:['早餐','正餐'],  tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['包子饺子'],scene:['一人食']} },
  { id:269, cat:'地方菜', name:'新疆羊肉串',   emoji:'🍢', meal:['正餐','夜宵'],  tags:{taste:['辣','咸鲜'],meat:['有肉'],temp:['热食'],staple:[],scene:['一人食','聚餐']} },
  { id:270, cat:'地方菜', name:'贵州酸汤鱼',   emoji:'🐟', meal:['正餐'],        tags:{taste:['酸','辣'],meat:['海鲜'],temp:['热食','带汤'],staple:['米饭'],scene:['一人食','聚餐']} },
  { id:272, cat:'地方菜', name:'沙茶面',       emoji:'🍜', meal:['早餐','正餐'],  tags:{taste:['咸鲜'],  meat:['海鲜'],temp:['热食','带汤'],staple:['面'],scene:['一人食']} },
  { id:273, cat:'地方菜', name:'潮汕牛肉丸',   emoji:'🍡', meal:['正餐','夜宵'],  tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:274, cat:'地方菜', name:'潮汕粿条',     emoji:'🍜', meal:['早餐','正餐','夜宵'],tags:{taste:['清淡'],meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:275, cat:'地方菜', name:'蚝烙',         emoji:'🦪', meal:['正餐','夜宵'],  tags:{taste:['咸鲜'],  meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:276, cat:'地方菜', name:'盐酥鸡',       emoji:'🍗', meal:['下午茶','夜宵'],tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:277, cat:'地方菜', name:'蚵仔煎',       emoji:'🍳', meal:['正餐','夜宵'],  tags:{taste:['咸鲜'],  meat:['海鲜'],temp:['热食'],staple:[],scene:['一人食']} },
  { id:278, cat:'地方菜', name:'蟹粉小笼',     emoji:'🥟', meal:['早餐','正餐'],  tags:{taste:['咸鲜'],  meat:['海鲜'],temp:['热食'],staple:['包子饺子'],scene:['一人食','约会']} },
  { id:279, cat:'地方菜', name:'桂花糕',       emoji:'🍮', meal:['下午茶'],       tags:{taste:['甜'],    meat:['纯素'],temp:['凉食'],staple:[],scene:['一人食']} },
  { id:280, cat:'地方菜', name:'云南汽锅鸡',   emoji:'🍲', meal:['正餐'],         tags:{taste:['清淡'],  meat:['有肉'],temp:['热食','带汤'],staple:['汤'],scene:['一人食','聚餐']} },
  { id:281, cat:'地方菜', name:'南宁老友粉',   emoji:'🍜', meal:['早餐','正餐'],  tags:{taste:['酸','辣'],meat:['有肉'],temp:['热食','带汤'],staple:['粉'],scene:['一人食']} },
  { id:282, cat:'地方菜', name:'武汉豆皮',     emoji:'🍥', meal:['早餐','正餐'],  tags:{taste:['咸鲜'],  meat:['有肉'],temp:['热食'],staple:['米饭'],scene:['一人食']} },
];

if (typeof module !== 'undefined' && module.exports) module.exports = FOODS_DATA;
if (typeof window !== 'undefined') window.FOODS_DATA = FOODS_DATA;
