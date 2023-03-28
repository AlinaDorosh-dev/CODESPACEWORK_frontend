import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import classesDetails from './ClosedButton.module.css';

function ClosedButton(props) {
    return (
        <div className={classesDetails['back']}>
            <div
                onClick={props.handleClick}
                className={`${props.clicked ? 'is.active' : ''}`}
            >
                <button className={classesDetails['button-styles']}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
        </div>
    );
}

export default ClosedButton;
