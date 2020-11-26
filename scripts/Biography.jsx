import * as React from 'react';
import Socket from './Socket';

export default function Biography(props) {
  
  return (
    <div>
        <img src={props.pfp} />
        {props.name}
        {props.bio}
    </div>
  );
}