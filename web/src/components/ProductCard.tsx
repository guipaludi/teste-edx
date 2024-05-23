import Image from 'next/image'

export interface ProductCardProps {
  title: string
  description: string
  price: string
  image: string
  addToCart: () => void
}

export function ProductCard(props: ProductCardProps) {
  return (
    <div className="w-48 rounded border p-2 shadow-lg">
      <div className="mb-2 flex items-center justify-center  bg-gray-200">
        <Image
          src={props.image}
          alt={props.title}
          className="h-full w-full object-cover"
          width={400}
          height={400}
        />
      </div>
      <h3 className="text-base font-bold">{props.title}</h3>
      <p className="text-sm text-gray-700">{props.description}</p>
      <p className="text-sm font-bold text-blue-500">{props.price}</p>
      <button
        onClick={props.addToCart}
        className="mt-2 rounded bg-blue-500 px-3 py-1 text-sm text-white hover:bg-blue-400"
      >
        Adicionar no Carrinho
      </button>
    </div>
  )
}
