"use client";

import React, { useState, useEffect } from "react";
import Input from "./InputFields/Input";
import Box from "@mui/material/Box";
import axios from "axios";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { calculateWebsitePrice } from "@/utils/calcultation/calculateWebsitePrice";
import Container from "@mui/material/Container";
import { useRouter } from "next/navigation";
import { websitePriceCalculatorFieldsData } from "@/utils/websitePriceCalculatorFieldsData";
import Typography from "@mui/material/Typography";
import styles from './WebsitePriceCalculatorForm.module.scss'
export default function WebsitePriceCalculatorForm({
  className,
  formName = "Website Enquiry Form",
}) {
  const router = useRouter();

  const [formData, setFormData] = useState({ typeOfService: [] });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [newSubmission, setNewSubmission] = useState(false);

  // calculate the price
  const [totalPrice, setTotalPrice] = useState(0);

  // Update total price whenever formData changes
  useEffect(() => {
    setTotalPrice(
      calculateWebsitePrice(formData, websitePriceCalculatorFieldsData)
    );
  }, [formData]);

  const handleChange = (id, value, isSelectMultiple) => {
    // Check if 'value' is an event object and handle accordingly
    let newValue = value.target ? value.target.value : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: newValue,
    }));

    // Reset errors on change
    if (errors[id]) {
      setErrors({ ...errors, [id]: false });
    }
  };

  const handleBlur = (id, validationFunction) => {
    if (!validationFunction(formData[id])) {
      setErrors({ ...errors, [id]: true });
    }
  };
  // submit handler
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission if using form tag

    let allFieldsValid = true;
    const newErrors = {};

    // Loop through each field to check if it's required and valid
    websitePriceCalculatorFieldsData.forEach((field) => {
      if (field.required && !formData[field.id]) {
        // Set field as invalid if it's required but empty or invalid
        newErrors[field.id] = true;
        allFieldsValid = false;
        return;
      }
    });

    setErrors(newErrors);
    // If any required field is invalid, stop and don't make API calls
    if (!allFieldsValid) {
      return; // Stop the function if any field is invalid or empty
    }

    const dataPayload = {
      email: formData.email,
      formName: formName,
      message: `First Name: ${formData.firstname} \n Email: ${formData.email} \n  Number of pages needed: ${formData.number_of_pages_needed} \n  Is UI Design ready?: ${formData.do_you_already_have_a_ui_design_prepared_} \n  Copywriting: ${formData.copywriting} \n  Addons: ${formData.addons} \n What are your website needs?: ${formData["what_type_of_website_do_you_need_"]}  \n Quoted price: ${totalPrice} `,
      hubspotFormID:
        process.env.NEXT_PUBLIC_HUBSPOT_WEBSITE_PRICE_CALCULATOR_FORM_ID,
      hubspotFormObject: [
        {
          name: "firstname",
          value: formData.firstname,
        },
        {
          name: "email",
          value: formData.email,
        },
        {
          name: "what_are_your_website_needs_",
          value: formData["what_type_of_website_do_you_need_"],
        },
        {
          name: "number_of_pages_needed",
          value: formData["number_of_pages_needed"]
            ? formData["number_of_pages_needed"]
            : 0,
        },

        {
          name: "budget",
          value: totalPrice,
        },
      ],
    };
    setIsLoading(true);

    // Send an event to GA4 manually
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: "quote_form_submission", // The custom event name you configured in GTM
        event_category: "form_submit",
        event_label: "Instant Quote From Submission",
      });
    }
    // hubspot config
    var configHubspot = {
      method: "post",
      url: "/api/submit-hubspot-form",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };
    // mailgun config
    var configSendMail = {
      method: "post",
      url: "/api/sendmail",
      headers: { "Content-Type": "application/json" },
      data: dataPayload,
    };

    Promise.all([axios(configHubspot), axios(configSendMail)])
      .then(function (response) {
        console.log(response);
        if (response[1].status === 200) {
          setIsLoading(false);
          setIsSuccess(true);
          setNewSubmission(false);
          setError(false);
          // set initial state to empty string
          router.push("/form-submitted/thank-you");
        } else {
          console.log(response);
          setIsLoading(false);
          setIsSuccess(false);
          setError(true);
          setNewSubmission(true);
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setIsSuccess(false);
        setError(true);
        setNewSubmission(true);
      });
  };

  const formInputs = websitePriceCalculatorFieldsData.map((field, index) => {
    const isSelectMultiple = field.type === "select" && field.multiple; // Example condition

    return (
      <Input
        lightTheme={true}
        key={index}
        label={field.label}
        type={field.type}
        value={
          isSelectMultiple ? formData[field.id] || [] : formData[field.id] || ""
        }
        onChange={
          field.type === "chip"
            ? (newValue) => handleChange(field.id, newValue, isSelectMultiple)
            : (e) => handleChange(field.id, e, isSelectMultiple)
        }
        onBlur={
          field.required ? () => handleBlur(field.id, field.validation) : null
        } //check if the field is required then call the function
        required={field.required}
        autoComplete={field.autoComplete}
        isInvalid={errors[field.id]}
        errorMessage={field.errorMessage}
        options={field.options}
        multipleValue={field.multiple}
        min={field.range && field.range.min}
        max={field.range && field.range.max}
        note={field.note && field.note}
      />
    );
  });
  return (
    <>
      <Container
        variant="div"
        className={`${className} ${styles.section} py-8 `}
        maxWidth="xl"
      >
        <Box sx={{ width: "100%" }}>
          <React.Fragment>
            <div className={`${styles.inputWrapper} pt-8 `}>
              <Typography variant="h4" component="h1" className="title bold mt-8 mb-8">
                Instant Website Design Price Calculator
              </Typography>
              {formInputs}
              <div className="btnWrapper mt-16">
                <Button
                  // newSubmission={newSubmission}
                  onClick={submitHandler}
                  loading={isLoading}
                  // isSuccess={isSuccess}
                  variant="contained"
                  className="mt-16"
                  color="secondary"
                  size="large"
                  disableElevation
                >
                  Submit Now
                </Button>
                {error && (
                  <Alert sx={{ margin: "8px 0" }} severity="error">
                    Something went wrong. Please Try again
                  </Alert>
                )}
              </div>
            </div>
          </React.Fragment>
        </Box>
      </Container>
      {totalPrice > 0 && (
        <section className={`${styles.totalPriceSection}`}>
          <Container maxWidth="xl">
            <div className={`${styles.wrapper}`}>
              <div className={`${styles.content}`}>
                <Typography variant="h6" component="div" className={`${styles.title}`}>
                  Total Price
                </Typography>
                <Typography variant="h4" component="div" className={`${styles.price}`}>
                  ${totalPrice}
                </Typography>
                <Typography
                  variant="body1"
                  component="div"
                  className={`${styles.gst}`}
                  color="white"
                >
                  excl. GST{" "}
                </Typography>
              </div>

              {/* <Link href="/book-consultation" className="button-wrapper">
                                <Button variant="contained" color="secondary" size="large">Book free consultation</Button>
                            </Link> */}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}

