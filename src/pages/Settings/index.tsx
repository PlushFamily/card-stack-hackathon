import React, {useEffect, useState} from 'react'
import s from './Settings.module.css'
import {ceramicAuth, idx} from "../../ceramic/Ceramic";
import {ceramic} from "../../ceramic/Auth";
import Profile from "../../components/Profile/Profile";
import {useHistory} from "react-router-dom";

interface CeramicUserData {
    name?: string,
    description?: string
}

function Settings() {

    const [userName, setUserName] = useState('')
    const [userDescription, setUserDescription] = useState('')
    const history = useHistory()

    useEffect(() => {
        ceramicAuth().then(async () => {
            const ceramicUserData: CeramicUserData | null = await idx.get('basicProfile', ceramic?.did?.id)
            if (ceramicUserData?.name) {
                setUserName(ceramicUserData?.name)
            }
            if (ceramicUserData?.description) {
                setUserDescription(ceramicUserData?.description)
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
        <>
            <div className={s.settingsContainer}>
                <div className={s.controlContainer}>
                    <span className={s.homeButton} onClick={() => history.push('/')}>Home</span>
                    <Profile email/>
                </div>
                <div className={s.settings}>
                    <span className={s.windowTitle}>Settings</span>
                    <input name="name" defaultValue={userName} onBlur={(e) => setUserName(e.target.value)}
                           className={s.input} type="text"
                           placeholder="Name"/>
                    <textarea defaultValue={userDescription} name="description"
                              onBlur={(e) => setUserDescription(e.target.value)}
                              className={`${s.input} ${s.textArea}`} placeholder="About myself"/>
                    <div onClick={() => changePersonalInfo()} className={s.saveProfileDataButton}>
                        Save
                    </div>
                </div>
            </div>
        </>

    )
}

export default Settings
