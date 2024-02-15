import { useState } from "react";

function Login(){
    const [loginEmail, setLoginEmail] = useState("")
    const [loginPassword, setloginPassword] = useState("")
    const[singupEmail, setSignupEmail] = useState("")
    const [signupPassword, setSignupPassword] = useState("")

    function handleSignup() {
        if(!singupEmail.trim() || !signupPassword.trim()){
            alert("Please enter email and password.")
        }

    }
    function handleLogin(){
        if(!loginEmail.trim() || !loginPassword.trim()){
            alert("Please enter email and password.")
        }
    }

    return(<>
        <div className="login-main-div">
            <form className="login-form">
                <h2>Login to your Todo List app</h2>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" onChange={(e) => (setLoginEmail(e.target.value))} value={loginEmail} />
                </fieldset>

                <fieldset>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => (setloginPassword(e.target.value))} value={loginPassword}/>
                </fieldset>
                <button onClick={handleLogin} className="login-btn" type="submit">Login</button>
            </form>
        </div>

        <div className="Sign-up-main-div">
            <form className="Sign-up-form">
            <h2>If u are not singed up, fill form below</h2>
                <fieldset>
                    <legend>Email</legend>
                    <input type="email" onChange={(e) => (setSignupEmail(e.target.value))} value={singupEmail} />
                </fieldset>

                <fieldset>
                    <legend>Password</legend>
                    <input type="password" onChange={(e) => (setSignupPassword(e.target.value))} value={signupPassword} />
                </fieldset>
                <button onClick={handleSignup} className="Sign-up-btn" type="submit" >Sign-up</button>
            </form>
        </div>
    </>)
}

export default Login;