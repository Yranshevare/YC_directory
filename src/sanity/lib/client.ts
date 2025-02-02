import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true //means that sanity will cash the content for 60 seconds and revalidate only afterwords
  // useCdn: false, // Set to false if statically generating pages, using ISR(incremental static generation) or tag-based revalidation
})
