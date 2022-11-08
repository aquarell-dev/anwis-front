import { Accept, useDropzone } from 'react-dropzone';
import { CSSProperties, FC, useEffect, useMemo, useState } from 'react';
import { acceptStyle, baseStyle, focusedStyle, rejectStyle, thumb, thumbInner, thumbsContainer } from './styles';
import useUploadDocument from '../../../hooks/useUploadDocument';
import { SpinnerComponent } from 'react-element-spinner';

type DragFile = File & { preview: string; };
type DragNDropProps = { accept?: Accept, type: 'photo' | 'document', multiple?: boolean };

const FileDragAndDrop: FC<DragNDropProps> = ({ accept, type, multiple }) => {
  const { create, isLoading } = useUploadDocument(type);

  const [files, setFiles] = useState<DragFile[]>([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    multiple: !!multiple,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));

      acceptedFiles?.forEach(file => create(file).catch(err => console.log(err)));
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
    <div className="container w-full">
      <div {...getRootProps({ style: (style as CSSProperties) })}>
        {isLoading ? (
          <SpinnerComponent
            loading={true}
            position={'inline'}
          />
        ) : (
          <>
            <input {...getInputProps()} />
            <p>Перетащите сюда файлы или нажмите для выбора файла</p>
          </>
        )}
      </div>
      <aside style={thumbsContainer}>
        {files.map((file: DragFile) => (
          <div
            style={thumb}
            key={file.name}
          >
            <div style={thumbInner}>
              <p onLoad={() => URL.revokeObjectURL(file.preview)}>
                {file.name}
              </p>
            </div>
          </div>
        ))}
      </aside>
    </div>
  );
};

export default FileDragAndDrop;