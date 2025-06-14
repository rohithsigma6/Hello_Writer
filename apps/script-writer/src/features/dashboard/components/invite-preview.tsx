import React from 'react';

interface InvitePreviewProps {
  /** Label shown above the preview (defaults to "Preview") */
  label?: string;
  /** The user’s name (e.g., "Rakesh Vanka") */
  userName: string;
  /** User’s initials to display in the avatar (e.g., "RV") */
  userInitials: string;
  /** The invitation text under the user’s name (e.g., "has invited you to ...") */
  invitationText: string;
  /** Custom message or note (e.g., "Hey I think you’d love...") */
  message?: string;
  /** The button text (e.g., "Join Screenplay.ink") */
  buttonLabel: string;
  /** Handler for the button click (optional) */
  onButtonClick?: () => void;
}

const InvitePreview: React.FC<InvitePreviewProps> = ({
  label = 'Preview',
  userName,
  userInitials,
  invitationText,
  message = 'Hey I think you’d love Screenplay.ink. Join me :)',
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <section className="flex flex-col gap-2">
      <label className="text-light-grey w-full text-sm">{label}</label>
      <div className="border w-full rounded-xl flex flex-col p-3">
        {/* Avatar + User Info */}
        <div className="flex flex-row gap-2 items-center justify-start border-b pb-3 mb-3">
          <div className="bg-primary-blue p-2 h-fit rounded-full flex justify-center items-center">
            <h1 className="text-white font-bold text-sm">{userInitials}</h1>
          </div>
          <div className="flex flex-col">
            <h1 className="text-sm font-semibold">{userName}</h1>
            <p className="text-xs text-light-grey font-medium">
              {invitationText}
            </p>
          </div>
        </div>

        {/* Message + Button */}
        <div className="flex flex-col items-start gap-2">
          <p className="text-sm font-medium">{message}</p>
          <button
            className="w-fit px-4 py-2 bg-black hover:bg-[#202020] text-white text-sm rounded-lg"
            onClick={onButtonClick}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
};

export default InvitePreview;
