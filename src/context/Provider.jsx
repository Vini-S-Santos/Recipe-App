import React, { } from 'react';
import Context from './Context';

function Provider() {
  return (
    <Context.Provider value={ values }>
      {children}
    </Context.Provider>
  );
}

export default Provider;
