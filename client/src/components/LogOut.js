import React, { useEffect, } from "react";
import { useHistory } from "react-router-dom";

function LogOut({ setUser }){
    const history = useHistory()
    useEffect(() => {
        fetch('/logout',{
            method: "DELETE"
        })
        history.push("/")
        setUser(false)
        
    },[])
}

export default LogOut