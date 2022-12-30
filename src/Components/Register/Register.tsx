import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import  './Register.css';
import { Link, useNavigate} from 'react-router-dom';
import { DispatchType, RootState } from '../../Redux/Store';
import {  userInformation } from '../../Redux/Slices/UserSlice';
import { User } from '../../Types/User';
import { Addresses } from '../../Types/Addresses';


export const RegisterPage:React.FC = () => {

    let navigate = useNavigate();
    const userState = useSelector((state:RootState) => state.auth);
    const dispatch:DispatchType = useDispatch();

    const address:Addresses = {
        city: '',
        state: '',
        streetAddress: '',
        streetAddressLine2: '',
        zipCode: 0
    }

    const [user, setUser] = useState<User>({
        firstName: '',
        lastName: '',
        email:'',
        password: '',
        phoneNumber:0,
        ssn:0,
        address:address,
        accountInformation:[],
        mortgageApplication:[],
        transactions:[]
    });

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUser({
            ...user,
            [e.target.name]:e.target.value
        });
    }

    useEffect(() => {
      
    }, [userState.isLoggedIn])

    const handleRegisterUser = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        dispatch(userInformation(user))
        navigate("/address");
        clearAllInputs();
    }

    const  clearAllInputs = () => {
        const elements = Array.from(document.getElementsByTagName("input"));
        for (const element of elements) {
            if (element.type === "text") {
                element.value = "";
            }
        }
    }

    return(
        <div className="login">
            <form id="auth" onSubmit={handleRegisterUser}>
                <h1 className="h1Auth">Register</h1>

                <label>First Name</label>
                <input id= "first_name" name="firstName" placeholder="first name" onChange={handleChange} required/>

                <label>Last Name</label>
                <input id= "lastName" name="lastName" placeholder="last name" onChange={handleChange} required/>

                <label>Email</label>
                <input  type ="email" id= "email" name="email" placeholder="Your email" onChange={handleChange} required/>

                <label>Password</label>
                <input type="password" id="password" name="password" placeholder="password" onChange={handleChange} required/>

                <label>Phone Number</label>
                <input type="number" id="phoneNumber"  maxLength={9}  name="phoneNumber" placeholder="phoneNumber" onChange={handleChange} required/>

                <label>SSN</label>
                <input type="number" id="password"  maxLength={9}  name="ssn" placeholder="ssn" onChange={handleChange} required/>

                <div className='loginFormSubmit'>
                    <button id="login" className="authentication" >Next</button>
                    <Link to="/login" className="registerLinkFromLogin">Login</Link>
                </div>
            </form>
        </div>
    )
}