-- 創建教練資料表
CREATE TABLE coaches (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    title VARCHAR(100) DEFAULT NULL,
    skill VARCHAR(50) DEFAULT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) DEFAULT NULL,
    description TEXT,
    location_id INT NOT NULL,
    avatar VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (location_id) REFERENCES locations(id)
);

-- 創建教練證照資料表
CREATE TABLE coach_certifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coach_id INT NOT NULL,
    certification VARCHAR(255) NOT NULL,
    issue_date DATE DEFAULT NULL,
    FOREIGN KEY (coach_id) REFERENCES coaches(id)
);

-- 創建教練社群媒體資料表
CREATE TABLE coach_social_media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    coach_id INT NOT NULL,
    platform VARCHAR(50) NOT NULL,
    url VARCHAR(255) NOT NULL,
    FOREIGN KEY (coach_id) REFERENCES coaches(id)
);


INSERT INTO coaches (id, name, title, skill, email, phone, description, location_id, avatar) VALUES
(1, '張育瑄', '專業瑜珈教練', '瑜珈', 'yuhsuan.chang@email.com', '0912-345-678', '專業瑜珈教練，擁有10年教學經驗', 1, 'coach1.jpg'),
(2, '林明宏', '重量訓練教練', '重訓', 'minghong.lin@email.com', '0923-456-789', '資深重訓教練，專注於肌力訓練', 2, 'coach2.jpg'),
(3, '王雅婷', '有氧舞蹈教練', '舞蹈', 'yating.wang@email.com', '0934-567-890', '專業舞蹈老師，擅長帶動課堂氣氛', 3, 'coach3.jpg'),
(4, '李志豪', '功能性訓練教練', '綜合訓練', 'zhihao.lee@email.com', '0945-678-901', '運動科學碩士，專注於姿勢矯正', 4, 'coach4.jpg'),
(5, '陳思穎', '皮拉提斯教練', '皮拉提斯', 'siying.chen@email.com', '0956-789-012', '專精於核心訓練與體態調整', 1, 'coach5.jpg'),
(6, '黃建志', 'TRX教練', 'TRX與懸吊訓練', 'jianzhi.huang@email.com', '0967-890-123', '專業TRX認證教練，專精於核心訓練與全身性肌力訓練', 2, 'coach1.jpg'),
(7, '楊曉芬', '心肺訓練教練', '心肺訓練', 'xiaofen.yang@email.com', '0978-901-234', '運動生理學碩士，專精於心肺耐力提升與體能訓練', 3, 'coach2.jpg'),
(8, '許志明', '飛輪教練', '飛輪', 'zhiming.xu@email.com', '0989-012-345', '資深飛輪教練，擅長帶動課程氣氛，規劃完整的心肺訓練', 4, 'coach3.jpg'),
(9, '周美玲', '舞蹈治療師', '舞蹈治療', 'meiling.zhou@email.com', '0990-123-456', '舞蹈治療碩士，結合舞蹈與心理諮商，協助學員釋放壓力', 1, 'coach4.jpg'),
(10, '蔡文傑', '運動防護教練', '運動防護', 'wenjie.cai@email.com', '0901-234-567', '專業物理治療師，專注於運動傷害預防與康復訓練', 2, 'coach5.jpg'),
(11, '郭雅文', '瑜珈教練', '陰陽瑜珈', 'yawen.kuo@email.com', '0912-111-222', '專精於陰陽瑜珈教學，擅長幫助學員找到身心平衡', 3, 'coach1.jpg'),
(12, '趙家偉', '運動復健教練', '復健訓練', 'jiawei.zhao@email.com', '0923-222-333', '專業物理治療背景，專注於運動傷害復健與預防', 4, 'coach2.jpg'),
(13, '林芳儀', '有氧教練', '韻律有氧', 'fangyi.lin@email.com', '0934-333-444', '擅長帶領韻律有氧課程，課程氣氛活潑富有動感', 1, 'coach3.jpg'),
(14, '張書豪', '拳擊教練', '拳擊格鬥', 'shuhao.zhang@email.com', '0945-444-555', '職業拳擊選手背景，專精於拳擊技巧教學', 2, 'coach4.jpg'),
(15, '謝佳玲', '皮拉提斯教練', '器械皮拉提斯', 'jialing.xie@email.com', '0956-555-666', '專精於皮拉提斯器械課程，注重姿勢細節指導', 3, 'coach5.jpg'),
(16, '劉威廷', '重量訓練教練', '健美訓練', 'weiting.liu@email.com', '0967-666-777', '健美選手出身，專注於肌肉雕塑與體態調整', 4, 'coach1.jpg'),
(17, '洪靜怡', '舞蹈教練', '街舞', 'jingyi.hong@email.com', '0978-777-888', '專業街舞老師，擅長帶領各種風格的街舞課程', 1, 'coach2.jpg'),
(18, '鄭博文', '飛輪教練', '節奏飛輪', 'bowen.zheng@email.com', '0989-888-999', '熱情活力的飛輪教練，善於掌握音樂節奏', 2, 'coach3.jpg'),
(19, '游心怡', '瑜珈教練', '香氛瑜珈', 'xinyi.you@email.com', '0990-999-000', '結合芳香療法的瑜珈課程，帶來身心靈的平靜', 3, 'coach4.jpg'),
(20, '吳英傑', 'TRX教練', 'TRX懸吊訓練', 'yingjie.wu@email.com', '0901-000-111', '資深TRX認證教練，專精於核心訓練與體能提升', 4, 'coach5.jpg');

