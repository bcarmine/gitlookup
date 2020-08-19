import React from 'react';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, IonRouterOutlet } from '@ionic/react';
import { logOutOutline, listOutline, pencilOutline, personAddOutline} from 'ionicons/icons';
import { logoutUser } from '../firebaseConfig';
import { Route, Redirect } from 'react-router';
import { IonReactRouter } from '@ionic/react-router';
import Tab1 from './Tab1';
import Tab2 from './Tab2';
import Tab3 from './Tab3';


export const TabBar: React.FC = () => (
<IonReactRouter>
  <IonTabs>
    <IonRouterOutlet>
      <Route path="/tab1" component={Tab1} exact/>
      <Route path="/tab2" component={Tab2} exact/>
      <Route path="/tab3" component={Tab3} exact/>
      <Route path="/tabbar" render={() => <Redirect to="/tab1" />} exact={true} />
    </IonRouterOutlet>
      
    <IonTabBar slot="bottom">
      <IonTabButton tab="add" href="/tab1">
        <IonIcon icon={personAddOutline} />
        <IonLabel>Add User</IonLabel>
      </IonTabButton>

      <IonTabButton tab="watchlist" href="/tab2">
        <IonIcon icon={listOutline} />
        <IonLabel>Watchlist</IonLabel>
      </IonTabButton>

      <IonTabButton tab="edit" href="/tab3">
        <IonIcon icon={pencilOutline} />
        <IonLabel>Edit Watchlist</IonLabel>
      </IonTabButton>

      <IonTabButton href="/login">
        <IonIcon onClick={logoutUser} icon={logOutOutline}/>
        <IonLabel onClick={logoutUser}>Logout</IonLabel>
      </IonTabButton>
    </IonTabBar>
    
  </IonTabs>
  </IonReactRouter>
);

export default TabBar;