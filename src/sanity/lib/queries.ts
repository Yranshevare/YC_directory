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

export const STARTUP_BY_ID_QUERY = defineQuery(`
    *[_type == 'startup' && _id == $id][0]{
      _id,
      title,
      slug,
      _createdAt,
      category,
      image,
      author -> {
        name,bio,_id,image,username
      },
      views,
      decryption,
      pitch
  
    }
`);