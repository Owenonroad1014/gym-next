'use client'

import friendStyle from '../_styles/friends.module.css'
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md'
import Item from './item'

export default function List() {
  return (
    <>
      <div className={friendStyle.list}>
        <div className={friendStyle.personList}>
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
        <div class={friendStyle.pagination}>
          <a href="#" class={friendStyle.disabled}>
            <MdArrowBackIos />
          </a>
          <a href="#" class={friendStyle.active}>
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
