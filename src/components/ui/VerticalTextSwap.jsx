const VerticalTextSwap = ({ children }) => {
  return (
    <span className="vertical-text-swap">
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
};

export default VerticalTextSwap;
