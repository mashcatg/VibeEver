const TopBottomIconSwap = ({ direction, children }) => {
  return (
    <span className={`top-bottom-icon-swap ${direction}`}>
      <span>{children}</span>
      <span>{children}</span>
    </span>
  );
};

export default TopBottomIconSwap;
