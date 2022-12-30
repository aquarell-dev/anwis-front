import { CSSProperties, FC, useEffect, useMemo, useState } from 'react'
import { Accept, useDropzone } from 'react-dropzone'
import { SpinnerComponent } from 'react-element-spinner'

import useUploadDocument from '../../../hooks/useUploadDocument'

import { SetState } from '../../../utils/types'
import {
  acceptStyle,
  baseStyle,
  focusedStyle,
  img,
  rejectStyle,
  thumb,
  thumbInner,
  thumbsContainer
} from './styles'

export type DragFile = File & { preview: string }

type DragNDropProps = {
  accept?: Accept
  type: 'photo' | 'document'
  multiple?: boolean
  preview?: boolean
  uploadToServer?: boolean
  customSetFile?: SetState<DragFile[]>
}

const FileDragAndDrop: FC<DragNDropProps> = ({
  accept,
  type,
  multiple,
  preview,
  customSetFile,
  uploadToServer = true
}) => {
  const { create, isLoading } = useUploadDocument(type)

  const [files, setFiles] = useState<DragFile[]>([])
  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    accept,
    multiple: !!multiple,
    onDrop: acceptedFiles => {
      setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      )

      if (customSetFile)
        customSetFile(
          acceptedFiles.map(file =>
            Object.assign(file, {
              preview: URL.createObjectURL(file)
            })
          )
        )

      if (uploadToServer)
        acceptedFiles?.forEach(file => create(file).catch(err => console.log(err)))
    }
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview))
  }, [])

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  return (
    <div className='container w-full'>
      <div {...getRootProps({ style: style as CSSProperties })}>
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
              {preview ? (
                <div className='relative'>
                  <div className='absolute right-0 top-0 h-6 w-6 cursor-pointer rounded-full bg-rose-600 hover:bg-rose-700 duration-300 transition ease-in-out flex items-center justify-center'>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 text-white'
                      style={{
                        flex: '0 0 auto'
                      }}
                      onClick={() => setFiles(prev => prev.filter(f => f.name !== file.name))}
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M6 18L18 6M6 6l12 12'
                      />
                    </svg>
                  </div>
                  <img
                    src={file.preview}
                    style={img}
                    alt={'Фото'}
                    // Revoke data uri after image is loaded
                    onLoad={() => {
                      URL.revokeObjectURL(file.preview)
                    }}
                  />
                </div>
              ) : (
                <p onLoad={() => URL.revokeObjectURL(file.preview)}>{file.name}</p>
              )}
            </div>
          </div>
        ))}
      </aside>
    </div>
  )
}

export default FileDragAndDrop
