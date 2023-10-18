import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type FilterValues = {
  [key: string]: { preUrl: string, postUrl: string }
}

type FilterHook = {
  filterValues: FilterValues
  handleSelectChange: (event: React.ChangeEvent<HTMLSelectElement>, type: string) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitSearchProducts: (event: React.FormEvent<HTMLFormElement>) => void
}

export function useFilter(sectionList: string[]): FilterHook {
  const { section } = useParams()
  const navigate = useNavigate()

  const [filterValues, setFilterValues] = useState<FilterValues>({
    category: { preUrl: 'category', postUrl: '' },
    section: { preUrl: 'section', postUrl: '' },
    search: { preUrl: 'id', postUrl: '' },
  })

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const { value, name } = event.target

    setFilterValues((prevValues) => ({
      ...prevValues,
      [type]: { ...prevValues[type], [name]: value },
    }))

    if (type === 'category') {
      navigate(`/products/${section ?? sectionList[0]}/${value}`)
    } else if (type === 'section') {
      navigate(`/products/${value}`)
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target

    setFilterValues((prevValues) => ({
      ...prevValues,
      search: { ...prevValues.search, [name]: value },
    }))
  }

  const handleSubmitSearchProducts = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { preUrl, postUrl } = filterValues.search
    navigate(`/products/search/${preUrl}/${postUrl}`)
  }

  return {
    filterValues,
    handleSelectChange,
    handleInputChange,
    handleSubmitSearchProducts,
  }
}