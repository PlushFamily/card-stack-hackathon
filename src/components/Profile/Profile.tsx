import React from 'react'
import s from './Profile.module.css'
import {logout} from '../../magic/Magic'
import {useHistory} from "react-router-dom";

const Profile = ({email}: any) => {
    const history = useHistory()
    return <div className={s.profileContainer}>
    <span onClick={() => history.push('/settings')}>
      {email}
    </span> |
        <span className={s.logoutButton}
              onClick={() => logout()}>Logout</span>
    </div>
}

export default Profile
