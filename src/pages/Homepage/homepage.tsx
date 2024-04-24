const Homepage = () => {
  return (
    <div>
      <h1 className="scroll-m-20 pb-2 text-xl font-light tracking-tight">Homepage</h1>
      <div className="grid grid-cols-[1fr_auto] gap-7">
        <div className="lg:max-h-[700px] overflow-y-scroll flex flex-col gap-5"></div>
        <div className="grid grid-cols-[1fr_auto] gap-7"></div>
      </div>
    </div>
  );
};
export default Homepage;
