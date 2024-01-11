import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function ParentForm({ setUser }){
    const [ logIn, setLogIn] = useState(false)

    if (logIn === false){
        return <SignUp 
            logIn={logIn}
            setLogIn={setLogIn}
            setUser={setUser}
        />
    }
    else{
        return <LogIn 
            logIn={logIn}
            setLogIn={setLogIn}
            setUser={setUser}
        />
    }
}

export default ParentForm