
const Loader = ({size}) => {
  return (
    <>
      <div className={`w-${size} h-${size} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto`}></div>
    </>
  );
};

export default Loader;
