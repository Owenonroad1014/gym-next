'use client'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import articleStyle from '../article.module.css'
import { IoMdTime } from 'react-icons/io'
import { LuEye } from "react-icons/lu";

export default function Content({ article = {}, date = '' }) {
  return (
    <>
      <div className={articleStyle.articleContent}>
        <h3>{article.title}</h3>
        <p className={articleStyle.date}>
          <IoMdTime /> &nbsp;{date} &nbsp;&nbsp;&nbsp;
          <LuEye/> &nbsp;{article.views}
        </p>
        <p>{date.intro}</p>
        <br />
        <Image
          src={`${article.imageURL}`}
          height={522}
          width={700}
          alt={article.title}
        />
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </>
  )
}
