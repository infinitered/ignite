import { useEffect } from 'react'
import { router } from 'expo-router'

import { useAuth } from '@/context/AuthContext'

export default function Index() {
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    // Redirect based on authentication status
    if (isAuthenticated) {
      router.replace('/welcome')
    } else {
      router.replace('/login')
    }
  }, [isAuthenticated])

  // Return null while redirecting
  return null
}
