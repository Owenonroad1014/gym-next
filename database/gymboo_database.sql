-- drop database gymboo;

create database gymboo;
use gymboo;

# 會員
CREATE TABLE `member` (
  `member_id` int NOT NULL PRIMARY KEY,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `google_uid` varchar(255)  DEFAULT NULL,
  `password_hash` varchar(255)  NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;
INSERT INTO `member` (`member_id`, `name`, `email`, `google_uid`, `password_hash`, `created_at`, `update_at`) VALUES
(1, '陳小明', 'owen@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-18 18:09:15'),
(2, '林一美', 'jing@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-18 18:09:20'),
(3, '劉秀杰', 'hsin@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-30 13:21:28'),
(4, '王名強', 'ching@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-18 18:09:32'),
(5, '李小華', 'yang@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-18 18:09:38'),
(6, '張營芳', 'user6@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-16 17:43:45'),
(7, '黃嚴婷', 'user7@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-16 17:43:45'),
(8, '趙禮志', 'user8@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-16 17:43:45'),
(9, '許新麗', 'user9@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-16 17:43:45'),
(10, '周成宏', 'user10@example.com', NULL, '$2b$10$Op2jWHwdvd8v.DPYXRov5O.nssk9zdwn61R6bre4vxgsv8Jc/5x.C', '2025-03-16 17:43:45', '2025-03-16 17:43:45');

ALTER TABLE `member`
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `google_uid` (`google_uid`);
ALTER TABLE `member`
  MODIFY `member_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

# 會員詳細資料表
CREATE TABLE `member_profile` (
  `profile_id` int NOT NULL PRIMARY KEY,
  `member_id` int NOT NULL,
  `avatar` varchar(500)  DEFAULT NULL,
  `sex` enum('male','female') DEFAULT NULL,
  `mobile` varchar(15) DEFAULT NULL,
  `intro` varchar(300)  DEFAULT '我熱愛各種運動健身項目，快來找我一起運動吧!',
  `item` varchar(25) DEFAULT NULL,
  `goal` set('增肌','減脂','提高耐力','增強體能','健康維持','提高核心能量') DEFAULT NULL,
  `status` int NOT NULL DEFAULT '0',
  `add_status` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;
INSERT INTO `member_profile` (`profile_id`, `member_id`, `avatar`, `sex`, `mobile`, `intro`, `item`, `goal`, `status`, `add_status`, `created_at`, `update_at`) VALUES
(1, 1, 'avatar-6.jpg', 'male', '0912345678', '健身是我生活的一部分，無論是重訓還是慢跑，我都樂在其中，歡迎與我一起運動！', '跑步', '增肌,健康維持', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:28:26'),
(2, 2, 'avatar-1.jpg', 'female', '0923456789', '瑜伽讓我保持平衡與放鬆，我熱愛挑戰高難度體式，期待與同好們一起交流心得！', '瑜伽', '減脂,健康維持', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:28:33'),
(3, 3, 'avatar-7.jpg', 'male', '0934567890', '身為鐵人三項愛好者，我喜歡游泳、騎車與長跑的組合，希望能與志同道合的夥伴一起訓練！', '游泳', '提高耐力,增強體能', 0, 1, '2025-03-15 17:43:45', '2025-03-28 02:23:30'),
(4, 4, 'avatar-8.jpg', 'male', '0945678901', '健身房是我的第二個家，我每天都在挑戰更高的重量與更強的自己，歡迎一起鍛鍊！', '重訓', '增肌', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:28:44'),
(5, 5, 'avatar-2.jpg', 'female', '0956789012', '馬拉松是我的熱情，我熱愛長距離跑步，每次挑戰新紀錄都讓我充滿成就感！', '跑步', '提高耐力', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:28:50'),
(6, 6, 'avatar-3.jpg', 'female', '0967890123', '舉重讓我變得更強壯，我專注於核心訓練與肌力發展，希望能與更多人交流經驗！', '舉重', '增肌,提高核心能量', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:28:57'),
(7, 7, 'avatar-4.jpg', 'female', '0978901234', '舞蹈是我的熱愛，我透過舞蹈訓練柔軟度與耐力，希望找到志同道合的夥伴一起跳舞！', '舞蹈', '健康維持', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:29:02'),
(8, 8, 'avatar-10.jpg', 'male', '0989012345', '登山讓我放鬆身心，挑戰不同高度的山峰是我的目標，希望能與夥伴們一起享受大自然！', '登山', '增強體能', 1, 1, '2025-03-15 17:43:45', '2025-03-18 17:02:40'),
(9, 9, 'avatar-5.jpg', 'female', '0990123456', '健美是一種生活態度，我嚴格控管飲食與訓練，努力雕塑完美體態，期待與你交流！', '健美', '增肌,健康維持', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:29:13'),
(10, 10, 'avatar-9.jpg', 'male', '0901234567', '我是健身新手，剛開始學習如何正確訓練，希望能找到夥伴一起成長進步！', '重訓', '增肌,減脂', 1, 1, '2025-03-15 17:43:45', '2025-03-18 06:29:18');

ALTER TABLE `member_profile`
  MODIFY `profile_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
  
  
# 文章
CREATE TABLE articles (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  intro TEXT,
  content TEXT NOT NULL,
  imageURL VARCHAR(255),
  category_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  views INT DEFAULT 0
);

CREATE TABLE article_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  parent_id INT DEFAULT NULL,  -- 父分類 ID（NULL 為大分類，非 NULL 為小分類）
  FOREIGN KEY (parent_id) REFERENCES article_categories(id) ON DELETE CASCADE
);
CREATE TABLE article_favorites (
  like_id INT AUTO_INCREMENT PRIMARY KEY,
  member_id INT NOT NULL,
  article_id INT NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);

INSERT INTO article_categories (id, name, parent_id) VALUES
(1, '健身', NULL),
(2, '飲食', NULL),
(3, 'GYM友怎麼做', NULL),
(4, '健身基礎與入門', 1),
(5, '燃脂與減重', 1),
(6, '增肌與力量訓練', 1),
(7, '有氧與心肺運動', 1),
(8, '訓練計劃與挑戰', 1),
(9, '運動傷害與恢復', 1),
(10, '健康維持', 1),
(11, '素食專區', 2),
(12, '飲食營養', 2),
(13, '名人專訪', 3),
(14, '資深GYM友', 3);



INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at)
VALUES
(1, '揭開健身與飲食間的神秘聯繫，輕鬆達成理想身形！', '健身是一個改變生活方式的過程，無論是為了增強體能、提高健康水平，還是簡單地希望擁有更好的外觀。對於初學者來說，開始健身可能會感覺有些困難，因為健身的選擇和資訊琳瑯滿目。然而，只要掌握一些基本原則和步驟，你就能夠在這條道路上順利啟航。這篇文章將為你提供一個清晰的健身入門指南，幫助你輕鬆開始健身並建立長期的健身習慣。', 
'<ol><li><span>1.設定明確的目標</span><p>在開始健身之前，首先需要確定你的目標。你希望減脂、增肌還是提升心肺功能？不同的目標將指導你選擇合適的訓練方式和飲食計劃。減脂：這通常包括有氧運動（如跑步、騎行、游泳）和強度訓練（如重量訓練）結合的方式，並配合健康的飲食，達到減少脂肪的效果。增肌：增肌訓練則側重於重量訓練，通過高強度的力量訓練刺激肌肉增長，並通過高蛋白飲食來促進肌肉修復與增生。提升心肺功能：這通常包括有氧運動，如跑步、游泳、跳繩等，旨在提高你的心肺耐力和體能。設定清晰的健身目標能幫助你保持動力，並讓你在健身過程中有更具體的方向。</p></li><li><span>2.從基礎開始</span>如果你是初學者，無需一開始就投入極端的健身計劃。從基礎的動作和簡單的運動開始，讓你的身體逐漸適應訓練，這樣能有效避免受傷。體能測試：開始健身前，可以先進行簡單的體能測試，了解自己的基礎體能狀況。測試項目可以包括跑步的持久度、最大推舉重量、仰臥起坐或俯臥撐的次數等。簡單的全身性運動：對於初學者，推薦全身性的運動，這樣能幫助你逐步強化不同肌群，改善你的協調性和力量。例如，徒手深蹲、伏地挺身、仰臥起坐等基礎運動非常適合初學者，這些運動不僅能鍛煉核心肌群，還能改善心肺功能，並且不需要任何額外的器材。</li><li><span>3.計劃一個循序漸進的訓練計劃</span>對於健身初學者來說，一個循序漸進的訓練計劃非常重要。你不應該一開始就過度訓練，而是應該從較低強度的訓練開始，並逐漸增加訓練強度和時間。例如：第一週：每週進行2到3次簡單的全身性鍛煉，每次訓練時間為20到30分鐘。重點是學習正確的姿勢和動作。第二週：逐漸增加訓練時間或訓練強度。可以將訓練次數增加到每週4次，並開始嘗試一些更具挑戰性的動作。第三週及以後：根據你的進展，可以開始增加重量訓練、提高有氧運動的時間，或是挑戰更高強度的運動。記住，逐漸增加訓練強度，並且不要急於求成。身體需要時間來適應，過度訓練會增加受傷風險。</li><li><span>4.健身與飲食密切相關</span>健身的成果不僅來自訓練，飲食在其中扮演著至關重要的角色。你的飲食應該與你的健身目標相匹配。增肌飲食：如果你的目標是增肌，則需要確保你的飲食中含有足夠的蛋白質（如雞胸肉、魚類、蛋白粉等），並保持一定的碳水化合物攝入以供能。減脂飲食：如果你的目標是減脂，那麼需要減少熱量的攝入，特別是精緻碳水化合物和高糖食品。同時，增加蛋白質的攝入，這樣可以幫助維持肌肉量，避免肌肉流失。平衡膳食：對於一般的健身愛好者，保持一個營養均衡的飲食非常重要。每日的飲食應該包含足夠的蛋白質、健康的脂肪和充足的碳水化合物，並多吃蔬菜和水果。飲食方面的建議包括：減少加工食品、糖分和高脂肪食品的攝入。多吃富含蛋白質的食物，這對於肌肉的修復和增長至關重要。保持良好的水分攝入，每天喝足夠的水來維持體內水分平衡。</li><li><span>5.適度休息與恢復</span>在健身過程中，休息與恢復同樣重要。過度訓練而缺乏足夠的休息會導致疲勞、肌肉拉傷或過度疲勞。初學者應該給自己足夠的休息時間，讓肌肉在訓練後有足夠的時間修復。每週休息日：每週安排1到2天的休息日，以便讓身體恢復並進行修復。充足的睡眠：健身效果的提升和肌肉生長大多發生在睡眠期間，保證每晚7到9小時的高質量睡眠，有助於促進恢復。拉伸與放鬆：每次訓練後進行拉伸，能夠幫助肌肉放鬆，減少僵硬和緊繃感。</li><li><span>6.堅持和調整</span>健身是一個長期的過程，成功的關鍵在於堅持。初學者往往會因為短期內沒有看到顯著的成果而感到沮喪，這時候要記住，持之以恆的努力會帶來改變。追踪進度：你可以使用健身日誌來記錄每次的訓練計劃和感受，這有助於你觀察自己的進展並調整計劃。定期評估目標：每隔一段時間（例如每月），回顧一次自己的健身目標，看看是否需要調整訓練計劃或者飲食習慣。</li><li><span>結語</span>健身是一條充滿挑戰的旅程，但只要你能保持耐心、設定合理的目標並堅持下去，最終你會看到令人驚喜的成果。對於初學者來說，從簡單的運動開始，循序漸進，並配合健康的飲食，能夠有效幫助你達到目標。記住，持之以恆的努力和正確的訓練方法，將是你成功的關鍵。讓我們一起開始這段健身之旅吧！</li></ol>', 4, 0, '/imgs/article/article01.jpg', '2025-3-10'),
(2, '燃脂速度翻倍！高效運動方式助你迅速甩掉脂肪', '在現代社會，許多人都渴望擁有健康的體魄和理想的身材，而有效的燃脂運動成為了許多人日常健身的核心之一。然而，並非所有的運動方式都能達到相同的燃脂效果。要在短時間內迅速甩掉脂肪，我們需要選擇一些高效、科學的運動方式，並且合理搭配飲食，讓燃脂速度翻倍。', 
'<ol><li><span>1.高強度間歇訓練（HIIT）</span>高強度間歇訓練（HIIT）被認為是目前最有效的燃脂運動之一。這種訓練方式通常是以短時間內進行全力運動，然後休息幾秒鐘，再重複進行。研究顯示，HIIT訓練能在短短的20到30分鐘內大幅提高脂肪燃燒率，並且能在運動後繼續燃燒脂肪數小時，這就是所謂的「後燃效應」（EPOC，運動後過度氧消耗）。HIIT的好處在於它不僅能夠迅速提高新陳代謝，還能夠在短時間內達到大量消耗卡路里的效果。無論是跑步、騎自行車還是做俯臥撐，這些動作都可以融入HIIT訓練中，讓運動變得多樣化而不單調。</li><li><span>2.跨訓練（Cross-Training）</span>跨訓練是一種將多種運動方式結合在一起的訓練方法，可以讓你同時增強力量、耐力和靈活性。這種訓練不僅能增加燃脂效果，還能避免因為長時間重複單一運動而導致的運動傷害。常見的跨訓練方式包括跑步與騎行結合，或是結合瑜伽、游泳等不同項目的運動，這些訓練可以幫助你改善心肺功能，同時達到減脂的效果。</li><li><span>3.力量訓練</span>力量訓練不僅能幫助你增強肌肉，還能在日常生活中提高新陳代謝率，從而有助於長期燃脂。與有氧運動相比，力量訓練雖然不會在短時間內大量消耗卡路里，但它能夠提高肌肉量，進而提升靜息代謝率，這樣即使在休息狀態下，你的身體也能持續燃燒脂肪。最常見的力量訓練方式有舉重、俯臥撐、深蹲等。</li><li><span>4.增加日常活動量</span>除了進行專門的燃脂運動，日常生活中的活動量也對燃脂效果有著重要影響。無論是多走幾步、爬樓梯還是做家務，這些都能增加你的日常熱量消耗。事實上，許多專家認為，增加日常活動量比進行專門的運動更加重要，因為它有助於保持長期的熱量赤字，並能提高基礎代謝率。</li><li><span>結語</span>無論你是為了減脂還是增肌，高效的運動方式都是幫助你達成目標的關鍵。通過選擇適合自己的高強度間歇訓練、跨訓練或力量訓練等方式，加上良好的飲食習慣和生活方式，你將能夠實現你的健身目標，迅速甩掉脂肪，迎來更健康的體魄。</li></ol>', 4, 0, '/imgs/article/article02.jpg', '2025-3-12');
INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at)
VALUES
(3, '專家級增肌飲食秘訣，打造理想肌肉線條', '對於許多人來說，增肌不僅僅是每週幾次的健身訓練。事實上，飲食在增肌過程中佔據了至關重要的地位。正確的飲食策略能夠為肌肉生長提供所需的能量和營養，同時加速恢復和提升運動表現。如果你希望打造理想的肌肉線條，專家級的增肌飲食秘訣是你不可忽視的關鍵。', 
'<ol><li><span>1.確保足夠的蛋白質攝取</span>蛋白質是增肌過程中的基石，它是構建和修復肌肉纖維的主要元素。每次訓練後，肌肉會遭受微小的損傷，而蛋白質則有助於修復這些損傷並促使肌肉生長。對於大多數健身者來說，建議每天每公斤體重攝取1.6到2.2克的蛋白質。<br/>優質的蛋白質來源包括：雞胸肉火雞魚（如鮭魚、鯖魚等）蛋白粉（如果你難以從食物中獲取足夠的蛋白質）豆類（如黑豆、紅豆等）這些蛋白質來源提供了人體所需的必需氨基酸，有助於增肌效果最大化。</li><li><span>2.攝取足夠的碳水化合物</span>碳水化合物是增肌過程中不可忽視的能源來源。雖然減脂飲食中常會限制碳水化合物的攝入，但在增肌階段，碳水化合物對於恢復和提高運動表現至關重要。當你攝取碳水化合物時，身體會將其轉化為葡萄糖，並將多餘的能量儲存為肌肉中的糖原。這些糖原可以在激烈運動中作為能量釋放，延長你訓練的時間和強度。<br/>健康的碳水化合物來源包括：褐米全麥麵包地瓜燕麥低GI的水果（如蘋果、藍莓等）這些食物不僅能提供持久的能量，還能幫助你保持穩定的血糖水平，避免在訓練過程中因為能量不足而疲勞。</li><li><span>3.健康脂肪的攝取</span>脂肪是人體必需的營養素之一，特別是在增肌飲食中，健康脂肪能夠促進激素的分泌，尤其是有助於睾酮和生長激素的分泌，這兩種激素對肌肉生長至關重要。合理攝取健康脂肪，對於保持良好的新陳代謝和免疫系統運作也有重要作用。<br/>健康脂肪的來源包括：堅果和種子（如杏仁、奇亞籽、亞麻籽等）橄欖油鯖魚、鮭魚等富含Omega-3脂肪酸的魚類鳄梨這些脂肪不僅能提高你的肌肉生長潛力，還能為你的身體提供必要的抗炎效果，促進恢復。</li><li><span>4.高頻次小餐攝取</span>如果你希望最大化肌肉生長，專家建議將一天的飲食分成五到六小餐。這樣不僅能保持穩定的營養供應，還能讓身體保持在一個持續的合成代謝狀態，有利於肌肉的增長和修復。每餐中可以包含一定比例的蛋白質、碳水化合物和健康脂肪，以確保身體在全天都能獲得所需的營養。<br/>一個典型的增肌餐單包括：早餐：蛋白質燕麥粥（燕麥、蛋白粉、堅果和水果）上午點心：雞胸肉三明治（全麥麵包、雞胸肉、蔬菜）午餐：魚肉、紅薯和蔬菜下午點心：蛋白質奶昔或堅果晚餐：牛排、藜麥和蔬菜睡前點心：希臘酸奶和少量堅果這樣的飲食可以保證你不會出現長時間處於空腹狀態，從而減少肌肉分解。</li><li><span>5.喝足夠的水</span>水是增肌過程中經常被忽視的一個元素。適量的水分對於保持細胞的健康運作、運輸營養物質到達肌肉以及排除代謝產物都至關重要。尤其在進行高強度的增肌訓練時，身體會產生大量熱量並且流失大量水分，因此確保每天攝取足夠的水分有助於保持最佳的運動表現和恢復。建議每天攝取大約2到3公升的水，具體數量可以根據個人需求進行調整。特別是在運動過後，及時補充水分至關重要。</li><li><span>6.增肌飲食的補充劑</span>除了飲食外，許多人會選擇補充一些增肌補充劑來幫助肌肉的增長。常見的補充劑包括：乳清蛋白：補充蛋白質的便捷來源，有助於提高肌肉合成。肌酸：能夠增加運動時的爆發力和耐力，有助於提高訓練強度。BCAA（支鏈氨基酸）：有助於減少肌肉損傷，並促進肌肉修復。這些補充劑可以作為飲食的補充，但不應該成為主要的營養來源，最重要的還是通過天然食物來獲取大部分的營養。</li><li><span>結語</span>增肌飲食是一個科學且需長期堅持的過程，專家建議在營養攝取上保持均衡，並且隨著時間的推移調整飲食計劃，以確保達到最佳效果。將這些增肌飲食秘訣與有效的訓練結合，你將能夠在不久的將來擁有理想的肌肉線條。記住，增肌是一個逐步累積的過程，保持耐心並持之以恆，最終成果將會是值得的。</li></ol>', 
12, 6, '/imgs/article/article03.jpg', '2025-03-12'),

