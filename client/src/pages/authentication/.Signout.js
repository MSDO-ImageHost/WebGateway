import React from "react"

// Auth
import { useSignOut, withSignOut } from 'react-auth-kit'

// Server communication
import axios from 'axios';

// Bootstrap
import Button from 'react-bootstrap/Button';


const SignOutButton = () => {
    const signOut = useSignOut()

    const InvalidateSession = () => {
        signOut()

        // Post data
        axios.delete('/api/login').then((res) => {
            if(res.status !== 200) return alert("Oh noooo. \n status:", res.data.status)
            console.log("Logout confirmed from backend")
            // signOut()
        })
    }

    return <Button onClick={() => InvalidateSession()}>Logout</Button>
}


export default SignOutButton