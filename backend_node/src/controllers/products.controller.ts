import { Response, Request } from "express";
import { ProductsModel } from "../models/products.model";
import { prisma } from "../services/db";

export class ProductsController {
  static async getProductsFilter(req: Request, res: Response) {
    try {
      const { id, category, 'sub-category': sub_category, name, price } = req.query as { [key: string]: string | undefined }
      const products = await ProductsModel.getProductsFilter({ id, category, sub_category, name, price })

      if (products.length > 0) {
        return res.json(products);
      } else {
        return res.status(404).json({ error: 'No products found' });
      }
    } catch (error) {
      console.error('Error in /product route:', error);
      return res.status(500).json({ error: 'Internal server error' });
    } finally {
      await prisma.$disconnect();
    }
  }

  static async getProductsSection(req: Request, res: Response) {

  }

  static async getProductsSectionList(req: Request, res: Response) {

  }

  static async getProductsCategory(req: Request, res: Response) {

  }

  static async getProductsSubCategory(req: Request, res: Response) {

  }

  static async InsertProducts(req: Request, res: Response) {

  }

  static async deleteProducts(req: Request, res: Response) {

  }

  static async queryProducts(req: Request, res: Response) {

  }

  static async updateProducts(req: Request, res: Response) {

  }
}