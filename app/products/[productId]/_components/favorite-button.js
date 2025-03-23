import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context"; // 確認路徑是否正確
import { PRODUCTS_LIST_TOGGLE_LIKE } from "@/config/api-path";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'
import { FaRegHeart, FaHeart } from "react-icons/fa";
import styles from "./_styles/FavoriteButton.module.css"

const FavoriteButton = ({ product_id, likeId, setIsLiked = () => {} }) => {
  const router = useRouter()
  const [like, setLike] = useState(likeId || false)
  // 取得 Auth 狀態和驗證標頭
  const { getAuthHeader } = useAuth();

  useEffect(() => {
    setLike(likeId)
  },[likeId])

  useEffect(()=>{
    setIsLiked(like)
  },[ like ])


  const toggleLike = (e, product_id) => {
    e.preventDefault()
    fetch(`${PRODUCTS_LIST_TOGGLE_LIKE}/${product_id}`, {
        method: "GET",
        headers: {
          ...getAuthHeader()}
        })
        .then((r) => r.json())
              .then((result) => {
                console.log(result)
                if (result.error == '需要登入會員') {
                  needlogin()
                  return
                }
                if (result.success) {
                  setLike(!like)
                }
              })
              .catch((error) => {
                console.error('Error while updating favorite status:', error)
              })
          }
          const needlogin = () => {
            document.body.style.overflow = 'hidden'
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              title: '登入會員即可收藏!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#f87808',
              cancelButtonColor: '#0b3760',
              confirmButtonText: '登入',
              cancelButtonText: '取消',
                            didClose: () => {
                document.body.style.overflow = ''}
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/member/login')
              }
            })
      };

  return (
    <button
    onClick={(e) => toggleLike(e, product_id)}
    className={styles.hearts}
  >
    {like ? <FaHeart className={styles.heart}/>: <FaRegHeart className={styles.heart}/> }
  </button>
  );}


export default FavoriteButton;
