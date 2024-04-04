
interface ButtonComponent
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: import("react").ReactNode;
  status: ButtonStatus;
}

type ButtonStatus = "warning" | "info" | "success" | "danger";
