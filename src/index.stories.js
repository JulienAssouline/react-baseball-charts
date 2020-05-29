import React from "react";
import { Button } from "@storybook/react/demo";
import ButtonCool from "./components/Button";

export default { title: "Button" };

export const CoolButton = ({ text }) => <ButtonCool text={text} />;

export const withEmoji = () => (
  <Button>
    <span role="img" aria-label="so cool">
      😀 😎 👍 💯
    </span>
  </Button>
);
