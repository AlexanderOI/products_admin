import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import { Filter } from '../types'


export const productsRouter = Router()
const prisma = new PrismaClient()

productsRouter.get('/product', async (req, res) => {
  const { id, category, 'sub-category': sub_category, name, price } = req.query
  try {
    let products;

    if (id) {
      products = await prisma.product.findMany({
        where: {
          product_id: parseInt(id.toString()),
        },
      });
    } else {
      const filter: Filter = {};

      if (category) filter.category_id = category.toString();
      if (sub_category) filter.sub_category = sub_category.toString();
      if (name) filter.product = { contains: name.toString(), };
      if (price) filter.price = parseFloat(price.toString());

      products = await prisma.product.findMany({
        where: filter,
      });
    }

    if (products.length > 0) {
      return res.json(products);
    } else {
      return res.status(404).json();
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' });
  } finally {
    await prisma.$disconnect();
  }
})


productsRouter.get('/section', (req, res) => {
  const { 'section': secion_name } = req.query

})

productsRouter.get('/section/list', (req, res) => {

})

productsRouter.get('/category', (req, res) => {

})

productsRouter.get('/sub-category', (req, res) => {

})

productsRouter.get('/media/images', (req, res) => {

})

productsRouter.post('/insert', (req, res) => {

})

productsRouter.post('/delete', (req, res) => {

})

productsRouter.post('/query', (req, res) => {

})

productsRouter.patch('/update', (req, res) => {

})