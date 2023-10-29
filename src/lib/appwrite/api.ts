import { INewUser } from '@/types'
import { account } from './config'
import { ID } from 'appwrite'

export async function createUserAccount(user: INewUser) {
  try {
    const { email, password, name } = user

    const newAccount = await account.create(ID.unique(), email, password, name)

    return newAccount
  } catch (error) {
    console.error(error)
    return error
  }
}
