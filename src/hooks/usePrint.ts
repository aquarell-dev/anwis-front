// const usePrint = (ref: RefObject<HTMLIFrameElement | null>) => {

type Window = {
  [key: string]: any
}

const usePrint = (id: string) => {
  return () => {
    console.log('attempt')
    const frames = window.frames as Window
    // frames[id].focus()
    // frames[id].contentWindow.print()
    var newWin = frames[id]
    newWin.document.write('<body onload="window.print()">dddd</body>')
    newWin.document.close()
    // if (ref.current?.contentWindow) {
    //   ref.current.focus()
    //   ref.current.contentWindow.print()
    // } else console.log('иди нахуй')
  }
}

export default usePrint
