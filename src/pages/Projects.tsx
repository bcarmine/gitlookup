//external imports
import React, { useState, useEffect } from 'react';
import { IonContent, 
          IonHeader, 
          IonPage,
          IonList,
          IonText,
          IonItem,
          IonGrid,
          IonRow,
          IonToolbar,
          IonTitle,
          IonItemSliding,
          IonItemOptions,
          IonItemOption,
          IonButton,
          IonIcon,
          IonLoading} from '@ionic/react';
import { getSelectedUser, Project } from '../model/UsernameState';
import uuid from 'uuid';
import { linkOutline } from 'ionicons/icons';
//CSS imports
import './Projects.css'
import './Main.css'

const Projects: React.FC = () => {
  const [busy, setBusy] = useState(true);

  useEffect(() => {
    setTimeout(() => setBusy(false), 1500)
  }, []);

  
  const user = getSelectedUser()
  var projects: Project[] = [];
  if(user){ projects = getSelectedUser().projects}
  const URL = 'https://github.com/'

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          { projects.length ? (<IonTitle class="ion-text-center">{user.name}'s Projects</IonTitle>)
          : (<IonTitle class="ion-text-center">Projects</IonTitle>)}
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Loading..." duration={0} isOpen={busy}/>

      { projects.length === 30 ? (
        <IonText class="ion-padding">
          Note: Only showing the first 30 repos! <br/>
          Visit {user.name}'s full profile <a className="use-tertiary" href={URL.concat(user.username)}> here!</a>
        </IonText>) 

        : projects.length ? (
          <IonText class="ion-padding">{user.name} has {user.numRepos} repos.<br/>
            Visit {user.name}'s full profile <a className="use-tertiary" href={URL.concat(user.name)}> here!</a>
          </IonText>) 

          : <IonContent class="ion-padding ion-text-justify">
              <IonText class="ion-padding"><br/><b className="use-danger">Whoops!</b><br/></IonText>
              {
                user ? (
                  <IonText class="ion-padding ion-text-justify">
                    <br/>The selected user does not have any github projects to display.
                  </IonText>)
                  : (
                    <IonText class="ion-padding ion-text-justify">
                      <br/>A user must be selected to view their github projects. To select a user, 
                      go to the Watchlist tab, swipe a user item to the right and click on the expand button.
                    </IonText>)
              }
            </IonContent>
      }
      
      <IonContent>
      <IonList class="border-primary list-padding">
        {
          projects.length ? (
              projects.map((project) => (
                <IonItemSliding key={uuid.v4()}>
                  <IonItem class="border-primary">
                    <IonGrid>
                      <IonRow>
                        <IonText class="label-large ion-text-left">
                          <br/><b className="use-tertiary">Name: </b>{project.name}
                        </IonText>
                      </IonRow>
                      <IonRow>
                        { project.description ? (
                          <IonText class="size-small ion-text-justify">
                            <b><br/>Description: </b>{project.description}
                          </IonText>
                        ) : (<IonText></IonText>)}
                      </IonRow>
                      <IonRow>
                        { project.language ? (
                          <IonText class="size-small ion-text-left">
                            <b><br/>Language: </b>{project.language}<br/><br/>
                          </IonText>
                        ) : (<IonText></IonText>)}
                      </IonRow>
                    </IonGrid>
                  </IonItem>

                  <IonItemOptions class="use-tertiary-background options-padding" side="start"> 
                    <IonItemOption class="use-tertiary-background" href={project.html_url}
                      onClick={() => {
                        var i = projects.findIndex(o => o.name === project.name);
                        window.location.href = projects[i].html_url as string;
                      }}>                         
                      <IonButton color = "tertiary">
                        <IonIcon icon={linkOutline} ></IonIcon>
                      </IonButton>
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              ))
          ) : (<IonText></IonText>)
        }
        
      </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Projects;