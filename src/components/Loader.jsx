
const Loader = ({ size = 'md', className = '' }) => {
  const sizeMap = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const sizeClass = sizeMap[size] || sizeMap['md'];

  return (
    <div className={`border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto ${sizeClass} ${className}`}></div>
  );
};
export default Loader

