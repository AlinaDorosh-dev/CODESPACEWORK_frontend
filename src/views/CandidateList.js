/**
 * @author: Benjamín
 * @modified: Ana Lorenzo
 */

// Description: This component is the main component of the candidates list page. It contains the main logic of the page and the components that are used in the page.

//components used: CardWrapper, CardImg, CardInfo, Pagination, Switcher
import CardWrapper from '../components/candidatesList/CardWrapper';
import CardImg from '../components/candidatesList/CardImg';
import CardInfo from '../components/candidatesList/CardInfo';
import CardsContainer from '../components/candidatesList/CardsContainer';
import Pagination from '../components/candidatesList/Pagination';
import Switcher from '../components/candidatesList/Switcher';
import DualRing from '../components/UI/Spinner/Loader';
import { NoCards } from '../components/JobList/NoCards';

//import classes from "./CandidateList.module.css";
import classes from '../styles/CandidateList.module.css';

//hooks
import { useState, useEffect, useMemo } from 'react';

//utils and services
import { orderByDate } from '../utils/orderByDateCandidates.utils';
import { fetchCards } from '../services/fetchCards.service';
import { CANDIDATES_URL } from '../config/urls';
import PageLayout from '../components/sidemenu/PageLayout';

let PageSize = 12; //to fix the number of candidates per page

function CandidateList() {
    const [selectedOrder, setSelectedOrder] = useState('default'); //to keep the selected option in the select
    const [order, setOrder] = useState('default'); //to keep the order of the candidates
    const [candidates, setCandidates] = useState([]); // principal state
    const [currentPage, setCurrentPage] = useState(1); //pagination
    const [loading, setLoading] = useState(false); //loading to be used with spinner

    //useEffect to fetch the candidates and sort them
    useEffect(() => {
        window.scrollTo(0, 0); //to send the user back to the top of the page
        setLoading(true);
        candidatesList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [order]);

    //sorting the candidates by register date
    const candidatesList = async () => {
        setLoading(true);
        const { datos } = await fetchCards(`${CANDIDATES_URL}`);
        const sortedCandidates = orderByDate(datos, order);
        setCandidates(sortedCandidates);
        // setCandidates([]);
        setLoading(false);
    };

    //pagination
    const currentCards = useMemo(() => {
        const firstPageIndex = (currentPage - 1) * PageSize;
        const lastPageIndex = firstPageIndex + PageSize;
        return candidates.slice(firstPageIndex, lastPageIndex);
    }, [currentPage, candidates]);

    //handler select
    const handlerSelect = (e) => {
        if (e.target.value === 'desc') {
            setOrder('desc');
            setSelectedOrder('desc');
        } else if (e.target.value === 'asc') {
            setOrder('asc');
            setSelectedOrder('asc');
        } else {
            setOrder('default');
            setSelectedOrder('default');
        }
        setCurrentPage(1); //to send the user back to the first page
    };

    return (
        <>
            {candidates.length === 0 && !loading ? (
                <NoCards valor={'candidatos'} />
            ) : (
                <>
                    <CardsContainer>
                        <div className={classes['top-filters']}>
                            <div className={classes.switcher}>
                                <div
                                    className={classes['showing-result']}
                                ></div>
                                <div className={classes['sort-by']}>
                                    <button
                                        className={
                                            order === 'desc' || order === 'asc'
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
                                        order={order}
                                    />
                                </div>
                            </div>
                            <div className={classes['div-menu-hamburguer']}>
                                {' '}
                                <PageLayout />
                            </div>
                        </div>
                        {loading ? (
                            <DualRing />
                        ) : (
                            <>
                                {currentCards.map((candidate, key) => {
                                    return (
                                        <CardWrapper
                                            key={key}
                                            candidates={candidate}
                                        >
                                            <CardImg candidate={candidate} />
                                            <CardInfo candidate={candidate} />
                                        </CardWrapper>
                                    );
                                })}
                                <Pagination
                                    currentPage={currentPage}
                                    totalCount={candidates.length}
                                    pageSize={PageSize}
                                    onPageChange={(page) =>
                                        setCurrentPage(page)
                                    }
                                />
                            </>
                        )}
                    </CardsContainer>
                </>
            )}
        </>
    );
}
export default CandidateList;
