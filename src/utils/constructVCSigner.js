import { utils as didUtils } from '@web5/dids';
import { PresentationExchange } from '@web5/credentials';

export const initAppState = { isLoading: false, isError: false, error: '', isSuccess: false, success: '' }
export const initSignedObj = { signed: false, author: '', recipient: '', title: '', obj: {} }
export const constructVCSigner = async(authorDid, web5Object) => {
  try{
    const signedKeyId = await web5Object.agent.didManager.getDefaultSigningKey({ did: authorDid })
    if(!signedKeyId) throw new Error ({ error: 'VCManager: Unable to determine signing key id for author: ' + authorDid.substring(0,15) })
    const parseDid = didUtils.parseDid({ didUrl: signedKeyId })
    if(!parseDid) throw new Error ({ error: `DidIonMethod: Unable to parse DID: ${signedKeyId}` })

    const normalizedDid = parseDid.did.split(':', 3).join(':');
    const normalizedSigningKeyId = `${normalizedDid}#${parseDid.fragment}`;
    const signingKey = await web5Object.agent.keyManager.getKey({ keyRef: normalizedSigningKeyId });
    return {
      keyId       : signedKeyId,
      algorithm   : signingKey.privateKey.algorithm.name,
      sign        : async (content) => {
        return await web5Object.agent.keyManager.sign({ 
          algorithm   : signingKey.privateKey.algorithm,
          data        : content,
          keyRef      : normalizedSigningKeyId
        })
      }
    }
  }
  catch(error){
    console.log(error.message)
    return error
  }
}

export function createDynamicClass(className, props){
  class DynamicClass{
    constructor(){
      Object.entries(props).map(([key, value]) => this[key] = value)
    }
  }
  Object.defineProperty(DynamicClass, 'name', {value: className})
  return DynamicClass
}

export function camelCase(entry){
  return entry.split(' ',3).map(name => name[0].toUpperCase()+name.substring(1)).join('')
}

/**
 * TO BE COMPLETED
 * @param {*} param0 
 */
// optional 
export function createPresentation({signedVc, recordId, name, reason, purpose}){
  const presentationDefinition = {
    id: recordId,
    name,
    purpose: reason,
    input_descriptors: [
      {
        id: 'seat',
        purpose,
        constraints: {
          fields: [
            {
              path: [`$.credentialSubject.seat`]
            }
          ]
        }
      }
    ]
  }

  // before creating a presentation exchange, verify the authenticity first
  try{
    PresentationExchange.validateDefinition(presentationDefinition)
    PresentationExchange.satisfiesPresentationDefinition([signedVc], presentationDefinition)
    console.log('\nVC Satisfies Presentation Definition!\n')
  }
  catch(err) {
    console.log('\nVC does not satisfy Presentation Definition: ' + err.message + '\n')
  }

  const presentationResult = PresentationExchange.createPresentationFromCredentials([signedVc], presentationDefinition)
  console.log("\nPresentation Result: " + JSON.stringify(presentationResult))
}