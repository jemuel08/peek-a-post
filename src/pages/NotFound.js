import React from 'react'
import {useHistory} from "react-router-dom"

export default function NotFound() {

    const history = useHistory()
    const back = (e) => {
        e.preventDefault()
        history.push("/login")
    }
    return (
        <div>
            <h1>Page Not Found</h1>
            <br />
            <button onClick={back}>Go Back</button>
        </div>
    )
}
