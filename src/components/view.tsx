import React from 'react'
import Ping from './ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEW_QUERY } from '@/sanity/lib/queries'
import { after } from 'next/server'
import { writeClient } from '@/sanity/lib/write-client'

export default async function View({id}:{id:string}) {

    const views = await client.withConfig({useCdn:false}).fetch(STARTUP_VIEW_QUERY,{id})

    // Create a promise for the patch operation
     // update views patch: find the matching data set: update the data commit: save the changes
    const patchPromise = writeClient.patch(id).set({ views: views?.views + 1 }).commit();

    // Call after with the patchPromise
    after(() => patchPromise);

    

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
