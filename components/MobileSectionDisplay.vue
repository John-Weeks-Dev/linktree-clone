<template>
    <div 
        v-if="userStore.theme"
        class="md:block fixed hidden right-0 lg:w-[500px] w-[310px] h-[calc(100%-20px)] mt-[20px] mx-auto border-l border-l-gray-300 pt-20"
    >
        <div
            class="
                mx-auto
                mt-16
                mb-16
                flex 
                items-center 
                justify-center 
                w-full 
                lg:max-w-[230px] 
                max-w-[200px] 
                lg:h-[460px] 
                h-[400px] 
                p-3 
                rounded-3xl
                relative
            "
        >
            <img 
                class="absolute z-10 pointer-events-none select-none" 
                src="~/assets/images/mobile-case.png"
            >

            <div 
                class=" w-full h-full absolute lg:max-w-[220px] max-w-[195px] rounded-3xl z-0" 
                :class="userStore.theme.color"
            />

            <div class="h-full mx-auto w-full overflow-auto z-10">
                <img 
                    class="rounded-full min-w-[60px] w-[60px] mx-auto mt-8"
                    :src="userStore.image"
                >

                <div 
                    class="text-center text-sm font-semibold mt-4 break-words"
                    :class="userStore.theme.text"
                >
                    @{{ userStore.allLowerCaseNoCaps(userStore.name) }}
                </div>

                <div 
                    class="text-center text-[8px] font-semibold mt-2"
                    :class="userStore.theme.text"
                >
                    <div class="px-8 break-words">
                        {{ userStore.bio }}
                    </div>
                </div>

                <div v-for="link in userStore.allLinks">
                    <a 
                        :href="link.url"
                        target="_blank"
                        class="
                            flex 
                            items-center 
                            relative 
                            w-[calc(100%-10px)] 
                            mx-auto 
                            border
                            bg-white 
                            mt-2 
                            p-1 
                            rounded-xl
                        "
                    >
                        <img 
                            class="rounded-lg h-[30px] aspect-square"
                            :src="link.image"
                        >

                        <div class="absolute w-full">
                            <div class="max-w-[70%] w-full mx-auto text-[10px] text-center">
                                {{ link.name }}
                            </div>
                        </div>
                    </a>
                </div>

                <div class="pb-12"/>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()
</script>
