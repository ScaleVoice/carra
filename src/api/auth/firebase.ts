import { FirebaseErrorsMessages } from "@/components/Firebase/messages"
import { logFirebaseError } from "@/utils/messaging"
import {
  GoogleAuthProvider,
  User,
  applyActionCode,
  confirmPasswordReset,
  createUserWithEmailAndPassword,
  getAuth,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth"

interface FirebaseError extends Error {
  code: string
  customData?: Record<string, string>
}

export const getHeaders = async () => {
  const idToken = await getFirebaseIDToken()

  return {
    Authorization: `Bearer ${idToken}`,
  }
}

export const loginWithEmail = async (email: string, password: string) => {
  const auth = getAuth()

  try {
    const result = await signInWithEmailAndPassword(auth, email, password)

    return { data: result, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("signInWithEmailAndPassword", error.code)

    return { data: null, error: error.code }
  }
}

export const registerWithEmail = async (displayName: string, email: string, password: string) => {
  const auth = getAuth()

  try {
    const result = await createUserWithEmailAndPassword(auth, email, password)

    await signInWithEmailAndPassword(auth, email, password)
    await updateProfile(result.user, { displayName })

    return { data: result, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("createUserWithEmailAndPassword", error.code)

    return { data: null, error: error.code }
  }
}

export const loginWithProvider = async (provider: GoogleAuthProvider) => {
  const auth = getAuth()

  try {
    const result = await signInWithPopup(auth, provider)

    return { data: result, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("signInWithPopup", error.code)

    return { data: null, error: error.code }
  }
}

export const loginWithGoogle = async () => {
  const provider = new GoogleAuthProvider()

  return loginWithProvider(provider)
}

export const logout = async () => {
  const auth = getAuth()

  try {
    await auth.signOut()
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("signOut", error.code)
  }
}

export const resetPassword = async (email: string) => {
  const auth = getAuth()

  try {
    await sendPasswordResetEmail(auth, email)

    return { data: true, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("sendPasswordResetEmail", error.code)

    return { data: null, error: error.code }
  }
}

export const confirmResetPassword = async (code: string, password: string) => {
  const auth = getAuth()

  try {
    await confirmPasswordReset(auth, code, password)

    return { data: true, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("confirmPasswordReset", error.code)

    return { data: null, error: error.code }
  }
}

export const applyVerificationCode = async (code: string) => {
  const auth = getAuth()

  try {
    await applyActionCode(auth, code)

    return { data: true, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("applyActionCode", error.code)

    return { data: null, error: error.code }
  }
}

export const sendVerificationEmailToUser = async (firebaseUser?: User) => {
  const auth = getAuth()
  const user = firebaseUser ?? auth.currentUser

  if (!user) {
    return { data: null, error: FirebaseErrorsMessages.USER_NOT_FOUND }
  }

  try {
    await sendEmailVerification(user)

    return { data: true, error: null }
  } catch (e) {
    const error = e as FirebaseError
    logFirebaseError("sendEmailVerification", error.code)

    return { data: null, error: error.code }
  }
}

async function getFirebaseIDToken() {
  const user = await getFirebaseUser()
  const idTokenResult = await user?.getIdTokenResult()

  return idTokenResult?.token ?? null
}

function getFirebaseUser(): Promise<User | null> {
  const auth = getAuth()

  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      unsubscribe()
      resolve(user)
    }, reject)
  })
}