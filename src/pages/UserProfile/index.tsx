import useUser from "@/hooks/useUser";

const UserProfile = () => {
  const { data, isLoading, isFetching } = useUser();
  console.log(data);
  return (
    <div>
      <h3 className="scroll-m-20 text-2xl font-light tracking-tight">Profile settings</h3>
      <div></div>
    </div>
  );
};
export default UserProfile;
