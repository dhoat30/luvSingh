"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@/utils/themeSettings";
import styles from "./SampleCutPage.module.scss";

const initialFormData = {
  firstName: "",
  lastName: "",
  email: "",
  videoType: "",
  videoLink: "",
  message: "",
};

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

export default function SampleCutPage() {
  const router = useRouter();
  const [formData, setFormData] = useState(initialFormData);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submissionState, setSubmissionState] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    setFieldErrors((current) => ({ ...current, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName.trim()) {
      errors.firstName = "Enter your first name.";
    }

    if (!formData.lastName.trim()) {
      errors.lastName = "Enter your last name.";
    }

    if (!formData.email.trim()) {
      errors.email = "Enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = "Enter a valid email address.";
    }

    if (!formData.videoType) {
      errors.videoType = "Select a video type.";
    }

    if (
      formData.videoLink.trim() &&
      !isValidUrl(formData.videoLink.trim())
    ) {
      errors.videoLink = "Enter a valid link beginning with http or https.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setSubmissionState("submitting");
    setErrorMessage("");

    try {
      const firstName = formData.firstName.trim();
      const lastName = formData.lastName.trim();
      const email = formData.email.trim();
      const videoType = formData.videoType;
      const videoLink = formData.videoLink.trim();
      const message = formData.message.trim();

      const [emailResponse, hubspotResponse] = await Promise.all([
        fetch("/api/sendmail", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            formType: "sample-cut",
            firstName,
            lastName,
            email,
            videoType,
            videoLink,
            message,
            formName: "New Sample Cut Request",
          }),
        }),
        fetch("/api/submit-hubspot-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            hubspotFormID:
              process.env.NEXT_PUBLIC_HUBSPOT_DETAIL_ENQUIRY_FORM,
            hubspotFormObject: [
              { name: "firstname", value: firstName },
              { name: "lastname", value: lastName },
              { name: "email", value: email },
              {
                name: "message",
                value: [
                  `Video type: ${videoType}`,
                  videoLink ? `Video link: ${videoLink}` : null,
                  message ? `Message: ${message}` : null,
                ]
                  .filter(Boolean)
                  .join("\n\n"),
              },
            ],
          }),
        }),
      ]);
      const [emailResult, hubspotResult] = await Promise.all([
        emailResponse.json(),
        hubspotResponse.json(),
      ]);

      if (!emailResponse.ok || !emailResult.success) {
        throw new Error(emailResult.message || "The emails could not be sent.");
      }

      if (!hubspotResponse.ok || !hubspotResult.success) {
        throw new Error(
          hubspotResult.message || "The enquiry could not be saved.",
        );
      }

      setFormData(initialFormData);
      router.push("/form-submitted/thank-you");
    } catch (error) {
      setSubmissionState("error");
      setErrorMessage(
        error.message || "Something went wrong. Please try again in a moment.",
      );
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.intro}>
            <p className={styles.eyebrow}>Free sample cut</p>
            <h1>Show me the vision. I will show you the potential.</h1>
            <p className={styles.introCopy}>
              Tell me what you are creating and what the edit needs to achieve.
              Six quick fields, then I will take it from there.
            </p>
          </div>

          <div className={styles.formPanel}>
            <form onSubmit={handleSubmit} noValidate>
              <h2>Tell me about your video</h2>
              <p className={styles.formDescription}>
                Share the essentials and I will get back to you by email.
              </p>

              <div className={styles.fields}>
                <div className={styles.nameFields}>
                  <TextField
                    className={styles.muiField}
                    id="firstName"
                    name="firstName"
                    label="First name"
                    autoComplete="given-name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    error={Boolean(fieldErrors.firstName)}
                    helperText={fieldErrors.firstName}
                    fullWidth
                  />
                  <TextField
                    className={styles.muiField}
                    id="lastName"
                    name="lastName"
                    label="Last name"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    error={Boolean(fieldErrors.lastName)}
                    helperText={fieldErrors.lastName}
                    fullWidth
                  />
                </div>

                <TextField
                  className={styles.muiField}
                  id="email"
                  name="email"
                  label="Email address"
                  type="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  error={Boolean(fieldErrors.email)}
                  helperText={fieldErrors.email}
                  fullWidth
                />

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
                  <MenuItem value="Video sales letter">Video sales letter</MenuItem>
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
                  id="videoLink"
                  name="videoLink"
                  label="Video link"
                  type="url"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="https://"
                  error={Boolean(fieldErrors.videoLink)}
                  helperText={
                    fieldErrors.videoLink ||
                    "Optional — Google Drive, Dropbox, Frame.io, YouTube, or another viewable link."
                  }
                  slotProps={{ htmlInput: { inputMode: "url" } }}
                  fullWidth
                />

                <TextField
                  className={styles.muiField}
                  id="message"
                  name="message"
                  label="Message (optional)"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about the video, your goal, and anything important I should know."
                  multiline
                  minRows={5}
                  slotProps={{ htmlInput: { maxLength: 5000 } }}
                  fullWidth
                />
              </div>

              <div className={styles.actions}>
                <button
                  type="submit"
                  className={styles.primaryButton}
                  disabled={submissionState === "submitting"}
                >
                  {submissionState === "submitting"
                    ? "Sending..."
                    : "Send My Brief"}
                </button>
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
