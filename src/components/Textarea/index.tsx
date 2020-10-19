import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

interface TextareaProps {
  name: string;
  [key: string]: any;
}

const Textarea: React.FC<TextareaProps> = ({ name, ...rest }) => {
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
      <textarea ref={inputRef} defaultValue={defaultValue} {...rest}></textarea>
      <span>{error}</span>
    </div>
  );
};

export default Textarea;
