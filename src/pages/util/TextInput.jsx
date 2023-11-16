import React from 'react'

function TextInput(props) {
  return (
    <>
        <div className="mb-4">
            <label className="text-lg mb-2">{props.label}</label>
            <input
                type="text"
                value={props.value}
                onChange={(e) => props.function(e.target.value)}
                required
                className="w-full px-3 py-2 border rounded outline-none"
            />
            </div>
    </>
  )
}

export default TextInput