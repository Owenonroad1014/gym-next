'use client'
import { useState } from 'react'
import friendStyle from '../_styles/friends.module.css'
import GymdetailModal from './gymdetail-modal'
import Image from 'next/image'
import { SiOpenaigym } from 'react-icons/si'
import { GYMFRIEND_AVATAR } from '@/config/api-path'
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
          <div className={friendStyle.card}>
            <div className={friendStyle.cardPhoto}>
              <Image
                src={`${GYMFRIEND_AVATAR}/${v.avatar}`}
                alt="avatar"
                width={250}
                height={250}
              ></Image>
            </div>
            <div className={friendStyle.cardTitle}>
              <SiOpenaigym style={{ fontSize: '16px' }} /> {v.name} <br />
              <span>{v.intro}</span>
            </div>
            <div className={friendStyle.cardSocials}>
              <button
                className={friendStyle.cardSocialsBtn}
                onClick={() => handleOpenModal(v)}
              >
                <span>查看更多</span>
              </button>
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
          avatar={selectedUser.avatar}
        />
      )}
    </>
  )
}
