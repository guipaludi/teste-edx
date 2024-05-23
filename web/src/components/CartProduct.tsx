export interface CartProductProps {
  title: string
  description: string
  price: number
}

export function CartProduct(props: CartProductProps) {
  return (
    <tr>
      <td className="border-t px-4 py-2">{props.title}</td>
      <td className="border-t px-4 py-2">{props.description}</td>
      <td className="border-t px-4 py-2">
        {Number(props.price).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        })}
      </td>
    </tr>
  )
}
