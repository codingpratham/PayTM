import React from 'react';
import Heading from './Heading';
import InputBox from './InputBox';
import { Button } from './Button';
import ButtonWarning from './ButtonWarning';

const SignUpComponent = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading Heading={"Sign up"} SubHeading={"Enter your information to create an account"} />
          
          <InputBox label={"First Name"} type={"text"} name={"firstName"} />
          <InputBox label={"Last Name"} type={"text"} name={"lastName"} />
          <InputBox label={"Email"} type={"email"} name={"email"} />
          <InputBox label={"Password"} type={"password"} name={"password"} />

          <div className='pt-4'>
            <Button label={"Sign up"} />
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
