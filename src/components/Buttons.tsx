interface ButtonProps {
  label: string;                
  onClick: () => void;          
  variant?: "primary" | "danger" | "secondary"; 
  disabled?: boolean;          
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "primary",
  disabled = false,
}) => {

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "8px 12px",
        borderRadius: 8,
        border: "1px solid #222",
        background: variant === "danger" ? "#c0392b" : "#111",
        color: "#fff",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
      }}
    >
      {label}
    </button>
  );
};

export default Button;
