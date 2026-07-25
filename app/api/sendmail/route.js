import { NextResponse } from "next/server";
import {
  createClientSampleCutEmail,
  createUserSampleCutEmail,
} from "@/utils/emailTemplates/sampleCutEmails";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SAMPLE_CUT_FORM = "sample-cut";

const cleanString = (value) =>
  typeof value === "string" ? value.trim() : "";

const cleanSubject = (value) =>
  cleanString(value).replace(/[\r\n]/g, " ").slice(0, 120);

const isValidUrl = (value) => {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
};

async function sendMail({
  apiUrl,
  authorization,
  from,
  to,
  replyTo,
  subject,
  text,
  html,
}) {
  const mailData = new URLSearchParams();
  mailData.append("from", from);
  mailData.append("to", to);
  mailData.append("h:Reply-To", replyTo);
  mailData.append("subject", cleanSubject(subject));
  mailData.append("text", text);
  if (html) mailData.append("html", html);

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      Authorization: authorization,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: mailData,
  });
  const responseText = await response.text();

  return { ok: response.ok, responseText, status: response.status };
}

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body.", success: false },
      { status: 400 },
    );
  }

  const email = cleanString(body.email);
  const isSampleCut = body.formType === SAMPLE_CUT_FORM;
  const message = cleanString(body.message);
  const formName = cleanString(body.formName) || "Website enquiry";

  let sampleCutData;

  if (isSampleCut) {
    sampleCutData = {
      firstName: cleanString(body.firstName),
      lastName: cleanString(body.lastName),
      email,
      videoType: cleanString(body.videoType),
      videoLink: cleanString(body.videoLink),
      message,
    };

    const invalidSampleCut =
      !sampleCutData.firstName ||
      sampleCutData.firstName.length > 100 ||
      !sampleCutData.lastName ||
      sampleCutData.lastName.length > 100 ||
      !EMAIL_PATTERN.test(sampleCutData.email) ||
      !sampleCutData.videoType ||
      sampleCutData.videoType.length > 100 ||
      (sampleCutData.videoLink && !isValidUrl(sampleCutData.videoLink)) ||
      sampleCutData.videoLink.length > 2000 ||
      sampleCutData.message.length > 5000;

    if (invalidSampleCut) {
      return NextResponse.json(
        { message: "Please provide valid sample cut details.", success: false },
        { status: 400 },
      );
    }
  } else if (!EMAIL_PATTERN.test(email) || !message || message.length > 20000) {
    return NextResponse.json(
      { message: "Please provide a valid email and message.", success: false },
      { status: 400 },
    );
  }

  const domain = process.env.MAILGUN_DOMAIN;
  const apiKey = process.env.MAILGUN_API_KEY;
  const emailTo = process.env.EMAIL_TO;

  if (!domain || !apiKey || !emailTo) {
    console.error("Mailgun environment variables are not configured.");
    return NextResponse.json(
      { message: "Email service is not configured.", success: false },
      { status: 500 },
    );
  }

  const apiUrl = `https://api.mailgun.net/v3/${domain}/messages`;
  const authorization = `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`;
  const from =
    process.env.MAILGUN_FROM || `Luv Singh Website <postmaster@${domain}>`;
  const clientReplyTo =
    process.env.MAILGUN_REPLY_TO || emailTo.split(",")[0].trim();

  try {
    if (isSampleCut) {
      const fullName = `${sampleCutData.firstName} ${sampleCutData.lastName}`;
      const clientText = [
        "New sample cut request",
        `Name: ${fullName}`,
        `Email: ${sampleCutData.email}`,
        `Video type: ${sampleCutData.videoType}`,
        sampleCutData.videoLink
          ? `Video link: ${sampleCutData.videoLink}`
          : null,
        sampleCutData.message ? `Message: ${sampleCutData.message}` : null,
      ]
        .filter(Boolean)
        .join("\n\n");
      const userText = [
        `Thanks, ${sampleCutData.firstName}. Your sample cut request is in.`,
        `I have received your brief for a ${sampleCutData.videoType} and will review it shortly.`,
        "I will reply by email to discuss the footage and next step.",
        "You can reply directly to this email if you need to add anything.",
      ].join("\n\n");

      const [clientResult, userResult] = await Promise.all([
        sendMail({
          apiUrl,
          authorization,
          from,
          to: emailTo,
          replyTo: sampleCutData.email,
          subject: `New sample cut request — ${fullName}`,
          text: clientText,
          html: createClientSampleCutEmail(sampleCutData),
        }),
        sendMail({
          apiUrl,
          authorization,
          from,
          to: sampleCutData.email,
          replyTo: clientReplyTo,
          subject: "Your sample cut request is in",
          text: userText,
          html: createUserSampleCutEmail(sampleCutData),
        }),
      ]);

      if (!clientResult.ok || !userResult.ok) {
        console.error("Sample cut email delivery failed.", {
          client: clientResult,
          confirmation: userResult,
        });
        return NextResponse.json(
          { message: "The request could not be sent.", success: false },
          { status: 502 },
        );
      }
    } else {
      const result = await sendMail({
        apiUrl,
        authorization,
        from,
        to: emailTo,
        replyTo: email,
        subject: formName,
        text: message,
      });

      if (!result.ok) {
        console.error("Mailgun request failed:", result.status, result.responseText);
        return NextResponse.json(
          { message: "The request could not be sent.", success: false },
          { status: 502 },
        );
      }
    }

    return NextResponse.json({ message: "Request sent.", success: true });
  } catch (error) {
    console.error("Mailgun request error:", error);
    return NextResponse.json(
      { message: "The request could not be sent.", success: false },
      { status: 502 },
    );
  }
}
