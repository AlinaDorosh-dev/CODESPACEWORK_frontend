import classes from "./NotFound.module.css";
import fondo from "../../assets/img/not-found.jpg";

function NotFound() {
  return (
    <section className={classes["not-found-page"]}>
      <img className={classes.fondo} src={fondo} alt='' />
      <p className={classes.num}>404</p>
      <p className={classes.text}>Pagina no encontrada</p>
      <a className={classes.btn} href='/'>
        VOLVER A INICIO
      </a>
    </section>
  );
}

export default NotFound;
