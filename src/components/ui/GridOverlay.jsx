import grid from "../../assets/images/grid.png";

const GridOverlay = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${grid})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    ></div>
  );
};

export default GridOverlay;
