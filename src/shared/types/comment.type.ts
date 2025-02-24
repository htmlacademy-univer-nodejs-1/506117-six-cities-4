import { User } from './user.type.js';

export type Comment = {
  text: string
  date: Date
  rate: number
  author: User
}
