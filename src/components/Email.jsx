import { Html } from "@react-email/html"
import { Button } from "@react-email/button"

export const Email = () => {
  return (
    <Html>
      <Button
        pX={20}
        pY={20}
        style={{ background: '#000', color: '#fff'}}
      >
        Send
      </Button>
    </Html>
  )
}
