import {defineStore} from 'pinia'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth'
import {auth} from '../firebase'
import router from '../router'
import {getDatabase, ref, set, child, get} from 'firebase/database'

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    userData: null,
    loadingUser: false,
    loadingSession: false
  }),
  persist: {
    storage: localStorage
  },
  actions: {
    async registerUser(name, username, email, password) {
      this.loadingUser = true
      try {
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        this.userData = {
          name: name,
          username: username,
          email: user.email,
          uid: user.uid
        }

        await this.saveToFirebase(user, name, username)

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
        const {user} = await signInWithEmailAndPassword(auth, email, password)

        await this.retrieveFromFirebase(user)
        console.log('User logged in')
        router.push('/dashboard')
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUser = false
      }
    },
    initAuth() {
      if (this.userData) {
        router.push('/dashboard')
      } else if (auth.currentUser) {
        this.retrieveFromFirebase(auth.currentUser)
        router.push('/dashboard')
      } else {
        this.loadingSession = true
        onAuthStateChanged(auth, user => {
          if (user) {
            this.retrieveFromFirebase(user)
            router.push('/dashboard')
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
    }
  }
})
