import { formatDate } from '@/lib/utils'
import React from 'react'

export default function startupCard({post}:{post:StartupTypeCard}) {
  return (
    <li className='startup-card group'>
      <p className='startup-card_date'> {formatDate(post._createdAt)} </p>
    </li>
  )
}
