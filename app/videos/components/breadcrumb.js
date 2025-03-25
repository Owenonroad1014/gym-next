'use client'
import styles from './_styles/breadcrumb.module.css';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Breadcrumb = () => {
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("category_name");

  // 定義麵包屑結構
  const breadcrumbItems = [
    { name: "首頁", path: "/" },
    { name: "全部影片", path: "/videos" },
  ];

  // 如果 category_name 存在且不為空，則加到麵包屑
  if (categoryName) {
    breadcrumbItems.push({ name: categoryName, path: `?category_name=${categoryName}` });
  }

  return (
    <div className={styles.breadcrumbContainer}>
      <nav className={styles.breadcrumb}>
        {breadcrumbItems.map((item, index) => {
          const isLastItem = index === breadcrumbItems.length - 1;
          return (
            <div key={index} className={styles.breadcrumbItem}>
              {isLastItem ? (
                <span className={styles.active}>{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default Breadcrumb;
