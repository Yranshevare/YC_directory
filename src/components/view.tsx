import React from 'react'
import Ping from './ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEW_QUERY } from '@/sanity/lib/queries'

export default async function View({id}:{id:string}) {

    const views = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEW_QUERY,{id})

    //TODO: update the number of views

  return (
    <div className='view-container'>
        <div className='absolute -top-2 -right-2 '> 
            <Ping/>
         </div>
         <p className='view-text'>
            <span className='font-black'>{views?.views} views</span>
         </p>
    </div>
  )
}
