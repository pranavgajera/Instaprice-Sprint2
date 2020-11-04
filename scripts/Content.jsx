import * as React from 'react';
import GoogleButton from './GoogleButton';

export class Content extends React.Component {
    render() {
        return(
            <div>
                <h1>
                    Hello World from React!
                </h1>
                <GoogleButton />
            </div>);
    }
}