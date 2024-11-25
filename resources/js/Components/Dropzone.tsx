import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Dropzone = ({ files, setFiles }) => {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 1024 * 10000,
    onDrop,
  });

  const removeFile = (name) => setFiles((files) => files.filter((file) => file.name !== name));

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-400 text-lg">
          <ArrowUpTrayIcon className="w-5 h-5 fill-current" />
          {isDragActive ? <p> Drop Files here...</p> : <p>Drag & Drop files here, or click to select files</p>}
        </div>
      </div>

      {/* Accepted files */}

      <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-5 ">
        {files?.map((file) => (
          <li key={file.name} className="relative h-12 rounded-md shadow-lg p-2 bg-gray-100">
            <button
              type="button"
              className="w-7 h-7  bg-slate-100 rounded-full flex justify-center items-center absolute top-3 right-2 hover:bg-red-200 transition-colors"
              onClick={() => removeFile(file.name)}>
              <XMarkIcon className="w-6 h-6  text-red-600 hover:fill-red-700 transition-colors" />
            </button>
            <p className="mt-2 text-black text-sm font-medium truncate pr-7">{file.name}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropzone;
