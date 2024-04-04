'use server';

import { auth } from "@/auth.config";
import { Address, Size } from "@/interfaces";
import prisma from '@/lib/prisma';

interface ProductToOrder{
    quantity: number;
    productId: string;
    size: Size
}

export const placeOrder = async( productIds: ProductToOrder[], address: Address ) => {

    const session = await auth();
    const userId = session?.user.id

    if ( !userId ) {
        return {
            ok: false,
            message: 'No hay sesión de usuario'
        }
    }

    const products = await prisma.product.findMany({
        where: {
            id: {
                in: productIds.map( p => p.productId )
            }
        }
    });

    const itemsInOrder = productIds.reduce( ( count, p ) => count + p.quantity, 0);

    const { subTotal, tax, total } = productIds.reduce( ( totals, item ) => {

        const productQuantity = item.quantity;
        const product = products.find( product => product.id === item.productId );

        if ( !product ) throw new Error(`${item.productId} no existe - 500`);

        const subTotal = product.price * productQuantity;
        
        totals.subTotal += subTotal;
        totals.tax += subTotal * 0.15;
        totals.total += subTotal * 1.15;


        return { subTotal: 0, tax: 0, total: 0 }
    }, { subTotal: 0, tax: 0, total: 0 })

}