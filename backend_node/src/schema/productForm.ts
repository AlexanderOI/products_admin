import { z } from 'zod'
import { ProductsForm } from '../types'

const productFormSchema = z.object({
  sub_category: z.string(),
  category_id: z.string(),
  product: z.string(),
  alt: z.string(),
  price: z.number().positive(),
  stock: z.number().int().positive(),
  quantity: z.number().int().positive().default(0),
  img: z.string(),
})

export const validateProductForm = (data: ProductsForm) => {
  return productFormSchema.safeParse(data)
}
