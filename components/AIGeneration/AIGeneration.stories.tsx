import type { Meta, StoryObj } from "@storybook/react"
import { AIGeneration } from "./AIGeneration"

const meta: Meta<typeof AIGeneration> = {
  title: "Components/AIGeneration",
  component: AIGeneration,
  args: {
    onGenerate: async (parameters) => "Generated story",
  },
}

export default meta
type Story = StoryObj<typeof AIGeneration>

export const Default: Story = {
  render: (args) => <AIGeneration {...args} />,
}

export const Generating: Story = {
  render: (args) => <AIGeneration {...args} />,
  args: {
    onGenerate: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      return "Generated story"
    },
  },
} 