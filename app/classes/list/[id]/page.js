'use client'

import React from 'react';
import CoachDetail from '../../_components/coaches-detail';

function CoachDetailPage() {
  const coachData = {
    avatarUrl: "/images/coach.jpg",
    name: "張育瑄",
    title: "專業瑜珈教練",
    email: "yuhsuan.chang@email.com",
    phone: "0912-345-678",
    skills: ["瑜珈", "皮拉提斯", "冥想", "伸展訓練"],
    socialMedia: {
      facebook: "https://facebook.com/yuhsuan.chang",
      instagram: "https://instagram.com/yuhsuan.chang",
      twitter: "https://twitter.com/yuhsuan.chang",
      linkedin: "https://linkedin.com/in/yuhsuan.chang"
    },
    description: "專業瑜珈教練，擁有10年教學經驗，專精於初學者指導與體態調整。透過精心設計的課程，幫助學員達到身心平衡，改善體態問題，並從中獲得內在的平靜與力量。",
    certifications: [
      "國際瑜珈聯盟 RYT-500 認證教練",
      "皮拉提斯墊上訓練Level 2認證",
      "功能性訓練專業指導員證照",
      "CPR與急救認證"
    ]
  };
  


  return (
    <>
    
    <CoachDetail {...coachData} />
    </>
  );
}

export default CoachDetailPage;
