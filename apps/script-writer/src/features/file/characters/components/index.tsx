import { useEffect, useState } from 'react';
import CharectorSelect from './charector-select';
import WelcomeCharacter from './WelcomeCharacter';
import CharacterEdit from './character-edit';
import { useNavigate, useParams } from 'react-router';
import { useCharacterById, useCharactersByFile } from '../api/save-draft';
import Thecharacteryourstory from './the-character-your-story';
import SpiritualCharacteristics from './spiritual-characteristics';
import EmotionalCharacteristics from './emotional-characteristics';
import PersonalityPsychology from './personality-psychology';
import PhysicalCharacteristics from './physical-characteristics';
import BasicInformation from './basic-information';
import CharacterBlueprint from './character-blueprint';
import CharectorFinal from './charector-final';
import { enqueueSnackbar } from 'notistack';

const Characters = () => {
  const { charId, fileId } = useParams<{ charId: string; fileId: string }>();
  const navigate = useNavigate();
  const [characterStatus, setCharacterStatus] = useState('welcome');

  const { data, isLoading, error } = useCharacterById({ charId });
  const { data: allCharacters } = useCharactersByFile({ fileId });
  useEffect(() => {
    if (error) {
      enqueueSnackbar('error to fetching data', { variant: 'error' });
      navigate(`/file/${fileId}/characters`)
    }
  }, [error])


  console.log(allCharacters);

  const [slectedCharacter, setslectedCharacter] = useState(null);
  const [iniialData, setiniialData] = useState(null);


  useEffect(() => {
    if (data) {
      if (data?.selectedTemplate == 'characterBuilder') {
        setslectedCharacter((prev) => ({
          templateName: 'Character Builder',
          // component: <CharacterStudio />,
          link: 'Character-Studio',
          subTemplate: [
            {
              templateName: 'Basic Information',
              component: <BasicInformation />,
              link: 'Basic-Information',
            },
            {
              templateName: 'Physical Characteristics',
              component: <PhysicalCharacteristics />,
              link: 'Physical-Characteristics',
            },
            {
              templateName: 'Personality & Psychology',
              component: <PersonalityPsychology />,
              link: 'Personality-Psychology',
            },
            {
              templateName: 'Emotional Characteristics',
              component: <EmotionalCharacteristics />,
              link: 'Emotional-Characteristics',
            },
            {
              templateName: 'Spiritual Characteristics',
              component: <SpiritualCharacteristics />,
              link: 'Spiritual-Characteristics',
            },
            {
              templateName: 'The character & your story',
              component: <Thecharacteryourstory />,
              link: 'The-Character-Your-Story',
            },
          ],
        }));

        setiniialData(data);
      } else if (data?.selectedTemplate == 'characterBlueprint') {
        setslectedCharacter({
          templateName: 'Character Blueprint',
          component: <CharacterBlueprint />,
          link: 'Character-Blueprint',
        });

      } else {
        console.log(data);
      }
      if (data?.characterStatus === 'finalize') {
        setCharacterStatus('final');
      } else {
        if (data?.selectedTemplate == 'freeform') {
          setiniialData(data?.allTemplate?.freeform)
          setCharacterStatus('initialize');
        } else {
          setCharacterStatus('edit');
        }
      }
      setiniialData(data);
    } else {
      if (allCharacters?.drafts.length > 0 || allCharacters?.finalized.length > 0) {
        console.log(allCharacters);

        setCharacterStatus('initialize');
      } else {

        setCharacterStatus('welcome');
      }
      setiniialData(null);

    }

  }, [location.pathname, charId, data, allCharacters]);

  return (
    <div className="overflow-y-auto w-full">
      {characterStatus == 'welcnmome' ? (
        <WelcomeCharacter setCharacterStatus={setCharacterStatus} />
      ) : characterStatus == 'initialize' ? (
        <CharectorSelect
          setCharacterStatus={setCharacterStatus}
          setslectedCharacter={setslectedCharacter}
          setiniialData={setiniialData}
          iniialData={iniialData}
        />
      ) : characterStatus == 'edit' ? (
        <CharacterEdit
          templates={slectedCharacter}
          setslectedCharacter={setslectedCharacter}
          setCharacterStatus={setCharacterStatus}
          iniialData={iniialData}
          setiniialData={setiniialData}
        // setDraftData={setDraftData}
        />
      ) : (
        <CharectorFinal
          data={iniialData}
          setCharacterStatus={setCharacterStatus}
        />
      )}
    </div>
  );
};

export default Characters;
