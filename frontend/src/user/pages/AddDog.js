import React, { useState, useEffect } from "react";

import AddDogLayout from "./../components/AddDogLayout";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

import { useHttp } from "../../shared/hooks/http-hook";

const AddDog = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/groups/`
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
      {!isLoading && loadedData && <AddDogLayout groups={loadedData} />}
    </React.Fragment>
  );
};

export default AddDog;
