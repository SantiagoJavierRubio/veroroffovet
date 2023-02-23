import { useState } from 'react'

export const SENDING_STATUS = {
  NULL: 'NULL',
  SENDING: 'SENDING',
  RESPONSE_OK: 'RESPONSE_OK',
  ERROR: 'ERROR'
} as const

export type Status = keyof typeof SENDING_STATUS

export default function useSendingStatus() {
  const [sendingStatus, setSendingStatus] = useState<Status>(
    SENDING_STATUS.NULL
  )
  return { sendingStatus, setSendingStatus, SENDING_STATUS }
}
