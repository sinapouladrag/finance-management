import React, { useEffect } from "react";
import AccountList from "./AccountList";
import AccountSummary from "./AccountSummary";
import { useSelector, useDispatch } from "react-redux";
import { getProfileAction } from "../../redux/slice/users/usersSlice";

const MainDashBoard = () => {
  //dispatch
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileAction());
  }, [dispatch]);

  const { profile, error, loading } = useSelector((state) => state?.users);

  return (
    <>
      {loading ? (
        <h2 className="text-center text-green-600 text-lg mt-5">Loading....</h2>
      ) : error ? (
        <h2 className="text-center text-red-600 text-lg mt-5">{error.message}</h2>
      ) : (
        <>
          {" "}
          <AccountSummary profile={profile} />
          <AccountList profile={profile} />
        </>
      )}
    </>
  );
};

export default MainDashBoard;
