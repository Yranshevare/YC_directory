import React from 'react'
import SearchForm from '@/components/SearchForm'
import { title } from 'process';
import StartupCard from '@/components/startupCard';

export default async function Page({ searchParams }: { searchParams: { query?: string } }) {
  const query = (await searchParams).query || '';

  const post = [{
    _createdAt:new Date(),
    views:55,
    author:{ _id : 1,    name:'yadnesh'},
    _id:1,
    image:'/logo.png',
    category:'robot',
    description:'this is a description',
    title:'this is a title',
  }]

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
      
    </>

  )
}
