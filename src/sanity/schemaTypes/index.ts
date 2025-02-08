import { type SchemaTypeDefinition } from 'sanity'
import { author } from './auther'
import { startup } from './startup'
import { Playlist } from './playlist'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author,startup,Playlist],
}
