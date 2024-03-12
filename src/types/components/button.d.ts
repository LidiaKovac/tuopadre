interface ButtonComponent
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: string;
  status: ButtonStatus;
}

type ButtonStatus = "warning" | "info" | "success" | "danger";
