import React from 'react';
import Heading from './Heading';
import InputBox from './InputBox';
import { Button } from './Button';
import ButtonWarning from './ButtonWarning';

const SignInComponent = () => {
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading Heading={"Sign in"} SubHeading={"Enter your credentials to access your account"} />
          
          <InputBox label={"Email"} type={"email"} name={"email"} />
          <InputBox label={"Password"} type={"password"} name={"password"} />

          <div className='pt-4'>
            <Button label={"Sign in"} />
          </div>

          <ButtonWarning
            label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
}

export default SignInComponent;
