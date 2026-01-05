<template>
  <div>
    <Dialog>
      <DialogTrigger as-child>
        <slot />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete this {{ entity }}?</DialogTitle>
          <DialogDescription> This action is irreversible, be careful. </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose as-child>
            <Button class="cursor-pointer" variant="outline">No</Button>
          </DialogClose>

          <DialogClose as-child>
            <Button class="btn-confirm cursor-pointer" @click="confirmDelete"> Yes </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script setup>
defineProps({
  entity: {
    type: String,
    default: 'item'
  }
})

const emit = defineEmits(['confirm'])

const confirmDelete = () => {
  emit('confirm')
}
</script>

<style scoped></style>
