'use client'

import gymfriendcss from './_styles/gymfrenid.module.css'
import FriendBanner from './_components/friendBanner'
import Breadcrumb from './_components/breadcrumb'
import SelectTarget from './_components/selectTarget'
import List from './_components/list'

export default function GymFriendPage() {
  const breadcrumb = ['首頁', '找GYM友']
  return (
    <>
      <div className={gymfriendcss.container}>
        <FriendBanner />
        <Breadcrumb breadcrumb={breadcrumb} />
        <SelectTarget />
        <List />
      </div>
    </>
  )
}
