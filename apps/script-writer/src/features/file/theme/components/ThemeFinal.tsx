import { useEffect, useState } from 'react';
import TemplateModal from './TemplateModal';
import { useParams } from 'react-router';
import { useAddFinalTheme } from '../api/save-draft';

const ThemeFinal = ({ setThemeStatus, selectedTheme, initialData, setInitialData, setSelectedTheme }: any) => {
  const [themeText, setThemeText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  const { fileId } = useParams<{ fileId: string }>();
  const finalMutation = useAddFinalTheme();

  useEffect(() => {
    setThemeText(initialData);
  }, [initialData]);
  console.log(initialData);

  const saveChanges = () => {
    finalMutation.mutate(
      { fileId, finalTheme: themeText },
      {
        onSuccess: (data) => console.log('Final Theme Saved:', data),
        onError: (error) => console.error('Error Saving Theme:', error),
      }
    );
    setIsEditing(false);
  };
  console.log(initialData?.templateOptions);

  const getAnswer = (key) => {
    if (initialData?.templateOptions) {

      const item = initialData?.templateOptions?.find((d) => d.que === key);
      if (!item) return "";
      return Array.isArray(item.ans) ? item.ans.join(", ") : item.ans;
    }
  };
  return (
    <>
      <div className="min-h-full flex flex-col gap-10 p-10 w-full">
        <section className="relative border-2 bg-white border-black rounded-3xl px-5 py-10 flex flex-col gap-y-8">
          <div className="w-full h-full flex flex-col gap-10 overflow-y-auto px-4">
            <p className="text-2xl font-bold pb-2">Finalized Theme</p>

            {/* Theme TextArea */}
            <section className="flex flex-col gap-y-3 mt-4">
              {/* <label htmlFor="themeInput" className="font-bold">
                  Your Theme
                </label>
                <textarea
                  id="themeInput"
                  rows={10}
                  readOnly={!isEditing}
                  className="p-3 rounded-lg border border-slate-400"
                  value={themeText}
                  onChange={(e) => setThemeText(e.target.value)}
                ></textarea> */}
              <div className="w-full mx-auto p-6 bg-white rounded-2xl border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">1. Core Message:</h2>
                <p className="text-gray-700 mt-2">{getAnswer("Core Message")}</p>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">2. Subject Matter:</h2>
                  <p className="text-gray-700">{getAnswer("Subject Matter")}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">3. Exploration of Subject:</h2>
                  <p className="text-gray-700">{getAnswer("Exploration of Subject")}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">4. Universal Relevance:</h2>
                  <p className="text-gray-700">{getAnswer("Universal Relevance")}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">5. Symbolism:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>{getAnswer("Symbolism")}</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">8. Conflicts and Resolutions:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {initialData?.templateOptions.find((d) => d.que === "Conflicts and Resolutions")?.ans?.map((conflict, i) => (
                      <li key={i}>{conflict}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">9. Motifs:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>{getAnswer("Motifs")}</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">10. Quotes/Dialogue:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>{getAnswer("Quotes/Dialogue")}</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">11. Influences & Inspirations:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    {initialData?.templateOptions.find((d) => d.que === "Influences & Inspirations")?.ans?.map((conflict, i) => (
                      <li key={i}>{conflict}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">12. Desired Audience Takeaway</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>{getAnswer("Desired Audience Takeaway")}</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <h2 className="text-xl font-semibold text-gray-800">13. Potential Variations or Sub-themes:</h2>
                  <ul className="list-disc list-inside text-gray-700">
                    <li>{getAnswer("Potential Variations or Sub-themes")}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="flex flex-row items-center gap-4">
              <button
                className="px-16 py-3 text-white rounded-lg bg-primary-blue border border-gray-300"
                onClick={() => setShowTemplateModal(true)}
              >
                Rewrite
              </button>

              {isEditing ? (
                <button
                  className="px-16 py-3 rounded-lg bg-violet-300 hover:bg-violet-200 font-medium text-violet-600"
                  onClick={saveChanges}
                >
                  Save
                </button>
              ) : (
                <button
                  className="px-16 py-3 rounded-lg bg-violet-300 hover:bg-violet-200 font-medium text-violet-600"
                  onClick={() => setThemeStatus('edit')}
                >
                  Edit
                </button>
              )}
            </section>
          </div>
        </section>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <TemplateModal
          setiniialData={setInitialData}
          templatesPopup={showTemplateModal}
          setTemplatesPopup={setShowTemplateModal}
          setThemeStatus={setThemeStatus}
          selectedTheme={selectedTheme}
          setSelectedTheme={setSelectedTheme}
        />
      )}
    </>
  );
};

export default ThemeFinal;
