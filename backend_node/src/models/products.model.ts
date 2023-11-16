import { Product } from "@prisma/client"
import { executeQuery, prisma } from "../services/db"
import { DataDeleteType, Filter, SQLQuery } from "../types"
import { validateProductForm } from "../schema/productForm"

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
    const categories_section = await prisma.sectionCategory.findMany({
      where: {
        section_id: section
      },
      select: {
        category_id: true
      },
    })
    const categories = categories_section.map(category => category.category_id)

    let productsOfsection: Product[] = []
    for (const category of categories) {
      let products = await prisma.product.findMany({
        where: {
          category_id: category
        }
      })
      productsOfsection = productsOfsection.concat(products)
    }

    return productsOfsection
  }

  static async getProductsSectionList() {
    const sections = await prisma.section.findMany()
    const sectionList = sections.map(section => section.section)
    return sectionList
  }

  static async getProductsCategory({ sectionName }: GetProductsCategory) {
    const categories = await prisma.sectionCategory.findMany({
      where: {
        section_id: sectionName
      },
      select: {
        category_id: true
      }
    })
    const categoryList = categories.map(categories => categories.category_id)

    return categoryList
  }

  static async getProductsSubCategory({ categoryName }: GetProductsSubCategory) {
    const subCategories = await prisma.product.findMany({
      where: {
        category_id: categoryName
      },
      distinct: ['sub_category'],
      select: {
        sub_category: true
      }
    })
    const subCategoriesList = subCategories.map(subCategory => subCategory.sub_category)

    return subCategoriesList
  }

  static async InsertProducts({ dataInsert }: InsertProducts) {
    const dataValid = validateProductForm(dataInsert)

    if (dataValid.success) {
      await prisma.product.create({
        data: {
          sub_category: dataValid.data.sub_category,
          category_id: dataValid.data.category_id,
          product: dataValid.data.product,
          alt: dataValid.data.alt,
          price: dataValid.data.price,
          stock: dataValid.data.stock,
          quantity: dataValid.data.quantity,
          img: dataValid.data.img,
        }
      })
      return true

    } else {
      return false
    }

  }

  static async deleteProducts({ dataDelete }: DeleteProducts) {
    function isNumber(str: string) {
      return /^\d+$/.test(str)
    }

    if (isNumber(dataDelete.postUrl) && dataDelete.preUrl === 'id') {
      const product_id = parseInt(dataDelete.postUrl)
      await prisma.product.delete({
        where: {
          product_id: product_id
        }
      })
      return true
    } else {
      return false
    }
  }

  static async queryProducts({ sqlQuery }: QueryProducts) {
    const rigthList = ['SELECT', 'CREATE', 'INSERT', 'UPDATE', 'DELETE']

    let objectRights: string[] = []
    Object.entries(sqlQuery.rigth).forEach(([_rigth, value], index) => {
      if (value === false) {
        objectRights.push(rigthList[index])
      }
    })

    let isValid: boolean = false
    for (let i = 0; i < objectRights.length; i++) {
      isValid = sqlQuery.query.toLowerCase().includes(objectRights[i].toLowerCase())
      if (isValid) break
    }

    if (sqlQuery.query && !isValid) {
      const rows = await executeQuery(sqlQuery.query)
      const columns = Object.keys(rows[0])
      const results = rows.map((row) => Object.values(row))
      const response = { headers: columns, content: results }

      return [true, response]
    } else {
      return [false]
    }
  }

  static async updateProducts({ dataUpdate }: UpdateProducts) {
    if (dataUpdate.length > 8) {
      await prisma.product.update({
        where: { product_id: parseInt(dataUpdate[0]) },
        data: {
          sub_category: dataUpdate[1],
          category_id: dataUpdate[2],
          product: dataUpdate[3],
          alt: dataUpdate[4],
          price: parseInt(dataUpdate[5]),
          stock: parseInt(dataUpdate[6]),
          quantity: parseInt(dataUpdate[7]),
          img: dataUpdate[8],
        }
      })

      return true
    } else {
      return false
    }

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
  dataInsert: Product
}

type DeleteProducts = {
  dataDelete: DataDeleteType
}

type QueryProducts = {
  sqlQuery: SQLQuery
}

type UpdateProducts = {
  dataUpdate: string[]
}