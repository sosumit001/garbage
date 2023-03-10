import { useContext, useEffect } from "react";
import { AuthContext } from "../context/auth";
import { gql, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";

const Verify = () => {
  const { token } = useParams();
  const { user } = useContext(AuthContext);
  const [verifyUser, { loading }] = useMutation(VERIFY_USER);

  useEffect(() => {
    if (user) {
      verifyUser({
        variables: { id: user.user_id
          , verificationToken: token },
      });
    }
  }, [user, token, verifyUser]);

  const ele = loading ? (
    <>
      <h2>user is verified!</h2>
    </>
  ) : (
    <>
      <h2
        style={{
          margin: "100px auto",
          width: "fit-content",
          borderBottom: "1px solid grey",
        }}
      >
        verification link sent to : {user ? user.email : "your email"}{" "}
      </h2>
      <p style={{ width: "300px", margin: "auto" }}>
        please check : SPAM OF YOUR GMAIL IN CASE YOU DON'T RECEIVE
      </p>
    </>
  );

  return ele;
};

const VERIFY_USER = gql`
  mutation VerifyUser($id: String!, $verificationToken: String!) {
    verifyUser(id: $id, verificationToken: $verificationToken)
  }
`;

export default Verify;
