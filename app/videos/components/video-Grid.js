import React from 'react'
import VideoCard from './video-card';
import styles from './_styles/video-Grid.module.css'
import Pagination from "./Pagination";
import { useState, useEffect} from "react";
import Sort from "./sort";
import { VIDEOS_LIST } from "@/config/api-path";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/auth-context";


const VideoGrid = () => {
    const { auth, getAuthHeader } = useAuth()
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isLiked, setIsLiked] = useState(false);
    const [Videos, setVideos] = useState({
      success: false,
      perPage: 0,
      totalRows: 0,
      totalPages: 0,
      page: 0,
      rows: [],
      keyword: ""
        });

    useEffect(() => {
            
            const fetchVideos = async () => {
    
              try {
                const headers = auth ? { ...getAuthHeader() } : {}
                const res = await fetch(`${VIDEOS_LIST}${location.search}`, {
                  headers,
                  }
                );
                const obj = await res.json();
                console.log("後端回傳的影片列表:", obj);
    
                if (obj.success) {
                  setVideos(obj || {});
                }
    
              } catch (error) {
                console.error("獲取影片列表錯誤:", error);
              }
            };
        
            fetchVideos();
          }, [auth, getAuthHeader, searchParams, isLiked]);
  return (
    <>
    <section className={styles.productGrid}>
          <Sort router={router}/>
          <div className={styles.productArea}>
          <div className={styles.productItem}>
              {Videos.rows.map((video) => (
                <VideoCard key={video.id} {...video} setIsLiked={setIsLiked}/>
              ))}
              </div>
              <div>
              <Pagination {...Videos} searchParams={searchParams}
                    />
              </div>

          </div>
    </section>
    </>
  )
}

export default VideoGrid
