import React from 'react';
import { IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar, 
  IonList,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonIcon,
  IonContent,
  IonButton,
  IonText} from '@ionic/react';
import './Main.css';
import './WatchlistTab.css';
import { updateUsernames, Username, Usernames, UsernamesContextConsumer } from '../UsernameState';
import uuid from 'uuid';
import { trashOutline } from 'ionicons/icons';
import { Redirect, useHistory } from 'react-router';

const WatchlistTab: React.FC = () => {
  const history = useHistory()
  function refresh(){
    history.replace('/watchlist')
  }

  return (
    <IonPage>
      <Redirect to='/watchlist'></Redirect>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Your Watchlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>

        <UsernamesContextConsumer>
          { (context : Usernames) =>
          <IonList class="border-primary">
            <IonLabel class="ion-padding">Number of users on your watchlist: {context.usernames ? context.usernames.length : 0}<br/></IonLabel>
            { (context.usernames)
              ? context.usernames.map((u : Username) =>
                <IonItemSliding key={uuid.v4()}>

                  <IonItem class="border-primary">
                    <IonLabel className="ion-text-wrap">Name: {u.name}  <br/> 
                                                        Username: {u.username} <br/>
                                                        # of Repos: {u.numProjects}
                    </IonLabel>
                  </IonItem>

                  <IonItemOptions class="use-primary" side="end">
                    <IonItemOptions class="use-primary" onClick={() => {
                      var i = context.usernames.findIndex(o => o.username === u.username 
                                                                && o.name === u.name);
                      if (i > -1) context.usernames.splice(i, 1);
                      updateUsernames(context.usernames);
                    }}>
                      <IonButton class="ion-padding" onClick={refresh}>
                        <IonIcon icon={trashOutline} class="use-primary"></IonIcon>
                      </IonButton>
                    </IonItemOptions>
                  </IonItemOptions>
                </IonItemSliding>)

              : {} }
          </IonList>}
        </UsernamesContextConsumer>
        <br/>
        <IonText class="ion-padding">Add more users to the watchlist from the 'Add User' tab.</IonText>
      </IonContent>
    </IonPage>
  );
};

export default WatchlistTab;
