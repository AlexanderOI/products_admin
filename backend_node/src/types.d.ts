export interface ProductsType {
  product_id: number
  sub_category: string
  category: string
  product: string
  alt: string
  price: float
  stock: number
  quantity: number
  img: string
}

export interface ProductsForm {
  sub_category: string
  category: string
  product: string
  alt: string
  price: float
  stock: number
  quantity: number
  img: string
}

export type SecionType = {
  id: number
  category_id: string
  section_id: string
}

//Types products.routes /products
export type Filter = {
  product?: {
    contains: string
  }
  category_id?: string
  sub_category?: string
  price?: number
}

//Type data delete
export type DataDeleteType = {
  preUrl: string
  postUrl: string
}