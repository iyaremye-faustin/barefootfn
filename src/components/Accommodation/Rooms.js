import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Spinner from '../reusable/Spinnar';
import Room from './Room';
import Alert from '../Auth/Alert';

import bookNewRoom, { fetchRooms } from '../../api/roomApi';

const Rooms = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.accommodation);
  const { rooms, addSuccess } = useSelector((state) => state.accommodation.rooms);
  const { id: accommodationId } = useParams();
  const accommodationRooms = rooms.filter((room) => room.accomodationId == accommodationId);
  const tripsId = new URLSearchParams(useLocation().search).get('tripId');

  useEffect(() => {
    dispatch(fetchRooms());
  }, [addSuccess]);
  const handleClick = (tripId, roomId) => {
    dispatch(bookNewRoom({ tripId, roomId }));
  };
  return (
    <div className="container mx-auto text-gray-900  font-sans p-2 antialiased">
      <div className="flex flex-wrap -mx-4">
        {error && <Alert message={error} heading="Error" variant="error" customClass="ml-4" />}
        {accommodationRooms.length === 0 && !loading && !error && (
          <Alert
            message="No rooms in this accommodation currently!"
            heading="Sorry"
            variant="error"
            customClass="ml-4"
          />
        )}
        {!loading ? (
          accommodationRooms.map(({ id, description, roomNumber }) => (
            <Room
              key={id}
              id={id}
              roomNumber={roomNumber}
              description={description}
              tripId={tripsId}
              handleClick={handleClick}
            />
          ))
        ) : (
          <Spinner />
        )}
        <ToastContainer autoClose={2000} />
      </div>
    </div>
  );
};

export default Rooms;
