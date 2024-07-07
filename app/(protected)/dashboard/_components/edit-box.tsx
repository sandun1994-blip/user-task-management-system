'use client'
import dynamic from 'next/dynamic';
import { useState } from 'react';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const EditBox = () => {
  const [value, setValue] = useState('');
console.log(value);

  return (
    <ReactQuill value={value} onChange={setValue} />
  );
};

export default EditBox;
