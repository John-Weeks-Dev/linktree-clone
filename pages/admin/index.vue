<template>
    <AdminLayout>
        <div 
            id="AdminPage" 
            class="flex h-[100vh] pb-4"
        >
            <div class="lg:w-[calc(100%-500px)] md:w-[calc(100%-330px)] w-full md:pt-20 pt-14">
                <div class="max-w-[750px] mx-auto pb-24">
                    
                    <button 
                        v-if="userStore.isMobile || !showAddLink"
                        @click="showAddLinkFunc()"
                        class="flex items-center justify-center w-full py-3 rounded-full text-white font-semibold bg-[#8228D9] hover:bg-[#6c21b3]"
                        :class="userStore.isMobile ? 'mt-8 text-xl' : 'mt-20 md:mt-8'"
                    >
                        <Icon 
                            v-if="!userStore.isMobile" 
                            name="mdi:plus" 
                            class="mr-0.5" 
                            size="25"
                        />
                        <span v-if="!userStore.isMobile">Add link</span>
                        <span v-if="userStore.isMobile">Add new link</span>
                    </button>

                    <AddLink 
                        v-if="!userStore.isMobile"
                        @close="showAddLink = false"
                        :class="[
                            {'mt-20 md:mt-8 mb-12 max-h-[1000px] transition-all duration-300 ease-in': showAddLink},
                            {'max-h-0 transition-all duration-300 ease-out': !showAddLink},
                        ]"
                    />

                    <div v-for="link in userStore.allLinks" class="mt-4">
                        <LinkBox 
                            v-if="link"
                            :link="link" 
                            :selectedId="selectedInput.id"
                            :selectedStr="selectedInput.str"
                            @updatedInput="updatedInput"
                            class="mt-6" 
                        />
                    </div>

                </div>
            </div>

            <MobileSectionDisplay />

        </div>
    </AdminLayout>
</template>

<script setup>
import AdminLayout from '~~/layouts/AdminLayout.vue';
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()

definePageMeta({ middleware: 'is-logged-out' })

let selectedInput = ref({ id: 0, str: '' })
let showAddLink = ref(false)

const updatedInput = (e) => {
    selectedInput.value.id = e.id
    selectedInput.value.str = e.str
}

const showAddLinkFunc = () => {
    if (userStore.isMobile) {
        userStore.addLinkOverlay = true
    } else {
        showAddLink.value = true
    }
}
</script>
