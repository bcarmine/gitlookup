//external imports
import React, { useState } from 'react';
import { IonHeader, 
          IonPage, 
          IonTitle, 
          IonToolbar, 
          IonGrid, 
          IonCol,
          IonRow,
          IonText,
          IonInput,
          IonButton} from '@ionic/react';
import { Redirect } from 'react-router';
//local imports
import { saveUsernames, Usernames, UsernamesContextConsumer } from '../model/UserState'
//CSS imports
import './Main.css';

const Add: React.FC = () => {
  //hooks used for the ion input values
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  return (
    <IonPage>
      <Redirect to="/tabbar"></Redirect>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Add Github User</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonGrid>
        <IonRow class="ion-align-items-center ion-justify-content-center ion-padding">
          <IonCol>
            <IonText class="ion-text-center">
              <h3>Let's get started!</h3>
              <hr className="use-primary"/><br/>
            </IonText>
            <IonText>
                Use the form below to submit a github username. 
                Once entered, the user will be added to your watchlist.<br/><br/>
                Access your watchlist from the menu at the bottom of your screen.
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow class="ion-padding">
          <IonCol>
            <IonInput 
                placeholder="name:" 
                onIonChange={(e: any) => setName(e.detail.value!)}
                class="ion-align-self-stretch" clearInput={true}/>
            <IonInput 
                placeholder="github username:" 
                onIonChange={(e: any) => setUsername(e.detail.value!)}
                class="ion-align-self-stretch" clearInput={true}/>
            <UsernamesContextConsumer>
              {(context : Usernames) =>(
                <IonButton onClick={e =>
                  { //initially the username objects only have a name and username
                    //the other fields will be filled by the model
                    context.usernames ? context.usernames.push({name: name, 
                                                              username: username, 
                                                              projects: [],
                                                              followers: 0,
                                                              following: 0,
                                                              numRepos: 0}):
                                        context.usernames = [{name: name, 
                                                            username : username, 
                                                            projects: [],
                                                            followers: 0,
                                                            following: 0,
                                                            numRepos: 0}]
                    saveUsernames(context.usernames) //save to local storage
                  }
              }
              expand="full" type="submit">Submit</IonButton> 
              )}
            </UsernamesContextConsumer>
          </IonCol>
        </IonRow>
      </IonGrid>     
    </IonPage>
  );
};

export default Add;

