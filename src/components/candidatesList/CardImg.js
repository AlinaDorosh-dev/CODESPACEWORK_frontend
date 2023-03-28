/**
 * @author: Bejamin Mancera
 * @fileoverview: This component is used to render the image of the candidate in the card.
 */

import classes from './CardImg.module.css';

function CardImg(props) {
    const getCandidatePhoto = (photo) => {
        return photo
            ? 'http://localhost:8000/candidate/photo/' +
                  encodeURIComponent(photo)
            : undefined;
    };

    return (
        <>
            {props.candidate.isLookingForJob ? (
                <div className={classes['featured-openToWork']}>
                    Open to work
                </div>
            ) : (
                <div className={classes['featured-working']}>Working</div>
            )}
            <div className={classes['img-container']}>
                <div className={classes['img-wrapper']}>
                    {/* {console.log(photo)} */}
                    <img
                        src={getCandidatePhoto(props.candidate.photo)}
                        alt={props.candidate.fullName}
                    />
                </div>
            </div>
        </>
    );
}
export default CardImg;
