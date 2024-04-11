import MercadoPagoConfig, { Preference } from "mercadopago";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        
        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_SECRET! });
        
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
                    success: 'http://localhost:3000/',
                    failure: 'http://localhost:3000/',
                    pending: 'http://localhost:3000/'
                },
            }
        })

        return NextResponse.json({
            id: result.id
        });
    } catch (error: any) {
        return NextResponse.json( error['errors'] ,{ status:400 } );
        
    }




}