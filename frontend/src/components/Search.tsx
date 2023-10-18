import { Select } from './Select'

type SearchValues = {
  [key: string]: { preUrl: string, postUrl: string }
}

interface SearchProps {
  handleSubmitSearchProducts: (event: React.FormEvent<HTMLFormElement>) => void
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleSelectChange?: (event: React.ChangeEvent<HTMLSelectElement>, type: string) => void
  searchValues: SearchValues
  searchOptionList?: string[]
}

export function Search({ handleSubmitSearchProducts, handleInputChange, handleSelectChange, searchValues, searchOptionList }: SearchProps) {
  return (
    <>
      <form onSubmit={handleSubmitSearchProducts}>
        <label htmlFor='search'>Search</label>
        <input
          onChange={handleInputChange}
          value={searchValues.search.postUrl}
          type='search'
          name='postUrl'
          id='search'
        />
      </form>
      {handleSelectChange && searchOptionList &&
        <Select
          options={searchOptionList}
          value={searchValues.search.preUrl}
          onChange={handleSelectChange}
          nameChange='search'
          nameSelect='preUrl'
          id='searchSelect'
        />
      }

    </>
  )
}