import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Dropzone = ({ files, setFiles, multiple = true }) => {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles?.length) {
        if (multiple) {
          setFiles((previousFiles) => [...previousFiles, ...acceptedFiles]);
        } else {
          setFiles([acceptedFiles[0]]);
        }
      }
    },
    [multiple, setFiles]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxSize: 1024 * 10000,
    onDrop,
  });

  const removeFile = (name) => setFiles((files) => files.filter((file) => file.name !== name));

  return (
    <>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4 border-2 border-dashed border-blue-400 text-lg p-5 min-w-full">
          <svg className="w-5 h-5 fill-current text-blue-400" viewBox="0 0 20 20">
            <path d="M10 3v10m0 0l-3-3m3 3l3-3M4 17h12" />
          </svg>
          {isDragActive ? <p>Drop Files here...</p> : <p>Drag & Drop files here, or click to select files</p>}
        </div>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 border-t border-gray-200 pt-3 mt-2">
        {files?.map((file) => (
          <li key={file.name} className="relative h-14 p-2 rounded-md border shadow-sm bg-white flex items-center justify-between">
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-xs text-gray-700 truncate">{file.name}</span>
            </div>
            <button
              type="button"
              className="ml-2 px-2 py-1 text-[10px] text-red-600 bg-red-100 rounded hover:bg-red-200"
              onClick={() => removeFile(file.name)}
              aria-label="Remove file"
              title="Remove">
              Remove
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropzone;

{
  /* <li key={file.path + idx} className="relative h-14 p-2 rounded-md border shadow-sm bg-white flex items-center justify-between">
  <div className="flex flex-col flex-1 min-w-0">
    <span className="text-xs text-gray-700 truncate">{file.filename}</span>
    <span className="text-[10px] text-gray-500 truncate">PR: {file.pr_number}</span>
  </div>
  <button
    type="button"
    className="ml-2 px-2 py-1 text-[10px] text-red-600 bg-red-100 rounded hover:bg-red-200"
    onClick={() => {
      setCollectedAttachments((prev) => prev.filter((_, i) => i !== idx));
    }}
    aria-label="Remove file">
    Remove
  </button>
</li>; */
}
