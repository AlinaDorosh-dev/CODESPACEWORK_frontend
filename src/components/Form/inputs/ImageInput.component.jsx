/**
 * @author VeroniKa Sanchez
 * @author iRaphiki <imraphiki@gmail.com>
 */

import styles from '../../../styles/form.module.css';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';

/**
 * Image Browser Component
 * @param { * }
 * @returns Structure to handler image browser.
 */
export function ImageBrowser({ label, src, accept, onChange }) {
	// Saving inputs references and states.
	const [_src, setSrc] = useState(undefined);
	const [_value, setValue] = useState(undefined);

	// When the component is initialized without dependencies
	useEffect(() => {
		setSrc(src || '');
	}, []);

	// When the component is initialized with src dependencies
	useEffect(() => {
		setSrc(src);
	}, [src]);

	/**
	 * Method to handler onClick input event.
	 * @param { Event } event onClick event object dispatched
	 */
	const onClickHandler = () => {
		const input = document.createElement('input'); // Create input from js (out of DOM)
		input.setAttribute('type', 'file'); // Set input type file
		if (accept) {
			input.setAttribute('accept', accept);
		}
		// Establecemos el listener (método handler) para el evento onchange del input
		// If input file dispatch onChange event, set value with the image data.
		input.onchange = (e) => {
			setValue(e.target.files[0]);
			if (onChange) {
				onChange(e); // Calling original onChange event with @param { Event } e
			}
		};
		input.click(); // Finally, call click() function to simulate user click
	};

	const renderImage = (file) => {
		return URL.createObjectURL(file);
	};

	return (
		<>
			<div className={`${styles['uploading-outer']}`}>
				<div className={`${styles.uploadButton}`}>
					<div
						className={`${styles.uploadButton}`}
						onClick={() => onClickHandler()}>
						{_src && !_value && (
							<img
								className={`${styles['img-size']} ${styles.clickable}`}
								src={_src}
								alt='Profile avatar'></img>
						)}
						{_value && (
							<img
								className={`${styles['img-size']}`}
								src={renderImage(_value)}
								alt='Profile avatar'></img>
						)}
						{!_src && !_value && <InputFile label={label} />}
					</div>
				</div>
				<div className={`${styles.text}`}>
					Tamaño máximo de 1MB | Dimensiones máximas: 600x600 | Extensiones:
					.jpg &amp; .png
				</div>
			</div>
		</>
	);
}

/**
 * Input file private component.
 * @param { label } label text label
 * @returns label with spam style
 */
function InputFile({ label }) {
	return (
		<>
			<label
				className={`${styles['uploadButton-button']}`}
				htmlFor='upload'>
				<FontAwesomeIcon icon={faArrowUp} />
				{label}
			</label>
			<span className={`${styles['uploadButton-file-name']}`}></span>
		</>
	);
}
