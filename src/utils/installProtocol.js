import protocolDefinition from './protocolDefinition.json'

export const configureProtocol = async(web5Object, did) => {
  const { protocols, status } = await web5Object.dwn.protocols.query({
    message: {
      filter:{
        protocol: protocolDefinition.protocol
      }
    }
  })

  if (status.code !== 200) return ({ error: 'Error fetching protocols' });
  else if (protocols.length > 0) return ({ error: 'Protocol already exists' });
  else{
    // configure protocol
    const { status: configStatus, protocol } = await web5Object.dwn.protocols.configure({
      message: {
        definition: protocolDefinition
      }
    })
    // console.log(protocol)
    const {status: sentStatus} = await protocol.send(did)
    console.log({sentStatus})
    return configStatus;
  }
}