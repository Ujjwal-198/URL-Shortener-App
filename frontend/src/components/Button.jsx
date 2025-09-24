const Button = ({ children, className = '', onClick, type = 'button', ...props }) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`text-white cursor-pointer shadow-2xl bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-md font-medium ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
