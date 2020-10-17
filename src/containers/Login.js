import React, { useState } from 'react';
import { FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import { Auth } from 'aws-amplify';
import { useAppContext } from '../libs/contextLib';
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../libs/errorLib';
import { useFormFields } from '../libs/hooksLib';
import './Login.css';


export default function Login() {
    const { userHasAuthenticated } = useAppContext();
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: ""
    });

    function validateForm() {
        const EMAIL_MIN_LENGTH = 8;
        const PASSWORD_MIN_LENGTH = 6;
        const {email, password} = fields;
        return email.length >= EMAIL_MIN_LENGTH && password.length >= PASSWORD_MIN_LENGTH;
    }

    async function handleSubmit(event) {
        event.preventDefault();
        const {email, password} = fields;

        setIsLoading(true);
        try {
            await Auth.signIn(email, password);
            userHasAuthenticated(true);
            history.push("/"); // go to home page
        } catch (e) {
            onError(e);
            setIsLoading(false);
        }
    }

    return (
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <FormGroup controlId="email" bsSize="large">
                    <ControlLabel>Email</ControlLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={fields.email}
                        onChange={handleFieldChange}
                     />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={fields.password}
                        onChange={handleFieldChange}
                    />
                </FormGroup>
                <LoaderButton block bsSize="large" disabled={!validateForm()} type="submit" isLoading={isLoading}>
                    Login
                </LoaderButton>
            </form>
        </div>
    );
}