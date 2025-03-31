"use client";
import React, { useEffect, useState } from "react";
import { VIDEOS_FAV, IMG_PATH } from "@/config/api-path";
import { useAuth } from "@/context/auth-context";
import Link from "next/link";
import cardStyle from "./_compenents/_styles/videos.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import loaderStyle from '@/app/_components/_styles/loading.module.css'
import { FaRegHeart, FaHeart } from "react-icons/fa";

const Videos = () => {
  const { auth, getAuthHeader } = useAuth();
  const [Videos, setVideos] = useState([]);
  const [isloading, setIsloading] = useState(true)

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const headers = auth ? { ...getAuthHeader() } : {};
        const res = await fetch( VIDEOS_FAV, { headers });
        const obj = await res.json();
        console.log("後端回傳的商品列表:", obj);

        if (obj.success) {
          setVideos(obj.favorites || []);
          setIsloading(false)
        }
      } catch (error) {
        console.error("獲取商品列表錯誤:", error);
        setIsloading(false)
      }
    };

    fetchVideos();
  }, [auth, getAuthHeader]);

  // **處理取消收藏**
  const handleRemoveFavorite = async (video,event) => {
    document.body.style.overflow = 'hidden'
    event.stopPropagation(); // 阻止事件冒泡
    const result = await Swal.fire({
      title: `確定要取消收藏嗎?`,
      text: "取消後需要重新收藏才能恢復",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "取消收藏",
      cancelButtonText: "取消",
      didClose: () => {
        document.body.style.overflow = ''
      },
    });

    if (result.isConfirmed) {
      try {
        const headers = auth ? { ...getAuthHeader(), "Content-Type": "application/json" } : {};
        const res = await fetch(`${VIDEOS_FAV}/${video.video_id}`, {
          method: "DELETE",
          headers,
        });

        const response = await res.json();
        if (response.success) {
          Swal.fire("已取消收藏!", `${video.name} 已從你的收藏列表中移除`, "success");

          // **前端同步更新狀態**
          setVideos((prev) => prev.filter((p) => p.video_id !== video.video_id));
        } else {
          Swal.fire("操作失敗", "請稍後再試", "error");
        }
      } catch (error) {
        console.error("取消收藏錯誤:", error);
        Swal.fire("錯誤", "無法取消收藏，請稍後再試", "error");
      }
    }
  };

  return (
    <>
    {isloading ? (
        <>
          <div className={cardStyle.loaderContainer}>
            <div className={loaderStyle.loader}></div>
          </div>
        </>
      ) : (<>
      {Videos.length === 0 ? (
        <p>目前沒有收藏的商品</p>
      ) : (
        Videos.map((video) => (
          <div key={video.video_id} >
            <Link href={``} className={cardStyle.favCard}>
              <div className={cardStyle.images}>
              <iframe 
            width="100%" 
            height="200" 
            src={video.url} 
            style={{ border: 'none' }}
            title="YouTube video player" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
            referrerPolicy="strict-origin-when-cross-origin" 
            allowFullScreen
          ></iframe>
              </div>
              <div className={cardStyle.content}>
                <div className={cardStyle.cardBody}>
                  <h3 className={cardStyle.name}>{video.title}</h3>
                  <div className={cardStyle.cardDesc}>
                    <p>{video.description}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={(event) => {
                    event.preventDefault(); // 阻止默認行為
                    event.stopPropagation(); // 阻止事件冒泡
                    handleRemoveFavorite(video, event);
                  }}
                  style={{ zIndex: 1 }} // 確保按鈕在 Link 之上
                >
                  <FaHeart className={cardStyle.heart}/>
                </button>
              </div>
            </Link>
          </div>
        ))
      )}
      </>)}
    </>
  );
};

export default Videos;
