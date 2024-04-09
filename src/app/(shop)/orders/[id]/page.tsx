
import { Title } from '@/components';
import Image from 'next/image';
import clsx from 'clsx';
import { IoCardOutline } from 'react-icons/io5';
import { getOrderById } from '@/actions';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string;
  };
}


export default async function OrderByIdPage( { params }: Props ) {

  const { id } = params;

  const { order } = await getOrderById(id);

  // Todo: verificar
  // redirect(/)



  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">

      <div className="flex flex-col w-[1000px]">

        <Title title={ `Orden #${ id }` } />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Carrito */ }
          <div className="flex flex-col mt-5">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order?.isPaid,
                  'bg-green-700': order?.isPaid,
                }
              )
            }>
              <IoCardOutline size={ 30 } />
              <span className="mx-2">{
                order?.isPaid ? 'Pagada' : 'Pendiente de pago'
              }</span>
            </div>



            {/* Items */ }
            {
              order?.OrderItem.map( orderItem => (

                <div key={ orderItem.product.slug + '-' + orderItem.size } className="flex mb-5">
                  <Image
                    src={ `/products/${ orderItem.product.ProductImage[ 0 ].url }` }
                    width={ 100 }
                    height={ 100 }
                    style={ {
                      width: '100px',
                      height: '100px'
                    } }
                    alt={ orderItem.product.title }
                    className="mr-5 rounded"
                  />

                  <div>
                    <p>{ orderItem.product.title } - { orderItem.size }</p>
                    <p>${ orderItem.price } x { orderItem.quantity }</p>
                    <p className="font-bold">Subtotal: ${ currencyFormat(orderItem.price * orderItem.quantity) }</p>
                  </div>

                </div>


              ) )
            }
          </div>




          {/* Checkout - Resumen de orden */ }
          <div className="bg-white rounded-xl shadow-xl p-7">

            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">{ order?.OrderAddress?.firstName } { order?.OrderAddress?.lastName }</p>
              <p>{ order?.OrderAddress?.address }</p>
              <p>{ order?.OrderAddress?.address2 }</p>
              <p>{ order?.OrderAddress?.city }</p>
              <p>{ order?.OrderAddress?.countryId }</p>
              <p>CP { order?.OrderAddress?.postalCode }</p>
              <p>{ order?.OrderAddress?.phone }</p>
            </div>

            {/* Divider */ }
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />


            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">

              <span>No. Productos</span>
              <span className="text-right">{order?.itemsInOrder === 1 ? '1 artículo' : `${order?.itemsInOrder} artículos`}</span>

              <span>Subtotal</span>
              <span className="text-right">$ { order?.subTotal }</span>

              <span>Impuestos (15%)</span>
              <span className="text-right">$ { order?.tax }</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ { order?.total }</span>


            </div>

            <div className="mt-5 mb-2 w-full">

            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order?.isPaid,
                  'bg-green-700': order?.isPaid,
                }
              )
            }>
              <IoCardOutline size={ 30 } />
              <span className="mx-2">{
                order?.isPaid ? 'Pagada' : 'Pendiente de pago'
              }</span>
            </div>

            </div>


          </div>



        </div>



      </div>


    </div>
  );
}