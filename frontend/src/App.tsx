import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Header } from './components/Header'
import { Products } from './pages/products/Products'
import { Insert } from './pages/administration/insert/Insert'
import { SelectInsertProvider } from './context/SelectInsertProvider'
import { Delete } from './pages/administration/delete/Delete'

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


          <Route path={'/administration'} element={<SelectInsertProvider><Insert /></SelectInsertProvider>} />
          <Route path={'/administration/insert'} element={<SelectInsertProvider><Insert /></SelectInsertProvider>} />


          <Route path={'/administration/delete'} element={<Delete />} />
          <Route path={'/query'} element={<Products />} />
          <Route path='*' element={<p>404</p>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
