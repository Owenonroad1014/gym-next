'use client'
import styles from './_styles/breadcrumb.module.css';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from "next/navigation";

const Breadcrumb = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [activeIndex, setActiveIndex] = useState(null);

  // 從 URL 取得 `category_name`
  const categoryName = searchParams.get("category_name");

  // 定義麵包屑結構
  const breadcrumbItems = [
    { name: "首頁", path: "/" },
    { name: "全部商品", path: "/products" },
  ];

  // 如果 `category_name` 存在且不為空，則加到麵包屑
  if (categoryName) {
    breadcrumbItems.push({ name: categoryName, path: `?category_name=${categoryName}` }),{scroll:false};
  }

  // 設定目前 active 的索引
  useEffect(() => {
    const index = breadcrumbItems.findIndex(item => {
      if (item.path.includes("?")) {
        // 如果是查詢參數，檢查 pathname 是否包含對應的參數
        return pathname.includes(item.path);
      }
      // 如果是路徑比較，直接檢查 pathname 和 item.path 是否匹配
      return pathname === item.path;
    });
    setActiveIndex(index !== -1 ? index : null);
  }, [pathname, searchParams]);

  return (
    <div className={styles.breadcrumbContainer}>
      <nav className={styles.breadcrumb}>
        {breadcrumbItems.map((item, index) => (
          <div
            key={index}
            className={`${styles.breadcrumbItem}`}
          >
            <Link href={item.path} className={index === activeIndex ? styles.active : ''}>{item.name}</Link>
          </div>
        ))}
      </nav>
    </div>
  );
}

export default Breadcrumb;