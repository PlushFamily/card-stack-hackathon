import React from 'react'
import s from './Loader.module.css'
import ScaleLoader from "react-spinners/ScaleLoader";

const Loader = () => {

    return (
        <div className={s.loaderContainer}>
            <ScaleLoader color={"white"} loading={true} />
        </div>
    )
}

export default Loader
