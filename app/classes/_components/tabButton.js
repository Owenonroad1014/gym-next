// components/TabButton.js
import styles from './_styles/tabButton.module.css'

export default function TabButton({ children, isActive, onClick }) {
  return (
    <button
      className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
