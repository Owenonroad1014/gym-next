"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './AdvancedAnimation.css';

const AdvancedAnimation = () => {
  const athleteRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);
  const detailsRef = useRef(null);
  
  useEffect(() => {
    // 創建主時間線
    const mainTimeline = gsap.timeline();
    
    // 添加背景圓圈
    if (!containerRef.current.querySelector('.background-circle')) {
      const circle = document.createElement('div');
      circle.className = 'background-circle';
      containerRef.current.appendChild(circle);
    }
    
    // 背景圓圈動畫
    mainTimeline.from('.background-circle', {
      scale: 0.5,
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    });
    
    // 運動員SVG動畫
    mainTimeline.fromTo(
      athleteRef.current,
      { x: -300, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        duration: 1, 
        ease: "power3.out" 
      },
      "-=1" // 重疊上一個動畫的結尾部分
    );
    
    // 文字逐字進入動畫
    const textElement = textRef.current;
    const textContent = textElement.textContent;
    textElement.textContent = '';
    
    const chars = textContent.split('');
    chars.forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char;
      span.style.opacity = '0';
      span.style.display = 'inline-block';
      span.style.transform = 'translateY(50px)';
      textElement.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.8 + (index * 0.08),
        ease: "back.out(1.7)"
      });
    });
    
    // 活動詳情動畫
    gsap.fromTo(
      detailsRef.current.querySelectorAll('p'),
      { x: 100, opacity: 0 },
      { 
        x: 0, 
        opacity: 1, 
        stagger: 0.2, 
        duration: 0.8,
        delay: 1.5,
        ease: "power2.out" 
      }
    );
    
    // 清除動畫
    return () => {
      mainTimeline.kill();
    };
  }, []);

  return (
    <div className="advanced-container" ref={containerRef}>
      <div ref={athleteRef} className="athlete-container">
        {/* 這裡放置運動員SVG */}
        <img src="/path-to-athlete.svg" alt="AI運動員" />
      </div>
      
      <div className="text-container">
        <h1 ref={textRef}>AI SPORT</h1>
        <div className="event-details" ref={detailsRef}>
          <h2>一起進步吧!</h2>
          <p>國立臺灣科學教育館</p>
          <p>七樓東側特展區</p>
        </div>
      </div>
    </div>
  );
};

export default AdvancedAnimation;
