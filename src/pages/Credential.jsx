import { useCredentialContext } from "../context/useCredentialContext"

export const Credential = () => {
    const { webConnect } = useCredentialContext()

  return (
    <div>{webConnect.did}</div>
  )
}
