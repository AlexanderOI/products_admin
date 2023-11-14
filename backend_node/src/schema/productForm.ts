import { z } from 'zod'
import { Product } from '@prisma/client'

const productFormSchema = z.object({
  sub_category: z.string(),
  category_id: z.string(),
  product: z.string(),
  alt: z.string(),
  price: z.number().positive(),
  stock: z.number().positive(),
  quantity: z.number().min(0).max(0),
  img: z.string(),
})

export const validateProductForm = (data: Product) => {
  return productFormSchema.safeParse(data)
}
