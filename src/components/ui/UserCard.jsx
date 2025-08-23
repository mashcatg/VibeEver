
const UserCard = ({ className , name , mail , image}) => {
  return (
    <div className={`py-1 pl-1 pr-6 rounded-full flex items-center gap-3 ${className}`}>
      <div className="size-12 rounded-full border-2 border-neutral-border">
        <img src={image} alt="User" className="w-full h-full object-cover rounded-full" />
      </div>

      <div className="text-left">
        <h6 className="text-caption leading-caption font-semibold">{name}</h6>
        <p className="text-footnote leading-footnote text-neutral-subtitle">{mail}</p>
      </div>
    </div>
  );
};

export default UserCard;
