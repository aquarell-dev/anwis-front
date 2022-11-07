import { Accept, useDropzone } from 'react-dropzone';
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { acceptStyle, baseStyle, focusedStyle, img, rejectStyle, thumb, thumbInner, thumbsContainer } from './styles';
import useUploadDocument from '../../../hooks/useUploadDocument';

type DragFile = File & { preview: string; };
type DragNDropProps = { accept?: Accept, type: 'photo' | 'document' };

const FileDragAndDrop: FC<DragNDropProps> = ({ accept, type }) => {
  const { create } = useUploadDocument(type);

  const [files, setFiles] = useState<DragFile[]>([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

      create(acceptedFiles[0]).catch(err => console.log(err));
    }
  });

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isFocused ? focusedStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isFocused,
    isDragAccept,
    isDragReject
  ]);

  return (
    <div className="container">
      <div {...getRootProps({ style: (style as CSSProperties) })}>
        <input {...getInputProps()} />
        <p>Перетащите сюда файлы или нажмите для выбора файла</p>
      </div>
      <aside style={thumbsContainer}>
        {files.map((file: DragFile) => (
          <div
            style={thumb}
            key={file.name}
          >
            <div style={thumbInner}>
              <img
                src={file.preview}
                style={img}
                // Revoke data uri after image is loaded
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default FileDragAndDrop;