import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const VerifyGeneratedToken = () => {
  const { token } = useParams();
  const { user } = useContext(AuthContext);
  const [verifyUser] = useMutation(VERIFY_USER,{
    onError: (err) => console.log(err),
    onCompleted: () => {
      window.location.href = '/'
    }
  });

  useEffect(() => {
    verifyUser({
      variables: {userId: user.user_id,verificationToken:token }
    })
    // console.log('userId: ',user.user_id)
    // console.log('verificationToken: ',token)
  },[])
  return (
    <div>
      <p>verifying...</p>
    </div>
  );
};

const VERIFY_USER = gql`
  mutation VerifyUser($userId: ID!, $verificationToken: String!) {
    verifyUser(userId: $userId, verificationToken: $verificationToken)
  }
`;

export default VerifyGeneratedToken;
