const colors = {
  background: "#0d0f07",
  card: "#1a1c14",
  cardRaised: "#292b21",
  green: "#5fd500",
  greenDark: "#1a3e00",
  text: "#ffffff",
  muted: "#c5c8b8",
  border: "#44483c",
};

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const emailShell = ({ preheader, eyebrow, title, children, footer }) => `
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:0;background:${colors.background};font-family:Arial,Helvetica,sans-serif;color:${colors.text};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">
      ${escapeHtml(preheader)}
    </div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:${colors.background};">
      <tr>
        <td align="center" style="padding:32px 16px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:640px;">
            <tr>
              <td style="padding:0 4px 24px;color:${colors.green};font-size:20px;font-weight:800;letter-spacing:2px;">
                LUV SINGH
              </td>
            </tr>
            <tr>
              <td style="overflow:hidden;background:${colors.card};border:1px solid ${colors.border};border-radius:16px;">
                <div style="height:6px;background:${colors.green};font-size:0;line-height:0;">&nbsp;</div>
                <div style="padding:40px 40px 36px;">
                  <p style="margin:0 0 12px;color:${colors.green};font-size:12px;font-weight:800;letter-spacing:1.6px;text-transform:uppercase;">
                    ${escapeHtml(eyebrow)}
                  </p>
                  <h1 style="margin:0 0 28px;color:${colors.text};font-size:32px;line-height:1.15;letter-spacing:-0.8px;">
                    ${escapeHtml(title)}
                  </h1>
                  ${children}
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:24px 4px 0;color:${colors.muted};font-size:12px;line-height:1.6;text-align:center;">
                ${footer}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

const detailRow = (label, value) => `
  <tr>
    <td style="width:120px;padding:12px 16px 12px 0;color:${colors.muted};font-size:13px;line-height:1.5;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:12px 0;color:${colors.text};font-size:15px;font-weight:700;line-height:1.5;vertical-align:top;">
      ${escapeHtml(value)}
    </td>
  </tr>`;

const detailLinkRow = (label, url) => `
  <tr>
    <td style="width:120px;padding:12px 16px 12px 0;color:${colors.muted};font-size:13px;line-height:1.5;vertical-align:top;">
      ${escapeHtml(label)}
    </td>
    <td style="padding:12px 0;font-size:15px;font-weight:700;line-height:1.5;vertical-align:top;word-break:break-all;">
      <a href="${escapeHtml(url)}" target="_blank" style="color:${colors.green};text-decoration:underline;">Open video link</a>
    </td>
  </tr>`;

export function createClientSampleCutEmail({
  firstName,
  lastName,
  email,
  videoType,
  videoLink,
  message,
}) {
  const fullName = `${firstName} ${lastName}`;
  const safeMessage = escapeHtml(message).replaceAll("\n", "<br>");

  return emailShell({
    preheader: `${fullName} submitted a new sample cut request.`,
    eyebrow: "New sample cut request",
    title: `A new brief from ${fullName}`,
    children: `
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin-bottom:28px;border-top:1px solid ${colors.border};border-bottom:1px solid ${colors.border};">
        ${detailRow("Name", fullName)}
        ${detailRow("Email", email)}
        ${detailRow("Video type", videoType)}
        ${videoLink ? detailLinkRow("Video link", videoLink) : ""}
      </table>
      ${message ? `
        <p style="margin:0 0 10px;color:${colors.muted};font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;">Their message</p>
        <div style="padding:20px;color:${colors.text};background:${colors.cardRaised};border-radius:10px;font-size:15px;line-height:1.7;">
          ${safeMessage}
        </div>
      ` : ""}
      <p style="margin:24px 0 0;color:${colors.muted};font-size:13px;line-height:1.6;">
        Reply to this email to respond directly to ${escapeHtml(firstName)}.
      </p>`,
    footer: "Sent from the Luv Singh sample cut form.",
  });
}

export function createUserSampleCutEmail({ firstName, videoType }) {
  return emailShell({
    preheader: "Your sample cut request has been received.",
    eyebrow: "Brief received",
    title: `Thanks, ${firstName}. Your request is in.`,
    children: `
      <p style="margin:0 0 24px;color:${colors.muted};font-size:16px;line-height:1.7;">
        Thanks for reaching out. I have received your brief for a <strong style="color:${colors.text};">${escapeHtml(videoType)}</strong> and will review it shortly.
      </p>
      <div style="padding:24px;background:${colors.cardRaised};border-radius:10px;">
        <p style="margin:0 0 16px;color:${colors.green};font-size:12px;font-weight:800;letter-spacing:1.4px;text-transform:uppercase;">What happens next</p>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td style="width:34px;padding:0 12px 16px 0;vertical-align:top;">
              <div style="width:28px;height:28px;color:${colors.greenDark};background:${colors.green};border-radius:50%;font-size:13px;font-weight:800;line-height:28px;text-align:center;">1</div>
            </td>
            <td style="padding:3px 0 16px;color:${colors.text};font-size:14px;line-height:1.55;vertical-align:top;">I will review your brief and the goals for your video.</td>
          </tr>
          <tr>
            <td style="width:34px;padding:0 12px 0 0;vertical-align:top;">
              <div style="width:28px;height:28px;color:${colors.greenDark};background:${colors.green};border-radius:50%;font-size:13px;font-weight:800;line-height:28px;text-align:center;">2</div>
            </td>
            <td style="padding:3px 0 0;color:${colors.text};font-size:14px;line-height:1.55;vertical-align:top;">I will reply by email to discuss the footage and next step.</td>
          </tr>
        </table>
      </div>
      <p style="margin:24px 0 0;color:${colors.muted};font-size:13px;line-height:1.6;">
        You can reply directly to this email if you need to add anything to your brief.
      </p>`,
    footer: "This confirmation was sent because you submitted the sample cut form on the Luv Singh website.",
  });
}
