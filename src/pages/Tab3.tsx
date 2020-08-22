import React, { useState, useEffect} from 'react';
import { IonContent, 
          IonHeader, 
          IonPage, 
          IonTitle, 
          IonToolbar, 
          IonLoading} from '@ionic/react';
import './Tab3.css';
import { Usernames, UsernamesContextConsumer } from '../UsernameState';

const Tab3: React.FC = () => {
  const [projects, setProjects] = useState([]);
  
  /**
   * useEffect(() => {
    fetch('./api/projects')
    .then(res => res.json())
    .then(projects => setProjects(projects))
    .catch(err => console.log(err))
  },[]);
   */
  

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle class="ion-text-center">User Projects</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          projects.length ? (
            projects.map((project:any) => (
              <div style={{padding: 10}} key={project.name}>
                  <p><b><a href={project.html_url}>{project.name}</a></b></p>
                  <p>{project.description}</p>
              </div>
            ))
          ) : (<div>Loading projects...</div>)
          //<IonLoading message="Loading projects..." isOpen={true}></IonLoading>
        }
        
      </IonContent>
    </IonPage>
  );
};

export default Tab3;
