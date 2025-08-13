import React from "react";
import { Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "react-oidc-context";

const SignOutButton: React.FC<{ type?: "link" | "text" | "default" | "primary" | "dashed"; danger?: boolean }> = ({
  type = "primary",
  danger = true,
}) => {
  const auth = useAuth();
  

  const handleSignOut = async () => {
    // Remove the user from local session
    auth.signoutRedirect({
      // aws cognito extras
      extraQueryParams: {
        client_id: "6fsimfpu0tjvdrqun6c4veno48",
        logout_uri: "http://localhost:3000/"
      },
    }) };

  return (
    <Button
      type={type}
      danger={danger}
      icon={<LogoutOutlined />}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;