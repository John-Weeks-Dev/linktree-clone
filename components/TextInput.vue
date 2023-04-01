<template>
    <div>
        <client-only>
            <input 
                :id="placeholder"
                :placeholder="placeholder"
                :maxlength="String(max)"
                class="
                    w-full
                    bg-[#EFF0EB]
                    text-gray-800
                    border-2
                    text-sm
                    border-[#EFF0EB]
                    rounded-xl
                    py-3.5
                    px-3
                    placeholder-gray-500
                    focus:outline-none
                " 
                @focus="isFocused = true"
                @blur="isFocused = false"
                :class="isFocused ? 'border-gray-900' : ''"
                :type="inputType"
                v-model="inputComputed"
                autocomplete="off"
            >
        </client-only>
        <span v-if="error" class="text-red-500 text-[14px] font-semibold">
            {{ error }}
        </span>
    </div>
                    
</template>

<script setup>
    const emit = defineEmits(['update:input'])
    const props = defineProps(['input', 'placeholder', 'max', 'inputType', 'error'])
    const { input, placeholder, max, inputType, error } = toRefs(props)

    let isFocused = ref(false)

    const inputComputed = computed({
        get: () => input.value,
        set: (val) => emit('update:input', val)
    })
</script>