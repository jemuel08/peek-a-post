import React from 'react'
import "../styles/loading.css";

export default function Loading() {
    return (
        <div className="loading">
            <div class="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>;
        </div>
    )
}
