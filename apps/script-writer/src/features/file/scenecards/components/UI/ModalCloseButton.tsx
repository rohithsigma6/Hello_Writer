import React from 'react'
import { IoClose } from 'react-icons/io5'

type TModalCloseButtonProps = {
    closeHandler:()=>void
}
const ModalCloseButton:React.FC<TModalCloseButtonProps> = ({closeHandler}) => {
    return (
        <button
            className="hover:bg-black hover:text-white rounded-sm p-1 border-thin border-gray-300 text-sm"
            onClick={closeHandler}
        >
            <IoClose/>
        </button>
    )
}

export default ModalCloseButton