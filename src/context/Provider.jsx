import React, { } from 'react';
import Context from './Context';

function Provider(e) {
  const { children } = e;
  return (
    <Context.Provider>
      {children}
    </Context.Provider>
  );
}

export default Provider;
