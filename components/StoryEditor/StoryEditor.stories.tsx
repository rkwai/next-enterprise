import type { Meta, StoryObj } from "@storybook/react"
import { StoryEditor } from "./StoryEditor"

const meta: Meta<typeof StoryEditor> = {
  title: "Components/StoryEditor",
  component: StoryEditor,
  args: {
    initialContent: "Once upon a time...",
    onContentChange: (content) => console.log("Content changed:", content),
  },
}

export default meta
type Story = StoryObj<typeof StoryEditor>

export const Default: Story = {
  render: (args) => <StoryEditor {...args} />,
}

export const Empty: Story = {
  render: (args) => <StoryEditor {...args} />,
  args: {
    initialContent: "",
  },
} 