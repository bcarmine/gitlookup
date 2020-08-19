import React, { useState } from 'react';
import { IonHeader, IonPage, IonTitle, IonToolbar, IonInput, IonButton, IonLoading, IonText, IonRow, IonGrid, IonCol, IonSpinner, IonRouterLink, IonRouterOutlet } from '@ionic/react';
import './Main.css';
import {loginUser} from '../firebaseConfig'
import { toast } from '../toast';
import { useHistory } from 'react-router';

//import { setUserState } from '../redux/actions';
//import { useDispatch } from 'react-redux';

const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false)
    //const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(){
        setBusy(true)
        const res:any = loginUser(email, password)
        if(res){
            toast('Login successful')
            //dispatch(setUserState(res.user.email))
            history.replace('/tabbar')
        }
        setBusy(false)
    }

    function toRegister(){
      history.replace('/register')
    }

  return (
    <IonPage>    
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">GitLookup</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait.." duration={0} isOpen={busy}/>
      
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
                  expand="full"><b>Login</b></IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="ion-text-center ion-justify-content-flex-end">
            <p>Don't have an account? <a onClick={toRegister}>Register</a></p>
          </IonCol>
        </IonRow>
      </IonGrid>
    </IonPage>
    
  );
};

export default Login;
