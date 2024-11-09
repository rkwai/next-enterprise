import type { Meta, StoryObj } from "@storybook/react"
import { ElementSelector } from "./ElementSelector"

type Element = {
  id: string
  name: string
  type: 'character' | 'location' | 'item'
}

const sampleElements: Element[] = [
  { id: "1", name: "Mountain Guide", type: "character" as const },
  { id: "2", name: "Misty Peaks", type: "location" as const },
  { id: "3", name: "Ancient Map", type: "item" as const },
  { id: "4", name: "Wise Elder", type: "character" as const },
  { id: "5", name: "Crystal Cave", type: "location" as const },
  { id: "6", name: "Magic Compass", type: "item" as const },
]

const meta: Meta<typeof ElementSelector> = {
  title: "Components/ElementSelector",
  component: ElementSelector,
  args: {
    onElementSelect: (element) => console.log("Selected:", element),
    elements: sampleElements,
  },
}

export default meta
type Story = StoryObj<typeof ElementSelector>

// Test: Should render element categories
export const Default: Story = {
  render: (args) => <ElementSelector {...args} />,
}

// Test: Should filter elements by type
export const FilteredByCharacter: Story = {
  render: (args) => <ElementSelector {...args} initialTab="character" />,
}

// Test: Should maintain selected elements list
export const WithSelectedElements: Story = {
  render: (args) => <ElementSelector {...args} />,
  args: {
    initialSelected: [
      { id: "1", name: "Mountain Guide", type: "character" as const },
      { id: "2", name: "Misty Peaks", type: "location" as const },
    ],
  },
}

// Test: Should handle empty state
export const EmptyState: Story = {
  render: (args) => <ElementSelector {...args} />,
  args: {
    elements: [],
  },
} 