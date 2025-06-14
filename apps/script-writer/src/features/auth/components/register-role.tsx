import logo2 from '@/assets/landingsite/LoginLogo.svg';
import image1 from '@/assets/landingsite/Rectange1.svg';
import image2 from '@/assets/landingsite/Rectangle2.svg';
import logo from '@/assets/landingsite/MainLogo.svg';

function Role({
  handleRoleClick,
}: {
  handleRoleClick: (role: string) => void;
}) {
  return (
    <div className="flex justify-center pb-12 min-w-lg md:px-0 px-7">
      <div className="max-w-lg bg-white rounded-lg font-poppins">

        <div
          onClick={() => {
            handleRoleClick('writer');
          }}
          className="flex w-full justify-center mb-4 relative cursor-pointer"
        >
          <img
            alt="Screenplay.Ink"
            src={image1}
            className="sm:h-full h-40 object-cover rounded-xl"
          />
        </div>

        <div
          onClick={() => {
            handleRoleClick('producer');
          }}
          className="flex w-full justify-center mb-4 relative cursor-pointer"
        >
          <img
            alt="image1"
            src={image2}
            className="sm:h-full h-40 object-cover rounded-xl"
          />
        </div>
      </div>
    </div>
  );
}

export default Role;
