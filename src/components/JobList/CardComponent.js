import React from 'react';
import { Link } from 'react-router-dom';
import classes from './CardComponent.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';

export const CardComponent = ({ offers }) => {
    const getCompanyLogo = (logo) => {
        return logo
            ? 'http://localhost:8000/employer/logo/' + encodeURIComponent(logo)
            : undefined;
    };

    return (
        <div className={classes.row}>
            {offers?.map((offer, _id) => {
                return (
                    <div key={offer._id} className={classes['job-card']}>
                        <div className={classes['inner-box']}>
                            <ul className={classes['job-other-info']}>
                                <li className={classes.position}>
                                    {offer.workDay}
                                </li>
                                <li className={classes.jobType}>
                                    {offer.jobType}
                                </li>
                            </ul>
                            <span className={classes['company-logo']}>
                                <img
                                    src={getCompanyLogo(offer.company?.logo)}
                                    alt={offer.company?.companyName}
                                />
                            </span>
                            <span className={classes['company-name']}>
                                <p>{offer.company?.companyName}</p>
                            </span>
                            <h4 className={classes['job-title']}>
                                <Link to={`/job/job-single/${offer._id}`}>
                                    {offer.title}
                                </Link>
                            </h4>
                            <div className={classes.location}>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faLocationDot}
                                        className={classes.icon}
                                    />
                                </span>
                                <p>{offer.location.country}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
