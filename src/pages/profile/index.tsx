import FullScreenLoading from "@/components/fullscreen-loading";
import useUser from "@/hooks/useUser";
import { EditProfileDialog } from "./edit";

const UserProfile = () => {
  const { data, isLoading } = useUser();

  if (isLoading) return <FullScreenLoading />;
  console.log(data);
  return (
    <div>
      <div className="flex gap-10">
        <h3 className="scroll-m-20 text-2xl font-light tracking-tight">Profile settings</h3>
        <EditProfileDialog />
      </div>
      <div>
        <table className="w-fit mt-4">
          <tbody>
            <tr className="">
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                First name
              </td>
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {data?.first_name}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Last name
              </td>
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {data?.last_name}
              </td>
            </tr>
            <tr className="">
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Username
              </td>
              <td className="px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {data?.username}
              </td>
            </tr>
            <tr className="m-0 p-0">
              <td className=" px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Email
              </td>
              <td className=" px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {data?.email}
              </td>
            </tr>
            <tr className="m-0 p-0">
              <td className=" px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                Telegram
              </td>
              <td className=" px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                {data?.telegram_url}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserProfile;
