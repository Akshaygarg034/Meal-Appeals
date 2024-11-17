import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function Login(props) {
    const [cred, setCred] = useState({ email: '', password: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        props.setProgress(20);
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_LINK}/api/recipeauth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: cred.email, password: cred.password })
        });
        props.setProgress(100);
        const json = await response.json();
        if (json.success) {
            localStorage.setItem('token', json.authtoken);
            history.push('/');
            props.setLogin(true);
            props.showAlert("Logged in Successfully", "success");
        }
        else {
            props.showAlert("Invalid Credentials", "danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <Fade left>
            <div className='login' style={{ marginTop: '1.25%', paddingTop: '7%' }}>
                <h1 className="my-3 text-center">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" value={cred.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={cred.password} />
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                </form>
            </div>
        </Fade>
    )
}

export default Login
