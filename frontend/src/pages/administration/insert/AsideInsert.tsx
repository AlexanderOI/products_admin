import styled from 'styled-components'
import { Select } from '../../../components/Select'
import { useEffect } from 'react'
import { CATEGORY_LIST, SECTION_LIST, SUB_CATEGORY_LIST } from '../../../constants/endpoint'
import { useFetch } from '../../../hooks/useFetch'
import { useSelectInsert } from '../../../context/SelectInsertProvider'
import { asideAdministrationStyle } from '../../../style/css.styles'

const SelectAreaDiv = styled.div`
  ${asideAdministrationStyle}

  select {
  margin-top: 5px;
    width: 80%;
    height: 25px;
  }
`

export function AsideInsert() {
  const { selectInsertValues, setSelectInsertValues } = useSelectInsert()

  const sectionListUrl = SECTION_LIST
  const { data: sectionList } = useFetch(sectionListUrl)
  const categoryListUrl = CATEGORY_LIST + (selectInsertValues.section || sectionList[0])
  const { data: categoryList } = useFetch(categoryListUrl)
  const subCategoryListUrl = SUB_CATEGORY_LIST + (selectInsertValues.category_id || categoryList[0])
  const { data: subCategoryList } = useFetch(subCategoryListUrl)

  useEffect(() => {
    if (categoryList.length > 0) {
      setSelectInsertValues((prevState) => ({
        ...prevState,
        category_id: categoryList[0],
      }))
    }
  }, [categoryList])

  useEffect(() => {
    if (subCategoryList.length > 0) {
      setSelectInsertValues((prevState) => ({
        ...prevState,
        subCategory: subCategoryList[0],
      }))
    }
  }, [subCategoryList])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target

    setSelectInsertValues((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <div>
      <SelectAreaDiv>
        <Select
          label='Select the section'
          options={sectionList}
          value={selectInsertValues.section}
          onChange={handleSelectChange}
          nameChange='section'
          nameSelect='section'
          id='selectSection'
        />
      </SelectAreaDiv>
      <SelectAreaDiv>
        <Select
          label='Select the category'
          options={categoryList}
          value={selectInsertValues.category_id}
          onChange={handleSelectChange}
          nameChange='category_id'
          nameSelect='category_id'
          id='selectSection'
        />
      </SelectAreaDiv>
      <SelectAreaDiv>
        <Select
          label='Select the subcategory'
          options={subCategoryList}
          value={selectInsertValues.subCategory}
          onChange={handleSelectChange}
          nameChange='subCategory'
          nameSelect='subCategory'
          id='selectSection'
        />
      </SelectAreaDiv>
    </div>
  )
}