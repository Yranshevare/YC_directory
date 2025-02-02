'use client'

import React, { useActionState, useState } from 'react'
import { Textarea } from './ui/textarea'
import MarkdownEditor from '@uiw/react-markdown-editor';
import { Button } from './ui/button';
import { Send } from 'lucide-react';
import { formSchema } from '@/lib/vaidation';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function StartupForm() {
    const [pitch, setPitch] = useState(``);
    const [error,setError] = useState<Record<string,string>>({})

    const {toast} = useToast()

    const router = useRouter()
    const handleFormSubmit = async (prevState: any,formdata:FormData) => {
        try {
            const formValue = {
                title:formdata.get('title') as string,
                decryption:formdata.get('decryption') as string,
                category:formdata.get('category') as string,
                link:formdata.get('link') as string,
                pitch
            }
            await formSchema.parseAsync(formValue)
            console.log(formValue)
            // const results = await createIdea(prevState,formdata,pitch)

            // console.log(results)
            // if(results.status === 'success'){
            //     toast({
            //         title: "success",
            //         description: "your startup pitch has been submitted",
            //         variant: "destructive"
            //     })
            //     router.push(`/startup/${results.id}`)
            // }
            // return results
        } catch (error) {
            if(error instanceof z.ZodError){
                const zodError = error.flatten().fieldErrors;
                setError(zodError as unknown as Record<string,string>)
                toast({
                    title: "error",
                    description: "please check input",
                    variant: "destructive"
                })
                return {
                    // ...prevState,
                    error:'validation error',
                    status:'error'
                }
            }

            toast({
                title: "error",
                description: "unexpected error",
                variant: "destructive"
            })

            return {
                // ...prevState,
                error:'something went wrong',
                status:'error'
            }
        }
    }
    /**
      
        useActionState is a Hook that allows you to update state based on the result of a form action.
        Call useActionState at the top level of your component to create component state that is updated when a form action is invoked.

        const [state, dispatch, isPending] = useActionState(action, initialState, permalink);
        
        state:- current state of form
        dispatch:- action that we want to dispatch/trigger in oue form
        isPending:- boolean indicator whether the action is pending
        action:- action that we want to perform on form submit
        initialState:- initial state of form
        permalink:- contain the unique url of the form that the form modify

     */
    const [state, formAction, isPending] = useActionState( handleFormSubmit, {error:'', status:"initial"} );
    // console.log(isPending)
  return (
    <form action={formAction} className='startup-form '>
        <div className='flex flex-col'>
            <label htmlFor="title" className=' startup-form_label'>Title</label>
            <input 
                type="text" 
                id='title' 
                name='title' 
                className='startup-form_input' 
                required 
                placeholder='Startup title' 
            />
            {
                error?.title && <span className='startup-form_error'>{error?.title}</span>
            }
        </div>
        <div className='flex flex-col'>
            <label htmlFor="decryption" className=' startup-form_label'>Decryption</label>
            <Textarea 
                id='decryption' 
                name='decryption'
                className='startup-form_textarea' 
                required 
                placeholder='Startup decryption' 
            />
            {
                error?.decryption && <span className='startup-form_error'>{error?.decryption}</span>
            }
        </div>
        <div className='flex flex-col'>
            <label htmlFor="category" className=' startup-form_label'>Category</label>
            <input 
                type="text" 
                id='category' 
                name='category' 
                className='startup-form_input' 
                required 
                placeholder='Startup category (Tech, health, education' 
            />
            {
                error?.category && <span className='startup-form_error'>{error?.category}</span>
            }
        </div>
        <div className='flex flex-col'>
            <label htmlFor="link" className=' startup-form_label'>Image url</label>
            <input 
                type="text" 
                id='link' 
                name='link' 
                className='startup-form_input' 
                required 
                placeholder='Startup image url' 
            />
            {
                error?.link && <span className='startup-form_error'>{error?.link}</span>
            }
        </div>
        <div className='flex flex-col' data-color-mode="light">
            <label htmlFor="pitch" className=' startup-form_label'>Pitch</label>
            <MarkdownEditor
                value={pitch}
                height="300px"
                onChange={(value, viewUpdate) => setPitch(value)}
                id='pitch'
                visible={true}
                visibleEditor={true}
                style={{borderRadius: 20, overflow:'hidden'}}
            />
            {
                error?.pitch && <span className='startup-form_error'>{error?.pitch}</span>
            }
        </div>
        <Button type='submit' className='startup-form_btn text-white' disabled={isPending}>
            {
                isPending ? 'Submitting...' : 'Submit your pitch'
            }
            <Send className='size-6 ml-2 '/>
        </Button>
    </form>
  )
}
