import React, {useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneReview } from '../../store/reviews'
import './FeedReview.css'

const FeedReview = () => {
    const dispatch = useDispatch();
    const review = useSelector(state => state.reviews.singleReview);

    useEffect(() => {
        dispatch(getOneReview(3));
    }, [dispatch])

    
    const getTime = () => {
        let date = new Date(review.updated_at)
        date = Math.floor((Date.now() - date)/1000)
        let mDate = Math.floor(date/60)
        if(mDate === 1) return `${mDate} minute ago`
        if(mDate > 60){
            let hDate = Math.floor(mDate/60)
            if(hDate === 1) return `${hDate} hour ago`
            if(hDate > 24){
                let dDate = Math.floor(hDate/24)
                if (dDate === 1) return `${dDate} day ago`
                return `${dDate} days ago`
            }else {return `${hDate} hours ago`}
        }else{return `${mDate} minutes ago`}
    }
    const time = getTime()

    
    
    if (!review.id) {
        return <h1>Loading</h1>
    }

    return (
        <>
        <div className='feedReviewWrap'>

            <div className='first'>
                <img className='rIcon' alt='icon' src={'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}></img>
            </div>

            <div className='second'>
                <div className='p2-1'> <a>{review.user.first_name}</a> is drinking {review.wine.name} - {review.wine.year}</div>
                <div className='p2-2'>"{review.text}" User Rating - {review.rating}/5 </div>
{/* google crop image css (without losing quality) - peep component example img */}
                <img className='rPic' src={review.image_url} alt='review image'></img>
                <div className='p2-4'>{time} <a>View Detailed Check-in</a></div>
            </div>


            <div className='third'>
                    <img className={'j'} src={'http://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'}></img>
            </div>


        </div>
        <hr className='hrrr'/>
        </>
    );
};

export default FeedReview;