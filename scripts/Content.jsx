import * as React from 'react';
import GoogleButton from './GoogleButton';

export class Content extends React.Component {
    render() {
        return(
            <div>
                <h2>
                    InstaPrice
                </h2>
                <GoogleButton />
            </div>);
    }
}