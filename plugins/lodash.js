import lodash from "lodash"

export default defineNuxtPlugin((NuxtApp) => {
    return {
        provide: { 
            $lodash: lodash,
        },
    }
})