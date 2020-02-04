
/** Import react section **/
import React from 'react';

/** Import component section **/

/** Import helpers section **/

/** Import resources section **/
import '../resources/styles/App.scss';
import LoginContainer from './Login/LoginContainer';



function App() {
  
  return (
    <div className="App">
      <h1>This is a @snow-dev production!</h1>
      <LoginContainer />
      
    </div>
  );
}

export default App;
