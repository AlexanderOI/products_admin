import { Router } from 'express'
import { prisma } from '../services/db'
import { ProductsController } from '../controllers/products.controller'


export const productsRouter = Router()

productsRouter.get('/product', ProductsController.getProductsFilter)
productsRouter.get('/section', ProductsController.InsertProducts)
productsRouter.get('/section/list', ProductsController.getProductsSectionList)
productsRouter.get('/category', ProductsController.getProductsCategory)
productsRouter.get('/sub-category', ProductsController.getProductsSubCategory)

productsRouter.post('/insert', ProductsController.InsertProducts)
productsRouter.post('/delete', ProductsController.deleteProducts)
productsRouter.post('/query', ProductsController.queryProducts)

productsRouter.patch('/update', ProductsController.updateProducts)