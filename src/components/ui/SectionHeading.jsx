export function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="text-sm font-semibold text-cyan-300">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold leading-tight text-white md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  )
}
