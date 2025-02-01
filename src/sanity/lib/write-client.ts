import { createClient } from 'next-sanity'
import 'server-only'

import { apiVersion, dataset, projectId ,token} from '../env'

export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  // useCdn: true //means that sanity will cash the content for 60 seconds and revalidate only afterwords
  useCdn: false, // Set to false if statically generating pages, using ISR(incremental static generation) or tag-based revalidation
  token
})

if(!writeClient.config().token){
    throw new Error('write token does not found')
}
