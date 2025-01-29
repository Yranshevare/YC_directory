import { defineQuery } from "next-sanity";

export const STARTUP_QUERY = defineQuery(`
    *[_type == 'startup' && defined(slug.current) && !defined($search) || category match $search || author->name match $search || title match $search] | order(_createdAt desc){
      _id,
      title,
      slug,
      _createdAt,
      category,
      image,
      author->{
        name,
        bio,
        _id
      },
      views,
      decryption
    }
`);