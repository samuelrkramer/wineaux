import './HomePage.css'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllWines } from '../../store/wines';
import { getAllReviews } from '../../store/reviews';
import ReviewFeedContainer from '../ReviewFeedContainer';
import line_break from '../../images/line_break.png';

const WinePage = () => {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    const [wines, setWines] = useState(useSelector(state => state.wines.allWines));
    const [reviews, setReviews] = useState(useSelector(state => state.reviews.allReviews))

    useEffect(() => {
        dispatch(getAllReviews())
            .then(()=> dispatch(getAllWines()))
            .then(() => setLoaded(true))
    }, [dispatch])


    if (!loaded) {
        return (
            <div className='loaderr'>
                <h1>Loading...</h1>
            </div>
        )
    }


    return (
        <>
            <div className='homePageWrap'>
                <div className='discoverWrap'>
                    <h1>Discover Something New</h1>
                    <img src={line_break} alt='' className='line-break-img'></img>
                    <div className='filterForm'>
                        {/* <form>
                            <input></input>
                        </form> */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default WinePage;