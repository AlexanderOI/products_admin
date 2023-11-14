import { Response, Request } from "express"
import { ProductsModel } from "../models/products.model"
import { prisma } from "../services/db"
import { Product } from "@prisma/client"
import { DataDeleteType } from "../types"

export class ProductsController {
  static async getProductsFilter(req: Request, res: Response) {
    try {
      const { id, category, 'sub-category': sub_category, name, price } = req.query as { [key: string]: string | undefined }
      const products = await ProductsModel.getProductsFilter({ id, category, sub_category, name, price })

      if (products.length > 0) {
        return res.json(products)
      } else {
        return res.status(404).json({ error: 'No products found' })
      }
    } catch (error) {
      console.error('Error in /product route:', error)
      return res.status(500).json({ error: 'Internal server error' })
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getProductsSection(req: Request, res: Response) {
    const { section } = req.query as { [key: string]: string | undefined }
    const products = await ProductsModel.getProductsSection({ section })

    if (products.length > 0) {
      return res.json(products)
    } else {
      return res.status(404).json({ error: 'No products found' })
    }
  }

  static async getProductsSectionList(req: Request, res: Response) {
    const sections = await ProductsModel.getProductsSectionList()

    return res.json(sections)
  }

  static async getProductsCategory(req: Request, res: Response) {
    const { 'list': sectionName } = req.query as { [key: string]: string | undefined }
    const categoryList = await ProductsModel.getProductsCategory({ sectionName })

    return res.json(categoryList)
  }

  static async getProductsSubCategory(req: Request, res: Response) {
    const { 'list': categoryName } = req.query as { [key: string]: string | undefined }
    const subCategoriesList = await ProductsModel.getProductsSubCategory({ categoryName })

    return res.json(subCategoriesList)
  }

  static async InsertProducts(req: Request, res: Response) {
    const dataInsert: Product = req.body
    const productInsert = await ProductsModel.InsertProducts({ dataInsert })

    if (productInsert) {
      let responseData = { 'message': 'Product saved successfully in the database' }
      return res.json(responseData)
    }
    else {
      let responseData = { 'message': 'Invalid form data' }
      return res.status(400).json(responseData)
    }
  }

  static async deleteProducts(req: Request, res: Response) {
    const dataDelete: DataDeleteType = req.body

    const productDelete = await ProductsModel.deleteProducts({ dataDelete })

    if (productDelete) {
      const responseData = { 'message': 'The product was successfully removed' }
      return res.json(responseData)
    } else {
      const responseData = { 'message': 'An error occurred while deleting the product, please try again' }
      return res.status(400).json(responseData)
    }
  }

  static async queryProducts(req: Request, res: Response) {

  }

  static async updateProducts(req: Request, res: Response) {

  }
}