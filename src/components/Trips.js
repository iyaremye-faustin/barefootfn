/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTripReq } from '../redux/features/tripReq.feature';
import Table from './tables/TripRequests';
import { columns } from '../constants/reqColumns';
import Spinner from './reusable/Spinnar';

const Trip = () => {
  const dispatch = useDispatch();
  const { trips, loading } = useSelector((state) => state.tripRequests);
  const searchResult = useSelector((state) => state.searchOptions);
  const searchTrips = searchResult.trips ? searchResult.trips.data.trips : null;

  useEffect(() => {
    dispatch(fetchTripReq());
  }, []);

  const reqColumns = React.useMemo(() => columns, []);

  return (
    <div className="px-2 mt-[5vh]">
      {!loading ? (
        <>
          <div className="flex flex-col p-8 bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
            <Table columns={reqColumns} trips={searchTrips || trips} />
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Trip;
