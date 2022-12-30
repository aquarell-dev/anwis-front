import PDFMerger from 'pdf-merger-js/browser'

const useMergePdf = () => {
  return async (files: string[]) => {
    const merger = new PDFMerger()

    for (const file of files) {
      await merger.add(file)
    }

    const mergedPdf = await merger.saveAsBlob()
    return URL.createObjectURL(mergedPdf)
  }
}

export default useMergePdf
