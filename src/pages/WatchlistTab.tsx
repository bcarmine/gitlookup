//external imports
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
import uuid from 'uuid';
import { trashOutline, expandOutline } from 'ionicons/icons';
import { useHistory } from 'react-router';
//internal imports
import { saveUsernames, setSelectedUser } from '../model/UserState';
import { UsernamesContextConsumer } from '../model/Context'
import { Username, Usernames } from '../model/Types'
import { toast } from '../components/toast';
//CSS imports
import './Main.css';
import './WatchlistTab.css';

const WatchlistTab: React.FC = () => {
  //hook used for local redirecting
  const history = useHistory()
  /*** Local function for refreshing the page.*/
  function refresh(){ history.replace('/tabbar/watchlist') }

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Your Watchlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent>
        <UsernamesContextConsumer>
          { (context : Usernames) =>

          <IonList class="border-primary list-padding">
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
                            <br/>Followers: {u.followers}<br/>
                            Following: {u.following}
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonItem>

                  <IonItemOptions class="use-danger-background" side="end">
                    <IonItemOption class="use-danger-background" 
                      onClick={() => {
                        var i = context.usernames.findIndex(o => o.username === u.username); //usernames must be unique
                        if (i > -1) context.usernames.splice(i, 1);
                        saveUsernames(context.usernames);
                      }}>
                      <IonButton class="option-button" color = "danger" onClick={refresh}>
                        <IonIcon icon={trashOutline}></IonIcon>
                      </IonButton>
                    </IonItemOption>
                  </IonItemOptions>

                  <IonItemOptions class="use-tertiary-background" side="start">
                    <IonItemOption class="use-tertiary-background" 
                      onClick={() => {
                        var i = context.usernames.findIndex(o => o.username === u.username);
                        setSelectedUser(context.usernames[i])
                        toast(context.usernames[i].name + " selected. Look in the projects tab!")
                      }}>
                      <IonButton class="option-button" color="tertiary" onClick={refresh}>
                        <IonIcon icon={expandOutline}></IonIcon>
                      </IonButton>
                    </IonItemOption>
                  </IonItemOptions>

                </IonItemSliding>)
              : {} }
              <IonItem>
                <IonText class="label-medium ion-padding ion-text-justify">
                  Add more users to your watchlist from the 'Add User' tab. <br/><br/>
                  Swipe a user on the list to the right and click on the expand icon to select the user. Once selected, go to the Projects tab to view their github projects.<br/><br/>
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
