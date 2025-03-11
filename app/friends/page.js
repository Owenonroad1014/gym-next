'use client'

import gymfriendcss from './_styles/gymfrenid.module.css'
import FriendBanner from './_components/friend-banner'
import Breadcrumb from './_components/breadcrumb'
import SelectTarget from './_components/select-target'
import List from './_components/list'

export default function FriendsPage() {
  const breadcrumb = ['首頁', '找GYM友']
  return (
    <>
      <FriendBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={gymfriendcss.friendContainer}>
        <SelectTarget />
        <List />
      </div>
    </>
  )
}
