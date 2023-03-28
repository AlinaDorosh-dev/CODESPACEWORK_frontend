/**
 * @Author Daniel Villalba
 * @modifiedBy
 */
import styles from "../styles/form.module.css";
import { Form } from "../components/Form/base/Form.component";
import { TextInput } from "../components/Form/inputs/TextInput.component";
import { TextAreaInput } from "../components/Form/inputs/TextAreaInput.component";
import { SelectInput } from "../components/Form/inputs/SelectInput.component";
import { Title } from "../components/Form/Title.component";
import { JobService } from "../services/JobService";
import { useEffect, useState } from "react";
import { Job } from "../models/postAJob.model";
import { useParams } from "react-router";
import PageLayout from "../components/sidemenu/PageLayout";

function PostAJobComponents() {
  const [job, setJob] = useState(new Job());
  const [formData, setFormData] = useState({});
  const [saved, setSaved] = useState("not_saved");
  const [jobData, setJobData] = useState(Job.getJobData());
  const params = useParams();

  // Selects items

  //useeffect: carga del componente

  useEffect(() => {
    userAuth();
  }, []);

  const userAuth = async () => {
    //Sacar los datos de usuario
    // Buscar parametro de la URL (jobid) si tenemos jobid es que estamos editando
    const job = params.jobId;

    //comprobar si tenemos los datos
    if (!job) {
      return false;
    }

		//Hacemos la llamada que devuelva los datos del job (si es que existe)
		//y si lo encontramos lo metemos en el useffect
		const data = await JobService.getById(job);
         console.log(data)
		//Seteamos los datos del usuario
		// setJobData(data);
		// console.log("jobData", jobData);
		setJob(data);
	};

  const saveUpdateJob = async (formData) => {
    //recogemos datos del formulario de modificación (estan en formData)

    //mapeamos los datos de la oferta
    const newJob = new Job(); // new Job da error cambio a minuscula

		newJob._id = job._id;
		newJob.title = formData.fields.title.value;
		newJob.jobType = formData.fields.jobType.value;
		newJob.description = formData.fields.description.value;
		newJob.salary = formData.fields.salary.value;
		newJob.specialtyJob = formData.fields.specialtyJob.value;
		newJob.workDay = formData.fields.workDay.value;
		newJob.location = {};
		newJob.location.city = formData.fields.city.value;
		newJob.location.country = formData.fields.country.value;
		//comprobamos si existe la oferta
		if (!newJob._id) {
			try {
				//Creamos el job en la ddbb
				let jobData = await JobService.newjob(newJob);
console.log(jobData)
				//Seteamos estado y datos
				setJob(jobData);
				setSaved('success');
			} catch (error) {
				setSaved('error');
				console.log(error);
			}
		} else {
			try {
				//Actualizamos el usuario en la ddbb
				let jobData = await JobService.editjob(newJob._id, newJob);
				console.log(jobData);

        //Seteamos estado y datos
        setJob(jobData);
        setSaved("success");
      } catch (error) {
        setSaved("error");
        console.log(error);
      }
    }

    // Comentario del saved desaparece a los 3 segundos

    setTimeout(() => {
      if (saved === "success") {
        //TODO redirección a calendario
      }
      setSaved(null);
    }, 3000);
  };

  return (
    <div className={`${styles["page-wrapper"]}`}>
      <section className={`${styles["dashboard"]}`}>
        <div className={`${styles["dash-title"]}`}>
          <Title
            title="Publicar un nuevo trabajo"
            altText="¿Listo para encontrar talento?"
            size="l"
          />
        </div>
        <PageLayout />
        <div
          className={`${styles["mb-4"]} ${styles["ms-0"]} ${styles["show-1023"]}`}
        >
          <div className={`${styles["container"]}`}>
            <div className={`${styles["container-title"]}`}>
              <Title title="Publicar Trabajo" size="s" />
            </div>
            <div className={`${styles["container-content"]}`}>
              <Form
                onSubmit={(formData) => {
                  saveUpdateJob(formData);
                }}
                onChange={(formData) => {
                  setFormData(formData);
                }}
              >
                <div className={`${styles["row"]}`}>
                  <div
                    className={`${styles["input-container"]} ${styles["col-md-12"]}`}
                  >
                    <TextInput
                      name="title"
                      label="Puesto de Trabajo"
                      placeholder="Defina el puesto de trabajo..."
                      pattern="[A-Za-z]"
                      messageWhenValueIsMissing="Debe agregar un puesto de trabajo"
                      messageWhenWrongPattern="Ingrese solo valores de texto"
                      value={job.title}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["input-container"]}`}
                  >
                    <TextAreaInput
                      name="description"
                      label="Descripción del Puesto de Trabajo"
                      placeholder="Descripción y condiciones... "
                      pattern="[A-Za-z0-9-$@#&%/()!¡¿?]"
                      rows="10"
                      messageWhenValueIsMissing="Debe agregar una descripción"
                      messageWhenWrongPattern="Ingrese solo valores de texto, numéricos o caracteres especiales"
                      value={job.description}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <SelectInput
                      name="specialtyJob"
                      label="Categorías"
                      items={jobData.categoryItems}
                      value={job.specialtyJob}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <TextInput
                      name="salary"
                      label="Oferta Salarial"
                      placeholder="Salario Anual Bruto Ofrecido en €"
                      pattern="[0-9]{4,6}"
                      messageWhenWrongPattern="Ingrese solo valores numéricos"
                      messageWhenValueIsMissing="Debe agregar una oferta salarial"
                      value={job.salary}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <SelectInput
                      name="jobType"
                      label="Modalidad"
                      items={jobData.modalityItems}
                      value={job.modality}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <SelectInput
                      name="workDay"
                      label="Jornada Laboral"
                      items={jobData.workdayItems}
                      value={job.workDay}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <SelectInput
                      name="country"
                      label="País"
                      items={jobData.countryItems}
                      value={job.location?.country}
                    />
                  </div>
                  <div
                    className={`${styles["col-md-12"]} ${styles["col-lg-6"]} ${styles["input-container"]}`}
                  >
                    <SelectInput
                      name="city"
                      label="Ciudad"
                      items={jobData.cityItems}
                      value={job.location?.city}
                    />
                  </div>
                  {saved === "success" ? (
                    <strong
                      className={`${styles["alert"]} ${styles["alert-success"]}`}
                    >
                      Se ha guardado correctamente
                    </strong>
                  ) : (
                    ""
                  )}
                  {saved === "error" ? (
                    <strong
                      className={`${styles["alert"]} ${styles["alert-danger"]}`}
                    >
                      Es necesario rellenar todos los campos para guardar
                    </strong>
                  ) : (
                    ""
                  )}
                  <div
                    className={`${styles["col-md-12"]} ${styles["input-container"]}`}
                  >
                    <button
                      type="submit"
                      disabled={formData.invalid}
                      className={
                        formData.invalid
                          ? `${styles.btn} ${styles["btn-disabled"]}`
                          : `${styles.btn} ${styles["btn-primary"]}`
                      }
                    >
                      Guardar
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PostAJobComponents;
