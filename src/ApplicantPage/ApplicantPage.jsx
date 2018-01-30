import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { applicantActions } from '../_actions';
import './styles.css'

import Toggle from "react-toggle";

class ApplicantPage extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            applicant: {
                full_name: '',
                email: '',
                phone: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { applicant } = this.state;
        this.setState({
            applicant: {
                ...applicant,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { applicant } = this.state;
        const { dispatch } = this.props;
        if (applicant.full_name && applicant.email && applicant.phone) {
            console.log("Applicant to push", applicant)
            dispatch(applicantActions.addApplicant(applicant));
        }
    }

    render() {
        const { uploading } = this.props;
        const { submitted, applicant } = this.state;

        return (
          <div className='col-md-12 col-sm-12 background'>
            <form name="form" onSubmit={this.handleSubmit} className='form  col-md-6 col-sm-offset-6 col-sm-6' style={{padding: '0px', position: 'relative'}}>
              <div className='label-div'>
                <h2 className='label'>Deine Kontaktdaten</h2>
              </div>
              <div className={'form-group' + (submitted && !applicant.full_name ? ' has-error' : '')}>
                <img src={ require('./image/Name.gif') } className='icon' style={{ marginTop: '25px'}} />
                <input type="text" className='text-input' placeholder='Dein Name' name="full_name" value={applicant.full_name} onChange={this.handleChange} style={{ marginTop: '20px'}} />
              </div>

              <div className={'form-group' + (submitted && !applicant.email ? ' has-error' : '')}>
                <img src={ require('./image/Mail.gif') } className='icon' style={{ marginTop: '7px'}} />
                <input type="text" className='text-input' placeholder='Deine E-Mail-Adresse' name="email" value={applicant.email} onChange={this.handleChange} />
              </div>

              <div className={'form-group' + (submitted && !applicant.phone ? ' has-error' : '')} style={{ marginBottom: '0px' }}>
                <img src={ require('./image/Smartphone.gif') } className='icon' style={{ marginTop: '7px'}} />
                <input type="phone" className='text-input' placeholder='Deine Handynummer' name="phone" value={applicant.phone} onChange={this.handleChange} style={{ marginBottom: '0px'}} />
              </div>

              <img src={ require('./image/evonik.gif') } className='evonik' />

              <div className="form-group" style={{ marginBottom: '0px' }}>
                <button className="absenden ">
                  <p style={{  fontSize: '25px', marginBottom: '0px'}}>Absenden</p>
                </button>
              </div>
              <div className='togle-div'>
                <Toggle
                  defaultChecked={this.state.checked}
                  icons={false}
                  onChange={this.handleChange} />
                  <p className='togle-text'>Mir der Registrierung stimmst du unseren AGBs, Nutzungsbecingungen und Daten-schutzbestimmugen zu.</p>
              </div>
            </form>
          </div>
        )
    }
}


function mapStateToProps(state) {
    const { uploading } = state.uploading;
    return {
        uploading
    };
}

const connectedApplicantPage = connect(mapStateToProps)(ApplicantPage);
export { connectedApplicantPage as ApplicantPage };
