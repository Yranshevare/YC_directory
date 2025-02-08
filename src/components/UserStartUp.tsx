import { client } from '@/sanity/lib/client'
import { STARTUP_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard,{StartupCardType} from '@/components/startupCard';

export default async function UserStartUp({id}:{id:string}) {
    const startUP = await client.fetch(STARTUP_BY_AUTHOR_QUERY,{id})
  return (
    <>
        {
            startUP.length > 0 ? startUP.map((startup:StartupCardType) => <StartupCard key={startup?._id} post = {startup}/>)
            :
            (
                <h3 className='no-result'>No Startup Found</h3>
            )
        } 
    </>
  )
}
