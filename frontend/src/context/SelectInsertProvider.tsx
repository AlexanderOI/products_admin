import { ReactNode, createContext, useContext, useState } from 'react'

type SelectInsertValues = {
  section: string
  image: string
  name: string
  category: string
  subCategory: string
  stock: number
  price: number
}

type SelectInsertContextType = {
  selectInsertValues: SelectInsertValues
  setSelectInsertValues: React.Dispatch<React.SetStateAction<SelectInsertValues>>
}

const initalContext: SelectInsertContextType = {
  selectInsertValues: {
    section: 'Almacén',
    image: '',
    name: '',
    category: '',
    subCategory: '',
    stock: 0,
    price: 0
  },
  setSelectInsertValues: () => { }
}

const SelectInsertContext = createContext<SelectInsertContextType>(initalContext)

export function SelectInsertProvider({ children }: { children: ReactNode }) {
  const [selectInsertValues, setSelectInsertValues] = useState<SelectInsertValues>(initalContext.selectInsertValues)

  return (
    <SelectInsertContext.Provider value={{ selectInsertValues, setSelectInsertValues }}>
      {children}
    </SelectInsertContext.Provider>
  )
}

export function useSelectInsert() {
  return useContext(SelectInsertContext)
}