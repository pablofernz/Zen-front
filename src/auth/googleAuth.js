import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./credentials"


const googleAuth = async () => {
    const provider = new GoogleAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        return credentials.user

    } catch (error) {
        if (error.code === "auth/popup-closed-by-user" || error.code === "auth/cancelled-popup-request") {
            return { success: false, status: 400, message: "Auth popup closed" }
        }

        if (error.code === "auth/account-exists-with-different-credential") {
            return { success: false, status: 400, message: "Email already in use with other service (Google)" }
        }

        return { success: false, status: 400, message: error.message }
    }
}

export default googleAuth
