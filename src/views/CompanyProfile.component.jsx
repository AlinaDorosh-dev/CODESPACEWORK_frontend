/**
 * @author VeroniKa <vsc1972@gmail.com>
 */
import styles from '../styles/form.module.css';
import { Form } from '../components/Form/base/Form.component';
import { TextAreaInput } from '../components/Form/inputs/TextAreaInput.component';
import { TextInput } from '../components/Form/inputs/TextInput.component';
import { SelectInput } from '../components/Form/inputs/SelectInput.component';
import { ImageBrowser } from '../components/Form/inputs/ImageInput.component';
import { Title } from '../components/Form/Title.component';
import { useEffect, useState } from 'react';
import { EmployerService } from '../services/employer.service';
import { Employer } from '../models/employer model';
import BurgerButton from '../components/sidemenu/BurgerButton';
import MenuEmployers from '../components/sidemenu/MenuEmployers';
import PageLayout from '../components/sidemenu/PageLayout';
import ButtonComponent from '../components/sidemenu/ButtonComponent';

function CompanyProfile() {
    //const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(new Employer());
    const [logo, setLogo] = useState(undefined);
    const [formData, setFormData] = useState({});
    const [saved, setSaved] = useState('not_saved');

    const items = [
        { label: 'Si', value: 'yes' },
        { label: 'No', value: 'no' },
    ];

    //useeffect: carga del componente
    useEffect(() => {
        userAuth();
    }, []);

    const userAuth = async () => {
        //Sacar los datos de usuario
        const user =
            sessionStorage.getItem('userId') || localStorage.getItem('userId');

        //comprobar si tenemos los datos
        if (!user) {
            return false;
        }

        //Hacemos la llamada que devuelva los datos del usuario
        const data = await EmployerService.getById(user);

        //Seteamos los datos del usuario y del loading
        setUser(data);
        //setLoading(false);
    };

    /**
     * Setting the new values from form data.
     * @param {*} formData
     */
    const saveUpdateUser = async (formData) => {
        //mapeamos los datos del usuario
        const newEmployer = new Employer();
        newEmployer._id = user._id;
        newEmployer.role = 'empleador';
        newEmployer.loginId =
            sessionStorage.getItem('userId') || localStorage.getItem('userId');
        newEmployer.companyName = formData.fields.companyName.value;
        newEmployer.email = formData.fields.email.value;
        newEmployer.phone = formData.fields.phone.value;
        newEmployer.website = formData.fields.website.value;
        newEmployer.description = formData.fields.description.value;
        newEmployer.setLookingForEmployers(
            formData.fields.isLookingForEmployees.value,
        );

        //comprobamos si existe el usuario
        if (!newEmployer._id) {
            try {
                //Creamos el usuario en la ddbb
                let employerData = await EmployerService.newemployer(
                    newEmployer,
                );
                // If we have image data, upload it into user created before.
                if (logo) {
                    employerData = await EmployerService.uploadImage(
                        logo,
                        employerData._id,
                    );
                }
                //Seteamos estado y datos
                setUser(employerData);
                setSaved('updated');
            } catch (error) {
                setSaved('error');
            }
        } else {
            try {
                //Actualizamos el usuario en la ddbb
                let employerData = await EmployerService.editemployer(
                    newEmployer._id,
                    newEmployer,
                );
                if (logo) {
                    employerData = await EmployerService.uploadImage(
                        logo,
                        employerData._id,
                    );
                    console.log(employerData);
                }
                //Seteamos estado y datos
                setUser(employerData);
                setSaved('updated');
            } catch (error) {
                setSaved('error');
            }
        }

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
                        title="Perfil de la empresa!"
                        altText="¿Listo para saltar de nuevo?"
                        size="l"
                    />
                </div>
                <PageLayout>
                    <div
                        className={`${styles['mb-4']} ${styles['ms-0']} ${styles['show-1023']}`}
                    ></div>
                    <div className={`${styles['container']}`}>
                        <div className={`${styles['container-title']}`}>
                            <Title title="Mi Perfil" size="s" />
                        </div>
                        <div className={`${styles['container-content']}`}>
                            <ImageBrowser
                                src={user.getLogo()}
                                label="Buscar logo"
                                onChange={(e) => setLogo(e.target.files[0])}
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
                                            name="companyName"
                                            label="Nombre de la compañía (opcional)"
                                            placeholder="Nombre de la compañía"
                                            value={user.companyName}
                                        />
                                    </div>
                                    <div
                                        className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                    >
                                        <TextInput
                                            name="email"
                                            label="Email"
                                            placeholder="email"
                                            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                                            messageWhenWrongPattern="El email no es válido"
                                            value={user.loginId?.email}
                                        />
                                    </div>
                                    <div
                                        className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                    >
                                        <TextInput
                                            name="phone"
                                            label="Teléfono"
                                            placeholder="000000000"
                                            pattern="^(6|7)([0-9]){8}$"
                                            messageWhenWrongPattern="El teléfono no es válido"
                                            value={user.phone}
                                        />
                                    </div>
                                    <div
                                        className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                    >
                                        <TextInput
                                            name="website"
                                            label="Sitio Web"
                                            placeholder=" URL Sitio Web"
                                            pattern="((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)"
                                            messageWhenWrongPattern="La URL no es válida"
                                            value={user.website}
                                        />
                                    </div>
                                    <div
                                        className={`${styles['input-container']} ${styles['col-lg-6']} ${styles['col-md-12']}`}
                                    >
                                        <SelectInput
                                            name="isLookingForEmployees"
                                            label="Está buscando empleados"
                                            items={items}
                                            disabled={user.isAdmin()}
                                            messageWhenValueIsMissing="Seleccione un valor"
                                            value={user.getLookingForEmployees()}
                                        />
                                    </div>
                                    <div
                                        className={`${styles['input-container']} ${styles['col-md-12']}`}
                                    >
                                        <TextAreaInput
                                            name="description"
                                            label="Sobre nuestra empresa"
                                            rows={10}
                                            placeholder="Sobre nuestra empresa..."
                                            value={user.description}
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
                                            disabled={formData.invalid}
                                            className={
                                                formData.invalid
                                                    ? `${styles.btn} ${styles['btn-disable']}`
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
                </PageLayout>
            </section>
        </div>
    );
}

export default CompanyProfile;
