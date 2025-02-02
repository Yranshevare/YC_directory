import { link } from 'fs'
import {z} from 'zod'
export const formSchema = z.object({
       title: z.string().min(3).max(100),
       decryption: z.string().min(3).max(500),
       category: z.string().min(3).max(20),
       link: z.string().url().refine(async(val)=>{
            try {
                const res = await fetch(val, {method:'HEAD'});
                const contentType = res.headers.get('content-type');
                return contentType?.startsWith('image/')
            } catch (error) {
                
            }
       }),
       pitch : z.string().min(10)
})