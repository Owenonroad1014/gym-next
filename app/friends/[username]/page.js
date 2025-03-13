'use client'
import Image from 'next/image'
import friendStyle from './_styles/friend.module.css'
import FriendBanner from '../_components/friend-banner'
import Breadcrumb from '../_components/breadcrumb'
// import FloatingBar from '@/app/_components/float-bar'
export default function PersonPage() {
  const breadcrumb = ['首頁', '找GYM友', '王小明']
  return (
    <>
      <FriendBanner />
      <Breadcrumb breadcrumb={breadcrumb} />
      <div className={friendStyle.personContainer}>
        <div className={friendStyle.user_info}>
          <div className={friendStyle.user_avatar}>
            <Image
              src="https://xsgames.co/randomusers/avatar.php?g=male"
              alt="avatar"
              width={250}
              height={250}
            />
          </div>
          <div className={friendStyle.user_detail}>
            <p className={friendStyle.username}>王小明</p>
            <hr />
            <ul>
              <li>
                <span>性別</span>：男
              </li>
              <li>
                <span>運動項目</span> ：重訓、跑步
              </li>
              <li>
                <span>簡短介紹</span>
                ：我是一名重訓愛好者，最近正在增肌訓練，平時每週3次跑步，想找一個可以一起訓練的夥伴，喜歡挑戰自己的極限，並且希望能一起互相鼓勵進步。
              </li>
            </ul>
            <div className={friendStyle.hastag}>
              <ul>
                <li>#增肌</li>
                <li>#健康維持</li>
                <li>#健康維持</li>
              </ul>
            </div>
          </div>
          <div className={friendStyle.sendBtn}>
            <button className={friendStyle.btn}>
              <div class={friendStyle.svgWrapper - 1}>
                <div class={friendStyle.svgWrapper}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                    ></path>
                  </svg>
                </div>
              </div>
              <span>發送邀請</span>
            </button>
          </div>
        </div>
        {/* <FloatingBar /> */}
      </div>
    </>
  )
}
