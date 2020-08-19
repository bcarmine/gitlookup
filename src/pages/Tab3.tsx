import React from 'react';
import Firebase from 'firebase'
import config, { getData } from '../firebaseConfig'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Tab3.css';
import { render } from '@testing-library/react';

class Watchlist extends React.Component{
  constructor(props: any){
    super(props);
    //Firebase.initializeApp(config)

    this.state = {
      companies: []
    };
  }

  componentDidMount(){
    this.getUserData();
  }

  componentDidUpdate(prevProps:any, prevState:any){
    if(prevState !== this.state){
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

}

const Tab3: React.FC = () => {
  console.log(getData())
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tab 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 3</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Tab 3 page" />
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
