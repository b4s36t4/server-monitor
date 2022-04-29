import React from "react";
import { Input, IInputProps } from "native-base";

const CustomInput = ({ ...props }: IInputProps) => {
  return (
    <Input
      {...props}
      fontFamily="Lato"
      _hover={{ backgroundColor: "white", borderColor: "black" }}
      _focus={{ backgroundColor: "white", borderColor: "black" }}
    />
  );
};

export default CustomInput;
