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
import './Main.css';
//import { logoutUser, getDB, getData } from '../firebaseConfig';

const x = ['Company 1', 'Company 2', 'Company 3']

const Tab1: React.FC = () => {
  const [username, setUsername] = useState('')

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">Add Git User</IonTitle>
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
                  placeholder="github username:" 
                  onIonChange={(e: any) => setUsername(e.target.value)}
                  class="ion-align-self-stretch"/>
              <IonButton 
                  //onClick={}
                  expand="full"
                  type="submit">Submit</IonButton>
          </IonCol>
        </IonRow>

        
      </IonGrid>
      
    </IonPage>
  );
};

/**
 *         <IonItem>
          <IonLabel>Pokémon Yellow</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Mega Man X</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>The Legend of Zelda</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Pac-Man</IonLabel>
        </IonItem>
        <IonItem>
          <IonLabel>Super Mario World</IonLabel>
        </IonItem>


        <IonContent>
      <IonList> 
        {x.map(word => (
          <IonItem key={word.toString()}>
            <IonLabel>{word}</IonLabel>
          </IonItem>
        ))}
      </IonList>
              
      </IonContent>
 */
//<IonButton onClick={logoutUser} href="/login">Logout</IonButton>

export default Tab1;

