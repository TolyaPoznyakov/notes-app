<template>
  <Dialog v-model:open="open">
    <DialogTrigger as-child>
      <slot name="trigger" />
    </DialogTrigger>

    <DialogContent class="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <slot name="title" />
        </DialogTitle>
        <DialogDescription>
          <slot name="description" />
        </DialogDescription>
      </DialogHeader>

      <div class="grid gap-4">
        <slot name="body" />
      </div>

      <DialogFooter>
        <slot name="footer" />
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup>
const open = defineModel()
</script>
