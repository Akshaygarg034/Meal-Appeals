import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import Fade from 'react-reveal/Fade';

function Signup(props) {
    const [cred, setCred] = useState({ name: '', email: '', password: '', cpassword: '' });
    const history = useHistory();

    const handleSubmit = async (e) => {
        props.setProgress(20);
        e.preventDefault();
        const response = await fetch(`${process.env.REACT_APP_LINK}/api/recipeauth/createuser`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: cred.name, email: cred.email, password: cred.password })
        });
        props.setProgress(100);
        const json = await response.json();
        if (json.success) {
            history.push('/');
            props.showAlert("Account created successfully", "success");
        }
        else {
            props.showAlert("Sorry a user with this email already exists", "danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }
    return (
        <Fade left>
            <div className='signup' style={{ marginTop: '1.25%', paddingTop: '7%' }}>
                <h1 className="my-3 text-center">SignUp</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' id="exampleInputName" onChange={onChange} aria-describedby="emailHelp" value={cred.name} minLength={3} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' id="exampleInputEmail1" onChange={onChange} aria-describedby="emailHelp" value={cred.email} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' id="exampleInputPassword1" onChange={onChange} value={cred.password} minLength={5} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" name='cpassword' id="exampleInputcPassword1" onChange={onChange} value={cred.cpassword} />
                    </div>
                    <button type="submit" className="btn btn-danger">Submit</button>
                </form>
            </div>
        </Fade>
    )
}

export default Signup
