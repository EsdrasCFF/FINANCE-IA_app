/* eslint-disable @typescript-eslint/no-unused-vars */

'use client'

import { useState } from 'react'

import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/app/_components/ui/dialog'

export function useConfirm(
  title: string,
  message: string
): [() => JSX.Element, () => Promise<unknown>] {
  const [promise, setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null)

  const confirm = () =>
    new Promise((resolve, _reject) => {
      setPromise({ resolve })
    })

  const handleClose = () => {
    setPromise(null)
  }

  const handleConfirm = () => {
    promise?.resolve(true)
    handleClose()
  }

  const handleCancel = () => {
    promise?.resolve(false)
    handleClose()
  }

  const ConfirmationDialog = () => (
    <Dialog open={promise !== null} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle> {title} </DialogTitle>

          <DialogDescription> {message} </DialogDescription>
        </DialogHeader>

        <DialogFooter className="pt-2">
          <Button variant="outline" onClick={handleCancel}>
            Cancelar
          </Button>

          <Button onClick={handleConfirm}> Confirmar </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )

  return [ConfirmationDialog, confirm]
}
