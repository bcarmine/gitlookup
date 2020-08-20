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
          IonButton,
          IonLoading} from '@ionic/react';
import './Main.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router';

const x = ['Company 1', 'Company 2', 'Company 3']

const Add: React.FC = () => {
  const [username, setUsername] = useState('')
  const email = useSelector((state:any) => state.user.email)

  return (
    <IonPage>
      <Redirect to="/tabbar"></Redirect>
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
              <h5>{email}</h5>
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

export default Add;