(4, '遠離傷害！學會如何避免過度訓練與身體崩潰', '在現今的健身文化中，許多人都渴望能快速達到理想的體型，無論是增肌、減脂，還是提升運動表現。這種對結果的渴望往往會驅使我們更加努力訓練，但過度訓練卻可能帶來相反的效果，甚至導致身體的崩潰與受傷。如何避免過度訓練與保護身體免於崩潰，成為了每位健身愛好者不可忽視的問題。', 
'<ol><li><span>1. 了解過度訓練的症狀</span> 過度訓練，顧名思義，就是訓練量過大、強度過高，超出了身體的恢復能力。長期處於過度訓練狀態，身體不僅無法獲得應有的恢復，反而會進一步導致肌肉疲勞、免疫系統功能下降，甚至產生嚴重的運動傷害。常見的過度訓練症狀包括：<br/> (1) 極度疲勞與無力感：即使休息後，依然感到疲倦、無力，對訓練缺乏動力。<br/> (2) 睡眠質量下降：過度訓練會影響身體的休息與恢復，導致失眠或睡眠品質差。<br/> (3) 食慾不振或過度饑餓：身體長時間處於高強度運動狀態，可能會導致食慾異常。<br/> (4) 情緒波動：過度訓練可能會影響大腦的神經系統，導致情緒不穩或焦慮。<br/> (5) 免疫力下降：訓練過度會使免疫系統無法有效運作，容易生病。<br/> 如果你發現自己有這些症狀，應該及時檢視自己的訓練計劃，避免繼續過度訓練。</li><li><span>2. 制定合理的訓練計劃</span> 為了避免過度訓練，首先需要有一個合理的訓練計劃。這個計劃應該包括合適的強度、頻率和持續時間，並且注意適當的恢復時間。以下是一些建議：<br/> (1) 訓練頻率：根據目標來安排每週訓練的次數。對於大多數人來說，每週3到5次的訓練是理想的，並且要讓肌肉有足夠的時間恢復。不要每天都進行高強度的訓練，應該有休息日來促進恢復。<br/> (2) 訓練強度：訓練強度應該逐步增加，而不是一開始就達到極限。合理的訓練強度不僅能達到增肌或減脂效果，也能避免過度訓練的風險。<br/> (3) 訓練計劃中的變化：避免一成不變的訓練，定期調整運動類型和強度，這樣不僅有助於突破瓶頸，還能避免過度負荷某一部位。</li><li><span>3. 充足的休息與恢復</span> 休息和恢復是避免過度訓練的關鍵。在訓練中，肌肉並不是在訓練時成長的，而是在訓練後的恢復期進行修復和增長。因此，給予自己足夠的休息時間，不僅能防止過度訓練，還能提升訓練效果。具體來說：<br/> (1) 睡眠質量：睡眠是恢復的最佳時間，這時候身體會釋放生長激素，幫助修復損傷的肌肉纖維。每天保證7到9小時的高質量睡眠。<br/> (2) 休息日：每週安排至少1到2天的休息日，這些休息日不進行高強度的訓練，而是進行輕度活動如散步、瑜伽或拉伸，這有助於促進血液循環，改善肌肉恢復。<br/> (3) 主動恢復：適當的伸展運動、瑜伽或泡澡等，都有助於肌肉的放鬆和緩解緊張，有助於防止過度訓練。</li><li><span>4. 合理飲食支持恢復</span> 飲食不僅能促進增肌，還能加速身體的恢復。飲食中應該包含足夠的蛋白質、碳水化合物和脂肪，並保證充足的微量元素和水分。<br/> (1) 蛋白質：蛋白質有助於修復和增長肌肉纖維，是防止過度訓練的基礎。<br/> (2) 碳水化合物：適量的碳水化合物能夠為身體提供持久的能量，有助於保持體力，防止過度疲勞。<br/> (3) 水分：保持水分平衡對於身體的正常運作至關重要，特別是在高強度訓練後，要及時補充水分，防止脫水。</li><li><span>5. 監控進展與調整訓練</span> 要避免過度訓練，及時監控自己的進展與身體狀況是非常重要的。你可以通過以下方式來監控：<br/> (1) 記錄訓練日誌：記錄每次訓練的內容和強度，並定期檢視進度。<br/> (2) 聆聽身體的信號：身體的信號是最直接的指標，如果你感到持續的疲勞、疼痛或不適，應該適當減少訓練量，並給自己更多的恢復時間。</li><li><span>結語</span> 過度訓練是健身中常見的陷阱，但它是可以避免的。通過制定合理的訓練計劃、充足的休息與恢復、合理的飲食和監控身體狀況，你能夠避免過度訓練的風險，保持身體健康，同時達到理想的健身目標。</li></ol>', 
10, 8, '/imgs/article/article04.jpg', '2025-03-12');

INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at) 
VALUES
(6, '健身基礎與入門：開啟你的健身之旅，從這裡開始！', 
'健身是現代人生活中不可或缺的一部分，無論是為了保持健康，還是塑造理想身材，健身都能幫助我們達成目標。對於初學者來說，開始健身之旅可能會感到有些困惑，不知道如何入手。這篇文章將為你提供健身基礎的入門指南，幫助你順利開啟這段旅程。',
'<ol> 
<li><span>首先，健身的第一步是設定清晰的目標。</span>無論是增肌、減脂、提高心肺功能還是增加靈活性，確定目標能夠讓你的訓練有更明確的方向。對於初學者來說，建議從有氧運動和全身性力量訓練開始，這樣能夠提升體能基礎，並減少運動傷害的風險。 </li> 
<li><span>其次，健身的頻率和強度需要逐步提高。</span>對於剛開始的人，可以每週進行三到四次訓練，並選擇較低強度的運動，如快走、游泳或輕度的重量訓練。隨著體能的提升，可以逐漸增加運動強度和訓練的時間。始終記住，過度訓練容易造成身體損傷，因此要根據自身情況調整。 </li> 
<li><span>此外，飲食和休息同樣是健身過程中不可忽視的部分。</span>合理的營養攝入能夠提供身體所需的能量和修復材料，尤其是蛋白質對於肌肉的修復至關重要。而足夠的休息則有助於身體的恢復和成長。保持均衡飲食並確保每晚有足夠的睡眠，對於達成健身目標非常重要。 </li> 
<li>最重要的是，保持耐心並享受過程。健身是一個長期的過程，從最初的困難到後來的進步，每一步都值得慶祝。 </li> 
</ol>', 
8, 0, '/imgs/article/article06.jpg', '2025-03-15'),
(7, '燃脂與減重：快速燃燒脂肪，達成理想身材的秘密武器！', 
'對於許多人來說，燃脂和減重是健身的首要目標。隨著生活習慣和飲食結構的變化，越來越多的人選擇通過運動來達到理想體重。燃脂過程中，適當的運動和飲食調整將有助於提高脂肪燃燒速度，讓減重變得更有效。',
'<ol> 
<li><span>首先，有氧運動對於燃脂至關重要。</span>像跑步、騎自行車、游泳等有氧運動可以提高心率，促進卡路里消耗，並有效燃燒脂肪。建議每週至少進行三到四次，每次持續30到60分鐘的有氧訓練。除了有氧運動，力量訓練也能幫助燃脂，因為增加肌肉量能夠提高基礎代謝率，這意味著即使在休息時，身體也能燃燒更多的卡路里。 </li> 
<li><span>除了運動，合理的飲食同樣對燃脂至關重要。</span>減少高熱量和高糖的食物攝入，並增加蛋白質和膳食纖維的攝取，這樣可以有效控制食慾並幫助身體更高效地燃燒脂肪。例如，增加蔬菜、全穀物、瘦肉等食物，有助於提供身體所需的營養，並讓你保持長時間的飽腹感。 </li> 
<li><span>此外，保持足夠的水分攝入對於燃脂同樣有益。</span>水不僅能促進新陳代謝，還能幫助體內的毒素排出，進一步提高減重效果。每天保持大約2-3公升的水分攝入，有助於保持身體的良好運行狀態。 </li> 
<li>減重並非一蹴而就的過程，保持持續性的努力和健康的生活方式，才是達成長期目標的關鍵。 </li> 
</ol>',
5, 0, '/imgs/article/article07.jpg', '2025-03-16');
INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at) 
VALUES
(8, '專家級增肌飲食秘訣，打造理想肌肉線條！', 
'增肌是許多健身愛好者的終極目標之一。對於增肌的人來說，力量訓練是不可或缺的一部分。力量訓練能夠幫助你增加肌肉量，提升身體的代謝率，從而讓你更加健壯。那麼，如何進行高效的增肌訓練呢？',
'<ol> 
<li><span>首先，力量訓練的基本原則是高強度、低次數。</span>對於增肌，通常建議使用較重的重量，並進行8-12次的每組訓練。這樣的強度能夠有效刺激肌肉生長。針對每個大肌群（如胸部、背部、腿部等），每週進行兩到三次的訓練，確保每個部位有足夠的恢復時間。 </li> 
<li><span>其次，正確的飲食對增肌至關重要。</span>肌肉的生長需要充足的蛋白質，這是構建肌肉的基本材料。建議每天攝取每公斤體重1.6-2克的蛋白質。此外，適當的碳水化合物攝入也是必要的，因為它能夠提供訓練所需的能量，幫助肌肉恢復。 </li> 
<li><span>第三，增肌訓練的安排需要有多樣性。</span>使用不同的訓練方式，如自由重量訓練、機械訓練、徒手訓練等，能夠讓肌肉在各個角度得到全面的刺激。每次訓練時，可以針對大肌群進行多組訓練，並且每組之間保持一定的休息時間，這樣有助於增強力量並推動肌肉生長。 </li> 
<li><span>最後，足夠的休息同樣重要。</span>肌肉的生長發生在休息期間，因此，保持每週的充分休息是必須的。避免過度訓練，並確保每晚獲得足夠的睡眠。 </li>
</ol>',
6, 20, '/imgs/article/article08.jpg', '2025-03-17'),
(9, '有氧與心肺運動：提升心肺功能，為健康加油！', 
'有氧運動是提升心肺功能、促進健康的重要手段。不僅有助於改善心臟健康，還能提高身體的耐力，幫助燃燒脂肪，維持理想體重。對於有氧運動的選擇，跑步、游泳、騎行等都是非常有效的方式。',
'<ol> 
<li><span>有氧運動</span>有氧運動的主要特點是以長時間、低強度的運動方式來提升心率，從而提高心肺功能。這類運動能夠有效增加心臟的泵血效率，促進血液循環，提高氧氣輸送能力。當你持續進行有氧運動時，身體能夠更有效地利用氧氣，從而提高運動表現。 </li> 
<li>有氧運動的好處不僅僅局限於提升心肺功能，還有助於降低體脂肪。在每次有氧運動中，身體會開始消耗儲存的脂肪，從而幫助減少體脂，達到理想體型。 </li> 
<li>對於初學者來說，可以選擇步行或慢跑來開始有氧運動。隨著體能的提高，可以增加運動時間或強度，甚至嘗試高強度間歇訓練（HIIT），這是一種短時間內高強度的運動，有助於在短時間內燃燒大量的卡路里。 </li> 
<li>每週進行3到5次的有氧訓練，每次訓練30到60分鐘，能夠顯著提升心肺功能，改善體力。不要忽視有氧運動，它不僅能幫助你燃脂，還能讓你擁有更健康的心臟。 </li> 
</ol>',
7, 0, '/imgs/article/article09.jpg', '2025-03-18');
INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at)
VALUES
(10, '訓練計劃與挑戰：打造屬於你的完美訓練計劃！', 
'訓練計劃是每個健身者都需要的工具，無論你的目標是增肌、減脂，還是提升心肺功能，擁有一個明確的計劃將能幫助你達成目標。訓練計劃能夠讓你保持動力，避免健身過程中的盲目訓練，並且讓每次訓練都具有明確的方向。',
'<ol> <li> 制定訓練計劃時，首先要考慮自己的目標。如果你的目標是增肌，那麼你需要專注於力量訓練，並確保每個大肌群都得到有效訓練；如果目標是減脂，那麼有氧運動和全身性力量訓練相結合將是最佳選擇；如果目標是提高心肺功能，有氧運動則是首選。 </li> <li> 每個訓練計劃都應該包括熱身、主要訓練和冷卻運動。熱身有助於提高肌肉的靈活性，避免受傷；主要訓練則集中在達成目標的運動上；冷卻運動則幫助減少運動後的肌肉緊張，促進恢復。 </li> <li> 根據訓練計劃的設定，可以挑戰自己逐步增加運動強度或時間。例如，從初期的簡單運動開始，逐漸增加重量、次數或運動時間，這樣能有效提升體能，並避免訓練過程中的停滯不前。 </li> </ol>', 
8, 0, '/imgs/article/article10.jpg', '2025-03-19'),

