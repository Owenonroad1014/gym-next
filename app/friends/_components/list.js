'use client'

import gymfriendcss from '../_styles/gymfrenid.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Item from './item'

export default function List() {
  return (
    <>
      <div className={gymfriendcss.list}>
        <div className={gymfriendcss.personList}>
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
          <Item />
        </div>
        <div class={gymfriendcss.pagination}>
          <a href="#" class={gymfriendcss.disabled}>
            <MdArrowBackIos />
          </a>
          <a href="#" class={gymfriendcss.active}>
            1
          </a>
          <a href="#">2</a>
          <a href="#">3</a>
          <a href="#">4</a>
          <a href="#">5</a>
          <a href="#">
            <MdArrowForwardIos />
          </a>
        </div>
      </div>
    </>
  )
}
