"use client";

import React, { useState } from "react";
import Input from './InputFields/Input'
import { websiteEnquiryFieldsData } from "@/utils/websiteEnquiryFieldsData";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from "axios";
import Alert from '@mui/material/Alert';
import Link from 'next/link'
import MobileStepper from '@mui/material/MobileStepper';
import { useTheme } from '@mui/material/styles';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation'
import dynamic from "next/dynamic";
import styles from './WebsiteEnqiuryForm.module.scss'
export default function WebsiteEnquiryForm({ className, formName = "Website Enquiry Form" }) {
    const router = useRouter()
    const [formData, setFormData] = useState({});
    const [formErrors, setFormErrors] = useState({});
    const [activeStep, setActiveStep] = React.useState(0);
    const [isLoading, setIsLoading] = useState(false)
    const [isSuccess, setIsSuccess] = useState(false)
    const [error, setError] = useState(false)
    const [newSubmission, setNewSubmission] = useState(false)
    // theme 
    const theme = useTheme();

    const handleNext = () => {

        // validate field on next click 
        const currentField = websiteEnquiryFieldsData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
            setActiveStep((prevActiveStep) => prevActiveStep + 1);

        }
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    // handle input change 
    const handleInputChange = (event, id) => {
        const newFormData = { ...formData, [id]: event.target.value };
        setFormData(newFormData);
    };

    // submit handler 
    const submitHandler = (e) => {

        // validate field on next click 
        const currentField = websiteEnquiryFieldsData[activeStep];
        if (currentField.validation && !currentField.validation(formData[currentField.id])) {
            setFormErrors({ [currentField.id]: true });
        } else {
            setFormErrors({});
        }

        const dataPayload = {
            email: formData.email,
            formName: formName,
            message: `First Name: ${formData.firstname} \n Email: ${formData.email} \n What is your web design requirement?: ${formData['what_is_your_web_design_requirement_']} \n What are your website needs?: ${formData['what_are_your_website_needs_']} \n What type of business is this for?: ${formData['what_type_of_business_is_this_for_']} \n What industry do you operate in?: ${formData['industry']} \n When would you like the website to go live?: ${formData['project_timeline']} \n What is your estimated budget for this project?: ${formData['budget']} `,
            hubspotFormID: process.env.NEXT_PUBLIC_HUBSPOT_DETAIL_ENQUIRY_FORM,
            hubspotFormObject: [
                {
                    name: "firstname",
                    value: formData.firstname
                },
                {
                    name: "email",
                    value: formData.email
                }, {
                    name: "what_is_your_web_design_requirement_",
                    value: formData['what_is_your_web_design_requirement_']
                },
                {
                    name: "what_are_your_website_needs_",
                    value: formData['what_are_your_website_needs_']
                },
                {
                    name: "what_type_of_business_is_this_for_",
                    value: formData['what_type_of_business_is_this_for_']
                },
                {
                    name: "industry",
                    value: formData['industry']
                },
                {
                    name: "project_timeline",
                    value: formData['project_timeline']
                },
                {
                    name: "budget",
                    value: formData.budget
                },

            ]
        }
        setIsLoading(true)

        // Send an event to GA4 manually
        if (typeof window !== 'undefined') {
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
                'event': 'quote_form_submission', // The custom event name you configured in GTM
                'event_category': 'form_submit',
                'event_label': 'Instant Quote From Submission'
            });
        }
        // hubspot config
        var configHubspot = {
            method: 'post',
            url: '/api/submit-hubspot-form',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };
        // mailgun config
        var configSendMail = {
            method: 'post',
            url: '/api/sendmail',
            headers: { 'Content-Type': 'application/json' },
            data: dataPayload
        };

        Promise.all([axios(configHubspot), axios(configSendMail)])
            .then(function (response) {
                console.log(response)
                if (response[1].status === 200) {
                    setIsLoading(false)
                    setIsSuccess(true)
                    setNewSubmission(false)
                    setError(false)
                    router.push('/form-submitted/thank-you')
                }
                else {
                    console.log(response)
                    setIsLoading(false)
                    setIsSuccess(false)
                    setError(true)
                    setNewSubmission(true)

                }
            })
            .catch(function (error) {
                console.log(error);
                setIsLoading(false)
                setIsSuccess(false)
                setError(true)
                setNewSubmission(true)

            });
    }
    const currentField = websiteEnquiryFieldsData[activeStep];
    let dollarUSLocale = Intl.NumberFormat('en-US')
    return (
        <Container variant="div" className={`${className} ${styles.section} py-8 `} maxWidth="xl">

            <Box sx={{ width: '100%' }}>

                <MobileStepper
                    className={`${styles.mobileStepper}`}
                    variant="progress"
                    steps={websiteEnquiryFieldsData.length}
                    position="static"
                    activeStep={activeStep}
                    color="secondary"
                     sx={{
                        "& .MuiLinearProgress-root": { 
        backgroundColor: " var(--light-primary-container)", 
        width: "100%", 
                        }, 
    "& .MuiLinearProgress-bar": {
      backgroundColor: "secondary.main",
    },

  }}
                />

                <React.Fragment>
                    <div className={`${styles.inputWrapper} pt-8`}>
                        <Input
                            lightTheme={true}
                            label={websiteEnquiryFieldsData[activeStep].label}
                            type={websiteEnquiryFieldsData[activeStep].type}
                            value={formData[currentField.id] || ''}
                            onChange={(e) => handleInputChange(e, websiteEnquiryFieldsData[activeStep].id)}
                            onBlur={websiteEnquiryFieldsData[activeStep].onBlur}
                            required={websiteEnquiryFieldsData[activeStep].required}
                            autoComplete={websiteEnquiryFieldsData[activeStep].autoComplete}
                            isInvalid={formErrors[currentField.id]}
                            errorMessage={websiteEnquiryFieldsData[activeStep].errorMessage}
                            options={websiteEnquiryFieldsData[activeStep].options}
                        />

                        <Box className={`${styles.buttonWrapper}`} sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                            <Button
                                color="secondary"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                                variant="outlined"
                                startIcon={<KeyboardArrowLeft />}
                                size="large"
                            >
                                Back
                            </Button>
                            {activeStep === websiteEnquiryFieldsData.length - 1 ?

                                    <Button
                // newSubmission={newSubmission}
                onClick={submitHandler}
                loading={isLoading}
                // isSuccess={isSuccess}
              variant="contained"
              className="mt-16"
              color="secondary"
              >
                Submit now
              </Button>
                                :
                                <Button onClick={handleNext} color="secondary" variant="contained"
                                    endIcon={<KeyboardArrowRight />}
                                    size="large"
                                >
                                    Next
                                </Button>
                            }
                        </Box>
                        {error && <Alert sx={{ margin: "8px 0" }} severity='error'>Something went wrong. Please Try again</Alert>}
                    </div>
                </React.Fragment>

            </Box>

        </Container>
    )
}
