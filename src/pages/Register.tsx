import React, { useState } from 'react';
import { IonHeader, 
          IonPage, 
          IonTitle, 
          IonToolbar, 
          IonInput, 
          IonButton, 
          IonLoading, 
          IonGrid, 
          IonRow, 
          IonCol, 
          IonText } from '@ionic/react';
import './Main.css';
import { toast } from '../components/toast';
import {registerUser} from '../firebaseConfig'
import { Link, Redirect, useHistory } from 'react-router-dom';


const Register: React.FC = () => {
  const [busy, setBusy] = useState<boolean>(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCPassword] = useState('')
  const history = useHistory();

  async function register(){
      setBusy(true)
      if(password !== cpassword){
          return toast('Passwords do not match')
      }
      if(email.trim() === '' || password.trim() === ''){
          return toast('Username and passowrd are required')
      }
      const res = await registerUser(email, password)
      if(res){
          toast('Registration successful!')
          //redirect
          history.replace('/tabbar/add')
          history.replace('/tabbar')
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
      <IonLoading 
          message="Registration in progress..." 
          duration={0} isOpen={busy}/>
      
      <IonGrid class="ion-padding">
        <IonRow class="ion-align-items-center ion-justify-content-center ion-padding">
          <IonCol>
            <IonText class="ion-text-center">
              <h3>Create an account with us!</h3>
              <hr className="use-primary"/><br/>
            </IonText>
            <IonText>
                Enter your details below to be added to our system.<br/>
            </IonText>
          </IonCol>
        </IonRow>

        <IonRow class="ion-padding">
          <IonCol>
              <IonText>Register here:</IonText>
              <IonInput 
                placeholder="email..." 
                onIonChange={(e: any) => setEmail(e.target.value)}/>
            <IonInput 
                placeholder="password..."
                type="password"
                onIonChange={(e:any) => setPassword(e.target.value)}/>
            <IonInput 
                placeholder="confirm password..."
                type="password"
                onIonChange={(e:any) => setCPassword(e.target.value)}/>
            <IonButton 
                onClick={register}
                expand="full">
                Register
            </IonButton>
          </IonCol>
        </IonRow>

        <IonRow>
          <IonCol class="ion-text-center ion-justify-content-flex-end">
            <br/><p>Already have an account? <Link to='/'>Login</Link></p>
          </IonCol>
        </IonRow>

      </IonGrid>
    </IonPage>
  );
};

export default Register;
