import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import {GoogleOAuthProvider} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";


function Login(){
    const clientId = '274335366756-vcjkvt998sr7ed4dt1k8r84bk929ajo0.apps.googleusercontent.com';
    const navigate = useNavigate();

  return (
    <>
            <GoogleOAuthProvider clientId={clientId}>
                <GoogleLogin
                    onSuccess={(res) => {
                        console.log(res);
                        console.log('성공');
                        navigate('/home');
                        
                    }}
                    onFailure={(err) => {
                        console.log(err);
                        console.log('실패');
                    }}
                />
            </GoogleOAuthProvider>
        </>
  );
};

export default Login;