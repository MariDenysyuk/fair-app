import { userConstants } from '../_constants';

export function uploading(state = {}, action) {
    switch (action.type) {
        case userConstants.ADD_APPLICANT_REQUEST:
            return {
                uploading: true
            };
        case userConstants.ADD_APPLICANT_SUCCESS:
            return {
                uploading: false
            };
        case userConstants.ADD_APPLICANT_FAILURE:
            return {
                error: action.error
            };
        default:
            return state
    }
}