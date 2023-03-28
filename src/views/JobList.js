/**
 * @fileoverview This file contains the JobList component, which is the main component of the job list page. It is responsible for fetching the job offers from the API, sorting them by date and displaying them in a card format. It also has pagination functionality.
 * @author Ana Lorenzo
 */

// classes
import classes from '../styles/JobList.module.css';

// hooks
import React, { useState, useEffect, useMemo } from 'react';

// components used: Switcher, CardComponent, Pagination
import { Switcher } from '../components/JobList/Switcher';
import { CardComponent } from '../components/JobList/CardComponent';
import Pagination from '../components/candidatesList/Pagination';
import { NoCards } from '../components/JobList/NoCards';

// utils and services
import { fetchCards } from '../services/fetchCards.service';
import { orderByDate } from '../utils/orderByDate.utils';
import { EMPLOYER_JOBS } from '../config/urls';
import Loader from '../components/UI/Spinner/Loader';
import PageLayoutC from '../components/sidemenu/PageLayoutC';

let PageSize = 12; //to fix the number of offers per page
export const JobList = () => {
    const [offers, setOffers] = useState([]); //principal state

    const [loading, setLoading] = useState(false); //loading to be used with spinner

    const [currentPage, setCurrentPage] = useState(1); //pagination

    const [selectedOrder, setSelectedOrder] = useState('default'); //to keep the selected option in the select
    const [order, setOrder] = useState('default'); //to keep the order of the offers

    useEffect(() => {
        listJobs();
    }, [order]);

    //* lista / ordena las ofertas de trabajo
    const listJobs = async () => {
        setLoading(true);
        const { datos } = await fetchCards(`${EMPLOYER_JOBS}/all-jobs`);

        const orderOffers = orderByDate(datos, order);
        setOffers(orderOffers);

        setLoading(false);
        console.log(orderOffers);
        // setOffers([]);
    };
    //* paginacion
    const currentCards = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        window.scrollTo(0, 0); //to send the user back to the top of the page
        return offers.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, offers]);

    //* handle select
    const handlerSelect = (e) => {
        if (e.target.value === 'newest') {
            setOrder('newest');
            setSelectedOrder('newest'); // to reset the selected option in the select
        } else if (e.target.value === 'oldest') {
            setOrder('oldest');
            setSelectedOrder('oldest');
        } else {
            setOrder('default');
            setSelectedOrder('default');
        }
        setCurrentPage(1); //to send the user back to the first page
    };

    return (
        <>
            {offers.length === 0 && !loading ? (
                <NoCards valor={'ofertas'} />
            ) : (
                <>
                    <div className={classes['job-container']}>
                        <div className={classes.switcher}>
                            <div className={classes['showing-result']}></div>
                            <div className={classes['sort-by']}>
                                <button
                                    className={
                                        order === 'newest' || order === 'oldest'
                                            ? classes['btn-clear']
                                            : classes['btn-clear-disabled']
                                    }
                                    onClick={(e) => {
                                        setCurrentPage(1); //to send the user back to the first page
                                        setSelectedOrder('default');
                                        setOrder('default');
                                    }}
                                >
                                    Clear All
                                </button>
                                <Switcher
                                    value={selectedOrder}
                                    handlerSelect={handlerSelect}
                                    selectedOrder={selectedOrder}
                                />
                            </div>
                        </div>
                        {loading ? (
                            <Loader />
                        ) : (
                            <>
                                <PageLayoutC />
                                <CardComponent offers={currentCards} />
                                <Pagination
                                    currentPage={currentPage}
                                    totalCount={offers.length}
                                    pageSize={PageSize}
                                    onPageChange={(page) =>
                                        setCurrentPage(page)
                                    }
                                />
                            </>
                        )}
                    </div>
                </>
            )}
        </>
    );
};
