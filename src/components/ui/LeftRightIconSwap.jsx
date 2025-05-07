const LeftRightIconSwap = ({ direction, children }) => {
  return (
    <span className={`left-right-icon-swap ${direction}`}>
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
};

export default LeftRightIconSwap;
