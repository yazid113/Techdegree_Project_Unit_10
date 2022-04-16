import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form'

export default function UserSignIn({ context }) {

        //Component States
        const [emailAddress, setEmailAddress] = useState('');
        const [password, setPassword] = useState('');
        const [errors, setErrors] = useState([]);

        const navigate = useNavigate();

        //Handles submit button
        const submit = () => {
            context.actions.signIn(emailAddress, password)
                .then( user => {
                    console.log(`${emailAddress} is now signed in.`);
                    navigate(-1);
                })
                .catch ( error => {
                    console.log(error);
                    if( error.response ) {
                        console.log(error.response);
                        setErrors(["Incorrect Username or Password."]);
                    } else {
                        console.log(error.response)
                        navigate('/error');
                    }
                });
        }

        //Handles cancel button
        const cancel = () => {
            navigate('/');
        }

    return (
        <React.Fragment>
            <div className="form--centered">
                <h2>Sign In</h2>

                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText="Sign In"
                    elements={() => (
                        <React.Fragment>
                            <label>Email Address
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress}
                                    onChange={e => setEmailAddress(e.target.value)}
                                    placeholder="Email Address"
                                />
                            </label>
                            <label>Password
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder="Password"

                                />
                            </label>
                        </React.Fragment>
                    )}/>
                <p>Don't have a user account? Click here to <Link to="/signup">sign up</Link>!</p>
            </div>
        </React.Fragment>
    )
}