import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';

class HomePage extends React.Component {
    handleAddClick() {
        history.push('/applicant');
    }

    render() {
        const { user } = this.props;

        const textStyle = {
            float: 'right'
        };

        return (
            <div className="col-md-6 col-md-offset-3">
                <h1>Hello {user.full_name}!</h1>
                <p>
                    <button className="btn btn-primary confirm-button" onClick={this.handleAddClick.bind(this)}>Add Applicant</button>

                    <Link to="login" className="cancel-button" style={textStyle}>Logout</Link>
                </p>

            </div>
        );
    }
}

function mapStateToProps(state) {
    const { users, authentication } = state;
    const { user } = authentication;
    return {
        user,
        users
    };
}

const connectedHomePage = connect(mapStateToProps)(HomePage);
export { connectedHomePage as HomePage };
