/* eslint-disable react/prop-types */
// import {useState} from 'react'

export const VerificationPresentation = ({ myDid, obj, title, recipientId, setObj, signedObj }) => {
// TODO: signedObj - will only take effect in the create page
// The delete button will only be revealed in the create page

  return (
    <section
      className={`overflow-hidden border bg-gray-100  flex flex-col rounded-xl p-5`}
    >
      <div className="relative w-full">
        <h2 className="text-center mb-5 text-2xl text-primary-100">Summary</h2>
        {/* Display when signed */}
        <span className={`absolute ${signedObj?.signed ? 'scale-100' : 'scale-0'} rounded-sm p-1 top-2 bg-gray-400 bg-opacity-25 right-0 capitalize font-medium text-[#59de3b]`}>Signed!</span>
      </div>

      <p className="font-[600] whitespace-nowrap p-1.5">
        Author ID:{' '}
        <span className="font-[400]">{myDid?.substring(0, 40) ?? signedObj?.author?.substring(0, 40)}...</span>
      </p>
      <p className="font-[600] whitespace-nowrap p-1.5">
        Recipient ID:{' '}
        <span className="font-[400]">{recipientId?.substring(0, 40) ?? signedObj?.recipient?.substring(0, 40)}...</span>
      </p>

      <p className="font-[600] whitespace-nowrap p-1.5">
        Title: <span className="font-[400]">{title ?? signedObj?.title}</span>
      </p>

      <div className="flex flex-col">
        <div className="flex flex-col">
          {Object.entries(obj ?? signedObj?.obj).map(([attri, value], index) => (
            <div
              key={index}
              className="p-1.5 flex justify-between w-full"
            >
              <p
                className="font-[600] flex gap-x-1.5"
                >
                <span className="capitalize">{attri}:</span> 
                <span className="font-[400] whitespace-pre-wrap">{value}</span>
              </p>
              <button 
                onClick={() => {
                  delete obj[attri]
                  setObj({ ...obj });
                }}
                className="self-start bg-gray-300 opacity-50 hover:bg-opacity-80 flex-none border rounded px-2.5 grid place-content-center transition-opacity">
                x
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
