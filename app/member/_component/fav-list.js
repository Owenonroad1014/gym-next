'use client'

import React from 'react'
import { useSearchParams} from 'next/navigation'
import Card from '../_component/card'

export default function FavList() {
  const searchParams = useSearchParams()
  const category = searchParams.get('category') || '' 
 

  return (
    <>
    <h2>{category}</h2>
      <Card />
    </>
  )
}
