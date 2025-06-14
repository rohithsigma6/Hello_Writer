import { createContext, useContext, useState, ReactNode } from "react";

// Define the type for story data
type Story = {
  id: number;
  title: string;
  description: string;
  color:string;
};

// Define the context value type
interface StoryContextType {
  selectedStory: Story | null;
  setSelectedStory: (story: Story) => void;
}

// Create context with an initial undefined value
const StoryContext = createContext<StoryContextType | undefined>(undefined);

// Create a provider component
export const StoryProvider = ({ children }: { children: ReactNode }) => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  return (
    <StoryContext.Provider value={{ selectedStory, setSelectedStory }}>
      {children}
    </StoryContext.Provider>
  );
};

// Custom hook to use the context
export const useStory = (): StoryContextType => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};
