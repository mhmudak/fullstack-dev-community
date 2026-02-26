import { ReactNode } from "react"

type CardProps = {
    children: ReactNode
    className?: string
}

const Card = ({ children, className = "" }: CardProps) => {
    return (
        <div
            className={`bg-white border border-slate-200 rounded-2xl shadow-sm p-6 ${className}`}
        >
            {children}
        </div>
    )
}

export default Card
