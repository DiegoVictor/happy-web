import React, { useEffect, useRef } from 'react';

import { useField } from '@unform/core';

export default function Input({
  name,
  ...rest
}: {
  name: string;
  [key: string]: any;
}) {
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
}
