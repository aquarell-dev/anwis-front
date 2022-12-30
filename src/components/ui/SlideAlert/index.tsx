import * as React from 'react'
import { FC } from 'react'

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>
  },
  ref: React.Ref<unknown>
) {
  return (
    <Slide
      direction='up'
      ref={ref}
      {...props}
    />
  )
})

const SlideAlert: FC<{
  title: string
  content: string
  buttonText: string[]
  onClose: () => void
  onDeny: () => void
  onAccept: () => void
  open: boolean
}> = ({ title, content, open, buttonText, onAccept, onClose, onDeny }) => {
  const [continueButton, denyButton] = buttonText

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={onClose}
      aria-describedby='alert-dialog'
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog'>{content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDeny}>{denyButton}</Button>
        <Button onClick={onAccept}>{continueButton}</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SlideAlert
