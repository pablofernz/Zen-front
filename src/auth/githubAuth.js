import { signInWithPopup, GithubAuthProvider } from "firebase/auth"
import { auth } from "./credentials"


const githubAuth = async () => {
    const provider = new GithubAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        return credentials.user

    } catch (error) {

        return { success: false, status: 400, message: error.message == "Firebase: Error (auth/account-exists-with-different-credential)." ? "Email already in use with other service (Google)" : error.message }
    }
}

export default githubAuth
