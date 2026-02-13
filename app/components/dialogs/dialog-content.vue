<template>
  <Dialog v-model:open="isOpen" @update:open="closeDialog">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>
          {{ title }}
        </DialogTitle>
        <DialogDescription>
          {{ description }}
        </DialogDescription>
      </DialogHeader>
      <component :is="component" v-bind="componentProps" :close-modal="closeDialog" />
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
  DialogHeader
} from '~/components/ui/dialog'

const dialogsStore = useDialogsStore()

const isOpen = computed(() => dialogsStore.dialogs.content.isOpen)
const component = computed(() => dialogsStore.dialogs.content.params?.component)
const componentProps = computed(() => dialogsStore.dialogs.content.params?.componentProps)
const title = computed(() => dialogsStore.dialogs.content.params?.title)
const description = computed(() => dialogsStore.dialogs.content.params?.description)

const closeDialog = () => {
  dialogsStore.close('content', null)
}
</script>
