import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { ArrowUpTrayIcon, XMarkIcon } from '@heroicons/react/24/solid';

const Dropzone = ({files, setFiles}) => {
//   const [files, setFiles] = useState([]);
//   const [rejected, setRejected] = useState([]);

  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles
      ]);
    }

    // if (rejectedFiles?.length) {
    //   setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
    // }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    // accept: {
    //   'image/*': [],
    //   'application/*':[]
    // },
    maxSize: 1024 * 10000,
    onDrop,
  });

//   useEffect(() => {
//     // Revoke the data URIS to avoid memory leaks
//     return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
//   }, [files]);

  const removeFile = (name) => setFiles((files) => files.filter((file) => file.name !== name));

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!files?.length) return;
    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));

    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
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
    </form>
  );
};

export default Dropzone;
