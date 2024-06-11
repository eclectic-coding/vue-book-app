import { defineStore } from 'pinia'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { auth } from '../firebase'
import router from '../router'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false
  }),
  actions: {
    async registerUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        console.log(user)
        await router.push('/')
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUser = false
      }
    },
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)
        this.userData = { email: user.email, uid: user.uid }
        console.log(user)
        await router.push('/dashboard')
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUser = false
      }
    },
    initAuth() {
      this.loadingSession = true
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.userData = { email: user.email, uid: user.uid }
        } else {
          this.userData = null
        }
        this.loadingSession = false
      })
    },
    async logoutUser() {
      this.loadingUser = true
      try {
        await signOut(auth)
        this.userData = null
        await router.push('/')
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUser = false
      }
    },
    currentUser() {
      return this.userData;
    },
  }
})