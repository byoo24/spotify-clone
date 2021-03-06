import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';

class SignUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            email: "",
            dob_month: "",
            dob_day: "",
            dob_year: "",
            gender: "",
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.loginDemo = this.loginDemo.bind(this);
    }

    componentWillUnmount() {
        this.props.clearErrors();
    }

    update(field) {
        return e => this.setState({
            [field]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = Object.assign({}, this.state);
        this.props.signup(user)
            .then( () => this.props.history.push('/browse/featured'));
    }

    loginDemo(e) {
        const demo = {
            username: "puppylover",
            password: "husky123",
            email: "puppy@email.com"
        };

        this.props.login(demo)
            .then(() => this.props.history.push('/browse/featured'));
    }

    render() {

        const { errors } = this.props;
        let invalidUsername = null;
        let invalidPassword = null;
        let invalidEmail = null;
        let classUsername = 'form-control';
        let classPassword = 'form-control';
        let classEmail = 'form-control';
        let invalidUsernamePassword = null;

        if (errors[0] && errors[0].includes('Please try again.')) {
            invalidUsernamePassword = <div className="alert alert-warning">{errors[0]}</div>
        }
        
        
        // const invalidUsernamePassword = errors[0] && errors[0].indexOf('Incorrect') != -1 ? <div className="alert alert-warning">{errors[0]}</div> : null;

        if (errors.includes('username')) {
            invalidUsername = <div className="invalid-input">Please enter your Jamify username.</div>
            classUsername = 'form-control invalid';
        } else {
            invalidUsername = null;
            classUsername = 'form-control';
        }

        if (errors.includes('password')) {
            invalidPassword = <div className="invalid-input">Please enter your password.</div>
            classPassword = 'form-control invalid';
        } else {
            invalidPassword = null;
            classPassword = 'form-control';
        }

        if (errors.includes('email')) {
            invalidEmail = <div className="invalid-input">Please enter an email.</div>
            classEmail = 'form-control invalid';
        } else {
            invalidEmail = null;
            classEmail = 'form-control';
        }



        return (
            <div className="login-container">
                <div className="login-header">
                    <Logo />
                </div>
                <div className="login-content">
                    <a className="demo-login" onClick={() => this.loginDemo()}>DEMO LOGIN</a>
                    <span className="or">OR</span>

                    <span id="sign-up-with-email">Sign up with your email address</span>
                    
                    { invalidUsernamePassword }

                    <form className="signup-form" onSubmit={this.handleSubmit}>
                        <label htmlFor="signup-username" className="sr-only">Username</label>
                        <input type="text"
                                id="signup-username"
                                className={classUsername}
                                placeholder="Username"
                                onChange={this.update('username')} />
                            { invalidUsername }

                        <label htmlFor="signup-email" className="sr-only">Email</label>
                        <input type="text" 
                                id="signup-email"
                                className={classEmail}
                                placeholder="Email" 
                                onChange={this.update('email')} />
                            { invalidEmail }

                        <label htmlFor="signup-password" className="sr-only">Password</label>
                        <input type="password" 
                                className={classPassword} 
                                placeholder="Password"
                                onChange={this.update('password')} />
                            { invalidPassword }

                        <div className="register-dob">
                            <label htmlFor="register-age">Date of birth</label>

                            <div className="register-dob-container">
                                <div className="controls controls-month">
                                    <select id="register-dob-month" onChange={this.update('dob_month')}>
                                        <option value defaultValue>Month</option>
                                        <option value="01">January</option>
                                        <option value="02">February</option>
                                        <option value="03">March</option>
                                        <option value="04">April</option>
                                        <option value="05">May</option>
                                        <option value="06">June</option>
                                        <option value="07">July</option>
                                        <option value="08">August</option>
                                        <option value="09">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>

                                <div className="controls controls-day">
                                    <input type="number" placeholder="Day" onChange={this.update('dob_day')} />
                                </div>

                                <div className="controls controls-year">
                                    <input type="number" placeholder="Year" onChange={this.update('dob_year')} />
                                </div>
                            </div>
                        </div>

                        <div className="gender">
                            <label className="sr-only">Gender</label>
                            <label htmlFor="reg-male" className="radio-control">
                                <input type="radio" 
                                        id="reg-male" 
                                        name="gender"
                                        value="Male"
                                        onChange={this.update('gender')} />Male
                            </label>
                            <label htmlFor="reg-female" className="radio-control">
                                <input type="radio" 
                                        id="reg-female" 
                                        name="gender"
                                        value="Female" 
                                        onChange={this.update('gender')} />Female
                            </label>
                            <label htmlFor="reg-non-binary" className="radio-control">
                                <input type="radio" 
                                        id="reg-non-binary" 
                                        name="gender"
                                        value="Non-binary"
                                        onChange={this.update('gender')} />Non-binary
                            </label>
                        </div>

                        <div className="submit-row">

                            <label className="signup-row-container">
                                <button className="btn-signup">SIGN UP</button>
                            </label>
                        </div>
                    </form>

                    <p className="yes-account">
                        Already have an account?
                        <Link to="/login" className="login-link">Login</Link>
                    </p>

                </div>
            </div>
        )
    }
}

export default SignUp;