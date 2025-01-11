import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "./credentials"


const googleAuth = async () => {
    const provider = new GoogleAuthProvider()

    try {
        const credentials = await signInWithPopup(auth, provider)
        return credentials.user

    } catch (error) {
        console.log(error)
    }
}

export default googleAuth
