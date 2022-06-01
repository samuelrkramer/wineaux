import React, { useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';

const WineForm = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [variety_id, setVariety_id] = useState(null);
  const [description, setDescription] = useState("");
  const [color, setColor] = useState(null);
  const [sweetness, setSweetness] = useState("");
  const [image_url, setImage_url] = useState("");

  return (
    <form onSubmit={submitHandler}>
      <div>

      </div>
    </form>
  );
};

export default WineForm;