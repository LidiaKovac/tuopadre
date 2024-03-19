interface InputComponent
    extends React.InputHTMLAttributes<HTMLInputElement> {
    submitAction: MouseEventHandler<SVGElement>
}