<template>
  <Dialog v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button class="cursor-pointer" variant="outline" @click="closeDialog">No</Button>
        <Button class="btn-confirm cursor-pointer" @click="confirm">Yes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
import { useDialogsStore } from '~/store/dialogs'
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from '~/components/ui/dialog'

const dialogsStore = useDialogsStore()

const isOpen = computed(() => dialogsStore.dialogs.confirm.isOpen)
const title = computed(() => dialogsStore.dialogs.confirm.params?.title)
const description = computed(() => dialogsStore.dialogs.confirm.params?.description)
const onSubmit = computed(() => dialogsStore.dialogs.confirm.params?.onSubmit)

const confirm = async () => {
  if (typeof onSubmit.value === 'function') {
    await onSubmit.value()
  }
  dialogsStore.close('confirm', true)
}

const closeDialog = () => {
  dialogsStore.close('confirm', null)
}
</script>
