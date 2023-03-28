/**
 * @author VeroniKa Sanchez
 * @author iRaphiki <imraphiki@gmail.com>
 */
import styles from '../../../styles/form.module.css';
import { useEffect, useState, useRef } from 'react';

export function selectOptions(label, value) {
    return {
        label: label,
        value: value,
    };
}

export function SelectInput({
    id,
    label,
    name,
    required,
    items,
    value,
    placeholder,
    disabled,
    defaultValue,
    messageWhenValueIsMissing,
    onChange,
    onBlur,
}) {
    const inputRef = useRef();
    const [_value, setValue] = useState('');
    const [_items, setItems] = useState([]);
    const [_required, setRequired] = useState(false);
    const [_invalid, setInvalid] = useState(false);
    const [_errors, setErrors] = useState(false);

    useEffect(() => {
        setRequired(required);
        setValue(value);
        setItems(items);
        validate(inputRef.current, false);
    }, []);

    useEffect(() => {
        setValue(value || '');
        inputRef.current.value = value || '';
        validate(inputRef.current, false);
        inputRef.current.dispatchEvent(new Event('input', { bubbles: true }));
    }, [value]);

    const onChangeInput = (event) => {
        validate(event.target, true);
        setValue(event.target.value);
        if (onChange) {
            onChange(event);
        }
    };

    const onBlurInput = (event) => {
        validate(event.target, true);
        if (onBlur) {
            onBlur(event);
        }
    };

    const validate = (input, showErrors) => {
        const errors = {
            required: false,
        };

        if (_required && !input.value) {
            errors.required = true;
        }

        let invalid = false;
        for (const errorKey in errors) {
            if (errors[errorKey]) {
                invalid = true;
                break;
            }
        }
        input.invalid = invalid;
        input.valid = !invalid;

        if (showErrors) {
            if (input.invalid && !input.classList.contains(styles.invalid)) {
                input.classList.add(styles.invalid);
            } else if (
                input.valid &&
                input.classList.contains(styles.invalid)
            ) {
                input.classList.remove(styles.invalid);
            }
            setErrors(errors);
            setInvalid(input.invalid);
        }
    };

    return (
        <>
            {label && (
                <label className={`${styles['form-label']}`} htmlFor={id}>
                    {label}
                </label>
            )}
            <select
                ref={inputRef}
                defaultValue={defaultValue}
                value={_value}
                id={id}
                name={name}
                placeholder={placeholder}
                disabled={disabled}
                onInput={(e) => onChangeInput(e)}
                onBlur={(e) => onBlurInput(e)}
                className={`${styles['form-control']} ${styles['select__control']}`}
            >
                {_items.map((item) => {
                    return (
                        <option key={item.value} value={item.value}>
                            {item.label}
                        </option>
                    );
                })}
            </select>
            {_invalid && (
                <div className={`${styles['text-danger']}`}>
                    {_errors && _errors.required && (
                        <span>{messageWhenValueIsMissing}</span>
                    )}
                </div>
            )}
        </>
    );
}
