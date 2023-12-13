/* eslint-disable react/prop-types */
// import {useState} from 'react'

export const VerificationPresentation = ({ obj, title, recipientId }) => {
  return (
    <section
      className={`overflow-hidden border bg-gray-100  flex flex-col rounded-xl p-5`}
    >
      <h2 className="text-center mb-5 text-2xl text-primary-100">Summary</h2>
      <p className="font-[600] whitespace-nowrap p-1.5">
        Recipient ID:{' '}
        <span className="font-[400]">{recipientId?.substring(0, 40)}...</span>
      </p>

      <p className="font-[600] whitespace-nowrap p-1.5">
        Title: <span className="font-[400]">{title}</span>
      </p>

      <div className="flex flex-col">
        <div className="flex flex-col">
          {Object.entries(obj).map(([attri, value], index) => (
            <p
              key={index}
              className="font-[600] whitespace-nowrap p-1.5 capitalize"
            >
              {attri}: <span className="font-[400]">{value}</span>
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};
