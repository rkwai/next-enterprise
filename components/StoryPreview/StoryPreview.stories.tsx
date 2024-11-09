import type { Meta, StoryObj } from "@storybook/react"
import { StoryPreview } from "./StoryPreview"

const meta: Meta<typeof StoryPreview> = {
  title: "Components/StoryPreview",
  component: StoryPreview,
  args: {
    content: "<p>Once upon a time in a far away land...</p>",
    elements: [
      { id: "1", name: "Hero", type: "character" },
      { id: "2", name: "Castle", type: "location" },
      { id: "3", name: "Sword", type: "item" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof StoryPreview>

export const Default: Story = {
  render: (args) => <StoryPreview {...args} />,
}

export const NoElements: Story = {
  render: (args) => <StoryPreview {...args} />,
  args: {
    elements: [],
  },
} 