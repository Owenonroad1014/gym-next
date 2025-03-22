import { useState, useEffect } from "react";
import { useAuth } from "@/context/auth-context"; // 確認路徑是否正確
import { PRODUCTS_LIST_TOGGLE_LIKE } from "@/config/api-path";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from 'next/navigation'

const FavoriteButton = ({ product_id, like_id, isLiked }) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false);
  const [like, setLike] = useState(like_id || false)
  // 取得 Auth 狀態和驗證標頭
  const { auth, getAuthHeader } = useAuth();

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
                  setIsLiked(like)
                }
              })
              .catch((error) => {
                console.error('Error while updating favorite status:', error)
                setLoading(false)
              })
          }
          const needlogin = () => {
            const MySwal = withReactContent(Swal)
            MySwal.fire({
              title: '登入會員即可收藏!',
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#f87808',
              cancelButtonColor: '#0b3760',
              confirmButtonText: '登入',
              cancelButtonText: '取消',
            }).then((result) => {
              if (result.isConfirmed) {
                router.push('/login')
              }
            })
      };

  return (
    <button
      onClick={(e) => toggleLike(e, product_id)}
      disabled={loading}
      className={`p-2 rounded ${isLiked ? "bg-red-500 text-white" : "bg-gray-200 text-black"}`}
    >
      {loading ? "處理中..." : isLiked ? "❤️ 已收藏" : "🤍 收藏"}
    </button>
  );}


export default FavoriteButton;
