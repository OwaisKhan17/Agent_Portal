"use client";
import { Input } from "@nextui-org/react";

const InputField = ({
  type,
  label,
  value,
  labelPlacement,
  placeholder,
  description,
  defaultValue,
  isRequired,
  isDisabled,
  // className,
  onChange,
}) => {
  return (
    <>
      <Input
        type={type}
        label={label}
        value={value}
        labelPlacement={labelPlacement}
        placeholder={placeholder}
        description={description}
        defaultValue={defaultValue}
        isRequired={isRequired}
        isDisabled={isDisabled}
        classNames={{
          label: "text-base text-black font-normal",
          inputWrapper:
            "w-full text-sm mt-2 px-4 py-4 border border-[#8E8E8E] rounded-md bg-transparent",
        }}
        onChange={onChange}
      />
      {/* <label className={labelClasses}>{labelText}</label>
            <input
                placeholder={fieldPlaceholder}
                value={fieldValue}
                onChange={onChange}
                className={fieldClasses}
                type={fieldType}
            /> */}
    </>
  );
};

export default InputField;
