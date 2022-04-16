import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Form from './Form';

export default function UserSignUp({ context }) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState('');

    const navigate = useNavigate();

    const submit = () => {
        const user = {
            firstName,
            lastName,
            emailAddress,
            password,
        };

        context.data.createUser(user)
            .then( () => {
                console.log(`${firstName} is signed up.`);
                context.actions.signIn(emailAddress, password)
                    .then(() => {
                        navigate('/');
                    });
                console.log(`${emailAddress} is signed up and authenticated.`)
            })
            .catch (error => {
                if (error.response) {
                    setErrors(error.response.data.errors)
                } else {
                    navigate('/error');
                }
            });
    }

    const cancel = () => {
        navigate('/');
    }

    return (
            <div className="form--centered">
                <h2>Sign Up</h2>

                <Form
                    cancel={cancel}
                    errors={errors}
                    submit={submit}
                    submitButtonText='Sign Up'
                    elements={() => (
                        <React.Fragment>
                            <label> First Name
                                <input
                                    id="firstName"
                                    name="firstName"
                                    type="text"
                                    value={firstName}
                                    onChange={e => setFirstName(e.target.value)}
                                    placeholder='First Name'
                                />
                            </label>
                            <label>Last Name
                                <input
                                    id="lastName"
                                    name="lastName"
                                    type="text"
                                    value={lastName}
                                    onChange={e => setLastName(e.target.value)}
                                    placeholder='Last Name'
                                />
                            </label>
                            <label>Email Address
                                <input
                                    id="emailAddress"
                                    name="emailAddress"
                                    type="email"
                                    value={emailAddress}
                                    onChange={e => setEmailAddress(e.target.value)}
                                    placeholder='Email Address'
                                />
                            </label>
                            <label>Password
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    placeholder='Password'
                                />
                            </label>
                        </React.Fragment>
                    )}
                />
                <p>Already have a user account? Click here to <Link to="/signin">Sign In</Link>!</p>
            </div>
    );
}