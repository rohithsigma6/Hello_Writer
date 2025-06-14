import React, { useEffect, useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';
import icon from '@/assets/dashboard/refer/icon.svg';
import { Modal } from '@/components/ui/modal';
import InviteTable from './invite-table';
import InvitePreview from './invite-preview';

interface ReferFriendProps {
  displayReferFriend: boolean;
  setDisplayReferFriend: (value: boolean) => void;
}

const ReferFriend: React.FC<ReferFriendProps> = ({
  displayReferFriend,
  setDisplayReferFriend,
}) => {
  const [friendEmail, setFriendEmail] = useState('');
  const [message, setMessage] = useState('');
  const [showInviteStatus, setShowInviteStatus] = useState(false);

  const ModalHeader: React.FC = () => (
    <header className="flex flex-row w-full justify-start items-center gap-2">
      <img
        src={icon}
        alt="Icon"
        className="w-16 h-16 rounded-full pointer-events-none select-none"
      />
      <div>
        <h1 className="font-bold text-lg">Refer your friend!</h1>
        <p className="text-sm">
          Bring your friends on board and unlock exciting bonuses!.
        </p>
      </div>
    </header>
  );

  const InviteForm: React.FC = () => (
    <section className="flex flex-col gap-2">
      <label htmlFor="friendEmail" className="text-light-grey w-full text-sm">
        Friend's Email
      </label>
      <div className="w-full flex flex-row items-center relative">
        <input
          type="email"
          id="friendEmail"
          value={friendEmail}
          onChange={(e) => setFriendEmail(e.target.value)}
          className="w-full border p-1 rounded-xl"
        />
      </div>
    </section>
  );

  const PersonalMessage: React.FC = () => (
    <section className="flex flex-col gap-2">
      <label htmlFor="message" className="text-light-grey w-full text-sm">
        Personal Message (Optional)
      </label>
      <textarea
        id="message"
        name="message"
        rows={4}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="p-3 w-full border text-sm rounded-xl"
        placeholder="Hey I think you’d love Screenplay.ink. Join me :)"
      />
    </section>
  );

  const InviteStatus: React.FC = () => (
    <section className="border rounded-xl flex flex-col">
      <button
        onClick={() => setShowInviteStatus(!showInviteStatus)}
        className="flex flex-row w-full p-3 justify-between"
      >
        <h4 className="text-base font-semibold text-black">Invite Status</h4>
        <FaAngleDown className={showInviteStatus ? '' : '-rotate-90'} />
      </button>
      {showInviteStatus && <InviteTable />}
    </section>
  );

  /* Modal Footer */
  const ModalFooter: React.FC = () => (
    <div className="flex flex-row gap-x-2 items-center justify-end">
      <button
        onClick={() => setDisplayReferFriend(false)}
        className="border border-gray-500 px-10 py-3 font-medium rounded-2xl bg-white text-gray-600"
      >
        Cancel
      </button>
      <button
        // onClick={handleSubmit}
        className="px-10 py-3 font-medium rounded-2xl bg-primary-blue hover:bg-[#4e28e7] transition-colors text-white"
      >
        Send Invite
      </button>
    </div>
  );

  return (
    <Modal
      className="bg-white w-full flex flex-col gap-2 max-w-2xl rounded-2xl p-6"
      isOpen
      setIsOpen={setDisplayReferFriend}
    >
      <ModalHeader />
      <section>
        <h2 className="text-lg font-bold text-black">Send an Invite</h2>
        <p className="text-sm font-medium">
          You have <span className="text-primary-blue">2 invites</span> to share
        </p>
      </section>
      <InviteForm />
      <PersonalMessage />
      <InvitePreview
        userName="Rakesh Vanka"
        userInitials="RV"
        invitationText="has invited you to join Screenplay.ink"
        message="Hey, I think you’d love Screenplay.ink. Join me!"
        buttonLabel="Join Screenplay.ink"
        onButtonClick={() => console.log('Join Screenplay.ink')}
      />
      <InviteStatus />
      <ModalFooter />
    </Modal>
  );
};

export default ReferFriend;
