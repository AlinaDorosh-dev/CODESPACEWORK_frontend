/**
 * @author iRaphiki <imraphiki@gmail.com>
 */
import { useEffect, useState } from 'react';
import styles from '../styles/form.module.css';
import { Form } from '../components/Form/base/Form.component';
import { TextAreaInput } from '../components/Form/inputs/TextAreaInput.component';
import { TextInput } from '../components/Form/inputs/TextInput.component';
import { SelectInput } from '../components/Form/inputs/SelectInput.component';
import { ImageBrowser } from '../components/Form/inputs/ImageInput.component';
import { Title } from '../components/Form/Title.component';
import { CandidateService } from '../services/candidate.service';
import { Candidate } from '../models/candidate.model';
import PageLayoutC from '../components/sidemenu/PageLayoutC';

//import Loader from '../components/UI/Spinner/Loader';

function CandidateProfile() {
    //const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(new Candidate());
    const [photo, setPhoto] = useState(undefined);
    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState('not_saved');

    const items = [
        { label: 'Si', value: 'yes' },
        { label: 'No', value: 'no' },
    ];

    // useEffect: loading the component data
    useEffect(() => {
        userAuth();
    }, []);

    const userAuth = async () => {
        // Get user id from session/local storage
        const user =
            sessionStorage.getItem('userId') || localStorage.getItem('userId');

        // Check if user do not exists return false with no data
        if (!user) {
            return false;
        }

        // Get user data by id
        const data = await CandidateService.getById(user);

        // Setting user data state and loading state
        setUser(data);
        //setLoading(false);
    };

    // Setting the new values from form data.
    const saveUpdateUser = async (formData) => {
        // Mapping user data
        const userData = new Candidate();
        userData._id = user._id;
        userData.role = 'candidate';
        userData.loginId =
            sessionStorage.getItem('userId') || localStorage.getItem('userId');
        userData.fullName = formData.fields.fullName.value;
        userData.email = formData.fields.email.value;
        userData.bootcamp = formData.fields.bootcamp.value;
        userData.edition = formData.fields.edition.value;
        userData.socialNetworks = {
            linkedin: formData.fields.linkedin.value,
            github: formData.fields.github.value,
        };
        userData.languages = formData.fields.languages.value;
        userData.description = formData.fields.description.value;
        userData.setLookingForJob(formData.fields.isLookingForJob.value);

        // If user with id is not exist, create it.
        if (!userData._id) {
            try {
                // Insert new user into the database
                let candidateData = await CandidateService.newCandidate(
                    userData,
                );
                // If we have image data, upload it into user created before.
                if (photo) {
                    candidateData = await CandidateService.uploadImage(
                        photo,
                        candidateData._id,
                    );
                }
                // Set user and save states
                setUser(candidateData);
                setSaved('updated');
            } catch (error) {
                setSaved('error');
            }
        } else {
            try {
                // Update candidate data by id
                let candidateData = await CandidateService.editCandidate(
                    userData._id,
                    userData,
                );
                if (photo) {
                    candidateData = await CandidateService.uploadImage(
                        photo,
                        candidateData._id,
                    );
                }
                // Set updated state and user data
                setUser(candidateData);
                setSaved('updated');
            } catch (error) {
                setSaved('error');
            }
        }

        // Timeout 3 seg if we update the user data
        // TODO: Export timeout into success modal
        setTimeout(() => {
            if (saved === 'updated') {
            }
            setSaved(null);
        }, 3000);
    };

    return (
        <div className={`${styles['page-wrapper']}`}>
            <section className={`${styles['dashboard']}`}>
                <div className={`${styles['dash-title']}`}>
                    <Title
                        title="Mi Perfil!"
                        altText="&#191;Listo para volver?"
                        size="l"
                    />
                </div>
                <div
                    className={`${styles['mb-4']} ${styles['ms-0']} ${styles['show-1023']}`}
                >
                    <PageLayoutC />
                </div>
                <div className={`${styles['container']}`}>
                    <div className={`${styles['container-title']}`}>
                        <Title title="Mi Perfil" size="s" />
                    </div>
                    <div className={`${styles['container-content']}`}>
                        <ImageBrowser
                            src={user.getPhoto()}
                            label="Buscar Foto"
                            onChange={(e) => setPhoto(e.target.files[0])}
                        />

                        <Form
                            onSubmit={(formData) => {
                                saveUpdateUser(formData);
                            }}
                            onChange={(formData) => {
                                setFormData(formData);
                            }}
                        >
                            <div className={`${styles['row']}`}>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="fullName"
                                        label="Nombre Completo"
                                        placeholder="Jerome"
                                        value={user?.fullName}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="email"
                                        label="Email"
                                        placeholder="jerome@gmail.com"
                                        disabled={user.loginId?.email}
                                        pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                        messageWhenWrongPattern="El email no es válido"
                                        value={user.loginId?.email}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="bootcamp"
                                        label="Bootcamp"
                                        placeholder="Full Stack Web Developer"
                                        value={user?.bootcamp}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="edition"
                                        label="Edición"
                                        placeholder="11"
                                        pattern="^\d{0,2}"
                                        value={user?.edition}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="linkedin"
                                        label="LinkedIn"
                                        pattern="^(http(s)?:\/\/)?([\w]+\.)?linkedin\.com\/(pub|in|profile)"
                                        placeholder="https://www.linkedin.com/in/jerome/"
                                        value={user?.socialNetworks?.linkedin}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="github"
                                        label="Github"
                                        pattern="^(http(s?):\/\/)?(www\.)?github\.([a-z])+\/([A-Za-z0-9]{1,})+\/?$"
                                        placeholder="https://www.github.com/jerome"
                                        value={user?.socialNetworks?.github}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <TextInput
                                        name="languages"
                                        label="Idiomas"
                                        placeholder="English, Chinese"
                                        value={user?.languages?.join(', ')}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <SelectInput
                                        name="isLookingForJob"
                                        label="Disponibilidad laboral"
                                        items={items}
                                        /* disabled={!user.isAdmin()} */
                                        messageWhenValueIsMissing="select a value"
                                        value={user?.getLookingForJob()}
                                    />
                                </div>
                                <div
                                    className={`${styles['input-container']} ${styles['col-md-12']}`}
                                >
                                    <TextAreaInput
                                        name="description"
                                        label="Sobre mi"
                                        rows={10}
                                        placeholder="About us..."
                                        value={user?.description}
                                    />
                                </div>
                                {saved === 'updated' ? (
                                    <strong
                                        className={`${styles.alert}  ${styles['alert-success']}`}
                                    >
                                        Usuario modificado correctamente!!
                                    </strong>
                                ) : (
                                    ''
                                )}
                                {saved === 'error' ? (
                                    <strong
                                        className={`${styles.alert}  ${styles['alert-danger']}`}
                                    >
                                        Hay campos vacíos
                                    </strong>
                                ) : (
                                    ''
                                )}
                                <div
                                    className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                >
                                    <button
                                        type="submit"
                                        disabled={formData.invalid}
                                        className={
                                            formData.invalid
                                                ? `${styles.btn} ${styles['btn-disabled']}`
                                                : `${styles.btn} ${styles['btn-primary']}`
                                        }
                                    >
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CandidateProfile;
