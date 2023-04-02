<template>
    <div 
        id="UpdateLinkOverlay"
        class="fixed z-40 top-0 left-0 w-full h-full bg-white px-5"
    >
        <div class="w-full md:hidden flex items-center justify-between">
            <div class="flex items-center justify-between w-full py-[8px]">
                <button 
                    type="button"
                    @click="close()"
                    class="rounded-full"
                >
                    <Icon name="ic:baseline-check" size="35" color="#676B5F" />
                </button>

                <div class="flex items-center justify-between gap-8">

                    <button class="flex items-center">
                        <Icon name="mdi:bell-outline" size="30" color="#676B5F"/>
                    </button>

                    <button 
                        @click="deleteLink()"
                        class="flex items-center"
                    >
                        <Icon name="carbon:trash-can"  size="27" color="#676B5F"/>
                    </button>
                </div>
            </div>
        </div>

        <div class="flex flex-col items-center w-full pt-12">
            <div v-show="!isName" class="flex items-center justify-between w-full">
                <div 
                    @click="isFocused('isName')"
                    class="text-2xl font-semibold mr-2 cursor-pointer"
                >
                    {{ name }}
                </div>
                <Icon 
                    @click="isFocused('isName')"
                    class="cursor-pointer"
                    name="octicon:pencil-24" 
                    size="25" 
                    color="#676B5F"
                />
            </div>
            <input 
                v-show="isName"
                id="editNameInputMobile"
                type="text"
                v-model="name"
                class="w-full text-2xl underline font-semibold focus:outline-none"
            >
            <span 
                v-if="errors && errors.name"
                class="text-red-500 font-sm font-semibold w-full"
            >
                {{ errors.name[0] }}
            </span>
        </div>

        <div class="flex items-center w-full pt-3 pb-6 border-b-2">
            <div v-show="!isLink" class="flex items-center w-[calc(100%-2px)]">
                <div 
                    @click="isFocused('isLink')" 
                    class="text-lg mr-2 truncate cursor-pointer"
                >
                    {{ url }}
                </div>
                <Icon 
                    @click="isFocused('isLink')"
                    class="cursor-pointer min-w-[17px]"
                    name="octicon:pencil-24" 
                    size="25" 
                    color="#676B5F"
                />
            </div>
            <input 
                v-show="isLink"
                id="editLinkInputMobile"
                type="text"
                v-model="url"
                class="w-full text-lg underline focus:outline-none"
            >
            <span 
                v-if="errors && errors.url"
                class="text-red-500 font-sm font-semibold w-full"
            >
                {{ errors.url[0] }}
            </span>
        </div>

        <div id="UploadImageForLink" class="pt-6">
            <button
                @click="openCropper = true"
                class="
                    flex 
                    items-center 
                    justify-center 
                    text-xl 
                    w-full 
                    py-3 
                    rounded-full 
                    text-white 
                    font-semibold 
                    bg-[#8228D9] 
                "
            >
                <Icon name="mdi:plus" class="mr-0.5" size="25"/>
                Select image
            </button>

            <img 
                v-if="currentLink && currentLink.image"
                class="mx-auto pt-4 aspect-square object-cover" 
                width="300" 
                :src="currentLink.image"
            >
        </div>

        <CropperModal 
            v-if="openCropper"
            :linkId="updatedLinkId"
            @data="data = $event"
            @close="openCropper = false"
        />
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
import { storeToRefs } from 'pinia';
const userStore = useUserStore()
const { updatedLinkId } = storeToRefs(userStore)

let isName = ref(false)
let isLink = ref(false)
let name = ref('')
let url = ref('')
let data = ref(null)
let currentLink = ref(null)
let openCropper = ref(false)
let errors = ref(null)

onMounted(() => {   
    getLinkById()
    userStore.hidePageOverflow(true, 'AdminPage')

    document.addEventListener('mouseup', function(e) {
        let editNameInput = document.getElementById('editNameInputMobile')
        if (!editNameInput.contains(e.target)) { 
            editNameInput.blur() 
            isName.value = false
        }
    });

    document.addEventListener('mouseup', function(e) {
        let editLinkInput = document.getElementById('editLinkInputMobile')
        if (!editLinkInput.contains(e.target)) {
            editLinkInput.blur() 
            isLink.value = false
        }
    });
})

const getLinkById = () =>{
    userStore.allLinks.forEach(link => {
        if (updatedLinkId.value == link.id) {
            currentLink.value = link
            name.value = link.name
            url.value = link.url
        }
    });
}

const close = () => updatedLinkId.value = 0

const updateLinkImage = async () => {
    try {
        await userStore.updateLinkImage(data.value)
        await userStore.getAllLinks()
        getLinkById()
        setTimeout(() => openCropper.value = false, 300)
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}

const deleteLink = async () => {
    let res = confirm('Are you sure you want to delete this link?')
    try {
        if (res) {
            await userStore.deleteLink(updatedLinkId.value)
            await userStore.getAllLinks()
        }
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}

const isFocused = (str) => {
    if (str == 'isName') {
        setTimeout(() => document.getElementById('editNameInputMobile').focus())
        isName.value = true; 
        isLink.value = false
    }

    if (str == 'isLink') {
        setTimeout(() => document.getElementById('editLinkInputMobile').focus())
        isName.value = false; 
        isLink.value = true
    }
}

const updateLink = useDebounce(async () => {
    try {
        await userStore.updateLink(updatedLinkId.value, name.value, url.value)
        await userStore.getAllLinks()
        getLinkById()
    } catch (error) {
        console.log(error)
        errors.value = error.response.data.errors
    }
}, 500)

watch(() => name.value, () => {
    if (name.value && currentLink.value.name != name.value) {
        errors.value = null
        updateLink()
    }
})

watch(() => url.value, () => {
    if (url.value && currentLink.value.url != url.value) {
        errors.value = null
        updateLink()
    }
})

watch(() => data.value, async () => await updateLinkImage())

onUnmounted(() => {
    userStore.hidePageOverflow(false, 'AdminPage')
    updatedLinkId.value = 0
})
</script>
