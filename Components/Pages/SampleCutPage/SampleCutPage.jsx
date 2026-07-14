"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import LanguageIcon from "@mui/icons-material/Language";
import { matchIsValidTel, MuiTelInput } from "mui-tel-input";
import { theme } from "@/utils/themeSettings";
import styles from "./SampleCutPage.module.scss";

const initialFormData = {
  videoType: "",
  goal: "",
  footageLink: "",
  referenceLink: "",
  name: "",
  email: "",
  phone: "",
};

const stepTitles = [
  "What are we making?",
  "Where is the footage?",
  "How can I reach you?",
];

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export default function SampleCutPage() {
  const stepChangedAt = useRef(0);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submissionState, setSubmissionState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const handlePhoneChange = (value) => {
    setFormData((current) => ({ ...current, phone: value }));
    setFieldErrors((current) => ({ ...current, phone: "" }));
  };

  const validateStep = (stepToValidate) => {
    const errors = {};

    if (stepToValidate === 0 && !formData.videoType) {
      errors.videoType = "Select a video type.";
    }

    if (stepToValidate === 1) {
      if (formData.footageLink && !isValidUrl(formData.footageLink)) {
        errors.footageLink = "Enter a valid link beginning with http or https.";
      }

      if (formData.referenceLink && !isValidUrl(formData.referenceLink)) {
        errors.referenceLink = "Enter a valid link beginning with http or https.";
      }
    }

    if (stepToValidate === 2) {
      if (!formData.name.trim()) errors.name = "Enter your name.";

      if (!formData.email.trim()) {
        errors.email = "Enter your email address.";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        errors.email = "Enter a valid email address.";
      }

      if (!formData.phone) {
        errors.phone = "Enter your phone number.";
      } else if (!matchIsValidTel(formData.phone)) {
        errors.phone = "Enter a valid international phone number.";
      }
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep(step)) return;
    setFieldErrors({});
    stepChangedAt.current = Date.now();
    setStep((current) => Math.min(current + 1, stepTitles.length - 1));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (Date.now() - stepChangedAt.current < 500) return;
    if (!validateStep(2)) return;

    setSubmissionState("submitting");
    setErrorMessage("");

    const message = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Video type: ${formData.videoType}`,
      `Project message: ${formData.goal || "Not provided"}`,
      `Footage link: ${formData.footageLink || "Not provided"}`,
      `Reference link: ${formData.referenceLink || "Not provided"}`,
      `Phone: ${formData.phone}`,
    ].join("\n\n");

    try {
      const response = await fetch("/api/sendmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          message,
          formName: "New Sample Cut Request",
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "The request could not be sent.");
      }

      setSubmissionState("success");
      setFormData(initialFormData);
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again in a moment."
      );
    }
  };

  if (submissionState === "success") {
    return (
      <section className={styles.section}>
        <div className={`${styles.container} ${styles.successContainer}`}>
          <div className={styles.successMark} aria-hidden="true" />
          <p className={styles.eyebrow}>Request received</p>
          <h1>Your footage is in.</h1>
          <p>
            I will review your brief and links, then reply by email with the next
            step.
          </p>
          <Link href="/" className={styles.homeLink}>
            Back to home
          </Link>
        </div>
      </section>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <section className={styles.section}>
        <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Free sample cut</p>
          <h1>Show me the footage. I will show you the potential.</h1>
          <p className={styles.introCopy}>
            Share a quick brief and a viewable link to your footage. No long
            questionnaire and no complicated upload process.
          </p>
        </div>

        <div className={styles.formPanel}>
          <div className={styles.progressHeader}>
            <span>
              Step {step + 1} of {stepTitles.length}
            </span>
            <div
              className={styles.progress}
              role="progressbar"
              aria-label="Form progress"
              aria-valuemin="1"
              aria-valuemax={stepTitles.length}
              aria-valuenow={step + 1}
            >
              {stepTitles.map((_, index) => (
                <span
                  className={index <= step ? styles.complete : ""}
                  key={index}
                />
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <h2>{stepTitles[step]}</h2>

            <div className={styles.fields}>
              {step === 0 && (
                <>
                  <TextField
                    className={styles.muiField}
                    id="videoType"
                    name="videoType"
                    label="Video type"
                    select
                    value={formData.videoType}
                    onChange={handleChange}
                    required
                    error={Boolean(fieldErrors.videoType)}
                    helperText={fieldErrors.videoType}
                    fullWidth
                  >
                    <MenuItem value="UGC ad">UGC ad</MenuItem>
                    <MenuItem value="Video sales letter">
                      Video sales letter
                    </MenuItem>
                    <MenuItem value="Explainer or product promo">
                      Explainer or product promo
                    </MenuItem>
                    <MenuItem value="YouTube or podcast">
                      YouTube or podcast
                    </MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </TextField>
                  <TextField
                    className={styles.muiField}
                    id="goal"
                    name="goal"
                    label="Project message (optional)"
                    value={formData.goal}
                    onChange={handleChange}
                    placeholder="For example: improve retention, explain the offer, or drive clicks."
                    multiline
                    minRows={4}
                    fullWidth
                  />
                </>
              )}

              {step === 1 && (
                <>
                  <TextField
                    className={styles.muiField}
                    id="footageLink"
                    name="footageLink"
                    label="Footage link (optional)"
                    type="url"
                    value={formData.footageLink}
                    onChange={handleChange}
                    placeholder="https://"
                    error={Boolean(fieldErrors.footageLink)}
                    helperText={
                      fieldErrors.footageLink ||
                      "Use a viewable Google Drive, Dropbox, Frame.io, or WeTransfer link."
                    }
                    slotProps={{ htmlInput: { inputMode: "url" } }}
                    fullWidth
                  />
                  <TextField
                    className={styles.muiField}
                    id="referenceLink"
                    name="referenceLink"
                    label="Reference video (optional)"
                    type="url"
                    value={formData.referenceLink}
                    onChange={handleChange}
                    placeholder="https://"
                    slotProps={{ htmlInput: { inputMode: "url" } }}
                    error={Boolean(fieldErrors.referenceLink)}
                    helperText={fieldErrors.referenceLink}
                    fullWidth
                  />
                </>
              )}

              {step === 2 && (
                <>
                  <TextField
                    className={styles.muiField}
                    id="name"
                    name="name"
                    label="Name"
                    type="text"
                    autoComplete="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    error={Boolean(fieldErrors.name)}
                    helperText={fieldErrors.name}
                    fullWidth
                  />
                  <TextField
                    className={styles.muiField}
                    id="email"
                    name="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    error={Boolean(fieldErrors.email)}
                    helperText={fieldErrors.email}
                    fullWidth
                  />
                  <MuiTelInput
                    className={styles.muiField}
                    id="phone"
                    name="phone"
                    label="Phone number"
                    autoComplete="tel"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    focusOnSelectCountry
                    FlagIconButtonProps={{
                      "aria-label": "Choose country code",
                    }}
                    unknownFlagElement={
                      <LanguageIcon
                        className={styles.countryPlaceholder}
                        fontSize="small"
                      />
                    }
                    getFlagElement={(isoCode, { countryName }) => (
                      <span
                        className={styles.countryIso}
                        aria-label={countryName}
                      >
                        {isoCode}
                      </span>
                    )}
                    required
                    error={Boolean(fieldErrors.phone)}
                    helperText={fieldErrors.phone}
                    fullWidth
                  />
                </>
              )}
            </div>

            <div className={styles.actions}>
              {step > 0 && (
                <button
                  key="continue"
                  type="button"
                  className={styles.backButton}
                  onClick={() => {
                    setFieldErrors({});
                    setStep((current) => current - 1);
                  }}
                  disabled={submissionState === "submitting"}
                >
                  Back
                </button>
              )}
              {step < stepTitles.length - 1 ? (
                <button
                  type="button"
                  className={styles.primaryButton}
                  onClick={handleNext}
                >
                  Continue
                </button>
              ) : (
                <button
                  key="submit"
                  type="submit"
                  className={styles.primaryButton}
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting"
                    ? "Sending..."
                    : "Send My Brief"}
                </button>
              )}
            </div>

            {submissionState === "error" && (
              <p className={styles.error} role="alert">
                {errorMessage}
              </p>
            )}
          </form>
        </div>
        </div>
      </section>
    </ThemeProvider>
  );
}
