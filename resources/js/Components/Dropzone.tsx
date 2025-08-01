import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { X } from 'lucide-react';

const Dropzone = ({
  files,
  setFiles,
  collectedAttachments = [],
  setCollectedAttachments,
  multiple = true,
}) => {
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

  const displayFiles = [...files, ...collectedAttachments].filter((file, idx, arr) => {
    const key = `${file.filename || file.name}|${file.path || ''}`;
    return arr.findIndex(f => `${f.filename || f.name}|${f.path || ''}` === key) === idx;
  });

  const removeFile = (file) => {
    setFiles((prev) => prev.filter((f) => (f.name || f.filename) !== (file.name || file.filename)));
    if (setCollectedAttachments) {
      setCollectedAttachments((prev) => prev.filter((f) => (f.name || f.filename) !== (file.name || file.filename)));
    }
  };

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
        {displayFiles.map((file, idx) => (
          <li
            key={(file.path || file.name || '') + idx}
            className="relative h-16 p-3 rounded-md border shadow-sm bg-white flex items-center justify-between"
          >
            <div className="flex flex-col flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-900 truncate">
                {file.filename || file.name}
              </span>
              {file.pr_number && (
                <span className="text-xs text-blue-600 truncate mt-1">
                  PR:<span className="font-semibold">{file.pr_number}</span>
                </span>
              )}
            </div>
            <button
              type="button"
              className="ml-2 px-2 py-1 text-xs text-red-700 bg-red-100 rounded hover:bg-red-200 flex items-center justify-center"
              onClick={() => removeFile(file)}
              aria-label="Remove file"
              title="Remove"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Dropzone;
