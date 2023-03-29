<template>

    <div 
        class="fixed overflow-auto w-full h-screen"
        :class="userStore.theme.color"
    />

    <AdminLayout>
        <div 
            id="PreviewAdminPage" 
            class="w-full mx-auto pt-32 relative z-10"
        >
            <div class="mx-auto w-full">
                <div class="h-full mx-auto w-full">
                    <img 
                        class="rounded-full min-w-[120px] w-[120px] mx-auto"
                        :src="userStore.image"
                    >

                    <div 
                        class="text-center text-2xl font-semibold mt-2"
                        :class="userStore.theme.text"
                    >
                        @{{ userStore.allLowerCaseNoCaps(userStore.name) }}
                    </div>

                    <div 
                        class="text-center text-lg font-light mt-2 mb-10"
                        :class="userStore.theme.text"
                    >
                        <div class="px-8">
                            {{ userStore.bio }}
                        </div>
                    </div>

                    <div v-for="link in userStore.allLinks">
                        <a
                            :href="link.url" 
                            target="_blank"
                            class="flex items-center relative border w-[calc(100%-10px)] mx-auto bg-white mt-4 p-1 rounded-lg"
                        >
                            <img 
                                class="rounded-lg h-[55px] aspect-square"
                                :src="link.image"
                            >

                            <div class="absolute text-[20px] text-center w-full">
                                {{ link.name }}
                            </div>
                        </a>
                    </div>

                    <div class="pb-32"/>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~~/layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()

definePageMeta({ middleware: 'is-logged-out' })
</script>
