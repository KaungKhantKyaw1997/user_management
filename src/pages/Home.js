import React, { useState, useEffect } from "react";
import { getStaff, getStaffRole, getStaffPermissions } from "../services/api";
import { clearToken } from "../utils/auth";
import { getUser, clearUser } from "../utils/user";
import { getRole, clearRole } from "../utils/role";
import { getPermissions, clearPermissions } from "../utils/permissions";
import StaffDetails from "../components/StaffDetails";
import detailIcon from "../assets/icons/detail.svg";
import logoutIcon from "../assets/icons/logout.svg";
import Loading from "../components/Loading";

const Home = () => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [permissions, setPermissions] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = getUser();
    if (storedUser) {
      setUser(storedUser);
    } else {
      window.location.href = "/";
    }
  }, []);

  useEffect(() => {
    if (user) {
      const fetchedRole = getRole();
      setRole(fetchedRole);

      const fetchedPermissions = getPermissions();
      setPermissions(fetchedPermissions);
    }
  }, [user]);

  useEffect(() => {
    const fetchStaffList = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await getStaff(token);
        setStaff(response.data.staff);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        console.error("Error fetching staff list:", err);
      }
    };

    if (user && role) {
      fetchStaffList();
    }
  }, [user, role]);

  const showStaffDetails = async (staffMember) => {
    setLoadingDetails(true);
    try {
      const token = localStorage.getItem("token");

      const roleResponse = await getStaffRole(staffMember.staffId, token);
      const permissionsResponse = await getStaffPermissions(
        staffMember.staffId,
        token
      );

      const fetchedRole = roleResponse.data.role;
      const fetchedPermissions = permissionsResponse.data.permissions;

      setSelectedStaff({
        ...staffMember,
        role: fetchedRole,
        permissions: fetchedPermissions,
      });

      setIsModalOpen(true);
    } catch (err) {
      console.error("Error fetching staff details:", err);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
  };

  const handleLogout = () => {
    clearToken();
    clearUser();
    clearRole();
    clearPermissions();
    window.location.href = "/";
  };

  if (loading) return <Loading />; // Use Loading component for initial load
  if (!user || !role) return <div>Loading user data...</div>;

  return (
    <div className="bg-white min-h-screen p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl sm:text-3xl font-bold text-gray-900">
          User Management
        </h1>
        <button
          onClick={handleLogout}
          className="p-2 rounded-full hover:bg-gray-200 cursor-pointer"
        >
          <img src={logoutIcon} alt="Logout" className="w-6 h-6" />
        </button>
      </div>
      {loadingDetails && <Loading />} {/* Show Loading when fetching details */}
      <div className="flex flex-col sm:flex-row justify-center items-start space-y-8 sm:space-y-0 sm:space-x-8 w-full">
        <div className="w-full sm:max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-8">
            <div className="flex items-center space-x-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                {user.name[0]}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">
                  {user.name}
                </h3>
                <p className="text-sm text-indigo-600">{user.position}</p>
              </div>
            </div>
            <hr className="my-6 border-gray-200" />
            <ul className="space-y-4 text-gray-700">
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Age:</strong>
                <span>{user.age}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Gender:</strong>
                <span>{user.gender}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Status:</strong>
                <span>{user.status}</span>
              </li>
              <li className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Joined:</strong>
                <span>
                  {new Date(user.joinedDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </li>
            </ul>
            <div className="mt-6 space-y-2">
              <p className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Email:</strong>
                <span>{user.email}</span>
              </p>
              <p className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Mobile:</strong>{" "}
                <span>{user.mobile}</span>
              </p>
            </div>
            <hr className="my-6 border-gray-200" />
            <div className="mt-6">
              <div className="flex items-center space-x-3">
                <strong className="w-28 text-gray-500">Role:</strong>
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-indigo-100 text-indigo-700 shadow-sm hover:shadow-lg transition-shadow duration-300">
                  {role}
                </span>
              </div>
              <div className="mt-6">
                <strong className="text-gray-500">Permissions:</strong>
                <div className="mt-4 flex flex-wrap gap-2">
                  {permissions.length > 0 ? (
                    permissions.map((perm, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-700 shadow-sm hover:shadow-lg transition-shadow duration-300"
                      >
                        {perm}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-400 text-sm">
                      No permissions assigned.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full overflow-hidden rounded-xl shadow-lg w-full max-w-5xl">
          {staff.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto bg-white">
                <thead className="sticky top-0 bg-indigo-600 text-white">
                  <tr>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      #
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Position
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Email
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Mobile
                    </th>
                    <th className="py-4 px-6 text-left text-sm font-semibold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {staff.map((staffMember, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 === 0 ? "bg-indigo-50" : "bg-white"
                      } hover:bg-indigo-100 transition-colors duration-300`}
                    >
                      <td className="py-4 px-6 text-gray-900 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {staffMember.name}
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {staffMember.position}
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {staffMember.email}
                      </td>
                      <td className="py-4 px-6 text-gray-900">
                        {staffMember.mobile}
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => showStaffDetails(staffMember)}
                          className="px-2 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors duration-200"
                        >
                          <img
                            src={detailIcon}
                            alt="details icon"
                            className="w-5"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              No staff data available.
            </div>
          )}
        </div>
      </div>
      <StaffDetails
        isOpen={isModalOpen}
        staff={selectedStaff}
        onClose={closeModal}
      />
    </div>
  );
};

export default Home;
