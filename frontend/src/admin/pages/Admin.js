import React, { useEffect, useState, useContext } from "react";
// import { useParams } from "react-router-dom";
import AdminLayout from "./../components/AdminLayout";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "./../../shared/context/auth-context";

const Admin = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/v1/users`,
          "GET",
          JSON.stringify(),
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token
          }
        );

        setLoadedData(responseData.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, auth.token]);
  // console.log(loadedData);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedData && <AdminLayout items={loadedData} />}
    </React.Fragment>
  );
};

export default Admin;
