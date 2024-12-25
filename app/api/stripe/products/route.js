import stripeInit from "stripe";
const stripe = stripeInit(process.env.STRIPE_SECRET_KEY);

export const GET = async (request) => {
  try {
    const prods = await stripe.products.list();

    return new Response(JSON.stringify(prods), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch products", {
      status: 500,
    });
  }
};
