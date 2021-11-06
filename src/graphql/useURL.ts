import { useCallback } from "react"
import { useNetwork } from "../hooks"

const toQueryMsg = (msg: string) => {
  try {
    return JSON.stringify(JSON.parse(msg))
  } catch (error) {
    return ""
  }
}

export default () => {
  const { lcd } = useNetwork()
  const getUrl = useCallback(
    (contract: string, msg: string | object) => {
      const query_msg =
        typeof msg === "string"
          ? toQueryMsg(msg)
          : encodeURIComponent(JSON.stringify(msg))
      return `${lcd}/wasm/contracts/${contract}/store?query_msg=${query_msg}`
    },
    [lcd]
  )
  return getUrl
}
