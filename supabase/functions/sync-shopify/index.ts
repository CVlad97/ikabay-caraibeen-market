import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ShopifyProduct {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  status: string;
  variants: Array<{
    id: number;
    price: string;
    compare_at_price: string;
    inventory_quantity: number;
  }>;
  images: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get Shopify API credentials from Supabase secrets
    const shopifyApiKey = Deno.env.get('SHOPIFY_API_KEY') ?? '4fe181dfa73f40063dec296265518ddb'
    const shopifyApiSecret = Deno.env.get('SHOPIFY_API_SECRET') ?? '4931e793c24d5118df93806e1e46267a'
    
    // Note: You'll need to get the shop domain from the user
    const shopDomain = Deno.env.get('SHOPIFY_SHOP_DOMAIN') ?? 'ikabay-store' // Replace with actual shop domain

    // Fetch products from Shopify
    const shopifyUrl = `https://${shopDomain}.myshopify.com/admin/api/2023-10/products.json`
    
    const shopifyResponse = await fetch(shopifyUrl, {
      headers: {
        'X-Shopify-Access-Token': shopifyApiKey,
        'Content-Type': 'application/json',
      },
    })

    if (!shopifyResponse.ok) {
      throw new Error(`Shopify API error: ${shopifyResponse.status}`)
    }

    const shopifyData = await shopifyResponse.json()
    const products: ShopifyProduct[] = shopifyData.products || []

    // Transform and insert products into Supabase
    for (const product of products) {
      const variant = product.variants[0] // Use first variant
      const images = product.images.map(img => img.src)

      const productData = {
        name: product.title,
        description: product.body_html?.replace(/<[^>]*>/g, '') || '', // Strip HTML
        price: parseFloat(variant?.price || '0'),
        currency: 'EUR', // Adjust based on your needs
        images: images,
        stock: variant?.inventory_quantity || 0,
        status: product.status === 'active' ? 'active' : 'inactive',
        shopify_product_id: product.id.toString(),
        country_origin: 'France', // Default value
        shipping_countries: ['France', 'Europe'], // Default values
      }

      // Check if product already exists
      const { data: existingProduct } = await supabaseClient
        .from('products_new')
        .select('id')
        .eq('shopify_product_id', product.id.toString())
        .single()

      if (existingProduct) {
        // Update existing product
        await supabaseClient
          .from('products_new')
          .update(productData)
          .eq('shopify_product_id', product.id.toString())
      } else {
        // Insert new product
        await supabaseClient
          .from('products_new')
          .insert(productData)
      }
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synchronized ${products.length} products from Shopify` 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Error syncing Shopify products:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})