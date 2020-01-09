import React, { useEffect, useState } from "react";
import GroupLayout from "./../components/GroupLayout";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Group = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + `/groups/5e1290c7d7ccf61190f5ae81`
        );

        setLoadedData(responseData.data);
      } catch (err) {}
    };
    fetchData();
  }, [sendRequest, props.groupId]);
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
