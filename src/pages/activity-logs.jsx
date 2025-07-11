import NavigationComponent from "../components/admin/navigation";
import TableActivityComponent from "../components/admin/tableActivity";

const ActivityLogsPage = () => {
  return (
    <main className="px-8 py-6">
    <section className="bg-white rounded-lg shadow-sm p-6 max-w-full">
      <h2 className="text-[#2a6eb8] font-semibold text-lg mb-6 select-none">Admin Dashboard</h2>
      <NavigationComponent />
      <TableActivityComponent />
    </section>
  </main>
  );
};

export default ActivityLogsPage;