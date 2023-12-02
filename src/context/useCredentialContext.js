import { useContext } from 'react'
import { CredentialContext } from './CredentialContext'

export const useCredentialContext = () => {
  return useContext(CredentialContext)
}
