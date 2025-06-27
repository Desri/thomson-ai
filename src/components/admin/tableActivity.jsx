import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { getActionType, getLogs } from "../../services/logs";
import { formatDateTime } from "../../utils/dateTime";
import { useAuthStore } from "../../store/profileStore";

const TableActivityComponent = () => {

  const { logout } = useAuthStore();
  const [dataLogs, setDataLogs] = useState([]);
  const [dataActionType, setDataActionType] = useState([]);

  useEffect(() => {
    fetchLogs();
    fetchActionType();
  }, []);

  const fetchLogs = () => {
    getLogs()
    .then((res) => {
      if (res.success) {
        setDataLogs(res.data.logs)
      }
    })
    .catch((err) => {
      if (err.status === 401) {
        logout();
        navigate('/auth/login');
      }
    });
  };

  const fetchActionType = () => {
    getActionType()
    .then((res) => {
      if (res.success) {
        console.log('dsdds', res.data)
        setDataActionType(res.data)
      }
    })
    .catch((err) => {
      if (err.status === 401) {
        logout();
        navigate('/auth/login');
      }
    });
  };

  const handleSaveAsXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataLogs);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const file = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    saveAs(file, "data-export.xlsx");
  };

  return (
    <>
      <form className="flex flex-wrap gap-6 mb-6 text-xs text-gray-700">
        <div className="flex flex-col">
          <label htmlFor="summaryType" className="mb-1 select-none font-semibold text-[#6c757d]">Action Type</label>
          <select id="summaryType" className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-600">
            <option>All Action</option>
            {dataActionType.map((action, index) => {
              const label = action
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              return (
                <option key={index} value={action}>
                  {label}
                </option>
              );
            })}
            {/* <option>Search TA Number</option>
            <option>Generate Clinical Summary</option>
            <option>Regenerate Clinical Summary</option>
            <option>Generate Discharge Summary</option>
            <option>Regenerate Discharge Summary</option>
            <option>Copy Clinical Summary</option>
            <option>Copy Discharge Summary</option> */}
          </select>
        </div>
        <div className="flex flex-col">
          <label htmlFor="username" className="mb-1 select-none font-semibold text-[#6c757d]">Username</label>
          <select id="username" className="border border-gray-300 rounded px-3 py-2 w-48 focus:outline-none focus:ring-1 focus:ring-blue-600">
            <option>All Users</option>
            <option>doctor@thomson.com</option>
            <option>nurse@thomson.com</option>
            <option>admin@thomson.com</option>
          </select>
        </div>
      </form>

      <div className="float-right">
        <button
          className={`${
            dataLogs.length === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#198754] hover:bg-[#218838] cursor-pointer'
          } text-white text-xs font-bold px-3 py-1.5 mb-4 rounded focus:outline-none`}
          type="button"
          onClick={handleSaveAsXLSX}
          disabled={dataLogs.length === 0}
        >
          Export to Excel
        </button>
      </div>

      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-[#f5f9ff] text-[#2a6eb8]">
          <tr>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Timestamp</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Username</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Action Type</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">TA Number</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataLogs.length === 0 ? (
            <tr>
              <td colSpan={4} className="text-center py-10 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            dataLogs.map((item) => (
              <tr key={item.id}>
                <td className="py-3 px-6 text-black">{formatDateTime(item.timestamp)}</td>
                <td className="py-3 px-6 text-black">{item.user_username}</td>
                <td className="py-3 px-6">
                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full select-none ${
                      item.action_type === 'generate_clinical_summary'
                        ? 'bg-[#17a2b81a] text-[#17a2b8]'
                        : 'bg-[#28a7451a] text-[#28a745]'
                    }`}
                  >
                    {item.action_type}
                  </span>
                </td>
                <td className="py-3 px-6 text-black">
                  {item.ta_number ? item.ta_number : '-'}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {dataLogs.length > 0 && (
        <nav className="mt-6 text-center items-center justify-start space-x-4 text-gray-400 text-sm select-none" aria-label="Pagination">
          <button
            disabled
            className="border border-gray-300 rounded px-5 py-2 cursor-not-allowed bg-white text-gray-300"
            type="button"
          >
            Previous
          </button>
          <button
            aria-current="page"
            className="bg-[#2a6eb8] text-white rounded px-5 py-2 font-semibold focus:outline-none"
            type="button"
          >
            1
          </button>
          <button
            disabled
            className="border border-gray-300 rounded px-5 py-2 cursor-not-allowed bg-white text-gray-300"
            type="button"
          >
            Next
          </button>
          <span className="ml-6 text-[#6c757d] font-normal">Page 1 of 1 (5 items)</span>
        </nav>
      )}
    </>
  );
};

export default TableActivityComponent;