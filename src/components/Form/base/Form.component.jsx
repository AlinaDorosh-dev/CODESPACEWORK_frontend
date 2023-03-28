/**
 * @author VeroniKa Sanchez
 * @author iRaphiki <imraphiki@gmail.com>
 */
import { useEffect, useRef } from 'react';
/**
 * Formn Component
 * @param { onSubmit, onChange, children }
 * @returns { Form }
 */
export const Form = ({ onSubmit, onChange, children }) => {
	const formRef = useRef();

	/**
	 * Method to process the event onSubmit:
	 * Prevent default actions, add validation and set form data.
	 * @param { Event } e
	 */
	const onSubmitForm = (e) => {
		e.preventDefault();
		validateForm();
		const formValues = getFormValues();
		if (onSubmit) {
			onSubmit(formValues);
		}
	};

	/**
	 * Method to process the event onChange
	 * Prevent default actions, add validation and set form data.
	 * @param { Event } e
	 */
	const onChangeForm = (e) => {
		e.preventDefault();
		validateForm();
		const formValues = getFormValues();
		if (onChange) {
			onChange(formValues);
		}
	};

	/**
	 * Method for validation, if any fields are invalid, set invalid as true.
	 */
	const validateForm = () => {
		let invalid = false;
		for (const element of formRef.current.elements) {
			if (element.invalid) {
				invalid = true;
				break;
			}
		}
		formRef.current.invalid = invalid;
		formRef.current.valid = !invalid;
	};

	/**
	 * Method to get form fields values
	 * @returns form data and valid state (valid or invalid)
	 */
	const getFormValues = () => {
		// Object to store form values
		const formValues = {
			fields: {},
			valid: false,
			invalid: false,
		};
		for (const element of formRef.current.elements) {
			if (!element.name) {
				continue;
			}
			if (
				element.type !== 'radio' ||
				(element.type === 'radio' && element.checked)
			) {
				formValues.fields[element.name] = {
					value: processValue(element),
					invalid: element.invalid,
					valid: element.valid,
				};
			}
		}
		formValues.invalid = formRef.current.invalid;
		formValues.valid = formRef.current.valid;
		return formValues;
	};

	/**
	 * Method to process the value from param input
	 * @param { * } input input to work with
	 * @returns value from param input
	 */
	const processValue = (input) => {
		let value = input.value;
		if (input.type === 'checkbox') {
			value = input.checked;
		} else if (input.type === 'date') {
			value = new Date(input.value);
		} else if (input.type === 'numbers') {
			value = Number(input.value);
		}
		return value;
	};

	/**
	 * Hook useEffect to handler the validation and forms data into onChange event if is trigged.
	 */
	useEffect(() => {
		validateForm();
		const formValues = getFormValues();
		if (onChange) {
			onChange(formValues);
		}
	}, []);

	return (
		<>
			<form
				ref={formRef}
				onInput={(e) => onChangeForm(e)}
				onSubmit={(e) => onSubmitForm(e)}>
				{children}
			</form>
		</>
	);
};
