const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  // Solo permitir peticiones POST
  if (event.httpMethod !== 'POST') {
    return { 
        statusCode: 405, 
        body: JSON.stringify({ error: 'Método no permitido' }) 
    };
  }

  try {
    const { plan } = JSON.parse(event.body);
    
    // Mapeo de planes a IDs de precios de Stripe
    // Estos IDs se deben configurar en las variables de entorno de Netlify o en el .env local
    let priceId;
    switch (plan) {
      case 'basic':
        priceId = process.env.STRIPE_PRICE_ID_BASIC;
        break;
      case 'intermediate':
        priceId = process.env.STRIPE_PRICE_ID_INTERMEDIATE;
        break;
      case 'premium':
        priceId = process.env.STRIPE_PRICE_ID_PREMIUM;
        break;
      default:
        return { 
            statusCode: 400, 
            body: JSON.stringify({ error: 'Plan no válido' }) 
        };
    }

    if (!priceId) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: `El ID de precio para el plan ${plan} no está configurado.` })
        };
    }

    // Crear la sesión de Checkout
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription', // Cambiar a 'payment' si son pagos únicos
      success_url: `${process.env.URL || 'http://localhost:5173'}/index.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.URL || 'http://localhost:5173'}/metodo.html`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ id: session.id }),
    };
  } catch (error) {
    console.error('Error en create-checkout:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
