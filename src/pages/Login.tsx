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
import './Main.css';
import {loginUser} from '../firebaseConfig'
import { toast } from '../components/toast';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
    const [busy, setBusy] = useState<boolean>(false)
    //const dispatch = useDispatch()
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    async function login(){
        setBusy(true)
        const res:any = await loginUser(email, password)
        if(res){
            //dispatch(setUserState(res.user.email))
            toast('Login successful')
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
