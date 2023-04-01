<template>
    <div id="AdminLayout" class="w-full fixed z-30">
        <div 
            v-if="!userStore.isMobile"
            id="TopNav" 
            class="w-full flex items-center justify-between md:pt-2.5 md:px-2.5"
        >
            <div class="flex items-center justify-between md:rounded-full md:shadow-sm px-2 md:pl-6 pl-4 py-[8px] bg-white w-full border-b">
                <div class="flex items-center justify-start w-full max-w-[500px]">
                    <NuxtLink to="/admin">
                        <img 
                            class="w-[23px] min-w-[23px] select-none" 
                            src="~/assets/images/linktree-logo-icon.png"
                        >
                    </NuxtLink>

                    <div v-for="link in links" class="lg:px-2.5 px-0.5 md:block hidden">
                        <NuxtLink 
                            :to="link.url" 
                            class="flex items-center text-sm font-semibold px-1.5 py-3 rounded-lg hover:bg-gray-100"
                        >
                            <Icon 
                                :name="link.icon" 
                                class="mr-0.5" 
                                size="18" 
                                :color="route.fullPath == link.url ? '#000000' : '#676B5F'"
                            />
                            <div :class="route.fullPath == link.url ? 'text-[#000000]' : 'text-[#676B5F]'">
                                {{ link.name }}
                            </div>
                        </NuxtLink>
                    </div>

                </div>

                <div class="flex items-center justify-between gap-3">
                    <button class="flex items-center text-sm font-semibold p-2 rounded-full hover:bg-gray-100">
                        <Icon name="healthicons:megaphone-outline" class="mr-0.5"  size="22"/>
                    </button>

                    <button class="flex items-center font-semibold px-3 py-2 rounded-full bg-gray-100">
                        <Icon name="mdi:lightning-bolt" class="mr-0.5"  size="18"/>
                        Upgrade
                    </button>

                    <button class="flex items-center font-semibold px-3 py-2 rounded-full border hover:bg-gray-100">
                        <Icon name="teenyicons:upload-solid" class="mr-1.5"  size="18"/>
                        Share
                    </button>
                    
                    <button 
                        @click="!isTopNav ? openMenu('TopNav') : isTopNav = false"
                        class="rounded-full md:block hidden"
                    >
                        <img 
                            class="rounded-full min-w-[40px] w-[40px]"
                            :src="userStore.image"
                        >
                    </button>

                </div>
            </div>
            <div
                v-if="isTopNav"
                class="
                    absolute 
                    md:block
                    hidden
                    right-4 
                    top-16 
                    border 
                    shadow-[0_5px_15px_15px_rgba(0,0,0,0.1)] 
                    bg-white 
                    w-full 
                    max-w-[300px] 
                    rounded-2xl
                "
            >   
                <button
                    @click="logout()"
                    class="w-full flex items-center text-gray-600 text-[15px] p-3 hover:text-black"
                >
                    <Icon name="circum:logout" class="mr-6" />
                    Sign out
                </button>
            </div>
        </div>
        <div 
            v-if="!userStore.isMobile"
            id="SecondaryTopNav"
            class="w-full md:hidden flex items-center justify-between md:pt-2.5 md:px-2.5"
        >
            <div 
                class="flex items-center justify-between gap-4 shadow-sm bg-white w-full"
                :class="route"
            >
                <div class="flex w-full">
                    <div v-for="link in linksSecondaryNav" class="w-1/4">
                        <NuxtLink 
                            :to="link.url" 
                            class="
                                relative 
                                flex 
                                justify-center 
                                border-t-black 
                                text-sm 
                                w-full 
                                h-full
                                font-semibold 
                                px-1.5 
                                my-[1px] 
                                py-[1px]
                                hover:bg-gray-100
                            "
                            :class="link.url == route.fullPath ? 'border-b-2 border-b-black' : ''"
                        >
                            <button class="relative pt-[6px]">
                                <Icon 
                                    v-if="link.icon" 
                                    :name="link.icon" 
                                    size="20" 
                                    :color="route.fullPath == link.url ? '#000000' : '#676B5F'"
                                />
                                <img 
                                    v-else
                                    class="rounded-full min-w-[22px] w-[22px]"
                                    :src="link.img"
                                >
                                <div 
                                    class="relative text-[13px] text-[#676B5F]"
                                    :class="link.img ? '-left-[5px]' : ''"
                                >
                                    <span :class="route.fullPath == link.url ? 'text-[#000000]' : 'text-[#676B5F]'">
                                        {{ link.name }}
                                    </span>
                                </div>
                            </button>
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="!userStore.isMobile"
            id="PreviewButton"
            class="fixed bottom-10 w-full flex items-center justify-center"
        >
            <button 
                @click="userStore.isPreviewOverlay = true"
                class="md:hidden flex items-center text-[17px] font-semibold px-5 py-2.5 bg-[#DFE2D9] rounded-full"
            >
                <Icon name="icon-park-outline:preview-open" size="20" class="mr-2"/>
                Preview
            </button>
        </div>

        <div
            v-if="userStore.isMobile"
            id="TopNavMobile" 
            class="fixed w-full flex items-center justify-between px-2.5 bg-[#F3F3F1]"
        >
            <div class="flex items-center justify-between w-full py-[8px]">
                <div class="flex items-center justify-between w-full text-3xl font-bold max-w-[500px]">
                    {{ currentMobilePage() }}
                </div>

                <div class="flex items-center justify-between gap-3">

                    <button class="flex items-center text-[18px] font-semibold px-3 py-2 rounded-full bg-gray-200">
                        Upgrade
                        <Icon name="mdi:lightning-bolt" class="ml-1"  size="20"/>
                    </button>

                    <button class="flex items-center font-semibold px-3 py-2 rounded-full hover:bg-gray-200">
                        <Icon name="ph:share-network" class="mr-0.5"  size="23"/>
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="px-2.5 w-full z-0">
        <slot />
    </div>

    <div
        v-if="userStore.isMobile"
        id="BottomNav" 
        class="fixed z-20 bottom-0 flex w-full bg-white shadow-[0_35px_60px_10px_rgba(0,0,0,0.4)]"
        :class="userStore.isMobile ? 'h-[70px]' : 'h-[60px]'"
    >
        <div class="flex w-full">
            <div v-for="link in linksMobile" class="w-1/5">
                <button 
                    class="
                        relative 
                        flex 
                        justify-center 
                        text-sm 
                        w-full 
                        h-full
                        font-semibold 
                        px-1.5 
                        py-1 
                        hover:bg-gray-100
                    "
                    :class="link.url == route.fullPath ? 'border-t-2 border-t-black' : ''"
                >
                    <NuxtLink :to="link.url" class="relative h-[35px]">
                        <Icon 
                            v-if="link.icon" 
                            :name="link.icon" 
                            class="mr-0.5 mt-[2px]" 
                            size="25"
                            :color="route.fullPath == link.url ? '#000000' : '#676B5F'"
                        />
                        <img 
                            v-else
                            class="rounded-full min-w-[25px] w-[25px] mt-[2px]"
                            :src="link.img"
                        >
                        <div 
                            class="relative text-[13px]"
                            :class="link.img ? '-left-[4px]' : ''"
                        >
                            <span :class="route.fullPath == link.url ? 'text-[#000000]' : 'text-[#676B5F]'">
                                {{ link.name }}
                            </span>
                        </div>
                    </NuxtLink>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useUserStore } from '~~/stores/user'
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

