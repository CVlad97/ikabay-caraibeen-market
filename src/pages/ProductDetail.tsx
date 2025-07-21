import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Share } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  stock: number;
  rating: number;
  reviews_count: number;
  country_origin: string;
  shipping_countries: string[];
  status: string;
  created_at: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  created_at: string;
  user_id: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  currency: string;
  quantity: number;
  image: string | null;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      const { data: productData, error } = await supabase
        .from('products_new')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        return;
      }

      setProduct(productData);

      // Fetch reviews
      const { data: reviewsData } = await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', id)
        .order('created_at', { ascending: false });

      setReviews(reviewsData || []);
      setLoading(false);
    };

    fetchProduct();
  }, [id]);

  const addToCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast({
        title: "Connexion requise",
        description: "Veuillez vous connecter pour ajouter des produits au panier.",
        variant: "destructive",
      });
      return;
    }

    if (!product) return;

    // Get or create cart
    let { data: cart } = await supabase
      .from('shopping_carts')
      .select('*')
      .eq('user_id', user.id)
      .single();

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      currency: product.currency,
      quantity,
      image: product.images[0] || null
    };

    if (!cart) {
      // Create new cart
      const { error } = await supabase
        .from('shopping_carts')
        .insert({
          user_id: user.id,
          cart_items: [cartItem]
        });

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le produit au panier.",
          variant: "destructive",
        });
        return;
      }
    } else {
      // Update existing cart
      const existingItems = Array.isArray(cart.cart_items) ? cart.cart_items : [];
      const existingItemIndex = existingItems.findIndex((item: any) => item.id === product.id);

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = [...existingItems];
        (updatedItems[existingItemIndex] as any).quantity += quantity;
      } else {
        updatedItems = [...existingItems, cartItem];
      }

      const { error } = await supabase
        .from('shopping_carts')
        .update({ cart_items: updatedItems })
        .eq('user_id', user.id);

      if (error) {
        toast({
          title: "Erreur",
          description: "Impossible d'ajouter le produit au panier.",
          variant: "destructive",
        });
        return;
      }
    }

    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté à votre panier.`,
    });
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!product) {
    return <div className="flex items-center justify-center min-h-screen">Produit non trouvé</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          {product.images.length > 0 ? (
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">Aucune image disponible</span>
            </div>
          )}
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(1, 5).map((image, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={image}
                    alt={`${product.name} ${index + 2}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-muted-foreground">
                  {product.rating.toFixed(1)} ({product.reviews_count} avis)
                </span>
              </div>
              <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                {product.status}
              </Badge>
            </div>
          </div>

          <div className="text-3xl font-bold">
            {product.price} {product.currency}
          </div>

          <p className="text-muted-foreground">
            {product.description}
          </p>

          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Stock disponible:</span>
              <span className="font-medium">{product.stock} unités</span>
            </div>
            <div className="flex justify-between">
              <span>Pays d'origine:</span>
              <span className="font-medium">{product.country_origin}</span>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <label htmlFor="quantity" className="text-sm font-medium">
                Quantité:
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="px-3 py-2 border rounded-md"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-4">
              <Button
                onClick={addToCart}
                disabled={product.stock === 0}
                className="flex-1"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Ajouter au panier
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Avis clients</CardTitle>
          <CardDescription>
            {reviews.length} avis pour ce produit
          </CardDescription>
        </CardHeader>
        <CardContent>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground">Aucun avis pour le moment</p>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <p className="text-sm">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductDetail;