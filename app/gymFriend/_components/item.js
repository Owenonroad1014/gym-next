'use client'

import gymfriendcss from '../_styles/gymfrenid.module.css'
import Link from 'next/link'

export default function List() {
  return (
    <>
      <div className={gymfriendcss.profileCard}>
        <div className={gymfriendcss.profileCard_container}>
          <div className={gymfriendcss.circle}>
            <div className={gymfriendcss.profileImage}></div>
          </div>
          <h1 className={gymfriendcss.profileName}>楊曉晴</h1>
          <hr className={gymfriendcss.profile_divider} />
          <section className={gymfriendcss.profile_description_wrapper}>
            <p className={gymfriendcss.profile_description}>
              我是一名重訓愛好者，最近正在增肌訓練，平時每週3次跑步，...
            </p>
            <button className={gymfriendcss.favorite_button}>
              <Link href="/gymFriend/person">查看更多</Link>
            </button>
          </section>
        </div>
      </div>
    </>
  )
}
