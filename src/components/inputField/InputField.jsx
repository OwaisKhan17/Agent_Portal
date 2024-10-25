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
            {/* <label className="text-base text-black font-normal">Enter your Password</label> */}
            {/* <input
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparent"
                type="password"
            /> */}
        </>
    )
}

export default InputField;