import React, { useEffect, } from "react";
import { useHistory } from "react-router-dom";

function LogOut({ setUser }){
    const history = useHistory()
    useEffect(() => {
        fetch('/logout',{
            method: "DELETE"
        })
        setUser(null)
        history.push("/")
    },[])
}

export default LogOut