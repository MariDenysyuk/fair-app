import { authHeader } from '../_helpers';

export const applicantService = {
    addApplicant
};

function addApplicant(applicant) {
    const requestOptions = {
        method: 'POST',
        headers: Object.assign({ 'Content-Type': 'application/json' }, authHeader()),
        body: JSON.stringify({
            email: applicant.email,
            phone_number: applicant.phone,
            full_name: applicant.full_name,
            last_name: applicant.lastName
        })
    };

    return fetch(`${JU_URL}/api/v1/recruiting/jobfair/`, requestOptions)
        .then(response => {
            return response.json();
        })
        .then(applicant => {
            if (!applicant.id) {
                let text = "";

                for(const key in applicant) {
                    const value = applicant[key];
                    text = text + " " + value
                }

                return Promise.reject(text);
            }

            return applicant;
        })


}
