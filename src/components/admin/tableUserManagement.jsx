import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import Modal from '@mui/material/Modal';
import { getUsers } from "../../services/users";
import { formatDateTime } from "../../utils/dateTime";
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from "../../schemas/register";
import { showErrorToast } from "../../utils/toast";
import { postRegister } from "../../services/auth";

const TableUserManagementComponent = () => {

  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [dataUser, setDataUser] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    getUsers()
    .then((res) => {
      if (res.success) {
        setDataUser(res.data.users)
      }
    })
    .catch((err) => {
      showErrorToast('Uppsss someting went wrong!');
    });
  };

  function handleOpen() {
    reset();
    setOpen(prev => !prev)
  }

  const handleSaveAsXLSX = () => {
    const worksheet = XLSX.utils.json_to_sheet(dataUser);
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

  const onSubmit = async (data) => {
    postRegister({ data })
    .then((res) => {
      if(res.success) {
        reset();
        console.log('Check Success', res)
      }
    })
    .catch((err) => {
      showErrorToast(err.message);
    })
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <button
          className="bg-[#28a745] cursor-pointer text-white text-xs font-bold px-3 py-1.5 mb-4 rounded focus:outline-none hover:bg-[#218838]"
          type="button"
          onClick={handleOpen}
        >
          Add New User
        </button>
        <button
          className="bg-[#198754] cursor-pointer text-white text-xs font-bold px-3 py-1.5 mb-4 rounded focus:outline-none hover:bg-[#218838]"
          type="button"
          onClick={handleSaveAsXLSX}
        >
          Export to Excel
        </button>
      </div>
      
      <form className="flex flex-wrap gap-6 mb-6 text-xs text-gray-700">
        <div className="flex flex-col">
          <label htmlFor="taNumber" className="mb-1 select-none font-semibold text-[#6c757d]">Search</label>
          <input
            id="taNumber"
            type="text"
            placeholder="Search by username, name, or email"
            className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-1 focus:ring-blue-600"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="summaryType" className="mb-1 select-none font-semibold text-[#6c757d]">Role</label>
          <select id="summaryType" className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-1 focus:ring-blue-600">
            <option>All Roles</option>
            <option>Doctor</option>
            <option>Nurse</option>
            <option>Admin</option>
          </select>
        </div>
      </form>

      <table className="w-full text-left text-sm border-collapse">
        <thead className="bg-[#f5f9ff] text-[#2a6eb8]">
          <tr>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">ID</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Name</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Email</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Role</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">MCR Number</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Created Date</th>
            <th className="py-3 px-6 border-b font-semibold text-base border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {dataUser.map((item, index) => (
            <tr key={item.id}>
              <td className="py-3 px-6 text-black">{index+1}</td>
              <td className="py-3 px-6 text-black">
                {item.name}
              </td>
              <td className="py-3 px-6 text-black">{item.email}</td>
              <td className="py-3 px-6 text-black">
                {item.role}
              </td>
              <td className="py-3 px-6 text-black">
                {item.mcr_number}
              </td>
              <td className="py-3 px-6">
                <button
                  className="bg-[#2a6eb8] cursor-pointer text-white text-xs font-bold px-3 py-1 rounded focus:outline-none hover:bg-[#4d8fd4]"
                  type="button"
                  onClick={() => handleOpen(index)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal absolute overflow-hidden bg-white top-1/2 left-1/2">
          <div className="bg-[#2a6eb8] text-white p-4">
            <h1 className="text-xl font-semibold">
              Add New User
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="text-base text-gray-700">
            <div>
              <div className="mb-5 m-4 rounded-lg" id="summaryMeta">
                <div className="grid grid-cols-2 flex-wrap gap-6 mb-6">
                  <div className="flex flex-col">
                    <label htmlFor="name" className="mb-1 select-none font-semibold text-[#6c757d]">Name</label>
                    <input
                      id="name"
                      type="text"
                      {...register('name')}
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="email" className="mb-1 select-none font-semibold text-[#6c757d]">Email</label>
                    <input
                      id="email"
                      type="email"
                      {...register('email')}
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="password" className="mb-1 select-none font-semibold text-[#6c757d]">Password</label>
                    <input
                      id="password"
                      type="password"
                      {...register('password')}
                      className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                  </div>
                  <div className="flex flex-col">
                    <label htmlFor="taNumber" className="mb-1 select-none font-semibold text-[#6c757d]">Role</label>
                    <select {...register('role')} id="summaryType" className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600">
                      <option value="">Select Role</option>
                      <option value="doctor">Doctor</option>
                      <option value="nurse">Nurse</option>
                      <option value="admin">Admin</option>
                    </select>
                    {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role.message}</p>}
                  </div>
                </div>
                <div className="flex flex-col mb-10">
                  <label htmlFor="mcr" className="mb-1 select-none font-semibold text-[#6c757d]">MCR Number</label>
                  <input
                    id="mcr"
                    type="text"
                    {...register('mcr_number')}
                    className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-600"
                  />
                  {errors.mcr_number && <p className="text-red-500 text-xs mt-1">{errors.mcr_number.message}</p>}
                </div>
              </div>
            </div>
            <div className="border-t border-[#dddddd] border-solid text-white p-4">
              <div className="flex justify-end gap-x-3 items-center">
                <button
                  className="bg-[#2a6eb8] cursor-pointer text-white text-xs font-bold px-3 py-2 rounded focus:outline-none hover:bg-[#4d8fd4]"
                  type="submit"
                >
                  Add User
                </button>
              
                <button
                  className="border-[#2a6eb8] border cursor-pointer text-[#2a6eb8] text-xs font-bold px-3 py-2 rounded focus:outline-none hover:bg-[#f5f9ff]"
                  type="button"
                  onClick={() => setOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TableUserManagementComponent;