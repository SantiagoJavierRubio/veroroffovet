import { motion, AnimatePresence } from 'framer-motion'
import { FC } from 'react'
import { SENDING_STATUS } from '@/hooks/useSendingStatus'
import type { Status } from '@/hooks/useSendingStatus'
import Image from 'next/image'

const SendButton: FC<{
  sendingStatus: Status
  errorMessage?: string
}> = ({ sendingStatus, errorMessage }) => {
  const calculateButtonStyles = () => {
    switch (sendingStatus) {
      case SENDING_STATUS.SENDING:
        return 'bg-primary w-auto p-4 aspect-square'
      case SENDING_STATUS.ERROR:
        return 'bg-red-400 p-4 asapect-video'
      case SENDING_STATUS.RESPONSE_OK:
        return 'bg-green-500 p-1 aspect-square'
      case SENDING_STATUS.NULL:
      default:
        return 'bg-primary aspect-video p-4 active:bg-primary/90'
    }
  }
  return (
    <button
      type="submit"
      disabled={sendingStatus !== SENDING_STATUS.NULL}
      className={`${calculateButtonStyles()} relative m-auto h-16 rounded-lg font-bold text-stone-50 shadow-none outline-none transition-all duration-75 hover:-translate-y-px hover:shadow-black/60 hover:drop-shadow-xl hover:duration-75 active:translate-y-0 active:scale-100 active:shadow-inner disabled:translate-y-0`}
    >
      <AnimatePresence>
        {sendingStatus === SENDING_STATUS.NULL && <p>Enviar</p>}
        {sendingStatus === SENDING_STATUS.SENDING && (
          <svg
            aria-hidden="true"
            className="fill-secondary m-auto h-6 w-6 animate-spin text-gray-200 dark:text-gray-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        )}
        {sendingStatus === SENDING_STATUS.RESPONSE_OK && (
          <motion.div
            initial={{
              rotate: -260,
              scale: 0.2
            }}
            animate={{
              rotate: 0,
              scale: 1
            }}
            exit={{
              rotate: -260,
              scale: 0
            }}
            transition={{
              duration: 0.35
            }}
            className="overflow-hidden"
          >
            <Image
              src="/svgs/female-doctor.svg"
              width={50}
              height={50}
              alt="doctor ok"
              priority
            />
          </motion.div>
        )}
        {sendingStatus === SENDING_STATUS.ERROR && (
          <p>{errorMessage || 'Error'}</p>
        )}
      </AnimatePresence>
    </button>
  )
}
export default SendButton
