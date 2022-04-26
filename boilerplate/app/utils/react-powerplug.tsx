// Replaces react-powerplug which is not maintained
// TODO: Eventually remove entirely

import React, { ReactNode, useState, Dispatch, SetStateAction } from "react"

export const State = ({
  initial,
  children,
}: {
  initial: { value: any }
  children: (props: { state: { value: any }; setState: Dispatch<SetStateAction<any>> }) => ReactNode
}) => {
  const [state, setState] = useState(initial)
  return <>{children({ state, setState })}</>
}

export const Toggle = ({
  initial,
  children,
}: {
  initial: boolean
  children: (props: { on: boolean; toggle: Dispatch<SetStateAction<boolean>> }) => ReactNode
}) => {
  const [on, toggle] = useState(initial)
  return <>{children({ on, toggle })}</>
}
