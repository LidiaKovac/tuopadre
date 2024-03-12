import { Meta, StoryObj } from "@storybook/react";

import { Provider } from "react-redux";
import { store } from "../../redux/store";
import { Button } from "./Button";

export default {
  title: "Button",
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  component: Button,
  args: {
    content: "Lorem Ipsum",
    status: "success",
  },
  argTypes: {
    content: {
      control: "text",
    },
    status: {
      options: ["warning", "info", "success", "danger"],
      control: "select",
      default: "success",
    },
  },
} as Meta<typeof Button>;
type Story = StoryObj<typeof Button>;
export const Default: Story = {
  render: (args) => (
    <Button content={args.content} status={args.status} id="0" />
  ),
};

export const Warning: Story = {
  render: () => <Button content="Lorem Ipsum" status="warning" id="1" />,
};

export const Info: Story = {
  render: () => <Button content="Lorem Ipsum" status="info" id="2" />,
};

export const Danger: Story = {
  render: () => <Button content="Lorem Ipsum" status="danger" id="3" />,
};

export const Success: Story = {
  render: () => <Button content="Lorem Ipsum" status="success" id="4" />,
};

export const Disabled: Story = {
  render: () => (
    <Button content="Lorem Ipsum" status="success" id="5" disabled />
  ),
};
