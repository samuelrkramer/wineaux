import './WinePage.css'
import { NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getOneWine } from '../../store/wines';
import { getAllReviews } from '../../store/reviews';
import FeedReview from '../FeedReview'
import fullImg from '../FeedReview/wine-rating-icon-full.png'
import emptyImg from '../FeedReview/wine-rating-icon-empty.png'

const WinePage = () => {
    const [loaded, setLoaded] = useState(false);

    const { wineId } = useParams();
    const dispatch = useDispatch();

    const wine = useSelector(state => state.wines.singleWine);
    const user = useSelector(state => state.session.user)
    const [reviews, setReviews] = useState(useSelector(state => state.reviews.allReviews))





    useEffect(() => {
        dispatch(getOneWine(wineId))
        .then(()=> dispatch(getAllReviews()))
        .then(()=> setReviews(Object.values(reviews).filter((r)=> {
            return String(r.wine.id) === wineId
        })))
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

    const getAvg = () => {
        let total = 0
        console.log(reviews)
        for(let i = 0; i < reviews.length; i++){
            total += reviews[i].rating
        }
        return Math.floor(total / reviews.length)
    }

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
                {/* <img src='https://images.squarespace-cdn.com/content/v1/574faff6f8baf35e5da43485/1569348135149-BM2QSAVPKK1PJR2MPCKC/blend_2019.gif?format=1500w' alt=''></img> */}
        </div>
        )
    }


    return (
        <>
            <div className='winePageWrap'>
                <div className='wineDescrip'>
                    <h1>{wine.name}</h1>
                    <h4>Discovered by <NavLink to={`/users/${wine.user.id}`} className='nav'>{wine.user.username}</NavLink>, {time}</h4>
                    <div className='statHolder'>
                        <div className='s1'>
                            <div className='rHolder'>
                                <p>Average Rating: </p>
                                <img src={getRating(1)} alt=''></img>
                                <img src={getRating(2)} alt=''></img>
                                <img src={getRating(3)} alt=''></img>
                                <img src={getRating(4)} alt=''></img>
                                <img src={getRating(5)} alt=''></img>
                                <p>({reviews.length} total reviews)</p>
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
                    <h1>Recent Reviews:</h1>
                    {loaded && reviews.map(r => {
                        // console.log(r)
                        return <FeedReview review={r} />
                    })}
                </div>

            </div>
        </>
    );
};

export default WinePage;