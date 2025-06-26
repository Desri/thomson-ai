const FilterActivityComponent = () => {

  return (
    <form className="flex flex-wrap gap-6 mb-6 text-xs text-gray-700">
      <div className="flex flex-col">
        <label htmlFor="taNumber" className="mb-1 select-none font-semibold text-[#6c757d]">Search TA Number</label>
        <input
          id="taNumber"
          type="text"
          placeholder="Enter TA Number"
          className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-1 focus:ring-blue-600"
        />
      </div>
      <div className="flex flex-col">
        <label htmlFor="summaryType" className="mb-1 select-none font-semibold text-[#6c757d]">Action Type</label>
        <select id="summaryType" className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-1 focus:ring-blue-600">
          <option>All Action</option>
          <option>Search TA Number</option>
          <option>Generate Clinical Summary</option>
          <option>Regenerate Clinical Summary</option>
          <option>Generate Discharge Summary</option>
          <option>Regenerate Discharge Summary</option>
          <option>Copy Clinical Summary</option>
          <option>Copy Discharge Summary</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="userEmail" className="mb-1 select-none font-semibold text-[#6c757d]">User Email</label>
        <select id="userEmail" className="border border-gray-300 rounded px-3 py-2 w-44 focus:outline-none focus:ring-1 focus:ring-blue-600">
          <option>All Users</option>
          <option>doctor@thomson.com</option>
          <option>nurse@thomson.com</option>
          <option>admin@thomson.com</option>
        </select>
      </div>
    </form>
  );
};

export default FilterActivityComponent;