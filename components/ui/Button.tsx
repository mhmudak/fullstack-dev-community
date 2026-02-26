import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary" | "danger"
}

const styles = {
    primary: "bg-slate-900 text-white hover:bg-slate-700",
    secondary: "bg-slate-100 text-slate-800 hover:bg-slate-200",
    danger: "bg-red-600 text-white hover:bg-red-500",
}

const Button = ({ variant = "primary", className = "", ...props }: ButtonProps) => {
    return (
        <button
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${styles[variant]} ${className}`}
            {...props}
        />
    )
}

export default Button
