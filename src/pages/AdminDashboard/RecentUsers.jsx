import UserCard from "../../components/ui/UserCard";

const RecentUsers = () => {
  return (
    <div className="py-4 px-4 sm:px-8 rounded-xl bg-neutral-subtle">
      <h5 className="text-text-body text-headline leading-headline">Recent Users</h5>

      <div className="mt-5 space-y-3">
        <div className="flex gap-4">
          <UserCard className="bg-white" />
          <UserCard className="bg-white" />
        </div>
        <div className="flex gap-4">
          <UserCard className="bg-white" />
          <UserCard className="bg-white" />
        </div>
        <div className="flex gap-4">
          <UserCard className="bg-white" />
          <UserCard className="bg-white" />
        </div>
      </div>
    </div>
  );
};

export default RecentUsers;
