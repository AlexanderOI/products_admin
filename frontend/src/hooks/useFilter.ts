import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORY_LIST, SECTION_LIST } from '../constants/endpoint'

type FilterValues = {
  [key: string]: { preUrl: string, postUrl: string }
}

type FilterHook = {
  sectionList: { section: string }[]
  categoryList: { category: string }[]
  filterValues: FilterValues
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>, type: string) => void
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleSubmitSearchProducts: (e: React.FormEvent<HTMLFormElement>) => void
}

export function useFilter(): FilterHook {
  const { section } = useParams()
  const navigate = useNavigate()

  const [sectionList, setSectionList] = useState([{ section: '' }])
  const [categoryList, setCategoryList] = useState([{ category: '' }])

  const [filterValues, setFilterValues] = useState<FilterValues>({
    category: { preUrl: 'category', postUrl: '' },
    section: { preUrl: 'section', postUrl: '' },
    search: { preUrl: 'id', postUrl: '' },
  })


  useEffect(() => {
    async function fetchSectionList() {
      try {
        const response = await fetch(SECTION_LIST)
        const data = await response.json()
        setSectionList(data)
      } catch (error) {
        console.log('Error Get Section List: ', error)
      }
    }

    fetchSectionList()
  }, [])

  useEffect(() => {
    const sectionParams = section || sectionList[0].section
    async function fetchCategoryList() {
      try {
        const response = await fetch(CATEGORY_LIST + sectionParams)
        const data = await response.json()
        setCategoryList(data)
      } catch (error) {
        console.log('Error Get Category List: ', error)
      }
    }

    fetchCategoryList()
  }, [section, sectionList])

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, type: string) => {
    const { value, name } = e.target

    setFilterValues((prevValues) => ({
      ...prevValues,
      [type]: { ...prevValues[type], [name]: value },
    }))

    if (type === 'category') {
      navigate(`/products/${section ?? sectionList[0].section}/${value}`)
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
    sectionList,
    categoryList,
    filterValues,
    handleSelectChange,
    handleInputChange,
    handleSubmitSearchProducts,
  }
}