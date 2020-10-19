import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface InputProps {
  name: string;
  [key: string]: any;
}

const Input: React.FC<InputProps> = ({ name, ...rest }) => {
  const inputRef = useRef(null);
  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div>
      <input ref={inputRef} defaultValue={defaultValue} {...rest} />
      <span>{error}</span>
    </div>
  );
};

export default Input;
