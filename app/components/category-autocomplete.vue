<template>
    <Popover v-model:open="open">
        <PopoverTrigger as-child>
            <Button
                variant="outline"
                role="combobox"
                :aria-expanded="open"
                class="w-full justify-between"
            >
                {{ selectedCategory?.name || "Select category" }}
                <ChevronsUpDownIcon class="opacity-50" />
            </Button>
        </PopoverTrigger>
        <PopoverContent class="w-full p-0">
            <Command>
                <CommandInput class="h-9" placeholder="Search category" />
                <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        <CommandItem
                        v-for="category in formattedCategories"
                        :key="category.value"
                        class="cursor-pointer"
                        :value="category.value"
                        @select="(ev) => {
                            selectCategory(ev.detail.value)
                        }"
                        >
                        {{ category.label }}
                        <CheckIcon
                            :class="cn(
                            'ml-auto',
                            value === category.value ? 'opacity-100' : 'opacity-0',
                            )"
                        />
                        </CommandItem>
                    </CommandGroup>
                    <CategoryFormDialog />
                </CommandList>
            </Command>
        </PopoverContent>
  </Popover>
</template>

<script setup>
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-vue-next'
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '~/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '~/components/ui/popover'

const props = defineProps({
  categories: {
    type: Array,
    default: () => []
  }
})

const open = ref(false)
const selectedCategoryId = defineModel()

const formattedCategories = computed(() => {
  return props.categories.map(category => ({
    value: category._id,
    label: category.name
  }))
})

const selectedCategory = computed(() =>
  props.categories.find(category => category._id === selectedCategoryId.value)
)
const selectCategory = (selectedValue) => {
  selectedCategoryId.value = selectedValue === selectedCategoryId.value ? '' : selectedValue
  open.value = false
}
</script>