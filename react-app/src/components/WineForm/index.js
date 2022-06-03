import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { uploadNewWine } from '../../store/wines';
import './WineForm.css'

const colors = [
  'Gray',
  'Orange',
  'Red',
  'Rosé',
  'Tawny',
  'White',
  'Yellow',
];

const WineForm = ({mode}) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let { wineId } = useParams();
  const oldWine = useSelector(state => state.wines[wineId || 1]);
  let wine = {};
  if (mode === "Edit") {
    wineId = parseInt(wineId);
    wine = { ...oldWine };
  }

  const [varieties, setVarieities] = useState([]);

  const [name, setName] = useState(wine.name || "");
  const [year, setYear] = useState(wine.year || "");
  const [variety_id, setVariety_id] = useState(wine.variety_id || "0");
  const [description, setDescription] = useState(wine.description || "");
  const [color, setColor] = useState(wine.color || "0");
  const [sweetness, setSweetness] = useState(wine.sweetness || "");
  const [image_url, setImage_url] = useState(wine.image_url || "");

  const submitHandler = async e => {
    e.preventDefault()

    const newWine = {
      name, year, variety_id, description,
      color, sweetness, image_url
    }
    const result = await dispatch(uploadNewWine(newWine));
    history.push(`/wines/${result.id}`);
  }

  useEffect(async () => {
    const res = await fetch('/api/wines/varieties');
    const varObj = await res.json();
    setVarieities(varObj.varieties);
  }, []);

  return (
    <>
      <div id='profile_name_text'>Create A Wine</div>
      <div className='form_div'>
        <form onSubmit={submitHandler}>
          <div className='form_input_div'>
            <label htmlFor="name">Wine Name</label>
            <input
              className="fInput"
              name="name"
              type="text"
              value = {name}
              onChange={e => setName(e.target.value)}
              />
          </div>
          <div className='form_input_div'>
            <label htmlFor="year">Year</label>
            <input
              className="fInput"
              name="year"
              type="number"
              value = {year}
              onChange={e => setYear(e.target.value)}
              />
          </div>
          <div className='form_input_div'>
            <label htmlFor="variety_id">Variety</label>
            <select
              className="fInput"
              name="variety_id"
              type="text"
              value = {variety_id}
              onChange={e => setVariety_id(e.target.value)}
            >
              <option value="0" disabled="true">Please select a variety</option>
              { varieties.map(variety => (
                <option key={variety.id} value={variety.id}>
                  {variety.name}
                </option>
              ))}
            </select>
          </div>
          <div className='form_input_div'>
            <label htmlFor="description">Description</label>
            <textarea
              className="fInput"
              name="description"
              value = {description}
              onChange={e => setDescription(e.target.value)}
              />
          </div>
          <div className='form_input_div'>
            <label htmlFor="color">Color</label>
            <select
              className="fInput"
              name="color"
              type="text"
              value = {color}
              onChange={e => setColor(e.target.value)}
            >
              <option value="0" disabled="true">Please select a color</option>
              { colors.map((color, i) => (
                <option key={i} value={color}>{color}</option>
              )) }
            </select>
          </div>
          <div className='form_input_div'>
            <label htmlFor="sweetness">Sweetness</label>
            <input
              className="fInput"
              name="sweetness"
              type="text"
              value = {sweetness}
              onChange={e => setSweetness(e.target.value)}
              />
          </div>
          <div className='form_input_div'>
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
            <button id="dr-review-text-save" type="submit">Create</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default WineForm;
