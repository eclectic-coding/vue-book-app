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

        // TODO: save to db - need to move to a function
        let database = getDatabase()
        let userDetails = {
          name: name,
          username: username,
          email: email,
          uid: user.uid
        }
        const usersRef = ref(database, `users/${user.uid}`)
        await set(usersRef, userDetails)

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

        // TODO: need to move to a function
        const dbRef = ref(getDatabase())
        get(child(dbRef, `users/${user.uid}`))
          .then(snapshot => {
            if (snapshot.exists()) {
              this.userData = {
                name: snapshot.val().name,
                username: snapshot.val().username,
                email: snapshot.val().email,
                uid: snapshot.val().uid
              }
              console.log(snapshot.val())
            } else {
              console.log('No data available')
            }
          })
          .catch(error => {
            console.error(error)
          })

        await router.push('/dashboard')
      } catch (error) {
        console.error(error)
      } finally {
        this.loadingUser = false
      }
    },
    initAuth() {
      this.loadingSession = true
      onAuthStateChanged(auth, user => {
        if (user) {
          // need to read from database
          this.userData = {email: user.email, uid: user.uid}
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
      return this.userData
    }
  }
})
