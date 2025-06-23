export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: any;
  endIcon?: any;
  onClick?: () => void;
  fullWidth?: boolean;
  loading?: boolean;
}

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-600",
};

const defaultStyles = "flex rounded-md font-light justify-center items-center";

const sizeStyles = {
  sm: "py-1 px-2",
  md: "py-2 px-4",
  lg: "py-4 px-6",
};
export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles[props.variant]} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${
        props.loading ? "opacity-45" : ""
      }`}
      disabled={props.loading}
    >
      {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{" "}
      {props.text} {props.endIcon}
    </button>
  );
};
