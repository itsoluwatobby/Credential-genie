/* eslint-disable react/prop-types */
import { useState } from 'react'
import { VerifiableCredential } from '@web5/credentials';
import protocolDefinition from '../utils/protocolDefinition.json'
import { initAppState, camelCase, constructVCSigner, createDynamicClass } from '../utils/constructVCSigner';

export const useSignCredential = ({ recipientDID, web5Object, title, properties }) => {
  const [appState, setAppState] = useState(initAppState)

  const signCredential = async() => {
    let storedSignedVC = ''
    const className = camelCase(title)
    setAppState(prev => ({...prev, isLoading: true}))
    try{
      // Resend if failed
      const resendIfFailed = JSON.parse(localStorage.getItem(className)) ?? {recipientDID: ''}
      if(resendIfFailed.recipientDID === recipientDID.substring(0,15)){
        const { record } = await web5Object.dwn.records.read({
          message: {
            schema: protocolDefinition.types.vc.schema,
            filter: { recordId: resendIfFailed.recordId }
          }
        })

        const savedSignedVC = await record.data.json()
        storedSignedVC = savedSignedVC
        const { status: sentStatus } = await record.send(recipientDID)
        if(sentStatus.code == 202) {
          // TODO: Implement sending emails here

          setAppState(prev => ({...prev, isSuccess: true, success: 'Sent!'}))
        }
        else throw new Error('Error sending signed VC to Recipient')
      }
      else {
        const vcSigner = await constructVCSigner(web5Object.connectedDid, web5Object)
        if (vcSigner?.error) throw new Error(vcSigner?.error)

        const signOptions = {
          issuerDid: web5Object.connectedDid, 
          subjectDid: recipientDID, kid: vcSigner.keyId, 
          alg: vcSigner.algorithm, signer: vcSigner.sign
        }

        const ClassInstance = createDynamicClass(className, properties)
        const createCredential = VerifiableCredential.create(title, web5Object.connectedDid, recipientDID, new ClassInstance())
        const signedVc = await createCredential.sign(signOptions)

        let vcObject = {
           "@type": "vc", vc: signedVc, 
           author: web5Object.connectedDid, recipient: recipientDID 
        }
        const { record } = await web5Object.dwn.records.write({
          data: vcObject, message: {
            protocol: protocolDefinition.protocol,
            protocolPath: "vc", schema: protocolDefinition.types.vc.schema,
            dataFormat: protocolDefinition.types.vc.dataFormats[0],
            recipient: recipientDID, published: true
          }
        })

        if(record.id) {
          const savedSignedVC = await record.data.json()
          storedSignedVC = savedSignedVC
          const { status: sentStatus } = await record.send(recipientDID)
          if(sentStatus.code == 202) {
            // TODO: Implement sending emails here

            setAppState(prev => ({...prev, isSuccess: true, success: 'Sent!'}))
            resendIfFailed.className === className ? localStorage.removeItem(className) : null
            vcObject = {}
          }
          else {
            const savedRecord = { recordId: record.id, recipientDID: recipientDID.substring(0,15) }  
            resendIfFailed.className === className ? 
            null : localStorage.setItem(className, JSON.stringify(savedRecord))
            throw new Error('Error sending signed VC to Recipient')
          }
        }
        else throw new Error('Error saving signed VC to your DWN')
      }
      return { title: title, signedVc: storedSignedVC }
    }
    catch(error){
      setAppState(prev => ({...prev, isLoading: false, isError: true, error: error?.message}))
      return error
    }
    finally{
      setAppState(prev => ({...prev, isLoading: false}))
    }
  }
  return { appState, signCredential }
}
