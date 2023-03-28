import classes from './JobSingleDetail.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faCalendarCheck,
    faMoneyBillWave,
    faLocationDot,
    faHouse,
    faClock,
    faIndustry,
} from '@fortawesome/free-solid-svg-icons';
import formateadorFecha from '../../utils/formateadorFecha';
import { Link } from 'react-router-dom';

function JobSingleDetail({ jobData }) {
    return (
        <div className={classes['info-details']}>
            {/* <u>Descripción</u> */}
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon
                    className={classes['icon']}
                    icon={faCalendarCheck}
                />
                <strong>Fecha: </strong>
                {formateadorFecha(jobData?.createdAt)}
            </span>
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon
                    className={classes['icon']}
                    icon={faLocationDot}
                />
                <strong>Localización: </strong>
                {jobData?.location?.city}
            </span>
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon
                    className={classes['icon']}
                    icon={faMoneyBillWave}
                />{' '}
                <strong>Sueldo: </strong>
                {jobData?.salary * 0.8}k - {jobData?.salary * 1.2}k
            </span>
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon className={classes['icon']} icon={faHouse} />{' '}
                <strong>Modalidad: </strong>
                {jobData?.jobType}
            </span>
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon className={classes['icon']} icon={faClock} />{' '}
                <strong>Horario: </strong> {jobData?.workDay}
            </span>
            <span className={classes['offer-detail']}>
                <FontAwesomeIcon
                    className={classes['icon']}
                    icon={faIndustry}
                />{' '}
                <strong>Empresa: </strong>
                {jobData?.company?.companyName}
            </span>

            {/* poner la ruta correcta */}
            <Link
                to={`/employer/${jobData?.company?._id}`}
                className={classes['button-empresa']}
            >
                Empresa
            </Link>
        </div>
    );
}

export default JobSingleDetail;
