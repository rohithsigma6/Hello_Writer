import { useState } from "react";
import CodingInProgress from "./CodingInProgress";
import WelcomeStoryArc from "./WelcomeStoryArc";

const StoryArc = () => {
  const [showCreatePage, setShowCreatePage] = useState<'initial' | 'create'>('initial');

  return (
    <div className="w-full min-h-full p-10 overflow-y-auto">
      {showCreatePage === 'initial' ?
        <WelcomeStoryArc setShowCreatePage={setShowCreatePage} />
        :
        <CodingInProgress />
      }
    </div>
  );
};

export default StoryArc;
