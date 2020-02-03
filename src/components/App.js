
/** Import react section **/
import React from 'react';

/** Import component section **/

/** Import helpers section **/

/** Import resources section **/
import '../resources/styles/App.scss';
import { Translate } from 'react-localize-redux';



function App() {
  
  return (
    <div className="App">
      <h1>This is a @snow-dev production!</h1>
      <Translate id="home.hello" data={{ name: "Testy McTest" }} />
      <Translate id="home.today" data={{ date: Date.now() }} />
    </div>
  );
}

export default App;
