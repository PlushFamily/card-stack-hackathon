import React from 'react'
import s from './Profile.module.css'
import {logout} from '../../magic/Magic'
import {useHistory} from "react-router-dom";
import settingsIcon from "../../assets/setting.svg"

const Profile = ({email}: any) => {
    const history = useHistory()
    return (
        <>
            <div className={s.profileContainer}>
    <span className={s.email}>
      {email}
    </span> <span className={s.profileDivider}>|</span>
                <span className={s.logoutButton}
                      onClick={() => logout()}>Logout</span>
            </div>
            <img onClick={() => history.push('/settings')}
                 className={s.settingsIcon} alt="settings"
                 src={settingsIcon}/>
        </>
    )
}

export default Profile
