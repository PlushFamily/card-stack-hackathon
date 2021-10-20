import { Magic } from 'magic-sdk'
import { OAuthExtension } from '@magic-ext/oauth'
import { OAuthProvider } from '@magic-ext/oauth/dist/types/types'

const {REACT_APP_MAGIC_KEY}: any = process.env;

export const magic = new Magic(REACT_APP_MAGIC_KEY, { extensions: [new OAuthExtension()] })

export const handleLogin = async (email: string) => {
  const redirectURI = `${window.location.origin}/magic-link-callback`
  await magic.auth.loginWithMagicLink({ email, redirectURI })
}

export const loginWithService = async (serviceName: OAuthProvider) => {
  await magic.oauth.loginWithRedirect({
    provider: `${serviceName}`,
    redirectURI: `${window.location.origin}/oauth-callback`
  })
}

export const logout = async () => {
  await magic.user.logout()
  window.location.href = '/'
}