let isTopNav = ref(false)
let windowWidth = ref(process.client ? window.innerWidth : '')
let isSecondaryTopNav = ref(false)

onMounted(() => {
    window.addEventListener('resize', function () {
        windowWidth.value = window.innerWidth;
    });
})

const links = ref([
    { name: 'Links', url: '/admin', icon: 'icon-park-outline:hamburger-button' },
    { name: 'Apperance', url: '/admin/apperance', icon: 'fluent:shapes-48-regular' },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    { name: 'Settings', url: '/', icon: 'material-symbols:settings' },
])

const linksSecondaryNav = ref([
    { name: 'Links', url: '/admin', icon: 'icon-park-outline:hamburger-button' },
    { name: 'Apperance', url: '/admin/apperance', icon: 'fluent:shapes-48-regular' },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics' },
    { name: 'More', url: '/admin/more', icon: '', img: userStore.image }
])

const linksMobile = ref([
    { name: 'Links', url: '/admin', icon: 'icon-park-outline:hamburger-button', img: '' },
    { name: 'Apperance', url: '/admin/apperance', icon: 'fluent:shapes-48-regular', img: '' },
    { name: 'Preview', url: '/admin/preview', icon: 'icon-park-outline:preview-open', img: '' },
    { name: 'Analytics', url: '/', icon: 'tabler:brand-google-analytics', img: '' },
    { name: 'More', url: '/admin/more', icon: '', img: userStore.image }
])

const currentMobilePage = () => {
    switch(route.fullPath) {
        case '/admin':
            return 'Links'
            break;
        case '/admin/apperance':
            return 'Apperance'
            break;
        case '/admin/preview':
            return 'Preview'
            break;
        case '/admin/more':
            return 'More'
            break;
    }
}

const openMenu = (str) => {
    if (str === 'TopNav') {
        isTopNav.value = true
    } else if (str === 'SecondaryTopNav') {
        isSecondaryTopNav.value = true
    } else {
        router.push('/admin/settings')
    }
}

const logout = async () => {
    let res = confirm('Are you sure you want to sign out?')
    try {
        if (res) {
            await userStore.logout()
            router.push('/')
            return
        }
        isTopNav.value = false
    } catch (error) {
        console.log(error) 
    }
}

watch(() => windowWidth.value, () => {
    if (windowWidth.value <= 767) {
        isTopNav.value = false
    }
})

</script>
