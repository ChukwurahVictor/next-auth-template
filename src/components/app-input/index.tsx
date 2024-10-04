import {
  FormLabel,
  FormControl,
  Input,
  FormHelperText,
  FlexProps,
  Icon,
  InputGroup,
  InputRightElement,
  Box,
  InputProps,
  Textarea,
} from "@chakra-ui/react";
// import { generalFormElementStyle } from "@/utils/styles";
import { forwardRef, useState } from "react";
// import { Controller } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
// import PhoneInput from "react-phone-number-input";
// import "react-phone-number-input/style.css";

type AppInputProps = {
  label?: string;
  errorMessage?: string;
  isRequired?: boolean;
  isPhone?: boolean;
  type?: React.HTMLInputTypeAttribute;
  id: string;
  control?: any;
  register?: any;
  tooltip?: string;
  isTextArea?: boolean;
  defaultValue?: string | (string & readonly string[]);
} & FlexProps &
  InputProps;


export const generalFormElementStyle = {
  height: "2.5rem",
  weight: "100%",
  backgroundColor: "#F4F4F4",
  borderBottom: "1.25px solid #8D8D8D",
  boxShadow: "0px - 1px 0px 0px #8D8D8D inset",
  borderRadius: 0,
  color: "#161616",
  fontSize: "1rem",
  fontWeight: 400,
  padding: "0.5rem",
};

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      label,
      errorMessage,
      isRequired,
      type,
      control,
      id,
      isPhone,
      register,
      defaultValue,
      isTextArea,
      _placeholder,
      ...rest
    },
    ref
  ) => {
    const [show, setShow] = useState(false);
    return (
      <FormControl isRequired={isRequired}>
        {label && (
          <FormLabel
            htmlFor={id}
            fontSize="14px"
            fontWeight="400"
            color="text.ash"
          >
            {label}
          </FormLabel>
        )}

        {isTextArea ? (
          <Textarea
            id={id}
            style={{ height: "4.1rem", borderRadius: "0" }}
            {...register}
            placeholder={_placeholder}
          />
        ) : type !== "password" ? (
          <Input
            type={type}
            ref={ref}
            name={id}
            {...rest}
            {...register}
            style={generalFormElementStyle}
            _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
          />
        ) : (
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              ref={ref}
              name={id}
              {...register}
              {...rest}
              style={generalFormElementStyle}
              _placeholder={{ fontSize: "12px", color: "#A8A8A8" }}
            />
            <InputRightElement width="2rem">
              <Box onClick={() => setShow(!show)} color="#A8A8A8">
                <Icon
                  as={show ? AiOutlineEye : AiOutlineEyeInvisible}
                  boxSize={6}
                />
              </Box>
            </InputRightElement>
          </InputGroup>
        )}

        {errorMessage && (
          <FormHelperText fontSize="10px" color="red" role="alert">
            {errorMessage}
          </FormHelperText>
        )}
      </FormControl>
    );
  }
);

AppInput.displayName = "AppInput";
export default AppInput;
