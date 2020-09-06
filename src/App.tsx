import React, { useRef, useState } from "react";
import {
  IonApp,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonCard,
  IonCardContent,
  IonAlert,
} from "@ionic/react";
import BmiControls from "./components/BmiControls";
import BmiResult from "./components/BmiResults";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import InputControl from "./components/InputControl";

const App: React.FC = () => {
  const [calbmi, setCalBmi] = useState<number>();
  const [error, setError] = useState<string>();
  const [calcUnits, setCalcUnits] = useState<"mk" | "flb">("mk");

  const weightInputRef = useRef<HTMLIonInputElement>(null);
  const heightInputRef = useRef<HTMLIonInputElement>(null);

  const calBMI = () => {
    const enteredWeight = weightInputRef.current?.value; //
    const enteredHeight = +heightInputRef.current!.value!; // confirming not a null object

    if (!enteredWeight || enteredWeight <= 0 || enteredHeight <= 0) {
      setError("Please enter a non-negative value");
      return;
    }

    const weightConvFactor = calcUnits === "flb" ? 2.2 : 1;
    const weight = +enteredWeight / weightConvFactor;

    const heightConvFactor = calcUnits === "flb" ? 3.28 : 1;
    const height = enteredHeight / heightConvFactor;

    const bmiValue = weight / (height * height);

    setCalBmi(bmiValue);
    console.log(bmiValue);
  };

  const reset = () => {
    weightInputRef.current!.value = "";
    heightInputRef.current!.value = "";
  };

  const clearError = () => {
    setError("");
  };

  const selectCalcUnitHandler = (value: any) => {
    setCalcUnits(value);
  };

  return (
    <React.Fragment>
      <IonAlert
        isOpen={!!error}
        message={error}
        buttons={[{ text: "Okay", handler: clearError }]}
      />
      <IonApp>
        <IonHeader>
          <IonToolbar color="primary">
            <IonTitle>BMI Calculator</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonGrid>
            <IonRow>
              <IonCol size-sm='8' offset-sm='2' size-md='6' offset-md='3' className="ion-no-padding">
             <IonCard className='ion-no-margin'>
               <IonCardContent>
               <IonGrid className="ion-no-padding">
                  <IonRow>
                    <IonCol>
                      <InputControl
                        segvalue={calcUnits}
                        onSelectValue={selectCalcUnitHandler}
                      />
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Your Height ({calcUnits === "mk" ? "meters" : "feet"})
                        </IonLabel>
                        <IonInput type="number" ref={heightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <IonRow>
                    <IonCol>
                      <IonItem>
                        <IonLabel position="floating">
                          Your Weight (
                          {calcUnits === "mk" ? "kilograms" : "pounds"})
                        </IonLabel>
                        <IonInput type="number" ref={weightInputRef}></IonInput>
                      </IonItem>
                    </IonCol>
                  </IonRow>
                  <BmiControls onCalculate={calBMI} onReset={reset} />
                </IonGrid>
               </IonCardContent>
             </IonCard>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol size-sm='8' offset-sm='2' size-md='6' offset-md='3' className="ion-no-padding">
              {calbmi && <BmiResult result={calbmi} />}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        {/*     <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/home" component={Home} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/home" />} />
      </IonRouterOutlet>
    </IonReactRouter> */}
      </IonApp>
    </React.Fragment>
  );
};

export default App;
