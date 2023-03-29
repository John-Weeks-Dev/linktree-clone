import { defineStore } from 'pinia'
import axios from '~~/plugins/axios'

const $axios = axios().provide.axios

export const useUserStore = defineStore('user', {
  state: () => ({
    id: '',
    theme_id: '',
    name: '',
    email: '',
    image: '',
    bio: '',
    theme: null,
    colors: null,
    allLinks: null,
    isMobile: false,
    updatedLinkId: 0,
    addLinkOverlay: false,
    isPreviewOverlay: false,
  }),
  actions: {
    hidePageOverflow(val, id) {
      if (val) {
        document.body.style.overflow = 'hidden'
        if (id) {
          document.getElementById(id).style.overflow  = 'hidden'
        }
        return
      }
      document.body.style.overflow = 'visible'
      if (id) {
        document.getElementById(id).style.overflow  = 'visible'
      }
    },

    allLowerCaseNoCaps(str) {
      return str.split(' ').join('').toLowerCase()
    },

    async hasSessionExpired() {
      await $axios.interceptors.response.use((response) => {
        // Call was successful, continue.
        return response;
      }, (error) => {
          switch (error.response.status) {
              case 401: // Not logged in
              case 419: // Session expired
              case 503: // Down for maintenance
                  // Bounce the user to the login screen with a redirect back
                  this.resetState()
                  window.location.href = '/';
                  break;
              case 500:
                  alert('Oops, something went wrong!  The team has been notified.');
                  break;
              default:
                  // Allow individual requests to handle other errors
                  return Promise.reject(error);
          }
      });
    },

    async getTokens() {
      await $axios.get('/sanctum/csrf-cookie')
    },

    async login(email, password) {
      await $axios.post('/login', {
        email: email,
        password: password
      })
    },

    async register(name, email, password, confirmPassword) {
      await $axios.post('/register', {
        name: name,
        email: email,
        password: password,
        password_confirmation: confirmPassword
      })
    },

    async getUser() {
      let res = await $axios.get('/api/users')
      
      this.$state.id = res.data.id
      this.$state.theme_id = res.data.theme_id
      this.$state.name = res.data.name
      this.$state.bio = res.data.bio
      this.$state.image = res.data.image

      this.getUserTheme()
    },

    async updateUserImage(data) {
      await $axios.post('/api/user-image', data)
    },

    async updateLinkImage(data) {
      await $axios.post(`/api/link-image`, data)
    },

    async deleteLink(id) {
      await $axios.delete(`/api/links/${id}`)
    },

    getUserTheme() {
      this.$state.colors.forEach(color => {
        if (this.$state.theme_id === color.id) {
          this.$state.theme = color
        }
      })
    },

    async updateUserDetails(name, bio) {
      await $axios.patch(`/api/users/${this.$state.id}`, {
        name: name,
        bio: bio
      })
    },

    async updateTheme(themeId) {
      let res = await $axios.patch('/api/themes', {
        theme_id: themeId,
      })
      this.$state.theme_id = res.data.theme_id
      this.getUserTheme()
    },

    async getAllLinks() {
      let res = await $axios.get('/api/links')
      this.$state.allLinks = res.data
    },

    async addLink(name, url) {
      await $axios.post('/api/links', {
        name: name,
        url: url
      })
    },

    async updateLink(id, name, url) {
      await $axios.patch(`/api/links/${id}`, {
        name: name,
        url: url
      })
    },

    async logout() {
      await $axios.post('/logout')
      this.resetState()
    },

    resetState() {      
      this.$state.id = ''
      this.$state.name = ''
      this.$state.email = ''
      this.$state.image = ''
      this.$state.bio = ''
      this.$state.theme_id = ''
      this.$state.theme = null
      this.$state.colors = null
      this.$state.allLinks = null
      this.$state.isMobile = false
      this.$state.updatedLinkId = 0
      this.$state.addLinkOverlay = false
      this.$state.isPreviewOverlay = false
    },
  },
  persist: true
})