'use client'
import styles from './_styles/breadcrumb.module.css'

const Breadcrumb = ({ breadcrumbs }) => {
  return (
    <div className={styles.breadcrumbContainer}>
      <nav className={styles.breadcrumb}>
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1; // 判斷是否為最後一個
          return (
            <span 
              key={index} 
              className={`${styles.breadcrumbItem} ${isLast ? styles.active : ''}`}
            >
              {isLast ? (
                <span>{crumb.label}</span> // 最後一個不加超連結
              ) : (
                <a href={crumb.link}>{crumb.label}</a>
              )}
            </span>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
