import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { deleteReview } from '../../store/reviews';
import { uploadNewWine, editWine, deleteWine } from '../../store/wines';
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

const WineForm = ({ mode }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [reviews, setReviews] = useState(useSelector(state => state.reviews.allReviews))

  useEffect(() => {
    setReviews(Object.entries(reviews).filter(([key,value])=> {
      return value.wine.id === parseInt(wineId)
       }))
  },[])

  let { wineId } = useParams();
  const oldWine = useSelector(state => state.wines.singleWine);
  let wine = {};
  if (mode === "Edit") {
    wineId = parseInt(wineId);
    wine = { ...oldWine };
  }

  const [varieties, setVarieties] = useState([]);

  const [name, setName] = useState(wine.name || "");
  const [year, setYear] = useState(wine.year || "");
  const [variety_id, setVariety_id] = useState(wine.variety_id?.id || "0");
  const [description, setDescription] = useState(wine.description || "");
  const [color, setColor] = useState(wine.color || "0");
  const [sweetness, setSweetness] = useState(wine.sweetness || "");
  const [image_url, setImage_url] = useState(wine.image_url || "");
  const [errorsArr, setErrorsArr] = useState([])

  const submitHandler = async e => {
    e.preventDefault();

    const newWine = {
      id: wineId, name, year, variety_id, description,
      color, sweetness, image_url
    }
    let result;
    let validations = validateErrors();

    if (!validations.length) {
      if (mode === "Edit") {
        result = await dispatch(editWine(newWine));
        history.push(`/wines/${wineId}`);
      } else {
        result = await dispatch(uploadNewWine(newWine));
        history.push(`/wines/${result.id}`);
      }
    } else {
      setErrorsArr(validations);
    }
  }

  useEffect(() => {
  }, [errorsArr])

  useEffect(async () => {
    const res = await fetch('/api/wines/varieties');
    const varObj = await res.json();
    setVarieties(varObj.varieties);
  }, []);

  const cancelHandler = (e) => {
    e.preventDefault();
    history.goBack();
  }

  const deleteHandler = async (e) => {
    e.preventDefault();
    // for (let i = 0; i < reviews.length; i++) {
    //   // console.log('review delete', reviews[i][0])
    //   dispatch(deleteReview(parseInt(reviews[i][0])))
    // }
    const result = await dispatch(deleteWine(wineId))
    // console.log('reviews full', reviews[0][0])
    if (result) history.push("/");
    else alert("failed to delete");
  }

  const nameValidate = (val, errors) => {
    if (!val) {
      errors.push("Please add a name")
    }
    return errors
  }

  const yearValidate = (val, errors) => {
    if (!val) {
      errors.push("Please add a year")
    }
    else if (val < 1800) {
      errors.push("Your wine belongs in a museum, not our website!")
    } else if (val > new Date().getFullYear()) {
      errors.push("Your wine isn't time travelling...")
    }
    return errors;
  }

  const varietyValidate = (val, errors) => {
    if (!parseInt(val)) {
      errors.push("Please select a variety")
    }
    return errors;
  }

  const sweetnessValidate = (val, errors) => {
    if (!val) {
      errors.push("Let us know how sweet this grape juice is!")
    }
    return errors;
  }

  const imgValidate = (val, errors) => {
    if (!val) {
      errors.push("Please include an image")
    }
    let regex = /(http[s]*:\/\/)([a-z\-_0-9\/.]+)\.([a-z.]{2,3})\/([a-z0-9\-_\/._~:?#\[\]@!$&'()*+,;=%]*)([a-z0-9]+\.)(png|gif|webp|jpeg|jpg)/i
    if (!val.match(regex)) {
      errors.push("Url must be for an image (jpg, png, gif, or webp)")
    }
    if (val.length > 1000) {
      errors.push("Image url must be less than 1000 characters")
    }
    return errors
  }

  const validateErrors = () => {
    let errors = []

    errors = nameValidate(name, errors)
    errors = varietyValidate(variety_id, errors)
    errors = yearValidate(year, errors)
    errors = sweetnessValidate(sweetness, errors)
    errors = imgValidate(image_url, errors)

    return errors;
  }

  return (
    <>
      <div id='profile_name_text'>{mode} A Wine</div>
      <div id="wine-errors">
        {
          errorsArr.map((error, i) => {
            return <div id={i} key={i} >{error}</div>
          })
        }
      </div>
      <div className='form_div'>
        <form onSubmit={submitHandler}>
          <div className='form_input_div'>
            <label htmlFor="name">Wine Name</label>
            <input
              className="fInput"
              name="name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div className='form_input_div'>
            <label htmlFor="year">Year</label>
            <input
              className="fInput"
              name="year"
              type="number"
              value={year}
              onChange={e => setYear(e.target.value)}
            />
          </div>
          <div className='form_input_div'>
            <label htmlFor="variety_id">Variety</label>
            <select
              className="fInput"
              name="variety_id"
              type="text"
              value={variety_id}
              onChange={e => setVariety_id(e.target.value)}
            >
              <option value="0" disabled={true}>Please select a variety</option>
              {varieties.map(variety => (
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
              value={description}
              onChange={e => setDescription(e.target.value)}
            />
          </div>
          <div className='form_input_div'>
            <label htmlFor="color">Color</label>
            <select
              className="fInput"
              name="color"
              type="text"
              value={color}
              onChange={e => setColor(e.target.value)}
            >
              <option value="0" disabled={true}>Please select a color</option>
              {colors.map((color, i) => (
                <option key={i} value={color}>{color}</option>
              ))}
            </select>
          </div>
          <div className='form_input_div'>
            <label htmlFor="sweetness">Sweetness</label>
            <input
              className="fInput"
              name="sweetness"
              type="text"
              value={sweetness}
              onChange={e => setSweetness(e.target.value)}
            />
          </div>
          <div className='form_input_div'>
            <label htmlFor="image_url">Image URL</label>
            <input
              className="fInput"
              name="image_url"
              type="text"
              value={image_url}
              onChange={e => setImage_url(e.target.value)}
            />
          </div>
          <div className='bHold'>
            <button id="dr-review-text-save" type="submit">{mode}</button>
            {mode === "Edit" && (
              <>
                <button onClick={deleteHandler}>Delete</button>
                <button onClick={cancelHandler}>Cancel</button>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default WineForm;
