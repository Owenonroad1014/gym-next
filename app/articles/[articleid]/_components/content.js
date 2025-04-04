'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import articleStyle from '../article.module.css'
import { IoMdTime } from 'react-icons/io'
import { LuEye } from 'react-icons/lu'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ARTICLE_ITEM } from '@/config/api-path'
import { BsTriangleFill } from 'react-icons/bs'

export default function Content({ article = {}, date = '', totalArticle = 0 }) {
  const { articleid } = useParams()
  const [nextArticle, setNextArticle] = useState('')
  const [backArticle, setBackArticle] = useState('')
  const [error, setError] = useState(null)

  const nextid = +articleid === totalArticle ? 1 : +articleid + 1
  const backid = +articleid === 1 ? totalArticle : +articleid - 1

  useEffect(() => {
    if (!nextid) return
    const fetchNextArticle = async () => {
      try {
        const response = await fetch(`${ARTICLE_ITEM}/${nextid}`)
        const data = await response.json()
        if (response.ok) {
          setNextArticle(data.data.title)
        } else {
          setError('連接下一篇文章失敗')
        }
      } catch (err) {
        setError('連接下一篇文章失敗')
      }
    }

    if (!backid) return
    const fetchBackArticle = async () => {
      try {
        const response = await fetch(`${ARTICLE_ITEM}/${backid}`)
        const data = await response.json()
        if (response.ok) {
          setBackArticle(data.data.title)
        } else {
          setError('連接上一篇文章失敗')
        }
      } catch (err) {
        setError('連接上一篇文章失敗')
      }
    }
    fetchNextArticle()
    fetchBackArticle()
  }, [nextid, backid, totalArticle])
  return (
    <>
      <div className={articleStyle.articleContent}>
        <h3>{article.title}</h3>
        <p className={articleStyle.date}>
          <IoMdTime /> &nbsp;{date} &nbsp;&nbsp;&nbsp;
          <LuEye /> &nbsp;{article.views}
        </p>
        <p>{date.intro}</p>
        <br />
        {article.imageURL ? (
          <Image
            src={article.imageURL}
            height={522}
            width={700}
            alt={article.title}
          />
        ) : (
          ''
        )}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <div className={articleStyle.guide}>
          <div className={articleStyle.backArticle}>
            <Link href={`/articles/${backid}`}>
              <BsTriangleFill
                style={{
                  transform: 'rotate(-90deg)',
                  marginRight: '10px',
                }}
              />
              上一篇：
              <br />
              <p>{backArticle}</p>
            </Link>
          </div>
          <div className={articleStyle.nextArticle}>
            <Link href={`/articles/${nextid}`}>
              <BsTriangleFill
                style={{
                  transform: 'rotate(90deg)',
                  marginRight: '10px',
                }}
              />
              下一篇：
              <br />
              <p>{nextArticle}</p>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
