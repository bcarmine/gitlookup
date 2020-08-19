import React, { useState, useEffect } from 'react';
import {
  IonApp,
  IonRouterOutlet,
  IonSpinner
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle, codeSlashOutline } from 'ionicons/icons';
import Login from './pages/Login';
import Register from './pages/Register';
import './App.css'



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
import {getCurrentUser} from './firebaseConfig';
import { useDispatch } from 'react-redux';
import { setUserState } from './redux/actions';
import Tab1 from './pages/Tab1';
import TabBar from './pages/TabBar';
import { Route } from 'react-router';

const RoutingSystem: React.FC =() => {
  return(
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/" component={Login} exact />
        <Route path="/tab1" component={Tab1} exact />
        <Route path="/tabbar" component={TabBar} exact/>
        <Route path="/register" component={Register} exact />
        <Route path="/login" component={Login} exact />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}


const App: React.FC = () => {
  const [busy, setBusy] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    getCurrentUser().then((user:any) => {
      setBusy(true)
      if(user){
        // logged in
        dispatch(setUserState(user.email))
        window.history.replaceState({}, '', '/tabbar')
      }else{
        //not logged in
        window.history.replaceState({}, '/', '')
      }
      setBusy(false)
    })
  },[])
return <IonApp> {busy ? <IonSpinner name="bubbles" class="spinnerCenter"/>:<RoutingSystem/>}</IonApp>
};

export default App;
