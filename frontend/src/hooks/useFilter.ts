import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

type FilterValues = {
  [key: string]: { preUrl: string, postUrl: string }
}

type FilterHook = {
  filterValues: FilterValues
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, type: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitSearchProducts: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useFilter(sectionList: string[]): FilterHook {
  const { section } = useParams()
  const navigate = useNavigate()

  const [filterValues, setFilterValues] = useState<FilterValues>({
    category: { preUrl: 'category', postUrl: '' },
    section: { preUrl: 'section', postUrl: '' },
    search: { preUrl: 'id', postUrl: '' },
  })

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const { value, name } = e.target

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log(name, value)
    setFilterValues((prevValues) => ({
      ...prevValues,
      search: { ...prevValues.search, [name]: value },
    }))
  }

  const handleSubmitSearchProducts = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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