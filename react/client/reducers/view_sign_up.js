function handleSignUp(
  state = {
    signup_email: '',
    signup_password: null,
    signup_password_confirm: null,
    signUpError: null,
  },
  action,
) {
  switch (action.type) {
    case 'SIGNUP_EMAIL_CHANGE':
      return { ...state, signup_email: action.signup_email }
      break
    case 'SIGNUP_PASSWORD_CHANGE':
      return { ...state, signup_password: action.password }
      break
    case 'SIGNUP_PASSWORD_CONFIRM_CHANGE':
      return { ...state, signup_password_confirm: action.password }
      break
    case 'SIGN_UP_FULFILLED':
      return { ...state, signUpError: null }
      break
    case 'SIGN_UP_REJECTED':
      return { ...state, signUpError: action.payload }
      break
  }
  return state
}

export default handleSignUp
