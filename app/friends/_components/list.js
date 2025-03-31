'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '@/context/auth-context'
import Link from 'next/link'
import friendStyle from '../_styles/friends.module.css'
import Item from './item'
import { GYMFRIEND_LIST } from '@/config/api-path'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import loaderStyle from '@/app/_components/_styles/loading.module.css'

export default function List() {
  const params = useSearchParams()
  const { auth, getAuthHeader } = useAuth()

  const [listData, setListData] = useState([
    {
      name: '',
      profile_id: 0,
      member_id: 0,
      avatar: '',
      sex: '',
      mobile: '',
      intro: '',
      item: '',
      goal: '',
      status: 0,
      created_at: '',
      update_at: '',
    },
  ])
  const [allListData, setAllListData] = useState({})
  const [error, setError] = useState('')
  const [isloading, setIsloading] = useState(true)
  const [sended, setSended] = useState(false)
  useEffect(() => {
    const fetchListData = async () => {
      try {
        const res = await fetch(`${GYMFRIEND_LIST}${location.search}`, {
          headers: { ...getAuthHeader() },
        })
        if (!res.ok) {
          throw new Error('請求失敗')
        }
        setIsloading(false)
        const data = await res.json()
        setListData(data.rows)
        setAllListData(data)
      } catch (err) {
        setError('發送請求時發生錯誤:', error)
      }
    }
    fetchListData()
  }, [params, auth, getAuthHeader])

  return (
    <>
      {auth.id <= 0 ? (
        <div className={friendStyle.notAuthContainer}>
          <p>
            會員專屬內容 <br />
            <br />
            <Link href="/quick-login">登入即可查看</Link>
          </p>
        </div>
      ) : (
        <>
          {isloading ? (
            <>
              <div className={friendStyle.loaderContainer}>
                <div className={loaderStyle.loader}></div>
              </div>
            </>
          ) : (
            <>
              <div className={friendStyle.rightsection}>
                <div className={friendStyle.personList}>
                  <Item listData={listData} />
                </div>
                <div className={friendStyle.pagination}>
                  <Link
                    href={`?page=${allListData.page + 1}`}
                    className={
                      allListData.page == 1 ? friendStyle.disabled : ''
                    }
                    onClick={(e) => {
                      if (allListData.page == 1) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <MdArrowBackIos />
                  </Link>
                  {Array(allListData.totalPages)
                    .fill(1)
                    .map((v, i) => {
                      return (
                        <a
                          href={`?page=${i + 1}`}
                          className={friendStyle.active}
                          key={i}
                        >
                          {i + 1}
                        </a>
                      )
                    })}
                  <Link
                    href={`?page=${allListData.page - 1}`}
                    className={
                      allListData.page == allListData.totalPages
                        ? friendStyle.disabled
                        : ''
                    }
                    onClick={(e) => {
                      if (allListData.page == allListData.totalPages) {
                        e.preventDefault()
                      }
                    }}
                  >
                    <MdArrowForwardIos />
                  </Link>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  )
}
