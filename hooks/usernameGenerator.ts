import { v4 as uuidv4 } from 'uuid'

export const usernameGenerator = (email:string) => {
  const username = email.split('@')[0];
  const uuid = uuidv4();

  const baseUsername = `@${username}-${uuid.slice(0,4)}`

  return baseUsername
}