import { prisma } from "../services/db"
import { Filter } from "../types"

export class ProductsModel {
  static async getProductsFilter({ id, category, sub_category, name, price }: GetProductsFilter) {
    let products

    if (id) {
      products = await prisma.product.findMany({
        where: {
          product_id: parseInt(id.toString()),
        },
      })
    } else {
      const filter: Filter = {}

      if (category) filter.category_id = category.toString()
      if (sub_category) filter.sub_category = sub_category.toString()
      if (name) filter.product = { contains: name.toString(), }
      if (price) filter.price = parseFloat(price.toString())

      products = await prisma.product.findMany({
        where: filter,
      })
    }

    return products
  }

  static async getProductsSection({ section }: GetProductsSection) {

  }

  static async getProductsSectionList() {

  }

  static async getProductsCategory({ sectionName }: GetProductsCategory) {

  }

  static async getProductsSubCategory({ categoryName }: GetProductsSubCategory) {

  }

  static async InsertProducts({ dataInsert }: InsertProducts) {

  }

  static async deleteProducts({ dataDelete }: DeleteProducts) {

  }

  static async queryProducts({ querySQL }: QueryProducts) {

  }

  static async updateProducts({ dataUpdate }: UpdateProducts) {

  }
}


type GetProductsFilter = {
  id: string | undefined
  category: string | undefined
  sub_category: string | undefined
  name: string | undefined
  price: string | undefined

}

type GetProductsSection = {
  section: string | undefined
}

type GetProductsCategory = {
  sectionName: string | undefined
}

type GetProductsSubCategory = {
  categoryName: string | undefined
}

type InsertProducts = {
  dataInsert: undefined
}

type DeleteProducts = {
  dataDelete: undefined
}

type QueryProducts = {
  querySQL: undefined
}

type UpdateProducts = {
  dataUpdate: undefined
}