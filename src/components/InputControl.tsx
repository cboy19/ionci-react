import React from 'react';
import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';

const InputControl: React.FC<{
      segvalue: "mk" | "flb";
      onSelectValue: (value: "mk" | "flb") => void;
     }> = props => {

    const inputChangeHandler = (event: CustomEvent) => {
        props.onSelectValue(event.detail.value);
    }    

    return(
        <IonSegment value={props.segvalue} onIonChange={inputChangeHandler}>
            <IonSegmentButton value="mk">
                <IonLabel>m/kg</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="flb">
                <IonLabel>ft/lbs</IonLabel>
            </IonSegmentButton>            
        </IonSegment>
    );
};

export default InputControl;