import { applicantService } from '../_services';
import { userConstants } from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';

export const applicantActions = {
    addApplicant
};

function addApplicant(applicant) {
    return dispatch => {
        dispatch(request({ applicant }));

        applicantService.addApplicant(applicant)
            .then(
                respApplicant => {
                    history.push('/');
                    dispatch(success(respApplicant));
                    dispatch(alertActions.success(`Applicant ${applicant.full_name} added`))
                },
                error => {
                    dispatch(failure(error));
                    dispatch(alertActions.error(error));
                }
            );
    };

    function request(applicant) { return { type: userConstants.ADD_APPLICANT_REQUEST, applicant } }
    function success(applicant) { return { type: userConstants.ADD_APPLICANT_SUCCESS, applicant } }
    function failure(error) { return { type: userConstants.ADD_APPLICANT_FAILURE, error } }
}
