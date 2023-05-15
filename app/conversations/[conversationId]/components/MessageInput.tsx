import React, { FC } from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'
interface MessageInputProps {
    id : string,
    register: UseFormRegister<FieldValues>,
    placeholder? : string
    type? : string,
    errors : FieldErrors

}
const MessageInput : FC<MessageInputProps> = ({
id,
register,
placeholder,
errors,
type
}) => {
  return (
    <div className='relative w-full'>
        <input id={id} type={type} autoComplete={id}
         {...register(id, { required : true })}
         placeholder={placeholder}
         className='text-black font-light
         py-2 px-4 bg-neutral-100 w-full rounded-full focus:outline-none'
         />
 
    </div>
  )
}

export default MessageInput
