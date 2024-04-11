'use client'

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import { useEffect, useState } from 'react';
initMercadoPago(process.env.NEXT_PUBLIC_MERCADOPAGO_CLIENT_ID!,
    {
        locale: 'es-AR'
    });


interface Props {
    orderId: string;
    amount: number;
}

export const MercadoPagoButton = ({ orderId, amount }: Props) => {

    const [preferenceId, setPreferenceId] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getPreferenceId();
    }, [])


    const getPreferenceId = () => {
        setIsLoading(true);
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
            .then((response) => {
                return response.json();
            })
            .then((preference) => {
                setPreferenceId(preference.id);
            })
            .catch((error) => {
                console.error(error);
            }).finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <>
            {
                preferenceId && (
                    <Wallet initialization={{ preferenceId: preferenceId }} />
                )
            }
        </>
    )
}
