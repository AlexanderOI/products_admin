interface SelectProps {
  label?: string
  options: string[]
  value: string
  onChange: (e: React.ChangeEvent<HTMLSelectElement>, name: string) => void
  nameChange: string
  nameSelect: string
  id: string
}

export const Select = ({ label, options, value, onChange, nameChange, nameSelect, id }: SelectProps) => {
  return (
    <>
      {label && <label htmlFor={id}>{label}</label>}
      <select
        onChange={(e) => onChange(e, nameChange)}
        value={value}
        name={nameSelect}
        id={id}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option.replace(/-/g, ' ')}
          </option>
        ))}
      </select>
    </>
  )
}

