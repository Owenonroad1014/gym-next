import '@/Styles/globals.css'
import ChatList from './_components/chat-list'
import styles from './_styles/chatLayout.module.css'
export default function ChatLayout({ children }) {
  return (
    <div className={styles.chatLayout}>
      <div className={styles.chatSidebar}>
        <ChatList />
      </div>
      <div className={styles.messageArea}>
        {children} {/* 這裡插入訊息區域的內容 */}
      </div>
    </div>
  )
}
