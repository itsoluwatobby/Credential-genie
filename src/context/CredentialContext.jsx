import { createContext, useEffect, useState } from 'react';
import { Web5 } from '@web5/api/browser';

export const CredentialContext = createContext({})

export const CredentialDataProvider = ({ children }) => {
  const [webConnect, setWebConnect] = useState({
    web5: {}, myDid: ''
  })

  useEffect(() => {
    let isMounted = true
    const startApp = async() => {
      const { web5, did } = await Web5.connect()
      console.log('hello')
      console.log(did)
      setWebConnect({web5, myDid: did})
    }
    isMounted ? startApp() : null
    return () => {
      isMounted = false
    }
  }, [])

  const value = {
    webConnect
  }

  return (
    <CredentialContext.Provider value={value}>
      {children}
    </CredentialContext.Provider>
  )
}
