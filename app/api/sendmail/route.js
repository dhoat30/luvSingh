
import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { message: "Invalid request body.", success: false },
      { status: 400 }
    );
  }

  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const formName =
    typeof body.formName === "string" ? body.formName.trim() : "Website enquiry";

  if (!EMAIL_PATTERN.test(email) || !message || message.length > 20000) {
    return NextResponse.json(
      { message: "Please provide a valid email and message.", success: false },
      { status: 400 }
    );
  }

  const domain = process.env.MAILGUN_DOMAIN;
  const apiKey = process.env.MAILGUN_API_KEY;
  const emailTo = process.env.EMAIL_TO;

  if (!domain || !apiKey || !emailTo) {
    console.error("Mailgun environment variables are not configured.");
    return NextResponse.json(
      { message: "Email service is not configured.", success: false },
      { status: 500 }
    );
  }

  const url = `https://api.mailgun.net/v3/${domain}/messages`;
  const formData = new URLSearchParams();
  formData.append(
    "from",
    process.env.MAILGUN_FROM || `Luv Singh Website <postmaster@${domain}>`
  );
  formData.append("to", emailTo);
  formData.append("h:Reply-To", email);
  formData.append("subject", formName.replace(/[\r\n]/g, " ").slice(0, 120));
  formData.append("text", message);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`api:${apiKey}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });
    const responseText = await response.text();

    if (!response.ok) {
      console.error("Mailgun request failed:", response.status, responseText);
      return NextResponse.json(
        { message: "The request could not be sent.", success: false },
        { status: 502 }
      );
    }

    return NextResponse.json({ message: "Request sent.", success: true });
  } catch (error) {
    console.error("Mailgun request error:", error);
    return NextResponse.json(
      { message: "The request could not be sent.", success: false },
      { status: 502 }
    );
  }
}
