function handleLogin(state =  {
  currentUser: null,
  user_email: null,
  user_password: null,
  signup_email: '',
  signup_password: null,
  signup_password_confirm: null,
  signUpError: null,
  fetchUserError: null,
  users: null,
  getUsersError: null
}
  , action){
  switch (action.type) {
    case 'LOGIN_EMAIL_CHANGE':
    return {...state, user_email:action.email}
    break;
    case 'LOGIN_PASSWORD_CHANGE':
    return {...state, user_password:action.password}
    break;
    case 'SIGN_IN_FULFILLED':
    return {...state, currentUser: action.currentUser}
    break;
    case 'SIGN_IN_REJECTED':
    return {...state, currentUser:null}
    break;
    case 'SIGNUP_EMAIL_CHANGE':
    return {...state, signup_email: action.signup_email}
    break;
    case 'SIGNUP_PASSWORD_CHANGE':
    return {...state, signup_password:action.password}
    break;
    case 'SIGNUP_PASSWORD_CONFIRM_CHANGE':
    return {...state, signup_password_confirm:action.password}
    break;
    case 'SIGN_UP_FULFILLED':
    return {...state, signUpError: null}
    break;
    case 'SIGN_UP_REJECTED':
    return {...state, signUpError: action.payload}
    break;
    //fetchuser
    case 'FETCH_USER_FULFILLED':
    return {...state, currentUser: action.payload, fetchUserError: null}
    break;
    case 'FETCH_USER_REJECTED':
    return {...state, currentUser: null, fetchUserError: action.payload}
    break;
    //sign out
    case 'SIGN_OUT_FULFILLED':
    return {...state, currentUser: null, signOutError: null}
    break;
    case 'SIGN_OUT_REJECTED':
    return {...state, signOutError: action.payload}
    break;
    //GET USERS
    case 'GET_USERS_FULFILLED':
    return {...state, users: action.payload, getUsersError: null}
    break;
    case 'GET_USERS_REJECTED':
    return {...state, getUsersError: action.payload}
    break;
    //update admin
    case 'ADMIN_UPDATE_FULFILLED':
    return {...state, users: action.payload, adminUpdateError: null}
    break;
    case 'ADMIN_UPDATE_REJECTED':
    return {...state, adminUpdateError: action.payload}
    break;
    //delete user
    case 'DELETE_USER_FULFILLED':
    return {...state, users: action.payload, deleteUserError: null}
    break;
    case 'DELETE_USER_REJECTED':
    return {...state, deleteUserError: action.payload}
    break;

  }
  return state
}

export default handleLogin