
export const ErrorList = ({ errors }: { errors: Record<string, Array<string>> }) => {
  return (
    <ul className="error-messages">
      {
        Object.entries(errors).map(([key, value]) => {
          return <li key={key + value}> {key} {value?.join(" ")} </li>
        })
      }
    </ul>
  )
}
