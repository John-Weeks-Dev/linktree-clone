import axios from "axios"

export default defineNuxtPlugin((NuxtApp) => {

    axios.defaults.withCredentials = true;
    // axios.defaults.baseURL = 'http://localhost:8000'
    axios.defaults.baseURL = 'http://api.johntest.site'

    return {
        provide: { 
            axios: axios
        },
    }
})