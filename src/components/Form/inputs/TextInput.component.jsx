/**
 * @author VeroniKa Sanchez
 * @author iRaphiki <imraphiki@gmail.com>
 */
import styles from '../../../styles/form.module.css';
import { useEffect, useRef, useState } from 'react';
/**
 * Text Input Component.
 * @return custom label with input type text validated
 */
export const TextInput = ({
	id,
	label,
	name,
	required,
	maxLength,
	minLength,
	pattern,
	value,
	placeholder,
	disabled,
	readonly,
	defaultValue,
	messageWhenValueIsMissing,
	messageWhenValueIsToLong,
	messageWhenValueIsToShort,
	messageWhenWrongPattern,
	onChange,
	onBlur,
}) => {
	// Saving inputs references and states.
	const inputRef = useRef();
	const [_value, setValue] = useState('');
	const [_required, setRequired] = useState(false);
	const [_invalid, setInvalid] = useState(false);
	const [_errors, setErrors] = useState(false);

	// When the component is initialized without dependencies
	useEffect(() => {
		setValue(value || ''); // Set value, if value is undefined, value set empty string.
		setRequired(required); // Set required inputed properties.
		validate(inputRef.current, false); // Validate input value without showing error.
	}, []);

	// When the component is initialized with value dependencies
	useEffect(() => {
		setValue(value || '');
		inputRef.current.value = value || '';
		validate(inputRef.current, false);
		// Force onChange event with bubble propagation true.
		inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
	}, [value]);

	/**
	 * Method to process onChange input event.
	 * @param { Event } e onChange event object dispatched
	 */
	const onChangeInput = (e) => {
		setValue(e.target.value); // Set value of input into state
		validate(e.target, true); // Validate input value, showing errors.

		if (onChange) {
			onChange(e); // Calling original onChange method after our custom data process.
		}
	};

	/**
	 * Method to process onBlur input event.
	 * @param { Event } e onBlur event object dispatched
	 */
	const onBlurInput = (e) => {
		validate(e.target, true); // Validate input value, showing errors.

		if (onBlur) {
			onBlur(e); // Calling original onBlur method after our custom data process.
		}
	};

	/**
	 * Method to validate: required, lenght and pattern.
	 * @param { * } input
	 * @param { Boolean } showErrors
	 */
	const validate = (input, showErrors) => {
		const errors = {
			required: false,
			maxLength: false,
			minLength: false,
			pattern: false,
		};

		if (_required && !input.value) {
			errors.required = true;
		} else if (pattern) {
			const regex = new RegExp(pattern);
			if (!regex.test(input.value)) {
				errors.pattern = true;
			}
		} else if (
			maxLength &&
			maxLength > 0 &&
			input.value &&
			input.value.length > maxLength
		) {
			errors.maxLength = true;
		} else if (
			minLength &&
			minLength > 0 &&
			(!input.value || input.value.length < minLength)
		) {
			errors.minLength = true;
		}

		let invalid = false;
		for (const errorkey in errors) {
			if (errors[errorkey]) {
				invalid = true;
				break;
			}
		}
		input.invalid = invalid;
		input.valid = !invalid;

		if (showErrors) {
			if (input.invalid && !input.classList.contains(styles.invalid)) {
				input.classList.add(styles.invalid);
			} else if (input.valid && input.classList.contains(styles.invalid)) {
				input.classList.remove(styles.invalid);
			}
			setErrors(errors);
			setInvalid(input.invalid);
		}
	};

	return (
		<>
			{label && (
				<label
					className={`${styles['form-label']}`}
					htmlFor={id}>
					{label}
				</label>
			)}
			<input
				id={id}
				ref={inputRef}
				className={`${styles['form-control']}`}
				type={`${styles.text}`}
				name={name}
				value={_value}
				disabled={disabled}
				readOnly={readonly}
				defaultValue={defaultValue}
				placeholder={placeholder}
				onInput={(e) => onChangeInput(e)}
				onBlur={(e) => onBlurInput(e)}
			/>
			{_invalid && (
				<div className={`${styles['text-danger']}`}>
					{_errors && _errors.required && (
						<span>{messageWhenValueIsMissing}</span>
					)}
					{_errors && _errors.maxLength && (
						<span>{messageWhenValueIsToLong}</span>
					)}
					{_errors && _errors.minLength && (
						<span>{messageWhenValueIsToShort}</span>
					)}
					{_errors && _errors.pattern && <span>{messageWhenWrongPattern}</span>}
				</div>
			)}
		</>
	);
};
