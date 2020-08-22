import React, { useState } from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonRouterOutlet, IonLoading } from '@ionic/react';
import { logOutOutline, listOutline, pencilOutline, personAddOutline} from 'ionicons/icons';
import { logoutUser } from '../firebaseConfig';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import Add from './Add';
import WatchlistTab from './WatchlistTab';
import Tab3 from './Tab3';
import './Main.css'

const TabBar: React.FC = () => {
  const [busy] = useState<boolean>(true)
  return(
<IonReactRouter>
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tabbar/add" component={Add}/>
      <Route path="/watchlist" component={WatchlistTab} exact={true}/>
      <Route path="/tab3" component={Tab3} exact/>
      <Route path="/tabbar" render={() => <Redirect to='/tabbar/add'/>} exact={true}/>
    </IonRouterOutlet>
    <IonLoading 
          message="Registration in progress..." 
          duration={0} isOpen={busy}/>
      
    <IonTabBar slot="bottom">
      
      <IonTabButton tab="add" href="/add">
        <IonIcon icon={personAddOutline} />
        <IonLabel>Add User</IonLabel>
      </IonTabButton>

      <IonTabButton class="use-tertiary-selected" tab="watchlist" href="/watchlist">
        <IonIcon  icon={listOutline} />
        <IonLabel>Watchlist</IonLabel>
      </IonTabButton>

      <IonTabButton class="button3" tab="edit" href="/tab3">
        <IonIcon icon={pencilOutline} />
        <IonLabel>Edit Watchlist</IonLabel>
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