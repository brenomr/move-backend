import { Request } from 'express'

export interface UserRequest extends Request {
  user: {
    userId: string,
    username: string,
    whois: [string],
  }
}