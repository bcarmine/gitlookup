//external imports
import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
//local imports
import Login from './pages/Login';
import Register from './pages/Register';
import TabBar from './pages/TabBar';
import WatchlistTab from './pages/WatchlistTab';
import { Route } from 'react-router';
import { getCurrentUser } from './authentication/firebaseConfig';
//CSS imports
import './App.css'

import {UsernamesContextProvider} from './model/Context'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import Projects from './pages/Projects';


/**
 * Routing system defines the pages needed by all lower components
 */
const RoutingSystem: React.FC =() => {
  return(
    <UsernamesContextProvider>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/tabbar" component={TabBar} exact/>
          <Route path="/tabbar/watchlist" component={WatchlistTab} exact/>
          <Route path="/tabbar/projects" component={Projects} exact/>
          <Route path="/register" component={Register} exact />
          <Route path="/" component={Login} exact />
        </IonRouterOutlet>
      </IonReactRouter>
    </UsernamesContextProvider>
  )
}

const App: React.FC = () => {
  //hook used to set ion spinner
  const [busy, setBusy] = useState(true)

  useEffect(() => {
    //if the user is already logged in, then redirect to main page
    getCurrentUser().then((user:any) => {
      if(user){
        window.history.replaceState({}, '/', '/tabbar') // logged in
      }else{
        window.history.replaceState({}, '', '/') //not logged in
      }
      setBusy(false) //stop ion spinner
    })
  },[])
  //if busy, then return an ion spinner, otherwise return the routing system
  return <IonApp> {busy ? <IonSpinner name="bubbles" class="spinnerCenter"/>:<RoutingSystem/>}</IonApp>
};

export default App;
