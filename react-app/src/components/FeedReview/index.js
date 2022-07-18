import './FeedReview.css'
import fullImg from './wine-rating-icon-full.png'
import emptyImg from './wine-rating-icon-empty.png'
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { deleteReview, getAllReviews } from '../../store/reviews';
import { Modal } from '../../context/Modal';
import DeleteModal from '../DeleteModal';

const FeedReview = (props) => {
    const review = props.review
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user)
    const [isUser, setIsUser] = useState(false)
    const [showModal, setShowModal] = useState(false);

    const getTime = () => {
        let date = new Date(review.created_at)
        date = Math.floor((Date.now() - date) / 1000)
        let mDate = Math.floor(date / 60)
        if (mDate > 60) {
            let hDate = Math.floor(mDate / 60)
            if (hDate > 24) {
                let dDate = Math.floor(hDate / 24)
                return `${dDate} day(s) ago`
            } else { return `Posted Today` }
        } else { return `Posted Minutes ago` }
    }
    const time = getTime()

    const getRating = (n) => {
        if (n <= review.rating) { return fullImg }
        if (n > review.rating) { return emptyImg }
    }

    useEffect(() => {
        if (review.user.id === user.id) {
            setIsUser(true)
        }
    }, [])

    const deleteConfirm = e => {
        e.preventDefault();
        setShowModal(true);
    }

    const deleteRevieww = async () => {
        await dispatch(deleteReview(review.id))
            .then(() => props.update(review.id))
    }

    if (!review.id) {
        return <h1>Loading</h1>
    }

    return (
        <>
            <div className='feedReviewWrap'>

                <div className='first'>
                    <NavLink to={`/users/${review.user.id}`}><img className='rIcon' alt='icon' src={review.user.profile_image_url}></img></NavLink>
                </div>

                <div className='second'>
                    <div className='p2-1'>
                        <p><NavLink to={`/users/${review.user.id}`} className='navLinkk'>{review.user.first_name}</NavLink> is drinking <NavLink to={`/wines/${review.wine.id}`} className='navLinkk'>{review.wine.name} ({review.wine.year})</NavLink> - </p>
                        <img src={getRating(1)} alt=''></img>
                        <img src={getRating(2)} alt=''></img>
                        <img src={getRating(3)} alt=''></img>
                        <img src={getRating(4)} alt=''></img>
                        <img src={getRating(5)} alt=''></img>
                    </div>
                    {review.text &&
                    <div className='p2-2'>
                        {review.text}
                    </div>
                    }
                    {review.image_url !== null && review.image_url !== '' && (
                        <img className='rPic' src={review.image_url} alt='review'></img>
                    )}

                    {/* google crop image css (without losing quality) - peep component example img */}
                    <div className='p2-4'>
                        <p>{time}</p>
                        {!isUser && (
                            <NavLink to={`/reviews/${review.id}`} className='navLinkk'> Detailed View</NavLink>
                        )}
                        {isUser && (
                            <>
                                <div>
                                    <NavLink to={`/reviews/${review.id}`} className='navLinkk'>Edit</NavLink>
                                    <button onClick={deleteConfirm} className='dButton'>Delete</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <div className='third'>
                    <NavLink to={`/wines/${review.wine.id}`} className='navLinkk'><img className='rIcon' src={review.wine.image_url} alt=''></img></NavLink>
                </div>


            </div>
            {showModal && (
                <Modal onClose={() => setShowModal(false)}>
                    <DeleteModal onCancel={() => setShowModal(false)} onDelete={deleteRevieww} />
                </Modal>
            )}
        </>
    );
};

export default FeedReview;
