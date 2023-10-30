import { getCurrentUser } from '@/lib/appwrite/api'
import { IContextType, IUser } from '@/types'
import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useNavigate } from 'react-router-dom'

const INITIAL_USER = {
  id: '',
  name: '',
  email: '',
  username: '',
  imageUrl: '',
  bio: '',
}

const INITIAL_STATE = {
  user: INITIAL_USER,
  isLoading: false,
  isAuthenticated: false,
  setUser: () => {},
  setIsAuthenticated: () => {},
  checkAuthUser: async () => false as boolean,
}

export const AuthContext = createContext<IContextType>(INITIAL_STATE)

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser>(INITIAL_USER)
  const [isLoading, setIsLoading] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  const checkAuthUser = useCallback(async () => {
    try {
      const currentAccount = await getCurrentUser()

      if (currentAccount) {
        setUser({
          id: currentAccount.$id,
          name: currentAccount.name,
          email: currentAccount.email,
          username: currentAccount.name,
          imageUrl: currentAccount.imageUrl,
          bio: currentAccount.bio,
        })

        setIsAuthenticated(true)

        return true
      }

      return false
    } catch (error) {
      console.error(error)
      return false
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (
      localStorage.getItem('cookieFallback') === '[]' ||
      localStorage.getItem('cookieFallback') === null
    ) {
      return navigate('/sign-in')
    }

    checkAuthUser()
  }, [])

  const value = {
    user,
    setUser,
    isLoading,
    isAuthenticated,
    setIsAuthenticated,
    checkAuthUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