(11, '素食專區：如何吃出健康與力量？', 
'在現今健康意識逐漸增強的背景下，素食已經不再是少數人選擇的飲食方式。無論是出於動物福利、環境保護還是健康原因，越來越多的人開始轉向素食飲食。素食飲食不僅能夠提供足夠的營養，還能夠達到減重、增肌等多種健身目標。',
'<ol> <li>素食飲食的關鍵在於合理搭配，保證攝取足夠的蛋白質、維生素、礦物質等營養素。例如，豆類、扁豆、鷹嘴豆等植物蛋白來源，能夠有效替代動物蛋白，幫助肌肉修復和生長。而全穀物、堅果和種子則富含健康脂肪，對於維持長時間的能量釋放至關重要。 </li> <li>對於健身愛好者而言，增肌是許多人的目標。素食者在增肌過程中需要特別注意蛋白質的攝取，可以選擇豆類、杏仁、豆腐、素食蛋白粉等作為補充來源。同時，維生素B12和鐵等營養素也需要特別留意，因為它們在植物性飲食中較難獲得，可以通過補充劑來補足。</li> <li>除了營養攝取，素食者還應該保持飲食多樣性。這不僅能讓飲食更加豐富，還能保證各種微量元素的攝入。例如，將不同種類的蔬菜、果實和全穀物融入日常餐單，能讓身體獲得更多的抗氧化劑，有助於改善免疫系統功能。</li> <li><span>總結</span>素食不僅能讓你保持健康，還能支持你的健身目標。只要合理搭配飲食，素食者一樣可以擁有充沛的體力和肌肉線條。</li> </ol>',
11, 0, '/imgs/article/article11.jpg', '2025-03-20');

INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at)
VALUES
(12, '飲食營養：營養攝取的科學與技巧', 
'飲食是健康的基礎，良好的飲食習慣能夠提高我們的生活質量，增強體能，並幫助我們達成健身目標。無論是增肌還是減脂，正確的飲食營養攝取都是成功的關鍵。',
'<ol> <li>首先，蛋白質是健身飲食中最為重要的一部分。無論是增肌還是恢復，蛋白質都是支持肌肉生長和修復的基礎。常見的優質蛋白質來源包括瘦肉、魚類、蛋類、豆類和乳製品等。如果你是素食者，可以通過豆類、鷹嘴豆、豆腐等植物性蛋白來補充。</li> <li>其次，碳水化合物是提供能量的主要來源。健身過程中，碳水化合物能夠幫助維持運動所需的能量，並且加速肌肉恢復。選擇全穀物、甜薯、糙米等低GI（升糖指數）碳水化合物，可以避免血糖波動，讓能量持久釋放。 </li> <li>脂肪也是健康飲食中必不可少的部分。健康的脂肪來源有橄欖油、亞麻籽油、堅果等。這些健康脂肪能夠支持激素的分泌，並促進脂溶性維生素的吸收。</li> <li>維生素和礦物質則在免疫功能、骨骼健康等方面發揮重要作用。特別是維生素D、鈣、鎂等，對於運動員來說更是不可忽視。攝取多種顏色的蔬菜和水果，能夠幫助你獲得更多抗氧化劑，抵抗運動過程中的自由基。</li> <li>最後，不要忽視水分的補充。保持適當的水分攝入有助於運動表現，並減少脫水風險。</li> <li><span>總結</span>良好的飲食習慣是健身成功的關鍵，合理搭配蛋白質、碳水化合物、脂肪及微量元素，將讓你的健身之路更加順利。</li> </ol>', 
12, 0, '/imgs/article/article12.jpg', '2025-03-21'),

(13, '名人專訪：運動員的成功故事與訓練秘籍', 
'健身世界裡，有許多名人以其非凡的成就和堅定的毅力激勵著我們。這些運動員的成功不僅來自他們的天賦，更來自於持續不懈的努力、科學的訓練計劃和強大的心理素質。',
'<ol> <li> 比如，美國的健美選手Arnold Schwarzenegger，從年輕時就顯示出對健身的熱愛。他的訓練方式強調高強度的重量訓練，每週至少5天進行力量訓練，並且注重合理的飲食和充足的休息。Arnold曾說過：“健身的成功來自於對自我的挑戰，而不僅僅是追求外貌。” </li> <li> 同樣的，像科比·布萊恩特這樣的NBA傳奇人物，他的訓練方式堅持極致的耐力訓練。他每天長時間的訓練，不僅涵蓋技術練習，還有體能訓練和心理素質的提升。科比的成功不僅來自於球場上的表現，更是無數小時努力和不斷突破的結果。 </li> <li> 這些運動員的故事告訴我們，成功不僅是天賦，更是勤奮和科學的訓練。健身的道路充滿挑戰，但只要不放棄，結果將是值得的。 </li> </ol>',
13, 5, '/imgs/article/article13.jpg', '2025-03-22'),

(14, '資深GYM友：從初學者到健身達人，我的轉變與經歷', 
'每個資深健身者的背後都有一段長時間的努力和轉變過程。在我開始健身時，我也是一名普通的初學者，對於健身房的器材感到陌生，對於訓練計劃的設置也不知所措。但隨著時間的推移，我逐漸找到了屬於自己的健身方法，也開始享受這個過程。',
'<ol> <li>一開始，我並不擅長重量訓練，經常感覺力不從心，甚至有過放棄的念頭。然而，我學會了循序漸進的訓練方法，每次都挑戰自己突破極限，並且學會了如何設置合適的訓練計劃。無論是力量訓練還是有氧運動，我都確保自己每週都有充分的安排，並且隨著體能的提高逐漸增加強度。</li> <li>除了訓練，飲食也是健身過程中的一大關鍵。我學會了如何根據目標調整飲食計劃，增肌時增加蛋白質攝入，減脂時調整碳水化合物攝取。在健身的過程中，我逐漸掌握了食物的科學搭配，並且學會了如何通過飲食來支持訓練成果。</li> <li>最重要的是，我學會了對自己的耐心和堅持。健身是一個漫長的過程，無論是增肌、減脂還是塑形，都需要不斷的努力和調整。我相信，只要你保持積極的心態，定期訓練並合理飲食，每個人都可以達到自己理想的健身狀態。</li> </ol>',
14, 0, '/imgs/article/article14.jpg', '2025-03-23');
INSERT INTO articles (id, title, intro, content, category_id, views, imageURL, created_at)
VALUES
(15, '名人專訪：成功運動員的訓練與心態', 
'在健身領域，名人運動員的成功故事一直以來都能激勵我們前進。他們不僅擁有卓越的天賦，更重要的是他們背後堅持的努力和科學的訓練方法。這些運動員的成功，正是通過不斷挑戰極限、調整策略和堅持不懈的訓練過程中實現的。',
'<ol> <li><span>美國的健美大師Arnold Schwarzenegger</span> 以美國的健美大師Arnold Schwarzenegger為例，他的成功並非一蹴而就。年輕時，他便顯示出對力量訓練的極大興趣，並以每週五天的高強度訓練計劃來打造自己的身體。Arnold的訓練哲學強調“肌肉記憶”與集中精神，他認為，當你專注於每一個動作的時候，肌肉才能得到充分的刺激和增長。他在接受訪問時曾說過：“成功的訓練不只是鍛煉身體，更是磨練你的心理耐力和毅力。” </li> <li><span>科比·布萊恩特</span> 另一位讓人敬佩的名人運動員，科比·布萊恩特，堅信“每天比昨天更強”。科比的成功並非天賦使然，而是通過每一天的堅持和高強度的訓練。他的“黑曼巴精神”成為了運動界的象徵，這種精神也體現了他對健身與自我挑戰的無限熱情。他的訓練不僅注重技能和技巧的提升，還包括極其苛刻的體能訓練與耐力測試，讓他始終保持在最佳的比賽狀態。 </li> <li> 這些成功的運動員告訴我們，健身不僅僅是對身體的鍛煉，更是對心態和毅力的考驗。無論是力量訓練、技能提升，還是心理素質的塑造，成功的運動員都將這些元素完美結合，形成了他們獨特的訓練方法。 </li> </ol>',
13, 0, '/imgs/article/article15.jpg', '2025-03-24'),

(16, '資深GYM友：健身愛好者的成長與挑戰', 
'在健身之路上，資深的健身愛好者們經歷了很多曲折與挑戰。回首自己從初學者到如今的經歷，讓我明白了健身不僅僅是一項體力挑戰，還是對心理與堅持的巨大考驗。',
'<ol> <li> 我記得當我第一次進入健身房時，對器械和訓練動作完全不熟悉。當時的我對健身充滿了好奇，但卻沒有清晰的方向，總是感到自己無法跟上進度。雖然遇到過許多挫折，但我堅持不懈，從了解基本的動作和訓練理念開始，逐步克服了困難。 </li> <li> 隨著時間的推移，我學會了如何設置合適的訓練計劃，從重量訓練到有氧運動，再到柔軟度訓練，每一個領域都進行了科學規劃。我也逐漸發現，健身並不僅僅是為了擁有肌肉線條或達到某個體重指標，它是一個全面的自我挑戰，關乎體能、毅力、心理素質的多重提升。 </li> <li> 除了訓練，我也意識到飲食在健身過程中的重要性。過去，我對飲食的理解較為單一，認為只需要多吃蛋白質就能增肌，事實上，健身的飲食是一個平衡的系統，需要綜合考慮碳水化合物、健康脂肪、維生素等各方面的攝入。在這方面，我通過學習與實踐，慢慢找到了適合自己的飲食計劃。 </li> <li> 這些年的健身經歷讓我更加堅定了健身之路的決心，無論是在健身房內外，我都學會了如何在挑戰中成長、在困難中找到突破點。健身對我來說，不僅是一種運動，更多的是一種生活態度。 </li> <li> 每個資深健身者的背後都有著不為人知的故事，而這些故事不僅反映了他們的堅持，還蘊藏著對生活的熱愛和對自我挑戰的勇氣。對我而言，這一路走來的每一滴汗水都值得，健身已經成為了我生活中不可或缺的一部分。 </li></ol>',
14, 9, '/imgs/article/article16.jpg', '2025-03-25');



INSERT INTO article_favorites (member_id, article_id) VALUES
(1, 2),
(2, 2),
(1, 1),
(1, 6),
(1, 4);


-- 好友請求表
CREATE TABLE friend_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  receiver_id INT NOT NULL,
  status ENUM('pending', 'accepted', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES member(member_id),
  FOREIGN KEY (receiver_id) REFERENCES member(member_id)
);

