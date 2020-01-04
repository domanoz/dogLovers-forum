import React, { useEffect, useState } from "react";
import GroupLayout from "./../components/GroupLayout";
import { useHttp } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Group = props => {
  const { isLoading, error, sendRequest, clearError } = useHttp();
  const [loadedData, setLoadedData] = useState();
  //5df10b93ace1b1037cf2f752

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:8000/api/v1/groups/5df10b93ace1b1037cf2f752`
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
