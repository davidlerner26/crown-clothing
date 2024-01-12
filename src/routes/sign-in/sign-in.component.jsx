import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.util";

const SignIn = () => {
    const logGoogle = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(response);
    }

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogle}>
                Sign In with Google Popup
            </button>
        </div>
    )
}

export default SignIn;