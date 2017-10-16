function handleAccounts(
    state = {
        users: null,
        getUsersError: null,
        adminUpdateError: null,
        costs: {
            fuel_per_mile_18t: null,
            fuel_per_mile_9t: null,
            fuel_per_mile_luton: null,
            driver_per_hour_18t: null,
            driver_per_hour_9t: null,
            driver_per_hour_luton: null,
            porter_per_hour: null,
        },
        fuel_per_mile_18t: null,
        fuel_per_mile_9t: null,
        fuel_per_mile_luton: null,
        driver_per_hour_18t: null,
        driver_per_hour_9t: null,
        driver_per_hour_luton: null,
        porter_per_hour: null,
    },
    action,
) {
    switch (action.type) {
        //GET USERS
        case 'GET_USERS_FULFILLED':
            return { ...state, users: action.payload, getUsersError: null }
            break
        case 'GET_COSTS_FULFILLED':
            delete action.payload['id']
            delete action.payload['updated_at']
            delete action.payload['created_at']
            return { ...state, costs: action.payload, get_costs_error: null }
            break
        case 'GET_COSTS_REJECTED':
            return { ...state, get_costs_error: action.payload }
            break
        case 'SET FUEL PER MILE 18T':
            return { ...state, fuel_per_mile_18t: action.payload }
            break
        case 'SET FUEL PER MILE 9T':
            return { ...state, fuel_per_mile_9t: action.payload }
            break
        case 'SET FUEL PER MILE LUTON':
            return { ...state, fuel_per_mile_luton: action.payload }
            break
        case 'SET DRIVER PER HOUR 18T':
            return { ...state, driver_per_hour_18t: action.payload }
            break
        case 'SET DRIVER PER HOUR 9T':
            return { ...state, driver_per_hour_9t: action.payload }
            break
        case 'SET DRIVER PER HOUR LUTON':
            return { ...state, driver_per_hour_luton: action.payload }
            break
        case 'SET PORTER PER HOUR':
            return { ...state, porter_per_hour: action.payload }
            break
        case 'UPDATE_COST_FULFILLED':
            delete action.payload['id']
            delete action.payload['updated_at']
            delete action.payload['created_at']
            return { ...state, costs: action.payload, cost_update_error: null }
            return { ...state }
            break
        case 'UPDATE_COST_REJECTED':
            return { ...state, cost_update_error: action.payload }
            break
        case 'GET_USERS_REJECTED':
            return { ...state, getUsersError: action.payload }
            break
        //update admin
        case 'ADMIN_UPDATE_FULFILLED':
            return { ...state, users: action.payload, adminUpdateError: null }
            break
        case 'ADMIN_UPDATE_REJECTED':
            return { ...state, adminUpdateError: action.payload }
            break
        //delete user
        case 'DELETE_USER_FULFILLED':
            return { ...state, users: action.payload, deleteUserError: null }
            break
        case 'DELETE_USER_REJECTED':
            return { ...state, deleteUserError: action.payload }
            break
    }
    return state
}

export default handleAccounts
