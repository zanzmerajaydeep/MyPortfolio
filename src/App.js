import React from 'react';
import './App.module.scss';
import BaseLayout from "./components/BaseLayout";
import {BrowserRouter} from "react-router-dom";

function App() {
const params = new URLSearchParams(window.location.search);
const redirect = params.get("redirect");
if (redirect) {
  window.history.replaceState(null, "", redirect);
}

   return (
      <div>
         <BrowserRouter>
            <BaseLayout/>
         </BrowserRouter>
      </div>
   );
}


export default App;
