'use server'
import {auth} from  '@/auth'
import { parseServerActionResponse } from './utils'
import slugyfy from 'slugify'
import { writeClient } from '@/sanity/lib/write-client'

export const createPitch = async (state:any,form:FormData, pitch:string) => {
    const session = await auth()
    if(!session){
        parseServerActionResponse({error:"unauthenticated", status:"error",results:''})
    }
    const {title,decryption,category,link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )
    const slug = slugyfy(title as string, {lower:true, strict:true})
    try {
        const startup = {
            title,
            decryption,
            category,
            image:link,
            pitch,
            slug:{
                _type:slug,
                current:slug
            },
            author:{
                _type:'reference',
                _ref:session?.user?.id
            }
        }

        const result = await writeClient.create({_type:'startup', ...startup,});
        // console.log(result)

        return parseServerActionResponse({error:"", status:"success", results:result})
    } catch (error) {
        console.log(error)
        return parseServerActionResponse({error:JSON.stringify(error), status:"error", results:''})
    }
}