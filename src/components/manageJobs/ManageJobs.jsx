/**
 * @author Pablo
 * @modified
 */

// Importaciones de estilos y librerías
import classes from './ManageJobs.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBriefcase,
    faPencil,
    faTrashCan,
    faEye,
    faLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Importaciones de componentes y utilidades
import DeleteModal from './modal/DeleteModal';
import GetJobsModal from './modal/GetJobsModal';
import formatearFecha from '../../utils/formateadorFecha';
import { EMPLOYER_JOBS, EMPLOYER_JOBS_DELETE } from '../../config/urls';
import Loader from '../UI/Spinner/Loader';
import PageLayout from '../sidemenu/PageLayout';

// Componente principal de gestión de empleos
function ManageJobs() {
    // useState para abrir y cerrar el modal delete
    const [deleteResult, setDeleteResult] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // UseState para controlar el componente Loader
    const [isLoading, setIsLoading] = useState(false);

    // Funcion fetch para obtener los jobs publicados
    const [showGetJobsModal, setShowGetJobsModal] = useState(false);
    const [getResult, setGetResult] = useState(null);
    const [publishedJobs, setPublishedJobs] = useState([]);
    const [fetchError, setFetchError] = useState(false);

    // Obteniendo el token del sessionStorage
    const token =
        sessionStorage.getItem('accessToken') ||
        localStorage.getItem('accessToken');

    // Obtenemos el id del usuario a partir del token para poder obtener sus empleos publicados
    const tokenParts = token.split('.');
    const payload = JSON.parse(atob(tokenParts[1]));
    const userId = payload.UserInfo.id;

    const getCompanyLogo = (logo) => {
        return logo
            ? 'http://localhost:8000/employer/logo/' + encodeURIComponent(logo)
            : undefined;
    };

    // Funcion fetch para obtener los empleos publicados por el usuario
    const fetchGetPublishedJobs = async () => {
        setIsLoading(true);

        // Verificamos de la existencia del token
        if (!token) {
            return;
        }

        // Realizamos la petición GET para obtener los empleos publicados
        fetch(`${EMPLOYER_JOBS}/employer-jobs/${userId}`, {
            method: 'GET',
            headers: {
                'auth-token': token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch, status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                // Manejo del resultado exitoso de la petición
                if (data.status === 'Succeeded') {
                    setPublishedJobs(data.data);
                }
            })
            .catch((error) => {
                // Manejo del error de la petición
                setFetchError(true);
                setShowGetJobsModal(true);
                setGetResult({
                    success: false,
                    message:
                        'Ha ocurrido un error, por favor inténtelo de nuevo mas tarde.',
                });
            })
            .finally(() => setIsLoading(false));
    };

    // useEffect para obtener los empleos publicados al cargar la página
    useEffect(() => {
        fetchGetPublishedJobs();
    }, []);

    // Funcion fetch para eliminar un empleo
    const fetchDeleteJob = async (id) => {
        setIsLoading(true);

        if (!token) {
            return;
        }

        fetch(`${EMPLOYER_JOBS_DELETE}/${userId}/${id}/`, {
            method: 'DELETE',
            headers: {
                'auth-token': token,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch, status: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                if (data.status === 'Succeeded') {
                    const updatedPublishedJobs = publishedJobs.filter(
                        (job) => job._id !== id,
                    );
                    setPublishedJobs(updatedPublishedJobs);
                    const updatedJobs = jobs.filter((job) => job._id !== id);
                    setJobs(updatedJobs);
                    if (!showDeleteModal) {
                        setShowDeleteModal(true);
                        setDeleteResult({
                            success: true,
                            message:
                                'El trabajo ha sido eliminado exitosamente.',
                        });
                    }
                } else {
                    if (!showDeleteModal) {
                        setShowDeleteModal(true);
                        setDeleteResult({
                            success: false,
                            message:
                                'Ha ocurrido un error al eliminar la oferta.',
                        });
                    }
                }
            })
            .catch((error) => {
                setShowDeleteModal(true);
                setDeleteResult({
                    success: false,
                    message: 'Ha ocurrido un error al eliminar la oferta.',
                });
            })
            .finally(() => setIsLoading(false));
    };

    // useState para filtrar los jobs por fecha
    const [jobs, setJobs] = useState([]);

    function filterJobs(daysAgo) {
        const dateLimit = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
        let filteredJobs = publishedJobs.filter((publishedJobs) => {
            const jobDate = new Date(publishedJobs.createdAt);
            return jobDate >= dateLimit && jobDate.getTime() <= Date.now();
        });
        setJobs(filteredJobs);
    }

    // Para que al cargar la página se muestren los últimos 30 días
    useEffect(() => {
        filterJobs(30);
        // actualizar el estado "jobs" con los trabajos filtrados
        const filteredJobs = publishedJobs.filter((publishedJob) => {
            const jobDate = new Date(publishedJob.createdAt);
            const dateLimit = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            return jobDate >= dateLimit && jobDate.getTime() <= Date.now();
        });
        setJobs(filteredJobs);
    }, [publishedJobs]);

    // Para mostrar todos los empleos
    function showAllJobs() {
        setJobs(publishedJobs);
    }

    // Para ordenar los jobs por fecha
    const sortedJobs = jobs.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
    );

    // Renderizado del componente
    return (
        <>
            {deleteResult && (
                <DeleteModal
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    setShowDeleteModal={setShowDeleteModal}
                    status={deleteResult.success ? 'Succeeded' : 'Error'}
                    message={deleteResult.message}
                />
            )}
            <div className={classes['main-wrapper']}>
                <section className={classes.main}>
                    <div className={classes['header-table']}>
                        <h3 className={classes.title}>Gestione los empleos!</h3>
                        <p className={classes.subtitle}>
                            Revisa todas tus ofertas de empleo publicadas.
                        </p>
                        {/* Componente Boton Menu Lateral */}
                    </div>
                    <PageLayout />
                    {isLoading && <Loader />}
                    {!fetchError ? (
                        <div className={classes['job-listing-container']}>
                            <div>
                                <h4>Mi lista de empleos</h4>
                                <select
                                    className={classes.filter}
                                    name=""
                                    id="filter"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        if (value === '') {
                                            showAllJobs();
                                        } else {
                                            filterJobs(parseInt(value));
                                        }
                                    }}
                                >
                                    <option value="30">Últimos 30 Días</option>
                                    <option value="60">Últimos 2 Meses</option>
                                    <option value="90">Últimos 3 Meses</option>
                                    <option value="">Todas</option>
                                </select>
                            </div>
                            <div className={classes['table-container']}>
                                <table
                                    className={classes.table}
                                    id="table-jobs"
                                >
                                    <thead>
                                        <tr>
                                            <th className={classes['th-title']}>
                                                Oferta
                                            </th>
                                            <th
                                                className={
                                                    classes['th-applications']
                                                }
                                            >
                                                Solicitudes
                                            </th>
                                            <th
                                                className={
                                                    classes['th-created']
                                                }
                                            >
                                                Creada
                                            </th>
                                            <th
                                                className={classes['th-action']}
                                            >
                                                Acción
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedJobs.map((job) => {
                                            return (
                                                <tr key={job._id}>
                                                    <td
                                                        className={
                                                            classes['td-title']
                                                        }
                                                    >
                                                        <div>
                                                            <div
                                                                className={
                                                                    classes.logo
                                                                }
                                                            >
                                                                <img
                                                                    src={getCompanyLogo(
                                                                        job
                                                                            .company
                                                                            ?.logo,
                                                                    )}
                                                                />
                                                            </div>
                                                            <div
                                                                className={
                                                                    classes.job
                                                                }
                                                            >
                                                                <div>
                                                                    <h4>
                                                                        {
                                                                            job.title
                                                                        }
                                                                    </h4>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.type
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faBriefcase
                                                                        }
                                                                        className={
                                                                            classes.icon
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {' '}
                                                                        {
                                                                            job.jobType
                                                                        }{' '}
                                                                    </span>
                                                                </div>
                                                                <div
                                                                    className={
                                                                        classes.location
                                                                    }
                                                                >
                                                                    <FontAwesomeIcon
                                                                        icon={
                                                                            faLocationDot
                                                                        }
                                                                        className={
                                                                            classes.icon
                                                                        }
                                                                    />
                                                                    <span>
                                                                        {
                                                                            job
                                                                                .location
                                                                                .city
                                                                        }
                                                                        ,{' '}
                                                                        {
                                                                            job
                                                                                .location
                                                                                .country
                                                                        }
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td
                                                        className={
                                                            classes[
                                                                'td-applications'
                                                            ]
                                                        }
                                                    >
                                                        <Link to="/employers-dashboard/all-applicants">
                                                            {job.applicants
                                                                .length <= 3
                                                                ? `${job.applicants.length} Candidatos`
                                                                : '3+ Candidatos'}
                                                        </Link>
                                                    </td>
                                                    <td
                                                        className={
                                                            classes[
                                                                'td-created'
                                                            ]
                                                        }
                                                        data-date={
                                                            job.createdAt
                                                        }
                                                    >
                                                        <span>
                                                            {formatearFecha(
                                                                job.createdAt,
                                                            )}
                                                        </span>
                                                    </td>
                                                    <td
                                                        className={
                                                            classes['td-action']
                                                        }
                                                    >
                                                        <Link
                                                            to={`/job/job-single/${job._id}`}
                                                        >
                                                            <button>
                                                                <FontAwesomeIcon
                                                                    icon={faEye}
                                                                    className={
                                                                        classes.icon
                                                                    }
                                                                />
                                                            </button>
                                                        </Link>

                                                        <Link
                                                            to={`/employers-dashboard/post-a-job/${job._id}`}
                                                        >
                                                            <button>
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faPencil
                                                                    }
                                                                    className={
                                                                        classes.icon
                                                                    }
                                                                />
                                                            </button>
                                                        </Link>

                                                        <button>
                                                            <FontAwesomeIcon
                                                                icon={
                                                                    faTrashCan
                                                                }
                                                                className={
                                                                    classes.icon
                                                                }
                                                                onClick={() =>
                                                                    fetchDeleteJob(
                                                                        job._id,
                                                                    )
                                                                }
                                                            />
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ) : (
                        <GetJobsModal
                            isOpen={showGetJobsModal}
                            onClose={() => setShowGetJobsModal(false)}
                            setShowGetJobsModal={setShowGetJobsModal}
                            status="Error"
                        />
                    )}
                </section>
            </div>
        </>
    );
}

export default ManageJobs;
