'use client'
import { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import GymdetailModal from './gymdetail-modal'

export default function List({
  listData = [
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
  ],
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState(null)

  const handleOpenModal = (user) => {
    setSelectedUser(user)
    setIsModalOpen(true)
  }

  return (
    <>
      {listData.map((v, i) => (
        <>
          <div key={v.member_id} className={friendStyle.profileCard}>
            <div className={friendStyle.profileCard_container}>
              <div className={friendStyle.circle}>
                <div className={friendStyle.profileImage}></div>
              </div>
              <p className={friendStyle.profileName}>{v.name}</p>
              <hr className={friendStyle.profile_divider} />
              <section className={friendStyle.profile_description_wrapper}>
                <p className={friendStyle.profile_description}>{v.intro}</p>
                <button
                  className={friendStyle.favorite_button}
                  onClick={() => handleOpenModal(v)}
                >
                  查看更多
                </button>
              </section>
            </div>
          </div>
        </>
      ))}
      {selectedUser && (
        <GymdetailModal
          setIsModalOpen={setIsModalOpen}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          name={selectedUser.name}
          sex={selectedUser.sex}
          intro={selectedUser.intro}
          item={selectedUser.item}
          goal={selectedUser.goal}
          member_id={selectedUser.member_id}
        />
      )}
    </>
  )
}
