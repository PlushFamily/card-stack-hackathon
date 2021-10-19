import React, { FC, useEffect, useState } from 'react'
import s from './WelcomePage.module.css'
import { magic } from '@/magic/Magic'
import googleIcon from '@/assets/google.png'
import githubIcon from '@/assets/github.png'
import facebookIcon from '@/assets/facebook.png'
import { handleLogin, loginWithService, logout } from '@/magic/Magic'
import { useHistory } from 'react-router-dom'

const WelcomePage: FC = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userProfile, setUserProfile] = useState<any>({})
  const [email, setEmail] = useState('')
  const history = useHistory()

  useEffect(() => {
    const checkMagikAuth = async () => {
      setIsAuthenticated(await magic.user.isLoggedIn())
      if (isAuthenticated) {
        setUserProfile(await magic.user.getMetadata())
      } else {
        await magicAuth()
      }
    }
    const magicAuth = async () => {
      setIsAuthenticated(await magic.user.isLoggedIn())
      try {
        if (window.location.pathname === '/oauth-callback') {
          const result = await magic.oauth.getRedirectResult()
          setUserProfile(result.oauth.userInfo)
          history.push('/')
          console.log(userProfile)
        }
        if (window.location.pathname === '/magic-link-callback') {
          /* Complete the "authentication callback" */
          await magic.auth.loginWithCredential()
          /* Get user metadata including email */
          setUserProfile(await magic.user.getMetadata())
          console.log(userProfile)
          history.push('/')
        }
      } catch (err) {
        console.log(err)
      }
    }
    checkMagikAuth()
  }, [window.location.href, isAuthenticated])

  return <div className={s.pageContainer}>
    {!isAuthenticated ?
      <div className={s.loginContainer}>
        <h1>Login</h1>
        <div className={s.loginWithEmailContainer}>
          <input className={s.emailInput} onChange={(e) => setEmail(e.target.value)} type='email' name='email'
                 required
                 placeholder='Enter your email' />
          <button className={s.loginButton} onClick={() => email !== '' && handleLogin(email)} type='submit'>Send
          </button>
        </div>
        <div className={s.orSeparator}>
          or
        </div>
        <div className={s.loginWithServiceButtons}>
          <div className={s.loginWithServiceButton} onClick={() => loginWithService('google')}>
            <img className={s.icon} src={googleIcon} />
          </div>
          <div className={s.loginWithServiceButton} onClick={() => loginWithService('facebook')}>
            <img className={s.icon} src={facebookIcon} />
          </div>
          <div className={s.loginWithServiceButton} onClick={() => loginWithService('github')}>
            <img className={s.icon} src={githubIcon} />
          </div>
        </div>
      </div> :
      <div>you are logged in as {userProfile?.email},
        <span onClick={() => logout()}>
          <u className={s.logoutLink}>logout</u>
        </span>
      </div>}
  </div>
}

export default WelcomePage
