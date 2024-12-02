import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        
        const client = new MercadoPagoConfig({ 
            accessToken: process.env.MERCADOPAGO_SECRET!,
            options:{
                integratorId: process.env.MERCADOPAGO_INTEGRATOR_ID
            }
         });
        
        const preference = new Preference(client);
        
        const { orderId, amount } = await request.json();
        
        const result = await preference.create({
            body: {
                items: [
                    {
                        quantity: 1,
                        unit_price: amount,
                        title: orderId,
                        id: orderId,
                        currency_id: 'ARS'
                    }
                ],
                back_urls:{
                    success: `http://localhost:3000/orders/${orderId}`,
                    failure: `http://localhost:3000/orders/${orderId}`,
                    pending: `http://localhost:3000/orders/${orderId}`
                },
                auto_return: "approved",
                notification_url: "https://d6d7-190-189-226-47.ngrok-free.app/api/webhook?source_news=webhooks"
            }
        })

        return NextResponse.json({
            id: result.id
        });
    } catch (error: any) {
        return NextResponse.json( error['errors'] ,{ status:400 } );
        
    }
}