import { ReactNode, createContext, useContext, useState } from "react"

type UrlParamsType = {
  preUrl: string,
  postUrl: string
}

type FilterContextType = {
  urlParams: UrlParamsType
  setUrlParams: React.Dispatch<React.SetStateAction<UrlParamsType>>
}

const InitialFilterContext: FilterContextType = {
  urlParams: { preUrl: '', postUrl: '' },
  setUrlParams: () => { }
}

const FilterContext = createContext(InitialFilterContext)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [urlParams, setUrlParams] = useState(InitialFilterContext.urlParams)

  return (
    <FilterContext.Provider value={{ urlParams, setUrlParams }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilterContext() {
  return useContext(FilterContext)
}