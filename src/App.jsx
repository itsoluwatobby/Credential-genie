import { useCredentialContext } from "./context/useCredentialContext"


function App() {
  const { webConnect } = useCredentialContext()

  return (
    <main>
      Hello
      {webConnect.myDid}
    </main>
  )
}

export default App
