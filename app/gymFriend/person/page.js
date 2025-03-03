'use client'
import gymfriendcss from '../_styles/gymfrenid.module.css'
import './_styles/person.css'
import FriendBanner from '../_components/friendBanner'

export default function PersonPage() {
  return (
    <>
      <div className={gymfriendcss.container}>
        <FriendBanner />
        <div className="user_info">
          <div className="user_avatar"></div>
          <div className="user_detail">
            <p className="username">熊大</p>
            <hr />
            <ul>
              <li>性別：女</li>
              <li>運動項目： 重訓、跑步</li>
              <li>
                簡短介紹：
                我是一名重訓愛好者，最近正在增肌訓練，平時每週3次跑步，想找一個可以一起訓練的夥伴，喜歡挑戰自己的極限，並且希望能一起互相鼓勵進步。
              </li>
            </ul>
            <div className="hastag">
              <ul>
                <li>
                  <button>
                    <span>#增肌</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span>#健康維持</span>
                  </button>
                </li>
                <li>
                  <button>
                    <span>#健康維持</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
