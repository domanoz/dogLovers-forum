import React, { useState, useEffect } from "react";

import AllGroupsLayout from "./../components/AllGroupsLayout/AllGroupsLayout";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "../../shared/hooks/http-hook";

const AllGroups = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/v1/groups/`
        );

        setLoadedData(responseData.data.groups);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest]);
  // console.log(loadedData);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedData && <AllGroupsLayout groups={loadedData} />}
    </React.Fragment>
  );
};

export default AllGroups;
