<template>
    <div id="AddLink" class="w-full bg-white rounded-3xl overflow-hidden">
        
        <div class="flex items-center justify-between pb-2 p-6">
            <div class="text-[19px] font-semibold">Enter URL</div>
            <button 
                @click="$emit('close')"
                class="flex items-center rounded-full p-1.5 hover:bg-[#EFF0EA]"
            >
                <Icon 
                    name="mdi:close" 
                    size="20" 
                    color="#676B5F" 
                />
            </button>
        </div>

        <form 
            @submit.prevent="submit()" 
            class="flex items-center gap-4 w-full pt-2 p-6"
        >

            <div class="w-full">
                <TextInput 
                    class="w-full"
                    placeholder="Name"
                    v-model:input="name"
                    inputType="text"
                    :error="errors && errors.name ? errors.name[0] : ''"
                />

                <div class="py-1" />

                <TextInput 
                    class="w-full"
                    placeholder="URL"
                    v-model:input="url"
                    inputType="text"
                    :error="errors && errors.url ? errors.url[0] : ''"
                />
            </div>

            <button
                type="submit"
                :disabled="!name && !url"
                @click="addLink()"
                class="rounded-full p-3 px-6"
                :class="
                    name && url
                        ? 'bg-[#8228D9] hover:bg-[#6c21b3] text-white' 
                        : 'bg-[#EFF0EA] text-[#A7AAA2]'
                "
            >
                Add
            </button>
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()

const emit = defineEmits(['close'])

let name = ref('')
let url = ref('')
let errors = ref(null)

const addLink = async () => {
    try {
        await userStore.addLink(name.value, url.value)
        await userStore.getAllLinks()
        setTimeout(() => { 
            emit('close')
            name.value = ''
            url.value = ''
        }, 100)
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}
</script>
