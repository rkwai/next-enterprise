import type { Meta, StoryFn } from "@storybook/react"
import { AIGeneration } from "./AIGeneration"
import { ErrorBoundary } from "react-error-boundary"

const mockHandlers = {
  success: async (parameters: any) => 
    `Generated story with:\nTitle: ${parameters.title}\nGenre: ${parameters.genre}`,
//   error: async () => { 
//     return Promise.reject(new Error("Generation failed"))
//   },
  loading: async () => {
    await new Promise((resolve, reject) => setTimeout(resolve, 2000))
    return "Generated story"
  }
}

const meta: Meta<typeof AIGeneration> = {
  title: "Components/AIGeneration",
  component: AIGeneration,
  argTypes: {
    onGenerate: {
      control: {
        type: 'select',
        options: ['success', 'error', 'loading']
      }
    },
    initialData: {
      control: 'object'
    }
  },
  args: {
    onGenerate: mockHandlers.success
  }
}

export default meta
type Story = StoryFn<typeof AIGeneration>

const ErrorFallback = ({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) => (
  <div role="alert">
    <p>Something went wrong:</p>
    <pre>{error.message}</pre>
    <button onClick={resetErrorBoundary}>Try again</button>
  </div>
)

const WithErrorBoundary: Story = (args) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>
    <AIGeneration {...args} />
  </ErrorBoundary>
)

export const Default: Story = WithErrorBoundary.bind({})
Default.args = {
  onGenerate: mockHandlers.success,
  initialData: {
    title: "My Fantasy Story",
    direction: "A hero's journey in a magical realm",
    genre: "Fantasy",
    elements: ["magic", "dragons"]
  }
}

Default.parameters = {
  docs: {
    description: {
      story: 'AIGeneration component with configurable states and behaviors'
    }
  }
}

export const Loading: Story = WithErrorBoundary.bind({})
Loading.args = {
  onGenerate: mockHandlers.loading
}

Loading.parameters = {
  docs: {
    description: {
      story: 'AIGeneration component in loading state while generating content'
    }
  }
}

// export const Error: Story = WithErrorBoundary.bind({})
// Error.args = {
//   onGenerate: mockHandlers.error
// }

// Error.parameters = {
//   docs: {
//     description: {
//       story: 'AIGeneration component showing error state when generation fails'
//     }
//   }
// }

export const WithPrefilledData: Story = WithErrorBoundary.bind({})
WithPrefilledData.args = {
  onGenerate: mockHandlers.success,
  initialData: {
    title: "The Dragon's Quest",
    direction: "An epic adventure about friendship and courage",
    genre: "Fantasy",
    elements: ["dragons", "magic", "friendship"]
  }
}

WithPrefilledData.parameters = {
  docs: {
    description: {
      story: 'AIGeneration component initialized with pre-filled form data'
    }
  }
} 