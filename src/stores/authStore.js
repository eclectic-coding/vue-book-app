import { defineStore } from 'pinia'
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth'
import { auth } from '../firebase'
import router from '../router'
import { getDatabase, ref, set, child, get } from 'firebase/database'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false,
    registerError: null,
    loginError: null
  }),
  persist: {
    storage: localStorage
  },
  actions: {
    async registerUser(name, username, email, password) {
      this.loadingUser = true
      await createUserWithEmailAndPassword(auth, email, password)
        .then(async userCredential => {
          const user = userCredential.user

          await this.saveToFirebase(user, name, username)
          await this.initAuth()
          await router.push('/dashboard')
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            this.registerError = 'This email is already in use.' // Set the error message
          } else {
            console.error(error)
          }
        })
        .finally(() => {
          this.loadingUser = false
        })
    },
    async loginUser(email, password) {
      this.loadingUser = true
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password)

        await this.retrieveFromFirebase(user)

        await router.push('/dashboard')
      } catch (error) {
        if (error.code === 'auth/invalid-credential') {
          this.loginError = 'The provided email and/or password is invalid.' // Set the error message
        } else {
          console.error(error)
        }
      } finally {
        this.loadingUser = false
      }
    },
    async initAuth() {
      this.registerError = null
      this.loginError = null

      if (this.userData) {
        await router.push('/dashboard')
      } else if (auth.currentUser) {
        await this.retrieveFromFirebase(auth.currentUser)
        await router.push('/dashboard') // Move the redirection here
      } else {
        this.loadingSession = true
        onAuthStateChanged(auth, user => {
          if (user) {
            this.retrieveFromFirebase(user)
            router.push('/dashboard') // And here
          } else {
            this.userData = null
          }
          this.loadingSession = false
        })
      }
    },
    async saveToFirebase(user, name, username) {
      let database = getDatabase()
      let userDetails = {
        name: name,
        username: username,
        email: user.email,
        uid: user.uid
      }
      const usersRef = ref(database, `users/${user.uid}`)
      await set(usersRef, userDetails)
    },
    async retrieveFromFirebase(user) {
      const dbRef = ref(getDatabase())
      return new Promise((resolve, reject) => {
        get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              this.userData = {
                name: snapshot.val().name,
                username: snapshot.val().username,
                email: snapshot.val().email,
                uid: snapshot.val().uid
              }
              resolve()
            } else {
              console.log('No data available')
              resolve()
            }
          })
          .catch(error => {
            console.error(error)
            reject(error)
          })
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
      return this.userData
    },
    async resetPassword(userEmail) {
      const actionCodeSettings = {
        url: `${import.meta.env.VITE_APP_URL}/signin`,
        handleCodeInApp: true
      }
      try {
        await sendPasswordResetEmail(auth, userEmail, {
          url: `${import.meta.env.VITE_APP_URL}/signin`,
          handleCodeInApp: true
        })
      } catch (error) {
        console.error(error)
      }
    }
  }
})
