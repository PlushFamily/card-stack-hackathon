import React, {FC, useEffect, useState} from 'react'
import s from './WelcomePage.module.css'
import googleIcon from '../../assets/google.png'
import githubIcon from '../../assets/github.png'
import facebookIcon from '../../assets/facebook.png'
import {useHistory} from 'react-router-dom'
import {handleLogin, loginWithService, magic} from '../../magic/Magic'
import {ceramicAuth} from '../../ceramic/Ceramic'
import Profile from "../../components/Profile/Profile";
import CardStack from "../../components/CardStack/CardStack";
import HomeIcon from "../../assets/home-button-svgrepo-com.svg"
import Loader from "../../components/Loader/Loader";

const WelcomePage: FC = () => {
    const [isFetching, setIsFetching] = useState(true);
    const [isMagicAuthenticated, setMagicIsAuthenticated] = useState<boolean>(false)
    const [userProfile, setUserProfile] = useState<any>({})
    const [email, setEmail] = useState('')
    const history = useHistory()

    useEffect(() => {
        const checkMagicAuth = async () => {
            setMagicIsAuthenticated(await magic.user.isLoggedIn())
            if (isMagicAuthenticated) {
                setUserProfile(await magic.user.getMetadata())
                setIsFetching(false)
            } else {
                await magicAuth()
            }
        }
        const checkCeramicAuth = async () => isMagicAuthenticated && ceramicAuth()

        const magicAuth = async () => {
            try {
                if (window.location.pathname === '/oauth-callback') {
                    const result = await magic.oauth.getRedirectResult()
                    setUserProfile(result.oauth.userInfo)
                    history.push('/')
                }
                if (window.location.pathname === '/magic-link-callback') {
                    /* Complete the "authentication callback" */
                    await magic.auth.loginWithCredential()
                    /* Get user metadata including email */
                    setUserProfile(await magic.user.getMetadata())
                    history.push('/')
                }
            } catch (err) {
                console.log(err)
            } finally {
                setIsFetching(false)
            }
        }
        checkMagicAuth()
        checkCeramicAuth()
    }, [isMagicAuthenticated, isFetching, history])

    return <div className={s.pageContainer}>
        {isFetching ?  <Loader/> :
            !isMagicAuthenticated ?
            <div className={s.loginContainer}>
                <h1 className={s.loginTitle}>Login</h1>
                <div className={s.loginWithEmailContainer}>
                    <input className={s.emailInput} onChange={(e) => setEmail(e.target.value)} type='email' name='email'
                           required
                           placeholder='Enter your email'/>
                    <button className={s.loginButton} onClick={() => email !== '' && handleLogin(email)}
                            type='submit'>Send
                    </button>
                </div>
                <div className={s.orSeparator}>
                    or
                </div>
                <div className={s.loginWithServiceButtons}>
                    <div className={s.loginWithServiceButton} onClick={() => loginWithService('google')}>
                        <img className={s.icon} alt={'googleIcon'} src={googleIcon}/>
                    </div>
                    <div className={s.loginWithServiceButton} onClick={() => loginWithService('facebook')}>
                        <img className={s.icon} alt={'facebookIcon'} src={facebookIcon}/>
                    </div>
                    <div className={s.loginWithServiceButton} onClick={() => loginWithService('github')}>
                        <img className={s.icon} alt={'githubIcon'} src={githubIcon}/>
                    </div>
                </div>
            </div> :
            <>
                <div className={s.controlContainer}>
                    <span onClick={() => history.push('/')}>
                        <img className={s.homeIcon} alt="home" src={HomeIcon}/>
                    </span>
                    <Profile email={userProfile.email}/>
                </div>
                <div className={s.pageWrapper}>
                    <CardStack/>
                </div>
            </>
           }
    </div>
}

export default WelcomePage
