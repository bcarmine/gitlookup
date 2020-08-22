import React from 'react';
import { IonTabs, 
          IonTabBar, 
          IonTabButton, 
          IonIcon, 
          IonLabel, 
          IonRouterOutlet } from '@ionic/react';
import { logOutOutline, listOutline, personAddOutline} from 'ionicons/icons';
import { logoutUser } from '../firebaseConfig';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import Add from './Add';
import WatchlistTab from './WatchlistTab';
import './Main.css'

const TabBar: React.FC = () => {
  return(
<IonReactRouter>
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabbar/add" component={Add}/>
      <Route path="/watchlist" component={WatchlistTab} exact={true}/>
      <Route path="/tabbar" render={() => <Redirect to='/tabbar/add'/>} exact={true}/>
    </IonRouterOutlet>
      
    <IonTabBar slot="bottom">
      
      <IonTabButton tab="add" href="/add">
        <IonIcon icon={personAddOutline} />
        <IonLabel>Add User</IonLabel>
      </IonTabButton>

      <IonTabButton class="use-tertiary-selected" tab="watchlist" href="/watchlist">
        <IonIcon  icon={listOutline} />
        <IonLabel>Watchlist</IonLabel>
      </IonTabButton>

      <IonTabButton href="/login">
        <IonIcon onClick={logoutUser} icon={logOutOutline}/>
        <IonLabel onClick={logoutUser}>Logout</IonLabel>
      </IonTabButton>

    </IonTabBar>
    
  </IonTabs>
  </IonReactRouter>)
};

export default TabBar;

/**
 *       <IonTabButton class="button3" tab="edit" href="/tab3">
        <IonIcon icon={pencilOutline} />
        <IonLabel>Edit Watchlist</IonLabel>
      </IonTabButton>
 */