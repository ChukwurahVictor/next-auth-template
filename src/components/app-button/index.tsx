import chakraThemes from "@/utils/themes";
import { background, Button, ButtonProps, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

interface PropType extends ButtonProps {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "danger-outline"
    | "outline"
    | "grey"
    | "primary-outline";
  width?: string;
  loading?: boolean;
  style?: React.CSSProperties;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

const AppButton = ({
  children,
  type,
  onClick,
  disabled,
  variant = "primary",
  width,
  loading,
  style,
  backgroundColor,
  hoverBackgroundColor,
  ...rest
}: PropType) => {
  return (
    <Button
      isLoading={loading}
      onClick={onClick}
      w={width}
      type={type}
      style={style}
      isDisabled={disabled}
      fontWeight="500"
      size="sm"
      color="white"
      px="64px"
      py="20px"
      bg={backgroundColor ?? "color.lightBlue"}
      fontSize={14}
      _hover={{
        background: hoverBackgroundColor ? hoverBackgroundColor : "brand.dark",
      }}
    >
      {children}
    </Button>
  );
};

export default AppButton;
