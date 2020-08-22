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
  IonText,
  IonGrid,
  IonRow,
  IonCol,
  IonItemOption} from '@ionic/react';
import './Main.css';
import './WatchlistTab.css';
import { updateUsernames, Username, Usernames, UsernamesContextConsumer } from '../model/UsernameState';
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
            <IonText><br/></IonText>
            <IonLabel class="ion-padding">Number of users on your watchlist: {context.usernames ? context.usernames.length : 0}<br/></IonLabel>
            { (context.usernames)
              ? context.usernames.map((u : Username) =>
                <IonItemSliding key={uuid.v4()}>

                  <IonItem class="border-primary">
                    <IonGrid>
                      <IonRow>
                        <IonCol class="ion-text-left" size="auto">
                          <IonText class="label-large">
                            <b>Name:  </b> {u.name}  <br/> 
                          </IonText>
                          <IonText class="label-medium">
                            <b>Username: </b> {u.username} <br/>
                            Public Repos: {u.numRepos}
                          </IonText>
                        </IonCol>

                        <IonCol class="ion-text-right">
                          <IonText class="label-small">
                            <br/> Followers: {u.followers} <br/>
                            Following: {u.following}
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>

                  <IonItemOptions class="use-tertiary-background options-padding" side="end">
                    <IonItemOption class="use-tertiary-background" 
                      onClick={() => {
                        var i = context.usernames.findIndex(o => o.username === u.username); //usernames must be unique
                        if (i > -1) context.usernames.splice(i, 1);
                        updateUsernames(context.usernames);
                      }}>
                      <IonButton class="delete-button" color = "tertiary" onClick={refresh}>
                        <IonIcon icon={trashOutline}></IonIcon>
                      </IonButton>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>)
              : {} }
              <IonItem>
                <IonText class="label-medium ion-padding">
                Add more users to your watchlist from the 'Add User' tab. <br/><br/>
                Swipe a user on the list to the left and click on the trash icon to remove it from your watchlist permanently.<br/>
                </IonText>
              </IonItem>
          </IonList>}
        </UsernamesContextConsumer>
      </IonContent>

      
    </IonPage>
  );
};

export default WatchlistTab;