INSERT INTO coach_certifications (coach_id, certification, issue_date) VALUES
-- 瑜珈教練證照
(1, '國際瑜珈教練認證', '2023-01-15'),
(1, '高級瑜珈師資培訓證書', '2023-06-20'),
(1, '冥想導師認證', '2024-01-10'),

-- 重訓教練證照
(2, 'NSCA-CSCS重量訓練認證', '2023-03-10'),
(2, 'ACE私人教練證照', '2023-08-15'),
(2, '運動營養師認證', '2024-02-20'),

-- 舞蹈教練證照
(3, '國際舞蹈教師認證', '2023-05-01'),
(3, '有氧舞蹈指導員證照', '2023-09-15'),
(3, '團體課程指導認證', '2024-01-20'),

-- 功能性訓練教練證照
(4, '運動科學碩士學位認證', '2023-04-10'),
(4, '功能性訓練專業認證', '2023-10-15'),
(4, '姿勢矯正專家認證', '2024-02-15'),

-- 皮拉提斯教練證照
(5, 'STOTT PILATES認證', '2023-06-15'),
(5, '器械皮拉提斯指導證照', '2023-11-20'),
(5, '體態調整專業認證', '2024-03-10'),

-- TRX教練證照
(6, 'TRX懸吊訓練指導認證', '2023-07-10'),
(6, '核心訓練專業證照', '2023-12-15'),
(6, '功能性體適能認證', '2024-03-20'),

-- 心肺訓練教練證照
(7, '運動生理學專業認證', '2023-08-05'),
(7, '心肺訓練指導員認證', '2024-01-10'),
(7, 'HIIT訓練認證', '2024-04-15'),

-- 飛輪教練證照
(8, 'Spinning指導員認證', '2023-09-01'),
(8, '室內自行車教練證照', '2024-02-05'),
(8, '心率區間訓練認證', '2024-05-10'),

-- 舞蹈治療師證照
(9, '舞蹈治療師認證', '2023-10-05'),
(9, '身心靈整合治療認證', '2024-03-01'),
(9, '表達性藝術治療證照', '2024-06-15'),

-- 運動防護教練證照
(10, '運動防護員認證', '2023-11-10'),
(10, '物理治療師證照', '2024-04-05'),
(10, '運動傷害預防認證', '2024-07-20'),

-- 瑜珈教練(陰陽瑜珈)證照
(11, '陰陽瑜珈指導認證', '2023-12-01'),
(11, '瑜珈治療師認證', '2024-05-01'),
(11, '冥想指導師認證', '2024-08-15'),

-- 運動復健教練證照
(12, '運動復健治療師認證', '2024-01-05'),
(12, '物理治療專業認證', '2024-06-10'),
(12, '康復訓練指導認證', '2024-09-20'),

