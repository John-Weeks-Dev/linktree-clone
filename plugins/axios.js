import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {
    // axios.defaults.baseURL = 'http://localhost:8000'
    axios.defaults.baseURL = 'http://api.johntest.site'
    axios.defaults.withCredentials = true;

    return {
        provide: { 
            axios: axios
        },
    }
})