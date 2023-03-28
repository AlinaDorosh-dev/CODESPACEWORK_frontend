/**
 * @fileoveriew Loader component, which is used to show a loading spinner when the user is waiting for a response from the server.
 */

import classes from "./Loader.module.css";

function Loader() {
  return (
    <div className={classes.container}>
      <div className={classes.loader}></div>
    </div>
  );
}

export default Loader;
