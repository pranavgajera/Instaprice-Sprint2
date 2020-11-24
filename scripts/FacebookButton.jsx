import * as React from 'react';
import Socket from './Socket';
import ReactDOM from 'react-dom';
import FacebookLogin from 'react-facebook-login';

function handleSubmit(response) {
    console.log(response)
    const  name = response.name;
    const  email  = response.email;
    const profilepicture = response.picture.data.url;
    Socket.emit('new user', {
        name,
        email,
        profilepicture,
    });

}

export default function FacebookButton() {
         return(
             <div className="Main-Container">
                 <FacebookLogin
                    appId="801742090666243"
                    autoLoad={false}
                    fields="name,email,picture"
                    callback={handleSubmit}
                 />
             </div>
            );
}