'use client'
const InputField = ({labelClasses, labelText, fieldPlaceholder, fieldValue, onChange, fieldClasses, fieldType}) => {
    return(
        <>
            <label className={labelClasses}>{labelText}</label>
            <input
                placeholder={fieldPlaceholder}
                value={fieldValue}
                onChange={onChange}
                className={fieldClasses}
                type={fieldType}
            />
        </>
    )
}

export default InputField;