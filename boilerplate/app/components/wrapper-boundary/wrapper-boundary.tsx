import React, { useEffect, useState } from 'react'
import { ViewStyle, ActivityIndicator, StyleSheet } from 'react-native'
// import { useToast } from 'react-native-toast-notifications';
import { flatten } from 'ramda'
import { View } from '../view/view'

import { color, spacing } from '../../theme'
// import { ApiError } from '../../models';

const CONTAINER: ViewStyle = {
  flex: 1
}

const LOADING_CONTAINER: ViewStyle = {
  alignItems: 'center',
  paddingVertical: spacing[6]
}

const WRAPPED_LOADER: ViewStyle = {
  ...StyleSheet.absoluteFillObject,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'rgba(0,0,0,0.5)',
  zIndex: 2
}

export interface WrapperBoundaryProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  error?: any | string | any

  successMessage?: string

  loading?: boolean

  wrappedLoading?: boolean

  onDidMount?: () => void

  onDidUnMount?: () => void

  onReset?: () => void

  hideContentWhenLoading?: boolean

  noContainer?: boolean
}

/**
 * Describe your component here
 */
export const WrapperBoundary = (props: WrapperBoundaryProps) => {
  const {
    children,
    loading, error, successMessage,
    onDidMount, onDidUnMount, onReset,
    hideContentWhenLoading, wrappedLoading,
    noContainer
  } = props
  const styles = flatten([CONTAINER])
  // const toast = useToast();

  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    if(onDidMount) onDidMount()
    return () => {
      if (onReset) onReset()
      if (onDidUnMount) onDidUnMount()
    }
  }, [])

  useEffect(() => {
    if (error || successMessage) {
      const newError = typeof error === 'string' ? error : error?.error
      if (id === null) {
        // const newId =  toast.show(successMessage || newError, {
        //   type: successMessage ? 'success' : 'danger',
        //   onClose: () => {
        //     if (onReset) onReset()
        //     setId(null)
        //   }
        // })
        // setId(newId)
      } else {
        // toast.update(id, successMessage || newError, {
        //   type: successMessage ? 'success' : 'danger',
        //   onClose: () => {
        //     if (onReset) onReset()
        //     setId(null)
        //   }
        // })
      }
    }
  }, [error, successMessage])

  if (noContainer) {
    return (
      <>{children}</>
    )
  }

  return (
    <View style={styles}>
      {wrappedLoading &&
        <View style={WRAPPED_LOADER}>
          <ActivityIndicator
            color={color.palette.white}
            size="large"
          />
        </View>}
      {loading &&
        <View style={LOADING_CONTAINER} >
          <ActivityIndicator
            color={color.primary}
            size="large"
          />
        </View>}
      {!hideContentWhenLoading && children}
    </View>
  )
}
