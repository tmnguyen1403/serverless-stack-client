import React, { useState } from 'react';
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap';
import './Login.css';
import { Auth } from 'aws-amplify';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        const EMAIL_MIN_LENGTH = 8;
        const PASSWORD_MIN_LENGTH = 6;
        return email.length >= EMAIL_MIN_LENGTH && password.length >= PASSWORD_MIN_LENGTH;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            await Auth.signIn(email, password);
            alert("Logged in");
        } catch (e) {
            alert(e.message);
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
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                     />
                </FormGroup>
                <FormGroup controlId="password" bsSize="large">
                    <ControlLabel>Password</ControlLabel>
                    <FormControl
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </FormGroup>
                <Button block bsSize="large" disabled={!validateForm()} type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}