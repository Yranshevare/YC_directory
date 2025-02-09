import React from 'react'
import SearchForm from '@/components/SearchForm'
import StartupCard from '@/components/startupCard';
import { STARTUP_QUERY } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = (await searchParams).query || '';
  const params = {search: query || null} 

  const session = await auth()
  // console.log("from page",session)

  const {data:post} = await sanityFetch({query:STARTUP_QUERY,params})


  return (
    <>
    <section className='pink_container'>
      < h1 className='heading'>pitch your startup, connect with entrepreneurs</h1>
      <p className='sub-heading !max-w-3xl'>Submit Ideas Vote on Pitches and Get Noticed on Virtual Competition</p>
      <SearchForm query = {query}/>
    </section>

    <section className='section_container'>
      <p className='text-30-semibold'>
        {
          query ? `Showing results for "${query}"` : 'Trending startups'
        }
      </p>
      <ul className='mt-7 card_grid'>
        {
          post?.length > 0 ? (
            post.map((post:StartupCardType,index:number) => (
              <StartupCard key={post?._id} post = {post}/>
            ))
          ) : (
            <p className='no-result'>No results</p>
          )
        }
      </ul>
    </section>
    <SanityLive/>
      
    </>

  )
}
