export const API_SERVER = `http://localhost:3005`

// 頭貼的路由
export const AVATAR_PATH = `${API_SERVER}/img/avatar`

// 註冊路由
export const REGISTER_POST = `${API_SERVER}/register/api`
// 註冊後填寫資料路由
export const REGISTER_PROFILE_POST = `${API_SERVER}/register/api/profile`

// 教練 地圖 照片路由
export const IMGS_PATH = `${API_SERVER}/imgs`

// 取得教練的資料 GET
export const COACHES_LIST = `${API_SERVER}/coaches/api`
// 取得單筆教練資料 GET
export const COACHES_ITEM_GET = `${API_SERVER}/coaches/api`
// 取得教練課程資料
export const COACHES_CLASSES = `${API_SERVER}/coaches/api`

// 取得課程的資料 GET
export const CLASSES_LIST = `${API_SERVER}/classes/api`

// 取得課程人數限制 GET
export const CLASSES_CAPACITY_GET = `${API_SERVER}/classes/api`

// 送出課程預約 POST
export const CLASSES_RESERVATION_POST = `${API_SERVER}/classes/api/reservations`

// 取得課程分類 GET
export const CLASSES_CATEGORY_GET = `${API_SERVER}/classes/class_categories/api`

// 取得分店資料
export const LOCATIONS_LIST = `${API_SERVER}/locations/api`

// 通訊錄: 修改項目 PUT
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_ITEM_PUT = `${API_SERVER}/address-book/api`

// JWT 登入
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// Toggle like
// `${API_SERVER}/address-book/toggle-like/${ab_id}`
export const TOGGLE_LIKE = `${API_SERVER}/address-book/toggle-like`

// export const API_SERVER = `http://localhost:3001`;

export const IMG_PATH = `${API_SERVER}/img`;



//影片路由
export const VIDEOS_LIST = `${API_SERVER}/videos/api`;
export const VIDEOS_LIST_TOGGLE_LIKE = `${API_SERVER}/videos/api/toggle-like`;

//商品評價路由
export const REVIEWS_LIST = `${API_SERVER}/products/api/review`;

export const SUBMIT_REVIEW_API= `${API_SERVER}/products/api/add-review`;

export const EDIT_REVIEW_API = `${API_SERVER}/products/api/edit-review`;

export const PENDING_REVIEWS_LIST= `${API_SERVER}/products/api/review/pending`;



// 取得商品列表的資料 GET
export const PRODUCTS_LIST = `${API_SERVER}/products/api`

export const PRODUCTS_LIST_FAV = `${API_SERVER}/products`;

// 獲取用戶收藏商品列表
export const FAVORITES_LIST = `${API_SERVER}/favorites/api`;

export const PRODUCTS_LIST_TOGGLE_LIKE = `${API_SERVER}/products/api/toggle-like`;


// 取得訂單列表的資料 
export const ORDERS_LIST = `${API_SERVER}/carts/api`;
//
// export const ecpay = `${API_SERVER}/ecpay-test-only/api`;


//**************** ARTICLE *****************
// 獲取文章列表的資料
export const ARTICLES_LIST = `${API_SERVER}/articles/api`
// 獲取單一文章列表的資料 `${API_SERVER}/api/articles/:articleid`
export const ARTICLE_ITEM = `${API_SERVER}/articles/api`
// TOP5
export const ARTICLE_TOP5 = `${API_SERVER}/articles/api/top-five`
// Reccomand /articles/api/recommand/1
export const ARTICLE_RECOMMAND = `${API_SERVER}/articles/api/recommand`
// 所有文章我的最愛/api/fav
export const ARTICLE_ALL_FAV = `${API_SERVER}/articles/api/fav`
// 單一文章我的最愛/api/fav/:articleid
export const ARTICLE_ITEM_FAV = `${API_SERVER}/articles/api/fav`
// 單一文章我的最愛/api/fav/:articleid
export const ARTICLE_ITEM_FAVTOGGLE = `${API_SERVER}/articles/api/favToggle`

// 我的最愛 ${API_SERVER}/articles/api/toggle-likes/:article_id
export const ARTICLE_FAV = `${API_SERVER}/articles/api/toggle-likes`

//**************** GYMFRIEND  *****************
// 獲取GYM友列表
export const GYMFRIEND_LIST = `${API_SERVER}/gymfriends/api`

//**************** MYFRIEND  *****************
// 獲取好友列表
export const FRIEND_LIST = `${API_SERVER}/friends/api`
// 獲取好友邀請列表
export const FRIEND_REQ_LIST = `${API_SERVER}/friends/api/invite`
// 刪除好友
export const FRIEND_DELETE = `${API_SERVER}/friends/api/delete`
// 好友請求api/request
export const FRIEND_REQUEST = `${API_SERVER}/friends/api/request`
// 接受好友邀請api
export const FRIEND_ACCEPT = `${API_SERVER}/friends/api/accept`
// 拒絕好友邀請api
export const FRIEND_REJECT = `${API_SERVER}/friends/api/reject`

//**************** CHAT  *****************
// 獲取聊天室列表
export const CHATS_LIST = `${API_SERVER}/chats/api`
// 獲取指定單一聊天室 chats/api/:chatroomid
export const CHATS_ITEM = `${API_SERVER}/chats/api`
// 獲取聊天室訊息 /api/chatroom/:chatroomid
export const CHATS_MSG = `${API_SERVER}/chats/api/chatroom`
// 新增聊天訊息
export const SEND_MSG = `${API_SERVER}/chats/api/sendMsg`
// 刪除聊天室
export const DELETE_CHAT = `${API_SERVER}/chats/api/deleteChatroom`
