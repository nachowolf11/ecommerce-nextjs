'use server'
import prisma from "@/lib/prisma";

export const getStockBySlug = async( slug: string ):Promise<number> => {
    try {
        const product = await prisma.product.findFirst({
            where: {
                slug:slug
            },
            select: {
                inStock: true
            }
        })

        if (!product || product.inStock < 0) return 0;

        return product.inStock;
    } catch (error) {
        console.log(error);
        throw new Error('Error al obtener stock por slug')
    }
}