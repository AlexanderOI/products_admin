import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Header } from "./components/Header"
import { Products } from "./components/Products"

function App() {

  return (
    <>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path={'/'} element={<Products />} />
          <Route path={'/products'} element={<Products />} />
          <Route path={'/products/search/:search/:searchQuery'} element={<Products />} />
          <Route path={'/products/search/:search/:searchQuery/page/:page'} element={<Products />} />
          <Route path={'/products/:section'} element={<Products />} />
          <Route path={'/products/:section/page/:page'} element={<Products />} />
          <Route path={'/products/:section/:category'} element={<Products />} />
          <Route path={'/products/:section/:category/page/:page'} element={<Products />} />
          <Route path={'/products/:section/:category/:subCategory'} element={<Products />} />
          <Route path={'/products/:section/:category/:subCategory/page/:page'} element={<Products />} />

          <Route path={'/insert'} element={<Products />} />
          <Route path={'/delete'} element={<Products />} />
          <Route path={'/query'} element={<Products />} />
          <Route path="*" element={<p>404</p>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
