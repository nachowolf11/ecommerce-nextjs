'use server'
import prisma from '@/lib/prisma';

export const deleteUserAddress = async (userId: string) => {
    try {

        const address = await prisma.userAddress.findUnique({
            where: { userId }
        });

        if (!address) {
            return {
                ok: false,
                message: 'El usuario no cuenta con una dirección guardada.'
            }
        }

        await prisma.userAddress.delete({
            where: { userId }
        });

        return {
            ok: true,
            message: 'La dirección fue eliminada correctamente.'
        }
    } catch (error) {
        console.log(error);
        return {
            ok: false,
            message: 'No se pudo borrar la dirección.'
        }
    }
}