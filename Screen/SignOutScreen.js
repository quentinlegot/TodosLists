import React, { useContext } from 'react'
import { UsernameContext, TokenContext } from '../Context/Context'

export default function SignOutScreen() {
  const [, setUsername] = useContext(UsernameContext)
  const [, setToken] = useContext(TokenContext)
  setToken(null)
  setUsername("")
  return (
    <>
    </>
  );
}
