'use client'

import gymfriendcss from './_styles/gymfrenid.module.css'
import FriendBanner from './_components/friendBanner'
import SelectTarget from './_components/selectTarget'
import List from './_components/list'

export default function GymFriendPage() {
  return (
    <>
      <div className={gymfriendcss.container}>
        <FriendBanner />
        <SelectTarget />
        <List />
      </div>
    </>
  )
}
