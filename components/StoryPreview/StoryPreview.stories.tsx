import type { Meta, StoryObj } from "@storybook/react"
import { StoryPreview } from "./StoryPreview"

const meta: Meta<typeof StoryPreview> = {
  title: "Components/StoryPreview",
  component: StoryPreview,
}

export default meta
type Story = StoryObj<typeof StoryPreview>

// Test: Should render formatted content
export const Default: Story = {
  render: (args) => <StoryPreview {...args} />,
  args: {
    content: "<h1>The Mountain's Secret</h1><p>Deep within the Misty Peaks...</p>",
    elements: [
      { id: "1", name: "Mountain Guide", type: "character" },
      { id: "2", name: "Misty Peaks", type: "location" },
      { id: "3", name: "Ancient Map", type: "item" },
    ],
  },
}

// Test: Should display element references
export const WithElementReferences: Story = {
  render: (args) => <StoryPreview {...args} />,
  args: {
    content: "The Mountain Guide consulted their Ancient Map...",
    elements: [
      { id: "1", name: "Mountain Guide", type: "character" },
      { id: "3", name: "Ancient Map", type: "item" },
    ],
  },
}

// Test: Should match publication layout
export const PublicationLayout: Story = {
  render: (args) => <StoryPreview {...args} layout="publication" />,
  args: {
    content: "<h1>The Mountain's Secret</h1><p>A tale of adventure...</p>",
    elements: [],
  },
}

// Test: Should handle empty content
export const EmptyContent: Story = {
  render: (args) => <StoryPreview {...args} />,
  args: {
    content: "",
    elements: [],
  },
} 