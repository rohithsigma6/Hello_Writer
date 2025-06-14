import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const InviteUser = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fileId } = useParams();
  const queryParams = new URLSearchParams(location.search);

  const shareToken = queryParams?.get("shareToken");

  
  

  const token = queryParams?.get("token");
  const permissionType = queryParams?.get("permissionType");

  let user: any = localStorage?.getItem("user");
  user = user ? JSON.parse(user) : null;
  useEffect(() => {
    if (token && permissionType) {
      const payload = {
        collaborators: [
          {
            userId: user._id,
            permissionType: permissionType,
          },
        ],
        fileId: fileId,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      axios
        .post(`${import.meta.env.VITE_APP_API_URL}/api/file/${fileId}/collaborate`, payload, config)
        .then((response) => {
          const newUrl = location.pathname;
          window.history.replaceState({}, "", newUrl);
            console.log(response);
            
          window.location.reload();
        })
        .catch((error) => {
          // Handle error and redirect if needed
          console.log(error);
          
          navigate("/dashboard");
        });
    }
  }, []);
  return <></>;
};

export default InviteUser;