-- 好友關係表(已接受好友)
CREATE TABLE friendships (
  user1_id INT NOT NULL,
  user2_id INT NOT NULL,
  user1_delete INT NOT NULL DEFAULT 0,
  user2_delete INT NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (user1_id, user2_id),
  FOREIGN KEY (user1_id) REFERENCES  member(member_id),
  FOREIGN KEY (user2_id) REFERENCES  member(member_id)
);
-- 聊天室表格
CREATE TABLE chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user1_id INT NOT NULL,  -- 用戶 1 ID
  user2_id INT NOT NULL,  -- 用戶 2 ID
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 聊天創建時間
  user1_delete INT NOT NULL DEFAULT 0,
  user2_delete INT NOT NULL DEFAULT 0,
  FOREIGN KEY (user1_id) REFERENCES  member(member_id),
  FOREIGN KEY (user2_id) REFERENCES  member(member_id)
);
-- 聊天內容表
CREATE TABLE messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chat_id INT NOT NULL,  -- 聊天室 ID (即對應的好友關係)
  sender_id INT NOT NULL,  -- 發送訊息的用戶 ID
  message TEXT NOT NULL,  -- 訊息內容
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 訊息發送時間
  is_read 	tinyint(1) default 0,
  FOREIGN KEY (chat_id) REFERENCES chats(id),
  FOREIGN KEY (sender_id) REFERENCES member(member_id)
);
INSERT INTO `friend_requests` (`sender_id`, `receiver_id`, `status`, `created_at`) VALUES
(2, 4, 'accepted', '2025-04-05 14:35:32'),
(2, 5, 'accepted', '2025-04-05 14:35:39'),
(2, 7, 'accepted', '2025-04-05 14:35:45');
INSERT INTO `friendships` (`user1_id`, `user2_id`, `user1_delete`, `user2_delete`, `created_at`) VALUES
(4, 2, 0, 0, '2025-04-05 14:38:55'),
(5, 2, 0, 0, '2025-04-05 14:40:27'),
(7, 2, 0, 0, '2025-04-05 14:42:12');
INSERT INTO `chats` (`user1_id`, `user2_id`, `created_at`, `user1_delete`, `user2_delete`) VALUES
(4, 2, '2025-04-05 14:38:55', 0, 0),
(5, 2, '2025-04-05 14:40:27', 0, 0),
(7, 2, '2025-04-05 14:42:12', 0, 0);
INSERT INTO `messages` (`chat_id`, `sender_id`, `message`, `created_at`, `is_read`) VALUES
(1, 2, '邀請你一起運動吧!!', '2025-04-05 14:38:55', 1),
(1, 4, '好啊!要約甚麼時候😀我禮拜一可以', '2025-04-05 14:39:38', 1),
(2, 2, '邀請你一起運動吧!!', '2025-04-05 14:40:27', 1),
(2, 5, '再說罷', '2025-04-05 14:40:51', 0),
(2, 5, '決定好了嗎', '2025-04-06 14:40:51', 0),
(3, 2, '邀請你一起運動吧!!', '2025-04-05 14:42:12', 1),
(3, 7, '好呀好呀!!!🤩', '2025-04-05 14:42:33', 0),
(1, 2, '18:00可以嗎', '2025-04-07 03:17:12', 1),
(1, 4, 'ok沒問題!!到時候見', '2025-04-07 03:17:31', 1);
# 影片
CREATE TABLE `videos_categories` (
  `id` int NOT NULL PRIMARY KEY,
  `category_name` varchar(50) NOT NULL
) ;
CREATE TABLE `videos` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` varchar(500) NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;
CREATE TABLE `video_favorites` (
  `like_id` int NOT NULL,
  `member_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;


INSERT INTO `videos_categories` (`id`, `category_name`) VALUES
(3, '器械訓練'),
(2, '居家有氧'),
(1, '徒手訓練');




INSERT INTO `videos` (`id`, `title`, `description`, `url`, `category_id`, `created_at`) VALUES
(1, '徒手訓練上肢及核心肌群10式必學！人氣健身YouTuber示範10分鐘輕易鍛鍊上半身', '台灣健身教練May Liu在其YouTube頻道May Fit中示範10分鐘徒手訓練上肢及核心肌群的10個動作，讓您輕鬆鍛鍊上半身。', 'https://www.youtube.com/embed/W4z6eraIdkk?si=EbQp1NcFBZKTkXhZ', 1, '2025-03-24 03:08:55'),
(2, '減脂7款徒手動作！人氣健身YouTuber示範10分鐘全身間歇訓練', '健身YouTuber黃士倫在其頻道Iron士倫中示範7款徒手動作，進行10分鐘全身高強度間歇訓練，助您達到增肌減脂的效果。', 'https://www.youtube.com/embed/bKnaWhvu-4E?si=p_RzTxgEY107TU7x', 1, '2025-03-24 03:08:55'),
(3, '13分鐘 超強手臂訓練｜有效練成直角肩及美化手臂線條｜改善虎背熊腰', 'Coffee林芊妤示範13分鐘手臂及肩背訓練，幫助練成直角肩並改善手臂線條。', 'https://www.youtube.com/embed/G1z8errGHZQ?si=fUd990hYu8ie9tmU', 1, '2025-03-24 03:08:55'),
(4, '10分鐘 簡單練腹肌訓練｜適合新手｜非常見效及不傷腰背', 'Coffee林芊妤提供10分鐘腹肌訓練，適合新手且不傷腰背，有效鍛鍊核心肌群。', 'https://www.youtube.com/embed/9VWg7Tv-OoQ?si=kyCKMVwPAnMiVrti', 1, '2025-03-24 03:08:55'),
(5, '20分鐘 特強大腿操｜減外側內側後側及提臀', 'Coffee林芊妤示範20分鐘大腿訓練，針對大腿內外側及臀部進行強化，提升下半身線條。', 'https://www.youtube.com/embed/Rr8CEyQ3-5k?si=59mc-2jsTyLgQOII', 1, '2025-03-24 03:08:55'),
(6, '20分鐘 站立式極速消脂運動挑戰｜零休息｜達到全日消脂效果', 'Coffee林芊妤帶來20分鐘站立式高強度消脂運動，無需休息，有效提升全日代謝。', 'https://www.youtube.com/embed/fNfQeO3BVGM?si=4OW_CyJ2AvjHWImd', 1, '2025-03-24 03:08:55'),
(7, '15分鐘居家輕伸展&冥想呼吸練習', 'May Fit提供15分鐘的居家伸展與冥想呼吸練習，幫助放鬆身心，適合運動後的收操。', 'https://www.youtube.com/embed/IqIo-5GNLmo?si=B7_AQsi42KPS2X7A', 1, '2025-03-24 03:08:55'),
(8, '超有效練腹肌｜無需器材4動作｜在家輕鬆練出腹肌', '健人蓋伊提供無需器材的四個腹肌訓練動作，在家即可輕鬆練出腹肌。', 'https://www.youtube.com/embed/ymjK_xoz-zM?si=SSCEpETCeKbskBCA', 1, '2025-03-24 03:08:55'),
(9, '臀腿訓練｜徒手動作｜打造翹臀與緊實腿部線條', '營養健身葛格Peeta跟著May示範臀腿徒手訓練，幫助打造翹臀與緊實腿部線條。', 'https://www.youtube.com/embed/F94picjYyhE?si=kOaZ78aQzmY82poH', 1, '2025-03-24 03:08:55'),
(10, '15分無跳躍全身燃脂｜有氧運動 - 全程站立、居家瘦身', '游書庭分享適合新手的15分鐘全身燃脂HIIT有氧運動，這個訓練不用跳躍、不占空間，在家就可以輕鬆做。', 'https://www.youtube.com/embed/ntCOSg6E7nU?si=zX5N6khZKbYEJ5yr', 2, '2025-03-24 03:08:55'),
(11, '【初階】男女適用｜12分鐘燃脂TABATA有氧運動 (無器械)', '游書庭跟大家分享的是12分鐘TABATA間歇訓練 ，不但無需器材還能同時做有氧及肌力運動，有助於減少體脂肪，鍛鍊肌力與耐力', 'https://www.youtube.com/embed/-z7amKv4QIw?si=LLm6NcTw-LoP7le5', 2, '2025-03-24 03:08:55'),
(12, '【初階】男女適用!! 20分鐘站立式燃脂運動 (無跳躍、不傷膝、居家有氧)', '游書庭跟大家分享的是20分鐘初階全身燃脂HIIT運動，此訓練影片很適合運動新手在家裡很好的鍛鍊到全身上下', 'https://www.youtube.com/embed/-hS70qmClnI?si=lG4qYzB40pHwHLcW', 2, '2025-03-24 03:08:55'),
(13, '健身房新手【4天練全身課表】每天只做CP值最高的三個精華動作！', '這部影片針對健身新手設計，分享了四天的全身訓練計劃，每天集中做三個CP值最高的動作，幫助大家快速提升肌力，適合初學者，並且不需要過多的器械。', 'https://www.youtube.com/embed/MzLZXUnekuI?si=PzeGZc2txsJwWo4i', 3, '2025-03-24 03:08:55'),
(14, '女性增肌健身房一週三練完整菜單(腿、背、胸肩) | 女生重訓是否會變壯?', 'May Fit分享一週三練的健身房菜單，並解析每個動作的訓練方式，提供女性增肌的建議。', 'https://www.youtube.com/embed/ZlAvdm7QMfQ?si=-vNKJOOHmTyORBMc', 3, '2025-03-24 03:08:55'),
(15, '健身房【TOP5訓練神器】每次去都練爆！訓練效率UP', '健人蓋依介紹五台訓練神器，並介紹如何正確使用提升訓練效率。', 'https://www.youtube.com/embed/rOSOJ6_run0?si=q7CzlazQIhvOeTt6', 3, '2025-03-24 03:08:55'),
(16, '硬舉深度解析，腿後必練動作！四種硬舉究竟差別在哪？', '營養健身葛格Peeta深度解析四種硬舉的差別，帶領觀眾深入了解各種硬舉的訓練方法。', 'https://www.youtube.com/embed/pcbhdmR4c60?si=IiPsQo2ZeVn0jfr-', 3, '2025-03-24 03:08:55'),
(17, '20分鐘【高強度間歇有氧】居家徒手｜減肥瘦身｜蓋伊陪你一起練', '健人蓋伊和Vivian教練一起提供在家也可以做的高強度間歇有氧動作，適合想要減肥瘦身的你', 'https://www.youtube.com/embed/5SMv2npx_80?si=6a0bmuLQwV8qTvyx', 2, '2025-03-24 03:08:55'),
(18, '居家徒手站立式有氧28分鐘｜輕鬆消脂、心肺&肌耐力有效提升！', 'May Fit提供28分鐘 (徒手、毋需器材）的站立式有氧運動，輕鬆消脂、心肺&肌耐力有效提升', 'https://www.youtube.com/embed/VKXiDKFk0NY?si=19EUFnZJjs2WIfrw', 2, '2025-03-24 03:08:55'),
(19, '大H | IFBB PRO |手臂訓練實錄 | 二三頭重量訓練菜單', '大H分享他的手臂訓練課表，內容包含了他個人的二三頭訓練理念，帶領觀眾深入了解背部肌群的訓練方法。', 'https://www.youtube.com/embed/wq-CoEvi8go?si=gnpuyAQjlFceDJPs', 3, '2025-03-24 03:08:55'),
(20, '大H | IFBB PRO | 訓練實錄 | 背肌訓練實錄', '這部影片展示了IFBB職業選手大H的背肌訓練實錄，帶領觀眾進入「鬼背模式」，深入了解背部肌群的訓練方法。', 'https://www.youtube.com/embed/xdSl2dPQxCM?si=PV1esDUI5W24Vba8', 3, '2025-03-24 03:08:55');


