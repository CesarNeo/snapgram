import { INewUser } from '@/types'
import { useMutation } from '@tanstack/react-query'
import {
  createUserAccount,
  signInAccount,
  signOutAccount,
} from '../appwrite/api'

export const useCreateUserAccountMutation = () =>
  useMutation({
    mutationFn: (user: INewUser) => createUserAccount(user),
  })

export const useSignInMutation = () =>
  useMutation({
    mutationFn: (user: { email: string; password: string }) =>
      signInAccount(user),
  })

export const useSignOutMutation = () =>
  useMutation({
    mutationFn: signOutAccount,
  })
