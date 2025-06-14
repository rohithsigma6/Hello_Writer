
import { useState } from 'react';
import WelcomeCharacterArc from './WelcomeCharacterArc';
import CodingInProgress from './CodingInProgress';

const CharacterArc = () => {
  const [showCreatePage, setShowCreatePage] = useState<'initial' | 'create'>('initial');

  return (
    <div className="w-full min-h-full p-10 overflow-y-auto">
      {showCreatePage === 'initial' ?
        <WelcomeCharacterArc setShowCreatePage={setShowCreatePage} />
        :
        <CodingInProgress />
      }
    </div>
  );
};

export default CharacterArc;
