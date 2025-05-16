import user from "../../assets/images/upload-preview-demo.png";

const UserCard = ({ className }) => {
  return (
    <div className={`py-1 pl-1 pr-6 rounded-full flex items-center gap-3 ${className}`}>
      <div className="size-12 rounded-full border-2 border-neutral-border">
        <img src={user} alt="User" className="w-full h-full object-cover rounded-full" />
      </div>

      <div>
        <h6 className="text-caption leading-caption font-semibold">Arnob Chy</h6>
        <p className="text-footnote leading-footnote text-neutral-subtitle">hello@arnob.me</p>
      </div>
    </div>
  );
};

export default UserCard;
