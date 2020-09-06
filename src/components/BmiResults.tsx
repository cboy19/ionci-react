import React from "react";
import {IonCardContent, IonCard} from '@ionic/react';
import './BmiResults.css';

const BmiResult: React.FC<{result: number}> = (props) => {
return (
      <IonCard id="Result">
        <IonCardContent className="ion-text-center">
          <h2>Your BMI</h2>
          <h3>{props.result.toFixed(2)}</h3>
        </IonCardContent>
      </IonCard>

);

};

export default BmiResult;