import * as React from 'react';
import GoogleLogin from 'react-google-login';
import Socket from './Socket';

const responseGoogle = (response) => {
  // eslint-disable-next-line no-alert
  // console.log(response);
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
        clientId="778126205197-otgo1t4j6baunn67e82kgqj1k7ffhcq3.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSubmit}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />
    </div>

  );
}
