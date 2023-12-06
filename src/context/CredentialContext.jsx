/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from 'react';
import { Web5 } from '@web5/api/browser';
import { configureProtocol } from '../utils/installProtocol';


export const CredentialContext = createContext({})

export const CredentialDataProvider = ({ children }) => {
  const [webConnect, setWebConnect] = useState({
    web5: {}, myDid: '', protocolMessage: {}
  })

  useEffect(() => {
    let isMounted = true
    const startApp = async() => {
      const { web5, did } = await Web5.connect({sync: '2s'})
      setWebConnect({web5, myDid: did})
      const res = await configureProtocol(web5, did)
      setWebConnect(prev => ({...prev, protocolMessage: res}))
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
