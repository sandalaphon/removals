function handleAccounts(state =  {
  users: null,
  getUsersError: null,
  adminUpdateError: null
}
  , action){
  switch (action.type) {
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

export default handleAccounts