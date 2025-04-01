// components/CourseSection.js
import styles from './_styles/home.module.css';
import Image from 'next/image';

const CourseSection = () => {
  const courses = [
    {
      id: 1,
      title: '核心訓練',
      instructor: '王教練',
      time: '週一 09:00-10:00',
      image: '/images/core-training.jpg',
      spots: 5
    },
    {
      id: 2,
      title: '瑜珈基礎',
      instructor: '李教練',
      time: '週二 14:00-15:00',
      image: '/images/yoga.jpg',
      spots: 8
    },
    // 更多課程...
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>熱門課程</h2>
      <div className={styles.courseGrid}>
        {courses.map((course) => (
          <div key={course.id} className={styles.courseCard}>
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={200}
              className={styles.courseImage}
            />
            <div className={styles.courseInfo}>
              <h3 className={styles.courseTitle}>{course.title}</h3>
              <div className={styles.courseDetails}>
                <p>教練：{course.instructor}</p>
                <p>時間：{course.time}</p>
                <p>剩餘名額：{course.spots}</p>
              </div>
              <button className={styles.bookButton}>立即預約</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSection;