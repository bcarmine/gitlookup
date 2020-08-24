//external imports
import React, { useState } from 'react';
import { IonHeader, 
          IonPage, 
          IonTitle, 
          IonToolbar, 
          IonInput, 
          IonButton, 
          IonLoading, 
          IonText, 
          IonRow, 
          IonGrid, 
          IonCol } from '@ionic/react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
//local imports
import {loginUser} from '../firebaseConfig'
import { toast } from '../components/toast';
//CSS imports
import './Main.css';

const Login: React.FC = () => {
    //hook used for ion loading state
    const [busy, setBusy] = useState<boolean>(false)
    //hooks used for ion input values
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    //hook used for local redirecting
    const history = useHistory() 

    /**
     * Login function uses firebase to login and 
     * redirects if sucessful.
     * Note: firebaseConfig handles unsucessful login
     */
    async function login(){
        setBusy(true) //busy state indicates ion loading
        const res:any = await loginUser(email, password)
        if(res){
            toast('Login successful', 2000)
            history.replace('/tabbar/add')
            history.replace('/tabbar') //add
        }
        setBusy(false)
    }

  return (
    <IonPage>   
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">GitLookup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Logging in.." duration={0} isOpen={busy}/>
      
      <IonGrid class="ion-padding">
        <IonRow class="ion-align-items-center ion-justify-content-center ion-padding">
          <IonCol>

            <IonText class="ion-text-center">
              <h3>Welcome to GitLookup!</h3>
              <hr className="use-primary"/><br/>
            </IonText>
            <IonText>
                A personalised platform for tracking github repositories,
                made specifically for employers on the hunt!<br/>
            </IonText>
          </IonCol>
        </IonRow>
        
        <IonRow class="ion-padding">
          <IonCol>
              <IonText>Login here:</IonText>
              <IonInput 
                  placeholder="email..." 
                  onIonChange={(e: any) => setEmail(e.target.value)}
                  class="ion-align-self-stretch"/>
              <IonInput 
                  placeholder="password..."
                  type="password"
                  onIonChange={(e:any) => setPassword(e.target.value)}/>
              <IonButton 
                  onClick={login}
                  expand="full">Login</IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="ion-text-center ion-justify-content-flex-end">
            <p>Don't have an account? <Link to='/register'>Register</Link></p>
          </IonCol>
        </IonRow>
      </IonGrid>

    </IonPage>    
  );
};

export default Login;
