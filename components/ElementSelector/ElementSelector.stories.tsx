import type { Meta, StoryObj } from "@storybook/react"
import { ElementSelector } from "./ElementSelector"

const meta: Meta<typeof ElementSelector> = {
  title: "Components/ElementSelector",
  component: ElementSelector,
  args: {
    onElementSelect: (element) => console.log("Selected:", element),
    elements: [
      { id: "1", name: "Hero", type: "character" },
      { id: "2", name: "Castle", type: "location" },
      { id: "3", name: "Sword", type: "item" },
    ],
  },
}

export default meta
type Story = StoryObj<typeof ElementSelector>

export const Default: Story = {
  render: (args) => <ElementSelector {...args} />,
}

export const WithSelectedElements: Story = {
  render: (args) => <ElementSelector {...args} />,
  args: {
    elements: [
      { id: "1", name: "Hero", type: "character" },
      { id: "2", name: "Castle", type: "location" },
      { id: "3", name: "Sword", type: "item" },
    ],
  },
} 