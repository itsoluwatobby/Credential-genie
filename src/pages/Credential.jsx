import { useCredentialContext } from "../context/useCredentialContext"
import { useState } from 'react';
import { useSignCredential } from "../hooks/useSignCredential";

export const Credential = () => {
  const { webConnect } = useCredentialContext()
  const [title, setTitle] = useState('')
  const [attributes, setAttributes] = useState({ key: '', value: '' })
  const [obj, setObj] = useState({})
  const [recipientDID, setRecipientDID] = useState('')
  const [result, setResult] = useState({})
  const { appState, signCredential } = useSignCredential({
    web5Object: webConnect.web5, recipientDID, title, properties: obj
  })

  const { key, value } = attributes
  const { isLoading, isError, error, isSuccess, success } = appState

  const pushToArray = () => {
    if(!key || !value) return
    setObj(prev => ({...prev, [attributes.key]: attributes.value}))
    setAttributes({key: '', value: ''})
  }

  const submit = async() => {
    if(isLoading) return
    const res = await signCredential()
    if(isSuccess){
      console.log({res})
      setResult(res)
      setObj({})
    } 
  }

  const copyDID = () => {
    navigator.clipboard.writeText(webConnect.myDid)
  }
  return (
    <main className="flex flex-col gap-y-5 p-4 w-full h-full">
      <p title='Tap to copy'
      className="cursor-default bg-gray-100 w-fit px-2 p-1"
      onClick={copyDID}>
        My DID: {webConnect.myDid.substring(0,15)}
      </p>
      
      <input type='text' value={title} className="border h-14 p-1" placeholder="title" onChange={e => setTitle(e.target.value)} />
      
      <input type='text' value={recipientDID} className="border h-14 p-1" placeholder="recipient DID" onChange={e => setRecipientDID(e.target.value)} />

      <div className='flex items-center w-[80%] h-14 gap-1'>
        <input type='text' value={key} className="border h-full w-full p-1" placeholder="name" onChange={e => setAttributes(prev => ({...prev, key: e.target.value}))} />
        <input type='text' value={value} className="border h-full w-full p-1" placeholder="value" onChange={e => setAttributes(prev => ({...prev, value: e.target.value}))} />
      <button
      onClick={pushToArray}
      className="border h-full rounded-md py-1.5 px-7 ml-3 bg-gray-600 text-white hover:opacity-80 active:opacity-100 transition-opacity w-fit">
        Add
      </button>
      </div>
      <button 
      onClick={submit}
      className="border rounded-md py-1.5 px-7 bg-green-600 text-white hover:opacity-80 active:opacity-100 transition-opacity w-fit">
        Submit
      </button>

      <span>
        {isLoading ? 'loading...' : isError ? error : isSuccess ? success : ''}</span>

      {
        isSuccess ?
        <div>
          {result}
        </div>
        : null
      }
    </main>
  )
}
