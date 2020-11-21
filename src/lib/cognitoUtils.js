import { CognitoAuth } from 'amazon-cognito-auth-js/dist/amazon-cognito-auth'
import { CognitoUserPool } from 'amazon-cognito-identity-js'
import { config as AWSConfig } from 'aws-sdk'
import config from '../config/index'

console.log(config);
AWSConfig.region = config.region

// Creates a CognitoAuth instance
const createCognitoAuth = () => {
  const appWebDomain = config.userPoolBaseUri.replace('https://', '').replace('http://', '')
  const auth = new CognitoAuth({
    UserPoolId: config.userPool,
    ClientId: config.clientId,
    AppWebDomain: appWebDomain,
    TokenScopesArray: config.tokenScopes,
    RedirectUriSignIn: config.callbackUri,
    RedirectUriSignOut: config.signoutUri
  })
  return auth
}

// Creates a CognitoUser instance
const createCognitoUser = () => {
  const pool = createCognitoUserPool()
  return pool.getCurrentUser()
}

// Creates a CognitoUserPool instance
const createCognitoUserPool = () => new CognitoUserPool({
  UserPoolId: config.userPool,
  ClientId: config.clientId
})

// Get the URI of the hosted sign in screen
const getCognitoSignInUri = () => {
  const signinUri = `${config.userPoolBaseUri}/login?response_type=code&client_id=${config.clientId}&redirect_uri=${config.callbackUri}`
  return signinUri
}

// Parse the response from a Cognito callback URI (assumed a token or code is in the supplied href). Returns a promise.
const parseCognitoWebResponse = (href) => {
  return new Promise((resolve, reject) => {
    const auth = createCognitoAuth()
    console.log(auth);
    // userHandler will trigger the promise
    auth.userhandler = {
      onSuccess: function (result) {
        resolve(result)
      },
      onFailure: function (err) {
        reject(new Error('Failure parsing Cognito web response: ' + err))
      }
    }
    auth.parseCognitoWebResponse(href)
  })
}

// Gets a new Cognito session. Returns a promise.
const getCognitoSession = () => {
  return new Promise((resolve, reject) => {
    const cognitoUser = createCognitoUser()
    cognitoUser.getSession((err, result) => {
      if (err || !result) {
        reject(new Error('Failure getting Cognito session: ' + err))
        return
      }

      // Resolve the promise with the session credentials
      console.debug('Successfully got session: ' + JSON.stringify(result))
      const session = {
        credentials: {
          accessToken: result.accessToken.jwtToken,
          idToken: result.idToken.jwtToken,
          refreshToken: result.refreshToken.token
        },
        user: {
          userName: result.idToken.payload['cognito:username'],
          email: result.idToken.payload.email
        }
      }
      resolve(session)
    })
  })
}

// Sign out of the current session (will redirect to signout URI)
const signOutCognitoSession = () => {
  const auth = createCognitoAuth()
  auth.signOut()
}

export default {
  createCognitoAuth,
  createCognitoUser,
  createCognitoUserPool,
  getCognitoSession,
  getCognitoSignInUri,
  parseCognitoWebResponse,
  signOutCognitoSession
}
