import { VerifiableCredential } from '@web5/credentials';
import { useState } from 'react'
import { initAppState } from '../utils/constructVCSigner';


export const useVerifyCredential = ({ extractedSignedVC }) => {
  const [appState, setAppState] = useState(initAppState)

  const verifyCredential = async() => {
    try{
      VerifiableCredential.verify(extractedSignedVC)
      setAppState(prev => ({...prev, isSuccess: true, success: 'VC Verification successful!'}))
      const parseVC = VerifiableCredential.parseJwt(extractedSignedVC)
      return parseVC.toString()
    }
    catch(err) {
      setAppState(prev => ({...prev, isError: true, error: `VC Verification failed: ${err.message}`}))
      return err
    }
  }
  return {appState, verifyCredential}
}
