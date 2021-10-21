import React, {useEffect, useState} from 'react'
import s from './Settings.module.css'
import {ceramicAuth, idx} from "../../ceramic/Ceramic";
import {ceramic} from "../../ceramic/Auth";
import Profile from "../../components/Profile/Profile";
import {useHistory} from "react-router-dom";
import HomeIcon from "../../assets/home-button-svgrepo-com.svg";
import Loader from "../../components/Loader/Loader";
import {magic} from "../../magic/Magic";

interface CeramicUserData {
    name?: string,
    description?: string
}

function Settings() {

    const [userName, setUserName] = useState('')
    const [userEmail, setUserEmail] = useState<any>('')
    const [isFetching, setIsFetching] = useState(true);
    const [userDescription, setUserDescription] = useState('')
    const history = useHistory()

    useEffect(() => {
        ceramicAuth().then(async () => {
            const userEmail = await magic.user.getMetadata()
            setUserEmail(userEmail.email)
            const ceramicUserData: CeramicUserData | null = await idx.get('basicProfile', ceramic?.did?.id)
            if (ceramicUserData?.name && ceramicUserData?.description) {
                setUserName(ceramicUserData?.name)
                setUserDescription(ceramicUserData?.description)
                setIsFetching(false)
            }
        })
    }, [])

    const changePersonalInfo = async () => {
        if (userName !== '' || userDescription !== '') {
            await idx.set("basicProfile", {
                name: userName,
                description: userDescription,
            });
        }
    }
    return (
        !isFetching ?
        <div className={s.settingsContainer}>
            <div className={s.controlContainer}>
                    <span onClick={() => history.push('/')}>
                        <img className={s.homeIcon} alt="home" src={HomeIcon}/>
                    </span>
                <Profile email={userEmail}/>
            </div>
            <div className={s.settings}>
                <span className={s.windowTitle}>Settings</span>
                <input name="name" defaultValue={userName} onBlur={(e) => setUserName(e.target.value)}
                       className={s.input} type="text"
                       placeholder="Name"/>
                <textarea defaultValue={userDescription} name="description"
                          onBlur={(e) => setUserDescription(e.target.value)}
                          className={`${s.input} ${s.textArea}`} placeholder="About myself"/>
                <div onClick={() => changePersonalInfo()} className={`${s.saveProfileDataButton} ${s.buttonMimas} ${s.up}`}>
                   <span>Save</span>
                </div>
            </div>
        </div> : <Loader/>
    )
}

export default Settings
