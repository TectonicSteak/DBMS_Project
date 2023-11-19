import React from 'react';

function TextInput(props) {
  
  const inputType = props.type || 'text';

  return (
    <>
      <div className="mb-4">
        <label className="text-lg font-semibold mb-2">{props.label}</label>
        <input
          type={inputType}
          value={props.value}
          onChange={(e) => props.function(e.target.value)}
          required
          className="w-full px-3 py-2 border rounded outline-none"
        />
      </div>
    </>
  );
}

export default TextInput;
