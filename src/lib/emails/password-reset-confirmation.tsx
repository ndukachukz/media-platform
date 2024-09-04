import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordConfirmationProps {
  username: string;
}

export const ResetPasswordConfirmation = ({
  username = "User",
}: ResetPasswordConfirmationProps) => (
  <Html>
    <Head />
    <Preview>Your password has been reset</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Password Reset Successful</Heading>
        <Text style={text}>Hello {username},</Text>
        <Text style={text}>
          This email confirms that your password has been successfully reset.
        </Text>
        <Text style={text}>
          If you did not initiate this change, please contact our support team
          immediately.
        </Text>
        <Text style={text}>
          For security reasons, we recommend that you change your password
          regularly and use a unique password for each of your online accounts.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default ResetPasswordConfirmation;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
};

const h1 = {
  fontSize: "24px",
  fontWeight: "bold",
  textAlign: "center" as const,
  margin: "40px 0",
};

const text = {
  fontSize: "16px",
  lineHeight: "26px",
};
