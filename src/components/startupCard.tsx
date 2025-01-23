import { formatDate } from '@/lib/utils'
import { EyeIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

export default function startupCard({post}:{post:StartupTypeCard}) {
    const{_createdAt,views,author:{id: authorId,name},_id,title,image,category,description} = post
  return (
    <li className='startup-card group'>
      <div className='flex-between  '>
        <p className='startup-card_date'> {formatDate(_createdAt)} </p>
        <div className='flex gap-1.5'>
          <EyeIcon className='size-6 text-primary' /> 
          <span className='text-16-medium'>{views}</span>
        </div>
      </div>
      <div className='flex-between mt-5 gap-5'>
        <div className='flex-1'>
            <Link href={`/user/${authorId}`}>
                <p className='text-16-medium line-clamp-1'> {name}</p>
            </Link>
            <Link href={`/startup/${_id}`}>
                <h3 className='text-26-semibold line-clamp-1'>{title}</h3>
            </Link>
        </div>
        <Link href={`/user/${authorId}`}>
            <Image src='https://placehold.co/48x48' alt='placeholder' width={48} height={48} className='rounded-full'/>
        </Link>
      </div>

      <Link href={`/startup/${_id}`}>
        <p className='startup-card_desc'>{description}</p>
        <img src={image} className='startup-card_img' alt="" />
      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>{category} </Link>
        <Button className='startup_card_but !bg-black-100 !rounded-3xl text-white' asChild>
            <Link href={`/startup/${_id}`}>details</Link>
        </Button>
      </div>
    </li>
  )
}
