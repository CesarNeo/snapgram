import { INewUser } from '@/types'
import { account, appwriteConfig, avatars, databases } from './config'
import { ID, Query } from 'appwrite'

type ISaveUser = {
  accountId: string
  username?: string
  name: string
  email: string
  imageUrl: URL
}

export async function createUserAccount(user: INewUser) {
  try {
    const { email, password, username, name } = user

    const newAccount = await account.create(ID.unique(), email, password, name)

    if (!newAccount) throw Error

    const avatarUrl = avatars.getInitials(name)

    const newUser = await saveUser({
      accountId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username,
      imageUrl: avatarUrl,
    })

    return newUser
  } catch (error) {
    console.error(error)
    return error
  }
}

export async function saveUser(user: ISaveUser) {
  try {
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      ID.unique(),
      user,
    )

    return newUser
  } catch (error) {
    console.error(error)
  }
}

export async function signInAccount(user: { email: string; password: string }) {
  try {
    const { email, password } = user

    const session = await account.createEmailSession(email, password)

    return session
  } catch (error) {
    console.error(error)
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await account.get()

    if (!currentAccount) throw Error

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.usersCollectionId,
      [Query.equal('accountId', currentAccount.$id)],
    )

    if (!currentUser) throw Error

    return currentUser.documents[0]
  } catch (error) {
    console.error(error)
  }
}

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current')

    return session
  } catch (error) {
    console.error(error)
  }
}
