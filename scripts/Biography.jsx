import * as React from 'react';

export default function Biography(props) {
  
  return (
    <div>
        <img src={props.pfp} />
        {props.name}
        {props.bio}
    </div>
  );
}