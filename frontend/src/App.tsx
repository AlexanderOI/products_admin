import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Products } from "./components/Products"
import { FilterProvider } from "./context/FilterProvider"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <FilterProvider>
          <Routes>
            <Route path={'/'} element={<Products />} />
            <Route path={'/products'} element={<Products />} />
            <Route path={'/products/search/:search/:searchQuery'} element={<Products />} />
            <Route path={'/products/:section'} element={<Products />} />
            <Route path={'/products/:section/:category'} element={<Products />} />
            <Route path={'/products/:section/:category/:subCategory'} element={<Products />} />
            <Route path={'/products/:section/:category/:subCategory/:page'} element={<Products />} />
            <Route path={'/insert'} element={<Products />} />
            <Route path={'/delete'} element={<Products />} />
            <Route path={'/query'} element={<Products />} />
            <Route path="*" element={<p>404</p>} />

          </Routes>
        </FilterProvider>

      </BrowserRouter>
    </>

  )
}

export default App
