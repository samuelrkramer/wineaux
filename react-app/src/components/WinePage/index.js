import './WinePage.css'
import { NavLink, Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneWine } from '../../store/wines';
import { getAllReviews } from '../../store/reviews';
import fullImg from '../FeedReview/wine-rating-icon-full.png'
import emptyImg from '../FeedReview/wine-rating-icon-empty.png'
import ReviewFeedContainer from '../ReviewFeedContainer';
import reviewIcon from './review-icon.png'

const WinePage = () => {
    const [loaded, setLoaded] = useState(false);
    // const [avg, setAvg] = useState(getAvg())

    const sessionUser = useSelector(state => state.session.user);

    const { wineId } = useParams();
    const dispatch = useDispatch();

    const wine = useSelector(state => state.wines.singleWine);
    const [reviews, setReviews] = useState(useSelector(state => state.reviews.allReviews))

    const getAvg = () => {
        let total = 0
        for(let i = 0; i < reviews.length; i++){
            total += reviews[i][1].rating
        }
        return Math.floor(total / reviews.length)
    }

    useEffect(() => {
        dispatch(getOneWine(wineId))
        .then(()=> dispatch(getAllReviews()))
        .then(()=> setReviews(Object.entries(reviews).filter(([key,value])=> {
            return value.wine.id === parseInt(wineId)
        }).reverse()))
        .then(()=> setLoaded(true))
    }, [dispatch])


    const getTime = () => {
        let date = new Date(wine.created_at)
        date = Math.floor((Date.now() - date) / 1000)
        let mDate = Math.floor(date / 60)
        if (mDate === 1) return `${mDate} minute ago`
        if (mDate > 60) {
            let hDate = Math.floor(mDate / 60)
            if (hDate === 1) return `${hDate} hour ago`
            if (hDate > 24) {
                let dDate = Math.floor(hDate / 24)
                if (dDate === 1) return `${dDate} day ago`
                return `${dDate} days ago`
            } else { return `${hDate} hours ago` }
        } else { return `${mDate} minutes ago` }
    }
    const time = getTime()


    const avg = getAvg()

    const getRating = (n) => {
        if (!avg) {return emptyImg}
        if (n <= avg) { return fullImg }
        if (n > avg) { return emptyImg }
    }



    if (!loaded) {
        return (
        <div className='loaderr'>
            <h1>Loading...</h1>
        </div>
        )
    }


    return (
        <>
            <div className='winePageWrap'>
                <div className='wineDescrip'>
                    <h1>{wine.name}</h1>
                    <h4>Discovered by <NavLink to={`/users/${wine.user.id}`} className='nav'>{wine.user.username}</NavLink>, {time} { wine.user.id === sessionUser.id && (
                        <Link to={`/wines/${wine.id}/edit`}>(Edit)</Link>
                    )}</h4>
                    <div className='statHolder'>
                        <div className='s1'>
                            <div className='rHolder'>
                                <p>Average Rating: </p>
                                {loaded && (
                                    <>
                                        <img src={getRating(1)} alt=''></img>
                                        <img src={getRating(2)} alt=''></img>
                                        <img src={getRating(3)} alt=''></img>
                                        <img src={getRating(4)} alt=''></img>
                                        <img src={getRating(5)} alt=''></img>
                                        <p>({reviews.length} total reviews)</p>
                                    </>
                                )}
                            </div>
                            <hr/>
                            <div className='stat'>
                                <p>Name: {wine.name}</p>
                                <p>Description: {wine.description}</p>
                            </div>
                            <div className='stat'>
                                <p>Sweetness: {wine.sweetness}</p>
                                <p>Year: {wine.year}</p>
                            </div>
                            <div className='stat'>
                                <p>Variety: {wine.variety_id.name}</p>
                                <p>Color: {wine.color}</p>
                            </div>

                        </div>
                        <div className='s2'>
                            <img  src={wine.image_url} alt=''></img>
                        </div>
                    </div>

                </div>
                <div className='specificRev'>
                    <div className='recentR'>
                        <h1>Recent Reviews:</h1>
                        <NavLink to={`/reviews/new/${wine.id}`}>
                            <div>
                                <img src={reviewIcon} alt=''></img>
                                <p>Add Review</p>
                            </div>
                        </NavLink>
                    </div>
                    {loaded && <ReviewFeedContainer reviews={reviews} />}
                </div>

            </div>
        </>
    );
};

export default WinePage;
