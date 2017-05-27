function handleLogin(state = {
  currentUser: null,
  user_email: null,
  user_password: null,
  signup_email: null,
  signup_password: null,
  signup_password_confirm: null,
  signUpError: null


}
  , action){
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGE':
    return [...state, {user_email:action.email}]
    break;
    case 'LOGIN_PASSWORD_CHANGE':
    return [...state, {user_password:action.password}]
    break;
    case 'SIGN_IN_FULFILLED':
    return [...state, {currentUser: action.currentUser}]
    break;
    case 'SIGN_IN_REJECTED':
    return [...state, {currentUser:null}]
    break;



    case 'SIGNUP_EMAIL_CHANGE':
    return [...state, {signup_email: action.signup_email}]
    break;
    case 'SIGNUP_PASSWORD_CHANGE':
    return [...state, {signup_password:action.password}]
    break;
    case 'SIGNUP_PASSWORD_CONFIRM_CHANGE':
    return [...state, {signup_password_confirm:action.password}]
    break;



    case 'SIGN_UP_FULFILLED':
    return [...state, {currentUser: action.currentUser, signUpError: null}]
    break;
    case 'SIGN_UP_REJECTED':
    return [...state, {currentUser: null, signUpError: action.payload}]

  }
  return state
}

export default handleLogin