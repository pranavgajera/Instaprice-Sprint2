import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Socket from './Socket';

const responseGoogle = (response) => {
  // eslint-disable-next-line no-alert
  console.log(response);
};

function handleSubmit(response) {
  const { name } = response.profileObj;
  const { email } = response.profileObj;
  const profilepicture = response.profileObj.imageUrl;
  Socket.emit('new google user', {
    name,
    email,
    profilepicture,
  });
}

export default function GoogleButton() {
  return (
    <div className="Main-Container">
      <h4>Login with Oauth </h4>
      <GoogleLogin
        clientId="938017382447-u5e1vhhggfpi3rf2ifl94gs8030v6d1s.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSubmit}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>

  );
}