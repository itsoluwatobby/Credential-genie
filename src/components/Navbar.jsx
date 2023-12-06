import { Link } from 'react-router-dom'
import { useCredentialContext } from '../context/useCredentialContext'
import { useState } from 'react'

export const Navbar = () => {
  const { webConnect } = useCredentialContext()
  const Buttons = ['issued VCs', 'signed VCs']
  const [openDropdown, setOpenDropdown] = useState(false)

  const copyDID = () => {
    if(!navigator.clipboard) return alert('Platform does not support copying')
    navigator.clipboard.writeText(webConnect.myDid)
  }
  
  return (
    <nav className='sticky top-0 shadow-md flex justify-between items-center px-6 py-3 z-10 bg-white transition-all'>
      <h1 className='text-2xl first-letter:text-3xl first-letter:italic font-medium'>
        Credential Genie
      </h1>
      <div className={`${openDropdown ? 'maxscreen:flex' : 'maxscreen:hidden'} maxscreen:absolute maxscreen:right-1 maxscreen:top-12 maxscreen:bg-gray-50 maxscreen:rounded-md maxscreen:px-4 maxscreen:py-2 maxscreen:flex-col sm:flex items-center gap-4`}>
        {
          Buttons.map(button => (
            <Link to={'#'} key={button} className='hover:underline underline-offset-2 transition-all'>
              {button}
            </Link>
          ))
        }
        <button
          title={webConnect.myDid.substring(0,15)}
          className='w-fit px-4 py-1 text-white rounded-md bg-green-500 hover:opacity-80 active:opacity-100 transition-opacity'
          onClick={copyDID}
        >
          Copy DID
        </button>
      </div>
      <button 
      onClick={() => setOpenDropdown(prev => !prev)}
      className={`hidden maxscreen:flex flex-col gap-1.5 w-10 h-6 hover:opacity-80 transition-all`}>
        <span className={`w-9 h-[3px] rounded-sm bg-black ${openDropdown ? 'rotate-[40deg]' : ''} transition-all`}/>
        <span className={`${openDropdown ? 'hidden' : ''} w-9 h-[3px] rounded-sm bg-black`}/>
        <span className={`w-9 h-[3px] rounded-sm bg-black ${openDropdown ? '-rotate-[40deg]' : ''} transition-all`}/>
      </button>
    </nav>
  )
}
