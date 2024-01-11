import React, { useEffect } from "react";

function LogOut(){
    useEffect(() => {
        fetch('/logout',{
            method: "DELETE"
        })
        console.log("delted")
    },[])
}

export default LogOut