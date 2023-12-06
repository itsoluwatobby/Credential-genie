/* eslint-disable react/prop-types */
// import {useState} from 'react'

export const VerificationPresentation = ({ obj, title, recipientId }) => {

  return (
    <section className={`overflow-hidden border-2 border-gray-400 flex flex-col ${(title || recipientId || Object.entries(obj)?.length) ? 'scale-1' : 'scale-0'} rounded-md maxscreen:w-[90%] w-1/2 text-sm transition-transform`}>
      <p className='capitalize font-bold bg-gray-100 p-1.5'>Title: {title}</p>
      <p className='font-[600] whitespace-nowrap p-1.5'>DID: <span className="font-[400]">{recipientId?.substring(0,40)}...</span></p>
      <div className='flex flex-col p-3'>
        <span>{'{'}</span>    
          <div className='flex flex-col'>
          {
            Object.entries(obj).map(([attri, value], index) => (
              <div key={index}
                className='flex items-center gap-x-2 px-1 pl-4 cursor-default hover:bg-gray-100 transition-colors'
              >
                <span className='text-gray-700 lowercase tracking-wide'>{attri}</span>
                <span className='font-bold'>:</span>
                <span className='whitespace-pre-wrap break-keep'>{value}</span>
              </div>
            ))
          }
          </div>
        <span>{'}'}</span>
      </div>
    </section>
  )
}