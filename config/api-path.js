
export const API_SERVER = `http://localhost:3005`;


// 頭貼的路由
export const AVATAR_PATH = `${API_SERVER}/imgs`;

// 取得教練的資料 GET
export const COACHES_LIST = `${API_SERVER}/coaches/api`;
// 取得單筆教練資料 GET
export const COACHES_ITEM_GET = `${API_SERVER}/coaches/api`;




// 通訊錄: 新增資料 POST
export const AB_ADD_POST = `${API_SERVER}/address-book/api`;

// 通訊錄: 刪除項目 DELETE
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_DELETE = `${API_SERVER}/address-book/api`;

// 通訊錄: 修改項目 PUT
// `${API_SERVER}/address-book/api/${ab_id}`
export const AB_ITEM_PUT = `${API_SERVER}/address-book/api`;



// JWT 登入
export const JWT_LOGIN_POST = `${API_SERVER}/login-jwt`;

// Toggle like
// `${API_SERVER}/address-book/toggle-like/${ab_id}`
export const TOGGLE_LIKE = `${API_SERVER}/address-book/toggle-like`;


// export const API_SERVER = `http://localhost:3001`;

export const IMG_PATH = `${API_SERVER}/img`;

// 取得商品列表的資料 GET
export const PRODUCTS_LIST = `${API_SERVER}/products/api`;

