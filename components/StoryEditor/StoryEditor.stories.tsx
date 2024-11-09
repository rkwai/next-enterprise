import type { Meta, StoryObj } from "@storybook/react"
import { StoryEditor } from "./StoryEditor"

const meta: Meta<typeof StoryEditor> = {
  title: "Components/StoryEditor",
  component: StoryEditor,
}

export default meta
type Story = StoryObj<typeof StoryEditor>

// Test: Should render empty editor state
export const Empty: Story = {
  render: (args) => <StoryEditor {...args} />,
}

// Test: Should accept initial content
export const WithContent: Story = {
  render: (args) => <StoryEditor {...args} />,
  args: {
    initialContent: "Once upon a time in the Misty Peaks...",
  },
}

// Test: Should handle formatting commands
export const WithFormattedContent: Story = {
  render: (args) => <StoryEditor {...args} />,
  args: {
    initialContent: "<p><strong>Chapter 1:</strong> The Beginning</p><p>The journey began...</p>",
  },
}

// Test: Should maintain undo/redo history
export const WithEditHistory: Story = {
  render: (args) => <StoryEditor {...args} />,
  args: {
    initialContent: "Initial text",
    showUndoRedo: true,
  },
} 