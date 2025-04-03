import AdminHeader from "./admin-header";
import AdminUserList from "./admin-user-list";

const AdminPage = () => {
  return (
    <main className="max-w-3xl mx-auto py-8 px-4">
      <AdminHeader />
      <AdminUserList />
    </main>
  );
};

export default AdminPage;