INSERT INTO `video_favorites` (`like_id`, `member_id`, `video_id`, `created_at`) VALUES
(15, 4, 3, '2025-03-24 13:56:06'),
(16, 4, 2, '2025-03-24 15:00:16');

ALTER TABLE `videos_categories`
  ADD UNIQUE KEY `category_name` (`category_name`);
ALTER TABLE `videos`
  ADD CONSTRAINT `videos_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `videos_categories` (`id`) ON DELETE CASCADE;
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category_id` (`category_id`);
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

ALTER TABLE `video_favorites`
  ADD PRIMARY KEY (`like_id`),
  ADD UNIQUE KEY `unique_favorite` (`member_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);
  
ALTER TABLE `video_favorites`
  MODIFY `like_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
  
ALTER TABLE `video_favorites`
  ADD CONSTRAINT `video_favorites_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  ADD CONSTRAINT `video_favorites_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
  
# 產品
CREATE TABLE categories (
  id int NOT NULL PRIMARY KEY,
  category_name varchar(255) NOT NULL
);

CREATE TABLE `products` (
  `id` int NOT NULL PRIMARY KEY,
  `product_code` varchar(10) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category_id` int NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `average_rating` decimal(3,2) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;
CREATE TABLE `product_reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `product_id` int NOT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `order_item_id` int DEFAULT NULL,

  -- 主鍵
  PRIMARY KEY (`id`),

  -- 索引
  KEY `member_id` (`member_id`),
  KEY `product_id` (`product_id`),

  -- 外鍵
  CONSTRAINT `product_reviews_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`),
  CONSTRAINT `product_reviews_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
);
CREATE TABLE `favorites` (
  `like_id` int NOT NULL AUTO_INCREMENT,
  `member_id` int NOT NULL,
  `product_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,

  -- 主鍵
  PRIMARY KEY (`like_id`),

  -- 唯一鍵：每個會員不能重複收藏同一商品
  UNIQUE KEY `unique_favorite` (`member_id`, `product_id`),

  -- 索引
  KEY `product_id` (`product_id`),

  -- 外鍵約束（加入 ON DELETE CASCADE）
  CONSTRAINT `favorites_ibfk_1` FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  CONSTRAINT `favorites_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;




INSERT INTO categories (id, category_name) VALUES
(1, '健身器材'),
(3, '拳擊用品'),
(2, '瑜珈輔具');
INSERT INTO `products` (`id`, `product_code`, `name`, `description`, `category_id`, `price`, `image_url`, `average_rating`, `created_at`) VALUES
(1, 'P001', '啞鈴', '專業級鑄鐵啞鈴，採用優質鋼材製造，表面經特殊處理防滑耐用。適合初學者到專業健身愛好者使用，可進行多種訓練動作如二頭肌捲舉、三頭肌訓練、肩部推舉等。把手設計符合人體工學，確保舒適穩固的抓握感。每天租金50元，是建立基礎肌力的理想選擇。', 1, 50, 'dumbbel.jpg', NULL, '2025-03-13 07:37:00'),
(2, 'P002', '槓鈴', '專業重訓必備器材，採用高強度鋼材打造，承重力強，適合進行深蹲、硬舉等複合式訓練。槓心表面採用防滑花紋設計，確保運動過程中的穩定性與安全性。配重片可依需求調整，滿足不同訓練強度需求。每天租金50元，是進階重訓者的最佳夥伴。', 1, 50, 'Barbell.jpg', NULL, '2025-03-13 07:37:00'),
(3, 'P003', '壺鈴', '極具功能性的訓練器材，採用優質鑄鐵製成，手把經特殊處理防滑。完美適合進行爆發力、核心與全身性訓練，如擺盪、深蹲等動作。人體工學握把設計，確保運動時的舒適性與安全性。每天租金80元，是提升運動表現的絕佳選擇。', 1, 80, 'Kettlebell.jpg', NULL, '2025-03-13 07:37:00'),
(4, 'P004', '訓練繩', '採用高強度尼龍材質編織而成，耐磨防滑。適合進行多樣化的體能訓練，包括波浪擺動、拉扯等動作，有效鍛鍊手臂、背部與核心肌群。繩徑粗大設計提供最佳抓握感，每天租金50元，是強化全身肌力與心肺功能的理想器材。', 1, 50, 'training-rope.jpg', NULL, '2025-03-13 07:37:00'),
(5, 'P005', '跳繩', '專業競技級跳繩，採用高強度鋼絲芯與耐磨PVC外層，確保卓越的耐用性與跳躍表現。特製防纏結設計，搭配人體工學把手，減少運動疲勞。適合進行心肺訓練、HIIT訓練與敏捷度訓練，能有效燃燒卡路里。輕巧便攜，是居家或戶外運動的理想選擇。', 1, 90, 'jump-rope.jpg', NULL, '2025-03-13 07:37:00'),
(6, 'P006', '握力器', '採用優質不鏽鋼彈簧，搭配舒適防滑握把設計。可調節阻力範圍廣泛，適合不同程度的使用者。特製彈簧結構確保穩定的阻力輸出，有效訓練前臂與手指力量。適合復健訓練、增強握力，或作為日常握力鍛鍊工具，幫助提升運動表現與日常生活便利性。', 1, 80, 'HandGripStrengthener.jpg', NULL, '2025-03-13 07:37:00'),
(7, 'P007', '可調式健身椅', '多功能專業健身椅，採用高強度鋼架結構，承重力強。座椅角度可多段調節，適應不同訓練需求。加厚高密度海綿墊，提供舒適支撐。適合進行啞鈴訓練、臥推等多種重訓動作，是打造完整居家健身房的核心裝備。折疊設計節省空間，方便收納。', 1, 100, 'bench.jpg', NULL, '2025-03-13 07:37:00'),
(8, 'P008', '平板健身椅', '專業級平板訓練椅，採用商用級鋼材打造，結構穩固耐用。加寬加厚的訓練面板提供絕佳支撐，特製高密度泡棉確保運動舒適度。可進行臥推、啞鈴划船等多種訓練動作，是重量訓練的理想輔助設備。簡約時尚的設計，適合各種訓練場所。', 1, 150, 'flat-bench.jpg', NULL, '2025-03-13 07:37:00'),
(9, 'P009', '槓片', '專業橡膠包覆槓片，採用優質鑄鐵內芯，確保重量準確。特殊橡膠材質能有效降低運動噪音，保護地板。人性化把手設計方便搬運，多種重量可選擇。適合搭配槓鈴、深蹲架等器材使用，可進行多樣化的重量訓練。', 1, 50, 'fitness-weight.jpg', NULL, '2025-03-13 07:37:00'),
(10, 'P010', '健腹輪', '人體工學雙輪設計，提供絕佳穩定性。特製防滑輪面與舒適把手，確保運動安全。主要鍛鍊核心肌群，同時可強化肩部與手臂肌力。靜音滾輪設計，適合居家使用。輕巧便攜，是加強核心力量的理想選擇。', 1, 30, 'wheel.jpg', NULL, '2025-03-13 07:37:00'),
(11, 'P031', '瑜珈墊', '採用環保TPE材質，具備優異防滑與緩衝效果。加厚設計(6mm)提供舒適支撐，減輕關節壓力。特殊材質易於清潔維護，無異味。輕量化設計便於攜帶，附贈收納繩。適合瑜珈、皮拉提斯等多種健身活動使用。', 2, 20, 'yoga-mat.jpg', NULL, '2025-03-13 07:37:00'),
(12, 'P032', '瑜珈磚', '高密度EVA泡棉製成，質地堅固且輕巧。表面防滑處理，確保使用安全。可用於輔助瑜珈體位法練習，提供穩定支撐。edges圓滑處理，避免受傷。適合初學者到進階者使用，是瑜珈練習的重要輔具。', 2, 20, 'yoga-block.jpg', NULL, '2025-03-13 07:37:00'),
(13, 'P033', '瑜珈輪', '專業級瑜珈輔具，採用環保TPE材質製造，堅固耐用且安全無毒。特殊圓環設計完美支撐背部，幫助改善姿勢與增加柔軟度。內徑尺寸經過精心設計，適合各種體型的使用者。表面防滑顆粒處理，確保運動過程中的穩定性。適合瑜珈、普拉提等課程使用，是提升背部柔軟度與核心力量的理想工具。', 2, 50, 'yoga-wheel.jpg', NULL, '2025-03-13 07:37:00'),
(14, 'P034', '瑜珈繩', '採用優質棉質材料編織，柔軟耐用不刺激皮膚。D型金屬扣環設計，方便調整長度以適應不同體型需求。特製加寬設計減輕局部壓力，提供舒適的握持感。適合進行深層伸展訓練，幫助提升柔軟度，尤其適合肩部、腿部等部位的伸展。可搭配瑜珈、舞蹈等運動課程使用，是提升身體靈活度的完美輔具。', 2, 50, 'yoga-strap.jpg', NULL, '2025-03-13 07:37:00'),
(15, 'P035', '瑜珈球', '採用高密度PVC材質，防爆耐壓設計確保運動安全。表面特殊壓紋處理，提供極佳防滑效果。可承重300公斤，穩定性極佳。適合進行核心訓練、平衡訓練，或作為辦公座椅使用。多種尺寸可選，適合不同身高體型的使用者。附贈充氣泵，方便調節球體硬度，是提升平衡感與核心力量的理想選擇。', 2, 50, 'yoga-ball.jpg', NULL, '2025-03-13 07:37:00'),
(16, 'P051', '拳擊手套', '採用優質PU皮革製成，內裡使用高密度海綿填充，提供極佳的吸震效果。人體工學腕部設計，有效保護手腕關節。透氣網眼設計，減少運動中的悶熱感。魔術貼固定帶確保穩定性，適合拳擊、格鬥等運動訓練使用。多種尺寸可選，適合初學者到進階愛好者使用。', 3, 80, 'Boxing-gloves.jpg', NULL, '2025-03-13 07:37:00'),
(17, 'P052', '拳擊頭盔', '採用高密度EVA發泡材質，提供全方位頭部保護。加強顳顎部位防護，確保訓練安全。內裡採用吸汗快乾材質，佩戴舒適。可調式魔術貼設計，適合不同頭圍尺寸。通風孔設計保持透氣，適合進行拳擊、搏擊等對抗性運動訓練。經典紅色設計，展現專業運動風格。', 3, 100, 'Boxing-Helmet.jpg', NULL, '2025-03-13 07:37:00'),
(18, 'P053', '護齒', '醫療級矽膠製成，柔軟舒適且安全無毒。可熱塑設計，能依據個人牙齒形狀進行調整，提供完美貼合度。特殊氣道設計，確保運動時呼吸順暢。附專用收納盒，方便攜帶與衛生保存。適合各種對抗性運動使用，有效預防運動傷害，保護牙齒與口腔。', 3, 50, 'Boxing-Mouthguard.jpg', NULL, '2025-03-13 07:37:00'),
(19, 'P054', '手綁帶', '採用高彈力棉質材料，提供適中壓力與支撐力。特殊編織工藝，確保纏繞時不會鬆脫。長度適中，可依需求調整纏繞圈數。具備良好吸汗效果，幫助手部保持乾爽。魔術貼固定設計，使用方便。適合拳擊、格鬥等運動使用，可有效保護手腕與指關節。', 3, 30, 'Boxing-hand-straps.jpg', NULL, '2025-03-13 07:37:00'),
(20, 'P055', '沙袋', '採用耐磨PU皮革外層，四層加固縫製工藝。內填優質纖維與棉花，提供適中硬度。特製吊環設計，安裝簡便且牢固。適合進行拳擊、踢擊等訓練，可有效提升打擊技巧與力量。多種重量可選，適合不同程度的訓練者使用。附專業安裝配件，確保使用安全。', 3, 80, 'Boxing-punching-bag.jpg', NULL, '2025-03-13 07:37:00');


ALTER TABLE `products`
  ADD UNIQUE KEY `product_code` (`product_code`),
  ADD KEY `category_id` (`category_id`);

ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE;

# 訂單
CREATE TABLE orders (
  order_id INT AUTO_INCREMENT PRIMARY KEY, 
  member_id INT NOT NULL,  -- 參考會員 ID
  customer_name VARCHAR(100) NOT NULL, -- 訂購人姓名
  customer_phone VARCHAR(20) NOT NULL, -- 訂購人電話
  customer_email VARCHAR(100) NOT NULL, -- 訂購人 Email
  status ENUM('已下單', '租賃中', '已歸還', '已取消') NOT NULL DEFAULT '已下單',  -- 訂單狀態
  payment_status ENUM('未付款', '已付款', '退款中', '已退款') NOT NULL DEFAULT '未付款',  -- 付款狀態
  pickup_method ENUM('台南中西店', '台南中華店', '台南永康店') NOT NULL DEFAULT '台南中西店',
  payment_method ENUM('現金', '信用卡') NOT NULL DEFAULT '信用卡',
  added_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 訂單建立時間  
  FOREIGN KEY (member_id) REFERENCES member(member_id) ON DELETE CASCADE
);


INSERT INTO orders (
  member_id, customer_name, customer_phone, customer_email, status, payment_status, pickup_method, payment_method
) VALUES
(1, '張三', '0912345678', 'zhangsan@example.com', '已下單', '未付款', '台南中西店', '信用卡'),
(2, '李四', '0922333444', 'lisi@example.com', '租賃中', '已付款', '台南中華店', '現金'),
(3, '王五', '0933111222', 'wangwu@example.com', '已下單', '未付款', '台南永康店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已下單', '已取消', '台南中西店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '已付款', '台南中華店', '現金'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '未付款', '台南永康店', '信用卡'),
(4, '陳六', '0988777666', 'chenliu@example.com', '已歸還', '已付款', '台南中西店', '現金'),
(5, '周八', '0955667788', 'zhoub@example.com', '已歸還', '已退款', '台南中華店', '信用卡'),
(6, '鄭九', '0977554433', 'zhengjiu@example.com', '已下單', '未付款', '台南永康店', '現金'),
(7, '趙十', '0966112233', 'zhaoshi@example.com', '已歸還', '已付款', '台南中西店', '信用卡');

CREATE TABLE `productvariants` (
  `id` int NOT NULL PRIMARY KEY,
  `product_id` int NOT NULL,
  `weight` decimal(5,0) NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ;
INSERT INTO `productvariants` (`id`, `product_id`, `weight`, `image_url`, `created_at`) VALUES
(1, 1, 2, 'products.jpg', '2025-03-12 23:37:05'),
(2, 1, 5, 'products.jpg', '2025-03-12 23:37:05'),
(3, 1, 10, 'products.jpg', '2025-03-12 23:37:05'),
(4, 2, 10, 'products.jpg', '2025-03-12 23:37:05'),
(5, 2, 15, 'products.jpg', '2025-03-12 23:37:05'),
(6, 2, 20, 'products.jpg', '2025-03-12 23:37:05'),
(7, 3, 4, 'products.jpg', '2025-03-12 23:37:05'),
(8, 3, 8, 'products.jpg', '2025-03-12 23:37:05'),
(9, 3, 12, 'products.jpg', '2025-03-12 23:37:05'),
(10, 9, 5, 'products.jpg', '2025-03-12 23:37:05'),
(11, 9, 10, 'products.jpg', '2025-03-12 23:37:05'),
(12, 15, 1, 'products.jpg', '2025-03-12 23:37:05'),
(13, 15, 2, 'products.jpg', '2025-03-12 23:37:05'),
(14, 16, 8, 'products.jpg', '2025-03-12 23:37:05'),
(15, 16, 10, 'products.jpg', '2025-03-12 23:37:05'),
(16, 20, 20, 'products.jpg', '2025-03-12 23:37:05'),
(17, 20, 30, 'products.jpg', '2025-03-12 23:37:05');
CREATE TABLE order_items (
  order_item_id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,  -- 參考 `orders` 訂單 ID
  product_id INT NOT NULL,  -- 參考 `products` 商品 ID
  product_variant_id INT DEFAULT NULL,  -- 參考 `productvariants` 變體 ID (重量)
  rental_start_date DATE NOT NULL,  -- 租賃開始日期
  rental_end_date DATE NOT NULL,  -- 租賃結束日期
  rental_days INT GENERATED ALWAYS AS (DATEDIFF(rental_end_date, rental_start_date)) STORED,  -- 自動計算租賃天數
  quantity INT NOT NULL,  -- 商品數量
  price DECIMAL(10, 0) NOT NULL,  -- 單品租借價格
  total_price DECIMAL(10, 0) GENERATED ALWAYS AS (rental_days * price * quantity) STORED,  -- 自動計算租金
  FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  FOREIGN KEY (product_variant_id) REFERENCES productvariants(id) ON DELETE SET NULL
);

INSERT INTO `order_items` (`order_id`, `product_id`, `product_variant_id`, `rental_start_date`, `rental_end_date`, `quantity`, `price`) VALUES
( 4, 1, 3, '2025-03-01', '2025-03-05', 2, 500),
( 2, 2, 5, '2025-03-02', '2025-03-06', 1, 700),
( 3, 2, 5, '2025-03-03', '2025-03-07', 3, 400),
( 4, 7, NULL, '2025-03-04', '2025-03-08', 2, 600),
( 4, 9, 10, '2025-03-05', '2025-03-09', 1, 800),
( 4, 15, 12, '2025-03-06', '2025-03-10', 2, 550),
( 4, 13, NULL, '2025-03-07', '2025-03-11', 1, 900),
( 9, 16, 15, '2025-03-09', '2025-03-13', 2, 750),
( 4, 18, NULL, '2025-03-10', '2025-03-14', 1, 1000),
( 4, 14, NULL, '2025-03-12', '2025-03-27', 1, 20),
( 4, 11, NULL, '2025-03-12', '2025-03-27', 1, 20),
( 5, 14, NULL, '2025-03-12', '2025-03-27', 1, 20);


# 據點

CREATE TABLE locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    location VARCHAR(50) NOT NULL,
    branch VARCHAR(50) NOT NULL,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    business_hours VARCHAR(100),
    avatar varchar(255) DEFAULT NULL,
    lat DECIMAL(9,6) NOT NULL,
    lng DECIMAL(9,6) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

--
-- 傾印資料表的資料 `locations`
--

INSERT INTO locations (location, branch, address, phone, business_hours, avatar, lat, lng) VALUES
-- 台北市據點
('台北市', '中山店', '台北市中山區南京東路二段100號', '02-2521-1234', '週一至週日 07:00-22:00', 'branch1.jpg', 25.052677, 121.528632),
('台北市', '大安店', '台北市大安區復興南路一段200號', '02-2731-5678', '週一至週日 06:00-23:00', 'branch2.jpg', 25.043889, 121.543889),
('台北市', '信義店', '台北市信義區松仁路50號', '02-2345-6789', '週一至週日 06:00-23:00', 'branch3.jpg', 25.036389, 121.568056),
('台北市', '士林店', '台北市士林區中正路100號', '02-2834-5678', '週一至週日 07:00-22:00', 'branch4.jpg', 25.093889, 121.526944),
('台北市', '內湖店', '台北市內湖區成功路150號', '02-2627-8901', '週一至週日 06:00-22:00', 'branch5.jpg', 25.083889, 121.593056),

-- 新北市據點
('新北市', '板橋店', '新北市板橋區站前路50號', '02-2965-9012', '週一至週日 08:00-22:00', 'branch6.jpg', 25.013889, 121.463889),
('新北市', '新莊店', '新北市新莊區新泰路150號', '02-2277-3456', '週一至週日 07:00-23:00', 'branch7.jpg', 25.036111, 121.436944),
('新北市', '三重店', '新北市三重區重新路200號', '02-2976-5432', '週一至週日 06:00-23:00', 'branch8.jpg', 25.063889, 121.483889),
('新北市', '中和店', '新北市中和區中和路300號', '02-2943-2109', '週一至週日 07:00-22:00', 'branch9.jpg', 24.993889, 121.493056),
('新北市', '永和店', '新北市永和區永和路250號', '02-2927-8901', '週一至週日 06:00-22:00', 'branch10.jpg', 25.013889, 121.513889),

-- 台南市據點（保持原有資料）
('台南市', '中華店', '台南市中西區中華路一段150號', '06-2345-6789', '週一至週日 06:00-22:00', 'branch11.jpg', 23.001342, 120.202159),
('台南市', '永康店', '台南市永康區中正南路238號', '06-3456-7890', '週一至週日 07:00-23:00', 'branch12.jpg', 23.026679, 120.221816),
('台南市', '安平店', '台南市安平區建平路380號', '06-4567-8901', '週一至週日 06:00-23:00', 'branch13.jpg', 22.994163, 120.183552),
('台南市', '東區店', '台南市東區長榮路二段195號', '06-5678-9012', '週一至週日 06:00-22:00', 'branch14.jpg', 22.991833, 120.221435),
('台南市', '仁德店', '台南市仁德區中山路456號', '06-6789-0123', '週一至週日 07:00-22:00', 'branch15.jpg', 22.971359, 120.252543),

-- 高雄市據點
('高雄市', '三民店', '高雄市三民區博愛一路168號', '07-2345-6789', '週一至週日 06:00-23:00', 'branch16.jpg', 22.642100, 120.301200),
('高雄市', '左營店', '高雄市左營區博愛二路278號', '07-3456-7890', '週一至週日 06:00-22:00', 'branch17.jpg', 22.653200, 120.312300),
('高雄市', '前鎮店', '高雄市前鎮區中山三路389號', '07-4567-8901', '週一至週日 07:00-23:00', 'branch18.jpg', 22.664300, 120.323400),
('高雄市', '鳳山店', '高雄市鳳山區青年路二段490號', '07-5678-9012', '週一至週日 06:00-22:00', 'branch19.jpg', 22.675400, 120.334500),
('高雄市', '楠梓店', '高雄市楠梓區楠梓路567號', '07-6789-0123', '週一至週日 07:00-22:00', 'branch20.jpg', 22.686500, 120.345600);
--

# 教練
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


-- 課程類別資料表 (class_categories)
CREATE TABLE class_categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_name VARCHAR(50) NOT NULL 
);

INSERT INTO `class_categories` (`id`, `category_name`) VALUES
(1, '入門課程'),
(2, '進階課程'),
(3, '團體課程'),
(4, '其他課程');

-- --------------------------------------------------------

--
-- 課程類型資料表 (class_types)
CREATE TABLE class_types (
    id INT PRIMARY KEY AUTO_INCREMENT,
    category_id INT NOT NULL,
    type_name VARCHAR(50) NOT NULL,
    description TEXT,
    avatar_url VARCHAR(255),
    FOREIGN KEY (category_id) REFERENCES class_categories(id)
);

--
-- 傾印資料表的資料 `class_types`
--

-- 插入課程類型
INSERT INTO `class_types` (`id`, `type_name`, `description`, `avatar_url`, `category_id`) VALUES
(1, '瑜珈課程', '透過專業指導，結合呼吸調節與各式體位法動作，幫助學員放鬆身心、增強柔軟度與平衡感，達到身心靈的整體提升。', 'yoga.jpg', 1),
(2, '重訓課程', '在專業教練指導下，運用各式重量訓練器材與自由重量，針對不同肌群進行系統性訓練，有效提升肌力與肌耐力。', 'workout1.jpg', 1),
(3, '心肺課程', '結合多樣化有氧運動與間歇訓練，全面提升心肺功能、代謝效率與整體體能，幫助學員達到健康體態與體重管理目標。', 'workout2.jpg', 2),
(4, '飛輪課程', '在充滿活力的音樂節奏中，進行專業室內自行車訓練，強化下肢肌群與心肺功能，享受團體運動的樂趣。', 'workout3.jpg', 2),
(5, '舞蹈課程', '融合各種舞蹈風格與動感音樂，帶領學員透過全身性律動，提升協調性與肌耐力，同時享受舞動的快樂。', 'workout4.jpg', 3),
(6, '格鬥課程', '學習專業搏擊技巧與防身要領，透過高強度全身性訓練提升體能與反應力，培養自信心與專注力。', 'workout5.jpg', 3),
(7, '皮拉提斯', '運用精準的動作控制與呼吸技巧，加強核心力量與身體覺知，改善姿勢問題，打造優雅體態。', 'workout6.jpg', 4),
(8, 'TRX課程', '利用懸吊式訓練系統，結合自身體重進行全方位肌力訓練，增強核心穩定性與整體協調性，適合各程度學員。', 'workout7.jpg', 4);




-- 課程資料表 (classes)

CREATE TABLE classes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_id INT NOT NULL,
    category_id INT NOT NULL,
    class_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    location_id INT NOT NULL,
    coach_id INT NOT NULL,
    max_capacity INT NOT NULL DEFAULT 10,
    current_capacity INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (type_id) REFERENCES class_types(id),
    FOREIGN KEY (category_id) REFERENCES class_categories(id),
    FOREIGN KEY (coach_id) REFERENCES coaches(id),
    FOREIGN KEY (location_id) REFERENCES locations(id)
);


-- 依據教練專長和所屬據點新增課程資料（2025-03-30到2025-04-29）
INSERT INTO classes
(type_id, category_id, class_date, start_time, end_time, location_id, coach_id, max_capacity, current_capacity)
VALUES
-- 張育瑄教練 (瑜珈, 中山店)
(1, 1, '2025-03-30', '09:00:00', '10:00:00', 1, 1, 20, 0),
(1, 2, '2025-04-01', '14:00:00', '15:00:00', 1, 1, 20, 0),
(1, 3, '2025-04-03', '19:00:00', '20:00:00', 1, 1, 20, 0),
(1, 1, '2025-04-30', '10:00:00', '11:00:00', 1, 1, 20, 20),
(1, 2, '2025-04-12', '16:00:00', '17:00:00', 1, 1, 20, 15),
(1, 3, '2025-04-19', '18:00:00', '19:00:00', 1, 1, 20, 20),
(1, 1, '2025-04-12', '09:00:00', '10:00:00', 1, 1, 20, 0),
(1, 2, '2025-04-13', '15:00:00', '16:00:00', 1, 1, 20, 0),
(1, 3, '2025-04-15', '19:00:00', '20:00:00', 1, 1, 20, 19),
(1, 1, '2025-04-17', '08:00:00', '09:00:00', 1, 1, 20, 0),

-- 林明宏教練 (重訓, 大安店)
(2, 1, '2025-03-30', '09:00:00', '10:00:00', 2, 2, 20, 0),
(2, 2, '2025-03-30', '14:00:00', '15:00:00', 2, 2, 20, 0),
(2, 3, '2025-03-30', '19:00:00', '20:00:00', 2, 2, 20, 0),

-- 王雅婷教練 (舞蹈, 信義店)
(5, 1, '2025-03-30', '09:00:00', '10:00:00', 3, 3, 20, 0),
(5, 2, '2025-03-30', '14:00:00', '15:00:00', 3, 3, 20, 0),
(5, 3, '2025-03-30', '19:00:00', '20:00:00', 3, 3, 20, 0),

-- 陳思穎教練 (皮拉提斯)
(7, 1, '2025-03-31', '10:30:00', '11:30:00', 1, 5, 15, 0),
(7, 2, '2025-04-03', '15:30:00', '16:30:00', 1, 5, 15, 0),
(7, 3, '2025-04-06', '11:30:00', '12:30:00', 1, 5, 15, 0),
(7, 1, '2025-04-19', '16:30:00', '17:30:00', 1, 5, 15, 0),
(7, 2, '2025-04-12', '10:30:00', '11:30:00', 1, 5, 15, 0),
(7, 3, '2025-04-15', '15:30:00', '16:30:00', 1, 5, 15, 0),
(7, 1, '2025-04-18', '11:30:00', '12:30:00', 1, 5, 15, 0),
(7, 2, '2025-04-21', '16:30:00', '17:30:00', 1, 5, 15, 0),
(7, 3, '2025-04-24', '10:30:00', '11:30:00', 1, 5, 15, 0),
(7, 1, '2025-04-27', '15:30:00', '16:30:00', 1, 5, 15, 0),

-- 郭雅文教練 (陰陽瑜珈)
(1, 3, '2025-04-01', '08:00:00', '09:00:00', 1, 11, 18, 0),
(1, 1, '2025-04-04', '16:00:00', '17:00:00', 1, 11, 18, 0),
(1, 2, '2025-04-07', '08:00:00', '09:00:00', 1, 11, 18, 0),
(1, 3, '2025-04-10', '16:00:00', '17:00:00', 1, 11, 18, 0),
(1, 1, '2025-04-13', '08:00:00', '09:00:00', 1, 11, 18, 0),
(1, 2, '2025-04-16', '16:00:00', '17:00:00', 1, 11, 18, 0),
(1, 3, '2025-04-19', '08:00:00', '09:00:00', 1, 11, 18, 0),
(1, 1, '2025-04-22', '16:00:00', '17:00:00', 1, 11, 18, 0),
(1, 2, '2025-04-25', '08:00:00', '09:00:00', 1, 11, 18, 0),
(1, 3, '2025-04-28', '16:00:00', '17:00:00', 1, 11, 18, 0),

-- 游心怡教練 (香氛瑜珈)
(1, 2, '2025-04-02', '11:00:00', '12:00:00', 1, 19, 15, 0),
(1, 3, '2025-04-05', '17:30:00', '18:30:00', 1, 19, 15, 0),
(1, 1, '2025-04-08', '11:00:00', '12:00:00', 1, 19, 15, 0),
(1, 2, '2025-04-11', '17:30:00', '18:30:00', 1, 19, 15, 0),
(1, 3, '2025-04-14', '11:00:00', '12:00:00', 1, 19, 15, 0),
(1, 1, '2025-04-17', '17:30:00', '18:30:00', 1, 19, 15, 0),
(1, 2, '2025-04-20', '11:00:00', '12:00:00', 1, 19, 15, 0),
(1, 3, '2025-04-23', '17:30:00', '18:30:00', 1, 19, 15, 0),
(1, 1, '2025-04-26', '11:00:00', '12:00:00', 1, 19, 15, 0),
(1, 2, '2025-04-29', '17:30:00', '18:30:00', 1, 19, 15, 0),

-- 林芳儀教練 (有氧)
(3, 1, '2025-04-03', '13:00:00', '14:00:00', 1, 13, 25, 0),
(3, 2, '2025-04-06', '19:00:00', '20:00:00', 1, 13, 25, 0),
(3, 3, '2025-04-09', '13:00:00', '14:00:00', 1, 13, 25, 0),
(3, 1, '2025-04-12', '19:00:00', '20:00:00', 1, 13, 25, 0),
(3, 2, '2025-04-15', '13:00:00', '14:00:00', 1, 13, 25, 0),
(3, 3, '2025-04-18', '19:00:00', '20:00:00', 1, 13, 25, 0),
(3, 1, '2025-04-21', '13:00:00', '14:00:00', 1, 13, 25, 0),
(3, 2, '2025-04-24', '19:00:00', '20:00:00', 1, 13, 25, 0),
(3, 3, '2025-04-27', '13:00:00', '14:00:00', 1, 13, 25, 0),
(3, 1, '2025-04-29', '19:00:00', '20:00:00', 1, 13, 25, 0),

-- 周美玲
(5, 1, '2025-04-11', '13:00:00', '14:00:00', 1, 9, 20, 0),
(5, 2, '2025-04-12', '19:00:00', '20:00:00', 1, 9, 20, 0),
(5, 3, '2025-04-13', '13:00:00', '14:00:00', 1, 9, 20, 0),
(5, 1, '2025-04-14', '19:00:00', '20:00:00', 1, 9, 20, 0),
(5, 2, '2025-04-15', '13:00:00', '14:00:00', 1, 9, 20, 0),
(5, 3, '2025-04-16', '19:00:00', '20:00:00', 1, 9, 20, 0),
(5, 1, '2025-04-17', '13:00:00', '14:00:00', 1, 9, 20, 0),
(5, 2, '2025-04-18', '19:00:00', '20:00:00', 1, 9, 20, 0),
(5, 3, '2025-04-19', '13:00:00', '14:00:00', 1, 9, 20, 0),
(5, 1, '2025-04-20', '19:00:00', '20:00:00', 1, 9, 20, 0);

-- 預約紀錄表
CREATE TABLE reservations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    member_id INT NOT NULL,
    class_id INT NOT NULL,
    coach_id INT NOT NULL,
    reservation_date DATE NOT NULL,
    reservation_time TIME NOT NULL,
    status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'confirmed',
    notification_sent TINYINT(1) NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (member_id) REFERENCES member(member_id),
    FOREIGN KEY (class_id) REFERENCES classes(id),
    FOREIGN KEY (coach_id) REFERENCES coaches(id)
);

