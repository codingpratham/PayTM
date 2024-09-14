import React, { useState } from 'react';
import Heading from './Heading';
import InputBox from './InputBox';
import { Button } from './Button';
import ButtonWarning from './ButtonWarning';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpComponent = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Error state for handling errors
  const [loading, setLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName,
        lastName,
        username,
        password
      });
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      setError('Signup failed. Please try again.');
      console.error("Error during signup:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading Heading={"Sign up"} SubHeading={"Enter your information to create an account"} />
          
          <InputBox label={"First Name"} type={"text"} name={"firstName"} onChange={(e) => setFirstName(e.target.value)} />
          <InputBox label={"Last Name"} type={"text"} name={"lastName"} onChange={(e) => setLastName(e.target.value)} />
          <InputBox label={"Email"} type={"email"} name={"email"} onChange={(e) => setUsername(e.target.value)} />
          <InputBox label={"Password"} type={"password"} name={"password"} onChange={(e) => setPassword(e.target.value)} />

          {error && <div className="text-red-500 mt-2">{error}</div>} {/* Display error message if signup fails */}
          
          <div className='pt-4'>
            <Button 
              label={loading ? "Signing up..." : "Sign up"} // Show "Signing up..." while loading
              disabled={loading} // Disable button during signup
              onClick={handleSignUp}
            />
          </div>

          <ButtonWarning
            label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignUpComponent;
