import { useParams, useSearchParams } from 'react-router';
import { useCreateSnapshot } from '@/features/file/screenplay/api/create-new-snapshot';
import { useSnackbar } from 'notistack';
import { colorsList } from './color-selection-popup';
import { SnapShotVersion } from '@/types/api';

interface VersionsProps {
  setToggle: (value: boolean) => void;
  versionData: SnapShotVersion;
}

export function cleanObject(obj: any) {
  for (const key in obj) {
    if (
      obj[key] === '' ||
      obj[key] === undefined ||
      (Array.isArray(obj[key]) && obj[key].length === 0)
    ) {
      delete obj[key];
    }
  }
  return obj;
}

const SnapshotDropdown = ({ setToggle, versionData }: VersionsProps) => {
  const { enqueueSnackbar } = useSnackbar();
  const [searchParams, setSearchParams] = useSearchParams();
  const { fileId } = useParams();
  const dataList = versionData?.versionList;

  function handleVersionsClick(data: any) {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      versionColor: data?.versionColor,
      editStatus: data?.editStatus,
      versionName: data.versionName,
    });

    setToggle(false);
  }

  const { mutate: createNewSnapshot, isPending } = useCreateSnapshot({
    fileId,
    mutationConfig: {
      onSuccess: (data) => {
        const prevoiusVersion = data.newVersion.versionName;
        const finalVersion = Number(prevoiusVersion.replace('V', ''));
        setSearchParams({
          ...Object.fromEntries(searchParams.entries()),
          versionName: `V${finalVersion}`,
          versionColor: 'White',
          editStatus: 'PERSONAL DRAFT',
        });
        enqueueSnackbar(`V${finalVersion} has been created`);
      },
    },
  });
  async function handleCreateNewVersion() {
    const prevVersion = searchParams.get('versionName') || 'V1';
    const payload = {
      prevVersion,
    };
    const data = cleanObject(payload);
    createNewSnapshot({ data, fileId: fileId! });
    setToggle(false);
  }

  return (
    <div className="left-0 z-10 absolute bg-gray-900 ring-opacity-5 shadow-lg mt-2 rounded-2xl rounded-tl-[0] ring-1 ring-black w-80 text-white overflow-hidden">
      <div className="flex flex-col py-4 max-h-[200px] overflow-y-scroll">
        {dataList?.map((data: any) => (
          <button
            onClick={() => {
              handleVersionsClick(data);
            }}
            className="flex flex-row items-center gap-4 hover:bg-black px-5 py-3"
          >
            <section>
              <p className="w-5 font-medium text-lg">{data.versionName}</p>
            </section>
            <section>
              <div className="flex flex-row items-center gap-x-2">
                {/* <p className="text-xs">{data.author}</p> */}
                <div
                  className="rounded-full w-2 h-2"
                  style={{
                    backgroundColor: colorsList.find(
                      (el) =>
                        el.name.toLocaleLowerCase() ==
                        data.versionColor.toLowerCase(),
                    )?.hex,
                  }}
                ></div>
              </div>
              <div>
                <p className="text-gray-400 text-xs">{data.editStatus}</p>
              </div>
            </section>
          </button>
        ))}
      </div>
      {/**Compare diifferent script version*/}
      {/* <Compare setToggle={setToggle} /> */}

      {/** Create a new script*/}
      <button
        disabled={isPending}
        onClick={handleCreateNewVersion}
        className="flex w-full flex-row items-center gap-4 hover:bg-black px-5 py-3"
      >
        <p className="w-5 font-medium text-xl">+</p>

        <p className="text-sm">
          {isPending ? 'Saving...' : 'Create new version'}
        </p>
      </button>
    </div>
  );
};

export default SnapshotDropdown;
