import React from 'react';

function Logo(props) {
  return (
    <img
      alt="Logo"
      src="/static/home/logo.png"
      style={{opacity : 0.4}}
      {...props}
    />
  );
}

export default Logo;
