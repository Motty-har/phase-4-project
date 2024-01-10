import React, { useState } from "react";
import SignUp from "./SignUp";
import LogIn from "./LogIn";

function ParentForm(){
    const [ logIn, setLogIn] = useState(false)

    if (logIn === false){
        return <SignUp 
            logIn={logIn}
            setLogIn={setLogIn}
        />
    }
    else{
        return <LogIn 
            logIn={logIn}
            setLogIn={setLogIn}
        />
    }
}

export default ParentForm