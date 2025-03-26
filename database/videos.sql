CREATE TABLE videos_categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(50) NOT NULL UNIQUE
);

CREATE TABLE videos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    url VARCHAR(500) NOT NULL,
    category_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES videos_categories(id) ON DELETE CASCADE
);

insert into videos_categories (category_name)values
('徒手訓練'),
('居家有氧'),
('器械訓練');


INSERT INTO videos (title, description, url, category_id) VALUES
('徒手訓練上肢及核心肌群10式必學！人氣健身YouTuber示範10分鐘輕易鍛鍊上半身', '台灣健身教練May Liu在其YouTube頻道May Fit中示範10分鐘徒手訓練上肢及核心肌群的10個動作，讓您輕鬆鍛鍊上半身。', 'https://www.youtube.com/embed/W4z6eraIdkk?si=EbQp1NcFBZKTkXhZ', 1),
('減脂7款徒手動作！人氣健身YouTuber示範10分鐘全身間歇訓練', '健身YouTuber黃士倫在其頻道Iron士倫中示範7款徒手動作，進行10分鐘全身高強度間歇訓練，助您達到增肌減脂的效果。', 'https://www.youtube.com/embed/bKnaWhvu-4E?si=p_RzTxgEY107TU7x', 1),
('13分鐘 超強手臂訓練｜有效練成直角肩及美化手臂線條｜改善虎背熊腰', 'Coffee林芊妤示範13分鐘手臂及肩背訓練，幫助練成直角肩並改善手臂線條。', 'https://www.youtube.com/embed/G1z8errGHZQ?si=fUd990hYu8ie9tmU', 1),
('10分鐘 簡單練腹肌訓練｜適合新手｜非常見效及不傷腰背', 'Coffee林芊妤提供10分鐘腹肌訓練，適合新手且不傷腰背，有效鍛鍊核心肌群。', 'https://www.youtube.com/embed/9VWg7Tv-OoQ?si=kyCKMVwPAnMiVrti', 1),
('20分鐘 特強大腿操｜減外側內側後側及提臀', 'Coffee林芊妤示範20分鐘大腿訓練，針對大腿內外側及臀部進行強化，提升下半身線條。', 'https://www.youtube.com/embed/Rr8CEyQ3-5k?si=59mc-2jsTyLgQOII', 1),
('20分鐘 站立式極速消脂運動挑戰｜零休息｜達到全日消脂效果', 'Coffee林芊妤帶來20分鐘站立式高強度消脂運動，無需休息，有效提升全日代謝。', '​https://www.youtube.com/embed/fNfQeO3BVGM?si=-dV4GUas95hGILDP', 1),
('15分鐘居家輕伸展&冥想呼吸練習', 'May Fit提供15分鐘的居家伸展與冥想呼吸練習，幫助放鬆身心，適合運動後的收操。', 'https://www.youtube.com/embed/IqIo-5GNLmo?si=B7_AQsi42KPS2X7A', 1),
('超有效練腹肌｜無需器材4動作｜在家輕鬆練出腹肌', '健人蓋伊提供無需器材的四個腹肌訓練動作，在家即可輕鬆練出腹肌。', 'https://www.youtube.com/embed/ymjK_xoz-zM?si=SSCEpETCeKbskBCA', 1),
('臀腿訓練｜徒手動作｜打造翹臀與緊實腿部線條', '營養健身葛格Peeta跟著May示範臀腿徒手訓練，幫助打造翹臀與緊實腿部線條。', 'https://www.youtube.com/embed/F94picjYyhE?si=kOaZ78aQzmY82poH', 1),
('15分無跳躍全身燃脂｜有氧運動 - 全程站立、居家瘦身', '游書庭分享適合新手的15分鐘全身燃脂HIIT有氧運動，這個訓練不用跳躍、不占空間，在家就可以輕鬆做。', 'https://www.youtube.com/embed/ntCOSg6E7nU?si=zX5N6khZKbYEJ5yr', 2),
('【初階】男女適用｜12分鐘燃脂TABATA有氧運動 (無器械)', '游書庭跟大家分享的是12分鐘TABATA間歇訓練 ，不但無需器材還能同時做有氧及肌力運動，有助於減少體脂肪，鍛鍊肌力與耐力', 'https://www.youtube.com/embed/-z7amKv4QIw?si=LLm6NcTw-LoP7le5', 2),
('【初階】男女適用!! 20分鐘站立式燃脂運動 (無跳躍、不傷膝、居家有氧)', '游書庭跟大家分享的是20分鐘初階全身燃脂HIIT運動，此訓練影片很適合運動新手在家裡很好的鍛鍊到全身上下', 'https://www.youtube.com/embed/-hS70qmClnI?si=lG4qYzB40pHwHLcW', 2),
('健身房新手【4天練全身課表】每天只做CP值最高的三個精華動作！', '這部影片針對健身新手設計，分享了四天的全身訓練計劃，每天集中做三個CP值最高的動作，幫助大家快速提升肌力，適合初學者，並且不需要過多的器械。', 'https://www.youtube.com/embed/MzLZXUnekuI?si=PzeGZc2txsJwWo4i', 3),
('女性增肌健身房一週三練完整菜單(腿、背、胸肩) | 女生重訓是否會變壯?', 'May Fit分享一週三練的健身房菜單，並解析每個動作的訓練方式，提供女性增肌的建議。', 'https://www.youtube.com/embed/ZlAvdm7QMfQ?si=-vNKJOOHmTyORBMc', 3),
('健身房【TOP5訓練神器】每次去都練爆！訓練效率UP', '健人蓋依介紹五台訓練神器，並介紹如何正確使用提升訓練效率。', 'https://www.youtube.com/embed/rOSOJ6_run0?si=q7CzlazQIhvOeTt6', 3),
('硬舉深度解析，腿後必練動作！四種硬舉究竟差別在哪？', '營養健身葛格Peeta深度解析四種硬舉的差別，帶領觀眾深入了解各種硬舉的訓練方法。', 'https://www.youtube.com/embed/pcbhdmR4c60?si=IiPsQo2ZeVn0jfr-', 3),
('20分鐘【高強度間歇有氧】居家徒手｜減肥瘦身｜蓋伊陪你一起練', '健人蓋伊和Vivian教練一起提供在家也可以做的高強度間歇有氧動作，適合想要減肥瘦身的你', 'https://www.youtube.com/embed/5SMv2npx_80?si=6a0bmuLQwV8qTvyx', 2),
('居家徒手站立式有氧28分鐘｜輕鬆消脂、心肺&肌耐力有效提升！', 'May Fit提供28分鐘 (徒手、毋需器材）的站立式有氧運動，輕鬆消脂、心肺&肌耐力有效提升', 'https://www.youtube.com/embed/VKXiDKFk0NY?si=19EUFnZJjs2WIfrw', 2),
('大H | IFBB PRO | 訓練實錄 | 手臂訓練實錄 大H教你打造男人的強健臂彎 二三頭重量訓練菜單', '大H分享他的手臂訓練課表，內容包含了他個人的二三頭訓練理念，帶領觀眾深入了解背部肌群的訓練方法。', 'https://www.youtube.com/embed/wq-CoEvi8go?si=gnpuyAQjlFceDJPs', 3),
('大H | IFBB PRO | 訓練實錄 | 背肌訓練實錄', '這部影片展示了IFBB職業選手大H的背肌訓練實錄，帶領觀眾進入「鬼背模式」，深入了解背部肌群的訓練方法。', 'https://www.youtube.com/embed/xdSl2dPQxCM?si=PV1esDUI5W24Vba8', 3);

CREATE TABLE `video_favorites` (
  `like_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `video_id` INT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`like_id`),
  UNIQUE KEY `unique_favorite` (`member_id`, `video_id`),
  FOREIGN KEY (`member_id`) REFERENCES `member` (`member_id`) ON DELETE CASCADE,
  FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;