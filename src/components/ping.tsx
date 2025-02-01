import React from 'react'

export default function Ping() {
  return (
    <div className='relative'>
        <div className='absolute -left-4 top-1'>
            <span className='flex size-[11px]'>
                <span className='absolute inline-flex w-full h-full bg-primary rounded-full opacity-75 animate-ping'></span>
                <span className='relative inline-flex bg-primary rounded-full size-[11px]'></span>
            </span>
        </div>
    </div>
  )
}
