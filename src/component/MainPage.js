/* eslint-disable react/jsx-key */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPlanes } from '../redux/slices/planesSlice';
import Plane from './plane/plane';

const MainPage = () => {
  const dispatch = useDispatch();
  const { entities } = useSelector((state) => state.planes);

  const showPlanes = (list) => Object.entries(list).map((plane) => (
    <Plane key={plane[1].id} params={plane[1]} />
  ));

  useEffect(() => {
    dispatch(fetchPlanes());
  }, [dispatch]);

  return (
    <div className="plane_cnt">
      { showPlanes(entities) }
    </div>
  );
};

export default MainPage;
