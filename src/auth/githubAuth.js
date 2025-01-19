import { signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { auth } from "./credentials"


const githubAuth = async () => {
    const provider = new GithubAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        console.log(credentials)
        return credentials.user

    } catch (error) {

        if (error.code === "auth/popup-closed-by-user") {
            return { success: false, status: 400, message: "Auth popup closed by the user" }
        }

        if (error.code === "auth/account-exists-with-different-credential") {
            return { success: false, status: 400, message: "Email already in use with other service (Google)" }
        }

        return { success: false, status: 400, message: error.message }
    }
}

export default githubAuth
