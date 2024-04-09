'use server';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getOrderById = async (id: string) => {

    const session = await auth();
    if (!session?.user) {
        return {
            ok: false,
            message: 'Debe estar autenticado.'
        }
    }

    try {
        const order = await prisma.order.findUnique({
            where: { id },
            include: {
                OrderAddress: true,
                OrderItem: {
                    select: {
                        price: true,
                        quantity: true,
                        size: true,

                        product: {
                            select: {
                                title: true,
                                slug: true,
                                ProductImage: {
                                    select: {
                                        url: true
                                    },
                                    take: 1
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!order) {
            return {
                ok: false,
                message: `No se encontró ninguna orden con el id ${id}.`
            }
        }

        if ( session.user.role === 'user' ) {
            if ( session.user.id !== order.userId ) {
                throw `${ id } no es de ese usuario`
            }
        }

        return {
            ok: true,
            order
        }


    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: `No se pudo obtener la orden de id ${id}.`
        }
    }
}