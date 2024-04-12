import { setTransactionIdAndOrderPaid } from "@/actions";
import MercadoPagoConfig, { Payment } from "mercadopago";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const client = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_SECRET! });
        const payment = new Payment(client)
    
        const data = await request.json();
    
        const paymentId = data.data.id ?? null;
        
        if ( !paymentId ) {
            throw new Error()
        }
        
        const response = await payment.get({id: paymentId});
        
        if ( response.status !== 'approved' ) {
            throw new Error();
        }

        const orderId = response.additional_info?.items![0].id;
        if ( !orderId ) {
            throw new Error();
        }

        const resp = await setTransactionIdAndOrderPaid(orderId, paymentId);
        
        
        return NextResponse.json({ status: 200 })
    } catch (error) {
        return NextResponse.json({ status: 400 })
    }

}