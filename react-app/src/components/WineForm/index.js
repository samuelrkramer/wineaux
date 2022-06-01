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

  const submitHandler = e => {
    e.preventDefault()
  }

  return (
    <form onSubmit={submitHandler}>
      <div>
        <label htmlFor="name">Name</label>
        <input
          className="fInput"
          name="name"
          type="text"
          value = {name}
          onChange={e => setName(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="year">Year</label>
        <input
          className="fInput"
          name="year"
          type="number"
          value = {year}
          onChange={e => setYear(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="variety_id">Variety</label>
        <input
          className="fInput"
          name="variety_id"
          type="text"
          value = {variety_id}
          onChange={e => setVariety_id(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="description">Description</label>
        <textarea
          className="fInput"
          name="description"
          value = {description}
          onChange={e => setDescription(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="color">Color</label>
        <input
          className="fInput"
          name="color"
          type="text"
          value = {color}
          onChange={e => setColor(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="sweetness">Sweetness</label>
        <input
          className="fInput"
          name="sweetness"
          type="text"
          value = {sweetness}
          onChange={e => setSweetness(e.target.value)}
          />
      </div>
      <div>
        <label htmlFor="image_url">Image URL</label>
        <input
          className="fInput"
          name="image_url"
          type="text"
          value = {image_url}
          onChange={e => setImage_url(e.target.value)}
          />
      </div>
      <div className='bHold'>
        <button type="submit">Create</button>
      </div>
    </form>
  );
};

export default WineForm;