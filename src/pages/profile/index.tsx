import FullScreenLoading from "@/components/fullscreen-loading";
import useUser from "@/hooks/useUser";

const UserProfile = () => {
  const { data, isLoading, isFetching } = useUser();

  if (isLoading || isFetching) return <FullScreenLoading />;
  console.log(data);
  return (
    <div>
      {/* <h3 className="scroll-m-20 text-2xl font-light tracking-tight">Profile settings</h3> */}
      <div>
        <table className="w-fit mt-4">
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UserProfile;
