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
<<<<<<< HEAD
        <Breadcrumb />
=======
        <Breadcrumb breadcrumb={breadcrumb} />
>>>>>>> 3cd4b2afd3708ace1e55cada6db5a5616acc3373
        <SelectTarget />
        <List />
      </div>
    </>
  )
}