-- 有氧教練證照
(13, '韻律有氧指導認證', '2024-02-10'),
(13, '團體課程指導證照', '2024-07-15'),
(13, '舞蹈有氧認證', '2024-10-25'),

-- 拳擊教練證照
(14, '職業拳擊教練認證', '2024-03-15'),
(14, '搏擊技巧指導證照', '2024-08-20'),
(14, '體能訓練專業認證', '2024-11-30'),

-- 皮拉提斯器械教練證照
(15, '器械皮拉提斯高級認證', '2024-04-20'),
(15, '皮拉提斯治療師認證', '2024-09-25'),
(15, '姿勢矯正專家認證', '2024-12-05'),

-- 健美訓練教練證照
(16, 'IFBB健美教練認證', '2024-05-25'),
(16, '肌力訓練專業證照', '2024-10-30'),
(16, '運動營養顧問認證', '2025-01-10'),

-- 街舞教練證照
(17, '街舞指導專業認證', '2024-06-30'),
(17, '舞蹈編排認證', '2024-11-05'),
(17, '青少年舞蹈教學認證', '2025-02-15'),

-- 飛輪教練(節奏飛輪)證照
(18, '節奏飛輪指導認證', '2024-07-05'),
(18, '音樂節奏訓練認證', '2024-12-10'),
(18, '有氧訓練專業證照', '2025-03-20'),

-- 香氛瑜珈教練證照
(19, '香氛瑜珈指導認證', '2024-08-10'),
(19, '芳療師認證', '2024-12-15'),
(19, '靜心指導師認證', '2025-03-25'),

-- TRX教練證照
(20, 'TRX高級教練認證', '2024-09-15'),
(20, '懸吊訓練專業證照', '2024-12-20'),
(20, '功能性訓練指導認證', '2025-03-28');

INSERT INTO coach_social_media (coach_id, platform, url) VALUES
-- 張育瑄教練
(1, 'facebook', 'https://facebook.com/yuhsuan.chang'),
(1, 'instagram', 'https://instagram.com/yuhsuan.yoga'),
(1, 'twitter', 'https://twitter.com/yuhsuan_chang'),
(1, 'linkedin', 'https://linkedin.com/in/yuhsuan-chang'),

-- 林明宏教練
(2, 'facebook', 'https://facebook.com/minghong.lin'),
(2, 'instagram', 'https://instagram.com/minghong.fit'),
(2, 'twitter', 'https://twitter.com/minghong_fit'),
(2, 'linkedin', 'https://linkedin.com/in/minghong-lin'),

-- 王雅婷教練
(3, 'facebook', 'https://facebook.com/yating.wang'),
(3, 'instagram', 'https://instagram.com/yating.dance'),
(3, 'twitter', 'https://twitter.com/yating_dance'),
(3, 'linkedin', 'https://linkedin.com/in/yating-wang'),

-- 李志豪教練
(4, 'facebook', 'https://facebook.com/zhihao.lee'),
(4, 'instagram', 'https://instagram.com/zhihao.fitness'),
(4, 'twitter', 'https://twitter.com/zhihao_lee'),
(4, 'linkedin', 'https://linkedin.com/in/zhihao-lee'),

-- 陳思穎教練
(5, 'facebook', 'https://facebook.com/siying.chen'),
(5, 'instagram', 'https://instagram.com/siying.pilates'),
(5, 'twitter', 'https://twitter.com/siying_chen'),
(5, 'linkedin', 'https://linkedin.com/in/siying-chen'),

-- 黃建志教練
(6, 'facebook', 'https://facebook.com/jianzhi.huang'),
(6, 'instagram', 'https://instagram.com/jianzhi.trx'),
(6, 'twitter', 'https://twitter.com/jianzhi_huang'),
(6, 'linkedin', 'https://linkedin.com/in/jianzhi-huang'),

-- 楊曉芬教練
(7, 'facebook', 'https://facebook.com/xiaofen.yang'),
(7, 'instagram', 'https://instagram.com/xiaofen.cardio'),
(7, 'twitter', 'https://twitter.com/xiaofen_yang'),
(7, 'linkedin', 'https://linkedin.com/in/xiaofen-yang'),

