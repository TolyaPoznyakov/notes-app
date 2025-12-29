<template>
    <Dialog v-model:open="open">
        <form>
            <DialogTrigger as-child>
                <Button variant="secondary" class="w-full rounded-none cursor-pointer">
                    Add category
                </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create category</DialogTitle>
                    <DialogDescription>
                        Create a new category for your notes.
                    </DialogDescription>
                </DialogHeader>
                <div class="grid gap-4">
                    <div class="grid gap-3">
                        <Label for="name-1">Name *</Label>
                        <Input id="name-1" v-model="form.name" name="name" />
                    </div>
                    <div class="grid gap-3">
                        <Label for="desc-1">Description</Label>
                        <Input id="desc-1" v-model="form.description" name="description" />
                    </div>
                    <div class="grid gap-3">
                        <Label for="color-1">Color</Label>
                        <Input id="color-1" v-model="form.color" name="color" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose as-child>
                        <Button variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button @click="createCategory">
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </form>
    </Dialog>
</template>

<script setup lang="ts">
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '~/components/ui/dialog'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { useApiRequest } from "~/composables/apiRequest.js"
import routes from '~/const/routes'
import { toast } from 'vue-sonner'

const loading = ref(false)
const form = reactive({
  name: '',
  description: '',
  color: ''
})
const open = ref(false)
const createCategory = async () => {
  loading.value = true

  await useApiRequest(routes.categories.list(), {
    method: 'POST',
    body: form
  })
  // TODO: Tell the need to fetch categories after create
  await useApiRequest(routes.categories.list())

  toast.success('Category has been created')
  open.value = false
  loading.value = false
}

</script>