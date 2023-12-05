/* eslint-disable react/prop-types */
import { useState } from 'react'
import { VerifiableCredential } from '@web5/credentials';
import { initAppState, camelCase, constructVCSigner, createDynamicClass } from '../utils/constructVCSigner';

export const useSignCredential = ({ recipientDID, web5Object, title, properties }) => {
  const [appState, setAppState] = useState(initAppState)

  const signCredential = async() => {
    let storedSignedVC = ''
    const className = camelCase(title)
    setAppState(prev => ({...prev, isLoading: true}))
    try{
      const duplicateFile = JSON.parse(localStorage.getItem(className)) ?? {recipientDID: ''}
      if(duplicateFile.recipientDID === recipientDID.substring(0,15)){
        const { record } = await web5Object.dwn.records.read({
          message: {
            filter: { recordId: duplicateFile.recordId }
          }
        })
        console.log('sentStatus')
        const savedSignedVC = await record.data.text()
        console.log(savedSignedVC)
        storedSignedVC = savedSignedVC
        const { status: sentStatus } = await record.send(recipientDID)
        console.log(sentStatus)
        console.log('sentStatus')
        if(sentStatus.code == 202) {
          setAppState(prev => ({...prev, isSuccess: true, success: 'Sent!'}))
        }
        else throw new Error('Error sending signed VC to Recipient')
      }
      else {
        const vcSigner = await constructVCSigner(web5Object.connectedDid, web5Object)
        if (vcSigner?.error) throw new Error(vcSigner?.error)

        const signOptions = {
          issuerDid: web5Object.connectedDid, 
          subjectDid: recipientDID,
          kid: vcSigner.keyId, 
          alg: vcSigner.algorithm,
          signer: vcSigner.sign
        }
        
        console.log('sentStatus222')
        const ClassInstance = createDynamicClass(className, properties)
        const createCredential = VerifiableCredential.create('Ditle jh jgh', web5Object.connectedDid, recipientDID, new ClassInstance())
        const signedVc = await createCredential.sign(signOptions)

        const { record } = await web5Object.dwn.records.write({
          data: signedVc,
          message: {
            schema: className,
            dataFormat: 'application/vc+jwt',
          }
        })

console.log(record.id)
        if(record.id) {
          const savedRecord = { recordId: record.id, recipientDID: recipientDID.substring(0,15) }  
          localStorage.setItem(className, JSON.stringify(savedRecord))
          const savedSignedVC = await record.data.text()
          storedSignedVC = savedSignedVC
          const { status: sentStatus } = await record.send(recipientDID)
          console.log(sentStatus)
          if(sentStatus.code == 202) {
            setAppState(prev => ({...prev, isSuccess: true, success: 'Sent!'}))
          }
          else throw new Error('Error sending signed VC to Recipient')
        }
        else throw new Error('Error saving signed VC to your DWN')
      }
      return { 
        title: title,
        signedVc: storedSignedVC
      }
    }
    catch(error){
      setAppState(prev => ({...prev, isLoading: false, isError: true, error: error?.message}))
      console.log(error)
      return error
    }
    finally{
      setAppState(prev => ({...prev, isLoading: false}))
    }
  }

  return { appState, signCredential }
}