-- 許志明教練
(8, 'facebook', 'https://facebook.com/zhiming.xu'),
(8, 'instagram', 'https://instagram.com/zhiming.spin'),
(8, 'twitter', 'https://twitter.com/zhiming_xu'),
(8, 'linkedin', 'https://linkedin.com/in/zhiming-xu'),

-- 周美玲教練
(9, 'facebook', 'https://facebook.com/meiling.zhou'),
(9, 'instagram', 'https://instagram.com/meiling.dance'),
(9, 'twitter', 'https://twitter.com/meiling_zhou'),
(9, 'linkedin', 'https://linkedin.com/in/meiling-zhou'),

-- 蔡文傑教練
(10, 'facebook', 'https://facebook.com/wenjie.cai'),
(10, 'instagram', 'https://instagram.com/wenjie.rehab'),
(10, 'twitter', 'https://twitter.com/wenjie_cai'),
(10, 'linkedin', 'https://linkedin.com/in/wenjie-cai'),

-- 郭雅文教練
(11, 'facebook', 'https://facebook.com/yawen.kuo'),
(11, 'instagram', 'https://instagram.com/yawen.yoga'),
(11, 'twitter', 'https://twitter.com/yawen_kuo'),
(11, 'linkedin', 'https://linkedin.com/in/yawen-kuo'),

-- 趙家偉教練
(12, 'facebook', 'https://facebook.com/jiawei.zhao'),
(12, 'instagram', 'https://instagram.com/jiawei.rehab'),
(12, 'twitter', 'https://twitter.com/jiawei_zhao'),
(12, 'linkedin', 'https://linkedin.com/in/jiawei-zhao'),

-- 林芳儀教練
(13, 'facebook', 'https://facebook.com/fangyi.lin'),
(13, 'instagram', 'https://instagram.com/fangyi.aerobic'),
(13, 'twitter', 'https://twitter.com/fangyi_lin'),
(13, 'linkedin', 'https://linkedin.com/in/fangyi-lin'),

-- 張書豪教練
(14, 'facebook', 'https://facebook.com/shuhao.zhang'),
(14, 'instagram', 'https://instagram.com/shuhao.boxing'),
(14, 'twitter', 'https://twitter.com/shuhao_zhang'),
(14, 'linkedin', 'https://linkedin.com/in/shuhao-zhang'),

-- 謝佳玲教練
(15, 'facebook', 'https://facebook.com/jialing.xie'),
(15, 'instagram', 'https://instagram.com/jialing.pilates'),
(15, 'twitter', 'https://twitter.com/jialing_xie'),
(15, 'linkedin', 'https://linkedin.com/in/jialing-xie'),

-- 劉威廷教練
(16, 'facebook', 'https://facebook.com/weiting.liu'),
(16, 'instagram', 'https://instagram.com/weiting.fitness'),
(16, 'twitter', 'https://twitter.com/weiting_liu'),
(16, 'linkedin', 'https://linkedin.com/in/weiting-liu'),

-- 洪靜怡教練
(17, 'facebook', 'https://facebook.com/jingyi.hong'),
(17, 'instagram', 'https://instagram.com/jingyi.dance'),
(17, 'twitter', 'https://twitter.com/jingyi_hong'),
(17, 'linkedin', 'https://linkedin.com/in/jingyi-hong'),

-- 鄭博文教練
(18, 'facebook', 'https://facebook.com/bowen.zheng'),
(18, 'instagram', 'https://instagram.com/bowen.spinning'),
(18, 'twitter', 'https://twitter.com/bowen_zheng'),
(18, 'linkedin', 'https://linkedin.com/in/bowen-zheng'),

-- 游心怡教練
(19, 'facebook', 'https://facebook.com/xinyi.you'),
(19, 'instagram', 'https://instagram.com/xinyi.yoga'),
(19, 'twitter', 'https://twitter.com/xinyi_you'),
(19, 'linkedin', 'https://linkedin.com/in/xinyi-you'),

-- 吳英傑教練
(20, 'facebook', 'https://facebook.com/yingjie.wu'),
(20, 'instagram', 'https://instagram.com/yingjie.trx'),
(20, 'twitter', 'https://twitter.com/yingjie_wu'),
(20, 'linkedin', 'https://linkedin.com/in/yingjie-wu');
