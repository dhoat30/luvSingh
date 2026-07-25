import { NextResponse } from "next/server";

const FORM_ID_PATTERN = /^[a-zA-Z0-9-]+$/;

const cleanString = (value) =>
  typeof value === "string" ? value.trim() : "";

const cleanFieldValue = (value) => {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  if (typeof value === "boolean") return String(value);
  if (Array.isArray(value)) return value.map(cleanFieldValue).filter(Boolean).join(";");
  return "";
};

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

  const apiKey = process.env.HUBSPOT_API_KEY;
  const portalId = process.env.HUBSPOT_PORTAL_ID;
  const formId = cleanString(body.hubspotFormID);
  const submittedFields = Array.isArray(body.hubspotFormObject)
    ? body.hubspotFormObject
    : [];

  if (!apiKey || !portalId) {
    console.error("HubSpot environment variables are not configured.");
    return NextResponse.json(
      { message: "HubSpot is not configured.", success: false },
      { status: 500 },
    );
  }

  if (
    !formId ||
    !FORM_ID_PATTERN.test(formId) ||
    submittedFields.length === 0 ||
    submittedFields.length > 100
  ) {
    return NextResponse.json(
      { message: "Invalid HubSpot form submission.", success: false },
      { status: 400 },
    );
  }

  const fields = submittedFields
    .map((field) => ({
      name: cleanString(field?.name),
      value: cleanFieldValue(field?.value),
    }))
    .filter(({ name }) => name.length > 0);

  if (fields.length === 0) {
    return NextResponse.json(
      { message: "No valid HubSpot fields were provided.", success: false },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/secure/submit/${portalId}/${formId}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          submittedAt: String(Date.now()),
          fields,
        }),
      },
    );
    const responseText = await response.text();

    if (!response.ok) {
      console.error("HubSpot form submission failed:", response.status, responseText);
      return NextResponse.json(
        { message: "The HubSpot submission could not be completed.", success: false },
        { status: 502 },
      );
    }

    let data = null;
    if (responseText) {
      try {
        data = JSON.parse(responseText);
      } catch {
        data = responseText;
      }
    }

    return NextResponse.json({
      message: "HubSpot submission completed.",
      success: true,
      data,
    });
  } catch (error) {
    console.error("HubSpot request error:", error);
    return NextResponse.json(
      { message: "The HubSpot submission could not be completed.", success: false },
      { status: 502 },
    );
  }
}
