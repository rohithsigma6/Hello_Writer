import { StatusBadge } from '@/components/ui/badge';

interface User {
  email: string;
  status: 'pending' | 'accepted' | 'expired';
  expiry: string;
}
const users: User[] = [
  {
    email: 'mohit5324@gmail.com',
    status: 'pending',
    expiry: 'Expires in 6 days',
  },
  { email: 'nehakumari@gmail.com', status: 'accepted', expiry: '-' },
  {
    email: 'mohit5324@gmail.com',
    status: 'expired',
    expiry: 'Expired on Nov 6',
  },
];

export const InviteTable = () => {
  return (
    <div className="w-full p-0">
      <table className="w-full">
        <thead className="bg-gray-300 text-sm border-b-2 border-gray-400">
          <tr>
            <th className="py-2 font-medium">FRIEND EMAIL</th>
            <th className="py-2 font-medium">STATUS</th>
            <th className="py-2 font-medium">EXPIRY</th>
          </tr>
        </thead>
        <tbody className="text-sm font-normal">
          {users.map((user) => (
            <tr key={user.email} className="border-b">
              <td className="py-2.5 text-center">{user.email}</td>
              <td className="py-2.5 flex justify-center">
                <StatusBadge status={user.status} />
              </td>
              <td className="py-2.5 text-center">{user.expiry}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InviteTable;
