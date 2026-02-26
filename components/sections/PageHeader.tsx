type PageHeaderProps = {
    title: React.ReactNode;
    subtitle?: string
}

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
    return (
        <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
                {title}
            </h1>
            {subtitle && (
                <p className="text-slate-600">
                    {subtitle}
                </p>
            )}
        </div>
    )
}

export default PageHeader
