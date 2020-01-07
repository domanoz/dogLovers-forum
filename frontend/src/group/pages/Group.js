import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GroupLayout from "./../components/GroupLayout";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Group = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();

  const groupId = useParams().groupId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/groups/${groupId}`
        );

        setLoadedData(responseData.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, groupId]);
  // console.log(loadedData);
  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedData && <GroupLayout items={loadedData} />}
    </React.Fragment>
  );
};

export default Group;
