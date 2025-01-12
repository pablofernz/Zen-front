import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./credentials"


const googleAuth = async () => {
    const provider = new GoogleAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        return credentials.user

    } catch (error) {
        return { success: false, status: 400, message: error.message == "Firebase: Error (auth/account-exists-with-different-credential)." ? "Email already in use with other service (GitHub)" : error.message }
    }
}

export default googleAuth
