import React from 'react'

const InputBox = ({label,type,name}) => {
  return (
    <div>
        <label className='text-sm font-medium text-left py-2'>{label}</label>
        <input type={type} placeholder={name}  className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
  )
}

export default InputBox