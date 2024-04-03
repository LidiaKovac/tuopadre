import { ReactNode } from "react";

interface ButtonComponent
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  content: ReactNode;
  status: ButtonStatus;
}

type ButtonStatus = "warning" | "info" | "success" | "danger";
