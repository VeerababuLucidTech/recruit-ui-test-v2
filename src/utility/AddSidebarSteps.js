import React, { useState, useContext } from "react";
import { Steps } from 'primereact/steps';

import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { ContractContext, ResourceContext } from "../contextAPI/AddContext";
// import { ContractContext, ResourceContext } from "./ContractContext";



export default function AddSidebarSteps({steps,componentToBeRendered}) {
  const { ResourceCurrentStep, updateResourceCurrentStepState } = useContext(ResourceContext);
  const { currentStep, updateCurrentStepState } = useContext(ContractContext);

  const activeStep = componentToBeRendered === "contract" ? currentStep : ResourceCurrentStep
  
  const handleStep = (index) => {
    updateCurrentStepState(index)
  }

  return (
    // <Box sx={{ maxWidth: 400 }}>
    //   <Stepper activeStep={activeStep} orientation="vertical">
    //     {steps.map((step, index) => (
    //       <Step key={step.title} onClick={() => { handleStep(index) }}  >
    //         <StepLabel>{step.title}</StepLabel>
    //       </Step>
    //     ))}
    //   </Stepper>
    // </Box>
    <>
     <Steps model={steps} activeIndex={currentStep} readOnly />
    </>
  );
}