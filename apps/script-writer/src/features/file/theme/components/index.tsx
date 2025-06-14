import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useThemeTemplate } from '../api/get-all-theme';
import { useDraftTheme } from '../api/getdraft-theme';
import WelcomeTheme from './WelcomeTheme';
import ThemeSelect from './ThemeSelect';
import ThemeEdit from './ThemeEdit';
import ThemeFinal from './ThemeFinal';
import { ThemeTemplate } from './ThemeTemplate';

const Theme = () => {
  const { fileId } = useParams();
  const [themeStatus, setThemeStatus] = useState('welcome');
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [initialData, setInitialData] = useState({});
  const { data, isLoading, error } = useDraftTheme({ id: fileId || "" });
  const { data: templates } = useThemeTemplate();

  useEffect(() => {
    if (data?.theme?.status === 'final') {
      setInitialData(data?.theme?.finalTheme);
      setThemeStatus('final');
      setDraftData(data?.theme?.finalTheme.templateId?._id, data?.theme?.finalTheme);
    } else if (data?.theme?.status === 'draft') {
      if (data?.theme?.themeDrafts[data?.theme?.themeDrafts?.length - 1].templateId?._id) {

        setThemeStatus('edit')
      } else {
        setThemeStatus('initialize')
      }
      // setThemeStatus('edit');
      setDraftData(data?.theme?.themeDrafts[data?.theme?.themeDrafts?.length - 1].templateId?._id, data?.theme?.themeDrafts[data?.theme?.themeDrafts?.length - 1]);
    }
  }, [data]);

  const setDraftData = (id, data) => {

    const template = templates?.Templates.find((tem) => tem._id == id);
    if (id) {

      const selectTemplate = {
        templateName: template?.templateTitle,
        id: template?._id,
        link: template?._id,
        templateOptionTitle: template?.templateOptionTitle,
        templateTheme: template?.templateTheme,
        templateOptions: template?.templateOptions,
        component: <ThemeTemplate templateData={template} initialData={data?.templateOptions} />
      };
      setSelectedTheme(selectTemplate || {});

    }
    setInitialData(data)
  };

  return (
    <div className="overflow-y-auto w-full">
      {themeStatus === 'welcome' ? (
        <WelcomeTheme setThemeStatus={setThemeStatus} />
      ) : themeStatus === 'initialize' ? (
        <ThemeSelect
          setThemeStatus={setThemeStatus}
          setSelectedTheme={setSelectedTheme}
          setInitialData={setInitialData}
          initialData={initialData}
          setDraftData={setDraftData}
        />
      ) : themeStatus === 'edit' ? (
        <ThemeEdit
          templates={selectedTheme}
          setSelectedTheme={setSelectedTheme}
          setThemeStatus={setThemeStatus}
          iniialData={initialData}
          setiniialData={setInitialData}
          setDraftData={setDraftData}
        />
      ) : themeStatus === 'final' ? (
        <ThemeFinal
          setThemeStatus={setThemeStatus}
          setSelectedTheme={setSelectedTheme}
          initialData={initialData}
          setInitialData={setInitialData}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Theme;
