'use server';

import prisma from '@/lib/prisma';


export const setTransactionIdAndOrderPaid = async( orderId: string, transactionId: string ) => {

  try {
    
    const order = await prisma.order.update({
      where: { id: orderId },
      data: { transactionId: transactionId, isPaid: true }
    });

    if ( !order ) {
      return {
        ok:false,
        message: `No se encontró una orden con el ${ orderId }`,
      }
    }

    return { ok: true }


  } catch (error) {
    
    console.log(error);

    return {
      ok: false,
      message: 'No se pudo actualizar el id de la transacción'
    }

  }


}