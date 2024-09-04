import {
  Body,
  Head,
  Html,
  Preview,
  Tailwind,
  Text,
} from "@react-email/components";

const EmailOTPTemplate = ({
  otpCode,
  user,
}: {
  otpCode: string;
  user: string;
}) => (
  <Tailwind config={{}}>
    <Html>
      <Head />
      <Preview>You have requested for en OTP to verify your email</Preview>

      <Body style={main}>
        <Text style={text}>Hello {user},</Text>
        <Text style={text}>
          Thank you for requesting a one-time password (OTP). Your OTP code is:
        </Text>
        <Preview style={otpPreview}>{otpCode}</Preview>

        <p>Please enter this code to proceed with your login or transaction.</p>
        <p style={{ marginTop: "20px" }}>
          If you did not request this code, please ignore this email.
        </p>
        <p>
          Best regards,
          <br />
          Nairametrics Media Team
        </p>
      </Body>
    </Html>
  </Tailwind>
);

export default EmailOTPTemplate;

const main = { fontFamily: "Arial, sans-serif", lineHeight: "1.6" };
const text = { fontSize: "16px", lineHeight: "26px" };
const otpPreview = { fontSize: "24px", color: "#333" };
