import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/profile/${id}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, [id]);

  if (!user) return <p className="text-center py-4 text-xl">Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-gray-950 mb-6">
        Hồ Sơ Người Dùng
      </h2>
      <div className="space-y-6">
        <p className="text-lg">
          <strong className="text-gray-950 inline-block w-32">Tên:</strong>{" "}
          {user.full_name}
        </p>
        <p className="text-lg">
          <strong className="text-gray-950 inline-block w-32">Email:</strong>{" "}
          {user.email}
        </p>
        <p className="text-lg">
          <strong className="text-gray-950 inline-block w-32">Phone:</strong>{" "}
          {user.phone}
        </p>
        <p className="text-lg">
          <strong className="text-gray-950 inline-block w-32">Địa chỉ:</strong>{" "}
          {user.address}
        </p>
      </div>
    </div>
  );
};

export default Profile;
