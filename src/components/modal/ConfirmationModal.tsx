import React, { useState } from 'react'

interface ModalPropsType {
  desc: string,
  btnText: string,
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  triggerFunction(): Promise<void> | void
}

const ConfirmationModal: React.FC<ModalPropsType> = ({ desc, btnText, triggerFunction, setOpenModal }) => {

  const [loading, setLoading] = useState<boolean>(false)

  return (
    <div className='z-10 lg:rounded-3xl rounded-none fixed overflow-auto top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-10 backdrop-blur-sm'>
      <div className='text-black border-2 border-[white] flex flex-col items-center gap-1 md:p-8 p-5 rounded-lg bg-wrapper '>
        <h1>Are you sure?</h1>
        <p>{desc}</p>
        <div className='my-2'
          onClick={async () => {
            setLoading(true)
            await triggerFunction()
            setLoading(false)
            setOpenModal(false)
          }}>
          <button className='flex gap-2 items-center bg-blue px-4 rounded-md py-2 text-[white]' >
            {
              loading ? 'Proccess..' : btnText
            }
          </button>
        </div>
        <button onClick={() => setOpenModal(false)}>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default ConfirmationModal
