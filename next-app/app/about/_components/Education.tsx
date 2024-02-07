interface EducationProps {
  type: string
  title: string
  institution: string
  inCourse?: boolean
}

export function Education({
  type,
  title,
  institution,
  inCourse = false
}: EducationProps) {
  return (
    <li className="my-14 sm:my-auto">
      {type} <span className="italic">&quot;{title}&quot;</span>
      <span className="hidden sm:inline"> - </span>
      <br className="inline sm:hidden" />
      <span className="float-right -mt-2 text-right font-semibold sm:float-none sm:text-left">
        {institution}
      </span>{' '}
      {inCourse && (
        <span className="text-secondary text-sm italic">(en curso)</span>
      )}
    </li>
  )
}
