import React from 'react'
import Lottie from 'react-lottie'
import './loading.css'
const loading = require('../../assets/loading.json')

export default function Loading() {

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData:loading,
        rendererSettings: {
        preserveAspectRatio: "xMidYMid slice"
        }
    }

    return (
        <div className="loadingAnimation-area">
            <div className="loadingAnimation-icon">
                <Lottie options={defaultOptions} />
            </div>
        </div>
    )
}
