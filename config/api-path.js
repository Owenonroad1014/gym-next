export const API_SERVER = `http://localhost:3001`

// 頭貼的路
export const AVATAR_PATH = `${API_SERVER}/imgs`

// 取得教練的資料 GET
export const COACHES_LIST = `${API_SERVER}/coaches/api`

// 通訊錄: 取得單一項目資料
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_ITEM_GET = `${API_SERVER}/address-book/api`

// 通訊錄: 新增資料 POST
export const AB_ADD_POST = `${API_SERVER}/address-book/api`

// 通訊錄: 刪除項目 DELETE
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_DELETE = `${API_SERVER}/address-book/api`

// 通訊錄: 修改項目 PUT
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_ITEM_PUT = `${API_SERVER}/address-book/api`

// JWT 登入
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`

// Toggle like
// `${API_SERVER}/address-book/toggle-like/${ab_id}`
export const TOGGLE_LIKE = `${API_SERVER}/address-book/toggle-like`

// export const API_SERVER = `http://localhost:3001`;

export const IMG_PATH = `${API_SERVER}/img`

// 取得商品列表的資料 GET
export const PRODUCTS_LIST = `${API_SERVER}/products/api`




//**************** ARTICLE *****************
// 獲取文章列表的資料
export const ARTICLES_LIST = `${API_SERVER}/articles/api`
// 獲取單一文章列表的資料 `${API_SERVER}/api/articles/:articleid`
export const ARTICLE_ITEM = `${API_SERVER}/articles/api`
// 我的最愛 ${API_SERVER}/articles/api/toggle-likes/:article_id
export const ARTICLE_FAV = `${API_SERVER}/articles/api/toggle-likes`

// TOP5
export const ARTICLE_TOP5 = `${API_SERVER}/articles/api/top-five`
// Reccomand /articles/api/recommand/1
export const ARTICLE_RECOMMAND = `${API_SERVER}/articles/api/recommand`

//**************** CHAT  *****************
// 獲取好友列表
export const FRIEND_LIST = `${API_SERVER}/friends/api`
// 獲取好友邀請列表
export const FRIEND_REQ_LIST = `${API_SERVER}/friends/api/invite`

// 好友請求api/request
export const FRIEND_REQUEST = `${API_SERVER}/friends/api/request`