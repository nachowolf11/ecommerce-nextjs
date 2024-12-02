'use client'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID!,
    {
        locale: 'es-AR',
    });


interface Props {
    orderId: string;
    amount: number;
}

export const MercadoPagoButton = ({ orderId, amount }: Props) => {

    const onSubmit = async () => {

        return new Promise((resolve, reject) => {
            fetch("/api/createPreference", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderId: orderId,
                    amount: amount
                }),
                cache: 'no-cache'
            })
                .then((response) => response.json())
                .then((response) => {
                    resolve(response.id);
                })
                .catch((error) => {
                    reject();
                });
        });
    };

    return (
        <Wallet
            onSubmit={onSubmit}
        />
    )
}
