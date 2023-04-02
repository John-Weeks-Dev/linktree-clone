<template>
    <div 
        id="AddLinkOverlay"
        class="fixed z-40 top-0 left-0 w-full h-full bg-white px-5"
    >
        <div class="flex items-center justify-start w-full py-[8px]">
            <button 
                type="button"
                @click="close()"
                class="rounded-full"
            >
                <Icon 
                    name="material-symbols:arrow-back-sharp" 
                    size="35" 
                    color="#676B5F" 
                />
            </button>

            <div class="text-lg font-semibold pl-8">Add New Link</div>
        </div>

        <div class="text-2xl font-semibold pt-10">Enter URL</div>

        <form 
            @submit.prevent="submit()" 
            class="flex items-center gap-4 w-full pt-4"
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
                @click="addLink()"
                class="rounded-full p-2 bg-[#EFF0EA]"
            >
                <Icon 
                    name="material-symbols:arrow-forward-sharp" 
                    size="25" 
                    color="#676B5F" 
                />
            </button>
        </form>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { addLinkOverlay } = storeToRefs(userStore)

onMounted(() => userStore.hidePageOverflow(true, 'AdminPage'))

const close = () => addLinkOverlay.value = false

let name = ref('')
let url = ref('')
let errors = ref(null)

const addLink = async () => {
    try {
        await userStore.addLink(name.value, url.value)
        await userStore.getAllLinks()
        setTimeout(() => { 
            name.value = ''
            url.value = ''
            addLinkOverlay.value = false
        }, 100)
    } catch (error) {
        errors.value = error.response.data.errors
    }
}

onUnmounted(() => {
    userStore.hidePageOverflow(false, 'AdminPage')
    addLinkOverlay.value = false
})
</script>
