"use client";
import { Button } from "@nextui-org/react";

const CustomButton = ({
  className,
  onClick,
  isDisabled,
  fullWidth,
  radius,
  size,
  color,
  variant,
  buttonText,
}) => {
  return (
    <>
      <Button
        className={className}
        onClick={onClick}
        isDisabled={isDisabled}
        fullWidth={fullWidth}
        radius={radius}
        size={size}
        color={color}
        variant={variant}
      >
        {buttonText}
      </Button>
    </>
  );
};

export default CustomButton;
