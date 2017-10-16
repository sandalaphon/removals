function handleLogin(
  state = {
    currentUser: null,
    user_email: null,
    user_password: null,
    signup_email: '',
    signup_password: null,
    signup_password_confirm: null,
    signUpError: null,
    fetchUserError: null,
  },
  action,
) {
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGE':
      return { ...state, user_email: action.email }
      break
    case 'LOGIN_PASSWORD_CHANGE':
      return { ...state, user_password: action.password }
      break
    case 'SIGN_IN_FULFILLED':
      return { ...state, currentUser: action.currentUser }
      break
    case 'SIGN_IN_REJECTED':
      return { ...state, currentUser: null }
      break
    //fetchuser
    case 'FETCH_USER_FULFILLED':
      return { ...state, currentUser: action.payload, fetchUserError: null }
      break
    case 'FETCH_USER_REJECTED':
      return { ...state, currentUser: null, fetchUserError: action.payload }
      break
    //sign out
    case 'SIGN_OUT_FULFILLED':
      return { ...state, currentUser: null, signOutError: null }
      break
    case 'SIGN_OUT_REJECTED':
      return { ...state, signOutError: action.payload }
      break
  }
  return state
}

export default handleLogin
