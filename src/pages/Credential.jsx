import { useEffect, useState } from 'react';
import protocolDefinition from '../utils/protocolDefinition.json'
import { useSignCredential } from "../hooks/useSignCredential";
import { useCredentialContext } from "../context/useCredentialContext"
import { VerificationPresentation } from "../components/VerificationPresentation";

export const Credential = () => {
  const { webConnect } = useCredentialContext()
  const [title, setTitle] = useState('')
  const [attributes, setAttributes] = useState({ key: '', value: '' })
  const [obj, setObj] = useState({})
  const [credentials, setCredentials] = useState({
    isLoading: false, error: '', vcs: []})
  const [userDetail, setUserDetail] = useState({recipientDID: '', email: ''})
  const [result, setResult] = useState({})
  const { appState, signCredential } = useSignCredential({
    web5Object: webConnect.web5, email: userDetail.email.trim(),
    recipientDID: userDetail.recipientDID.trim(), 
    title: title.trim(), properties: obj
  })

  useEffect(() => {
    let isMounted = true
    const fetchCredentials = async() => {
      setCredentials(prev => ({...prev, isLoading: true}))
      try{
        const { records } = await webConnect.web5.dwn.records.query({
          message: {
            schema: protocolDefinition.types.vc.schema,
            filter: {
              protocol: protocolDefinition.protocol
            }
          }
        })
        if(!records?.length) throw new Error('No credentials')
        await Promise.all(records?.map(async(record) => {
          const rec = await record.data.json()
          setCredentials(prev => ({
            ...prev, vcs: [...prev.vcs, {
              ...rec, id: record?.id, 
              // date: record?.descriptor?.dateCreated
            }]}))
        }))
      }
      catch(error){
        setCredentials(prev => ({...prev, isLoading: false, error: error.message}))
      }
      finally{
        setCredentials(prev => ({...prev, isLoading: false}))
      }
    }
    isMounted ? fetchCredentials() : null
    return () => {
      isMounted = false
    }
  }, [webConnect.web5])

  const { key, value } = attributes
  const { recipientDID, email } = userDetail
  const { isLoading, isError, error, isSuccess, success } = appState

  const pushToArray = () => {
    if(!key || !value) return
    setObj(prev => ({...prev, [attributes.key.trim()]: attributes.value.trim()}))
    setAttributes({key: '', value: ''})
  }

  const submit = async() => {
    if(isLoading) return
    const res = await signCredential()
    if(isSuccess){
      setResult(res)
      setObj({})
    } 
  }

  return (
    <main className="hidebars flex flex-col gap-y-5 p-4 w-full h-full">
      
      <input type='text' value={title} className="border h-12 p-1" placeholder="title" onChange={e => setTitle(e.target.value)} />
      <input 
        type='text' value={recipientDID} 
        placeholder="recipient DID" className="border h-12 p-1" 
        onChange={e => setUserDetail(prev => ({...prev, recipientDID: e.target.value }))} 
      />
      <input 
        type='email' value={email} 
        placeholder="recipient email" className="border h-12 p-1" 
        onChange={e => setUserDetail(prev => ({...prev, email: e.target.value }))} 
      />

      <div className='flex items-center w-[80%] h-12 gap-1'>
        <input type='text' value={key} className="border h-full w-full p-1" placeholder="name" onChange={e => setAttributes(prev => ({...prev, key: e.target.value}))} />
        <input type='text' value={value} className="border h-full w-full p-1" placeholder="value" onChange={e => setAttributes(prev => ({...prev, value: e.target.value}))} />
      <button
      onClick={pushToArray}
      className="border h-full rounded-md py-1.5 px-7 ml-3 bg-gray-600 text-white hover:opacity-80 active:opacity-100 transition-opacity w-fit">Add</button>
      </div>
      <button 
      onClick={submit}
      className="border rounded-md py-1.5 px-7 bg-green-600 text-white hover:opacity-80 active:opacity-100 transition-opacity w-fit">Submit</button>

      <span>
        {isLoading ? 'loading...' : isError ? error : isSuccess ? success : ''}</span>

      { isSuccess ? <div>{JSON.stringify(result)}</div> : null }

      <div className={`${(title?.length || recipientDID?.length || email?.length || Object.entries(obj)?.length) ? 'hidden' : 'flex'} flex-col gap-3`}>
        {
          credentials.vcs.map((cred, index) => (
            <div key={index}
            className='flex flex-col gap-y-1'
            >
              <p className='whitespace-nowrap font-bold'>Title: <span className='whitespace-pre-wrap break-all font-normal'>{cred.title?.substring(0,150)}...</span>
              </p> 
              
              <p className='whitespace-nowrap font-bold'>Author: <span className='whitespace-pre-wrap break-all font-normal'>{cred.author?.substring(0,150)}...</span>
              </p> 

              <p className='whitespace-nowrap font-bold'>Recipient: <span className='whitespace-pre-wrap break-all font-normal'>{cred.vc?.substring(0,150)}...</span>
              </p>

              <p className='whitespace-nowrap font-bold'>Crendential: <span className='whitespace-pre-wrap break-all font-normal'>{cred.vc?.substring(0,150)}...</span>
              </p> 
            </div>
          ))
        }
      </div>

      <VerificationPresentation 
        title={title} obj={obj} 
        recipientId={recipientDID} 
      />
    </main>
  )
}
