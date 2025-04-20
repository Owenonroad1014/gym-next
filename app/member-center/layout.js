import '@/styles/globals.css'
import styles from './_styles/member-layout.module.css'
import CenterList from './_component/center-list'
export default function ChatLayout({ children }) {
  return (
    <div className={styles.centerLayout}>  
        <CenterList />
      <div className={styles.centerList}>
        {children} {/* 這裡插入訊息區域的內容 */}
      </div>
    </div>
  )
}
