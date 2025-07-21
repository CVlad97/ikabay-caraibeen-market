import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package, ShoppingCart, Users, TrendingUp } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  price: number;
  currency: string;
  stock: number;
  status: string;
  created_at: string;
}

interface Order {
  id: string;
  total: number;
  currency: string;
  status: string;
  created_at: string;
}

interface Profile {
  role: string;
  full_name: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      
      if (user) {
        // Get user profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role, full_name')
          .eq('user_id', user.id)
          .single();
        
        setProfile(profileData);

        // Get products based on role
        if (profileData?.role === 'admin') {
          const { data: productsData } = await supabase
            .from('products_new')
            .select('*')
            .order('created_at', { ascending: false });
          setProducts(productsData || []);

          const { data: ordersData } = await supabase
            .from('orders_new')
            .select('*')
            .order('created_at', { ascending: false });
          setOrders(ordersData || []);
        } else if (profileData?.role === 'vendeur') {
          const { data: productsData } = await supabase
            .from('products_new')
            .select('*')
            .eq('vendor_id', user.id)
            .order('created_at', { ascending: false });
          setProducts(productsData || []);

          const { data: ordersData } = await supabase
            .from('orders_new')
            .select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false });
          setOrders(ordersData || []);
        }
      }
      setLoading(false);
    };

    getUser();
  }, []);

  const syncShopifyProducts = async () => {
    try {
      const response = await fetch('/api/sync-shopify', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });
      
      if (response.ok) {
        toast({
          title: "Synchronisation réussie",
          description: "Les produits Shopify ont été synchronisés avec succès.",
        });
        window.location.reload();
      } else {
        throw new Error('Erreur de synchronisation');
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de synchroniser les produits Shopify.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Chargement...</div>;
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Veuillez vous connecter</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Tableau de bord</h1>
        <p className="text-muted-foreground">
          Bienvenue {profile?.full_name || user.email} - {profile?.role || 'client'}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produits</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{products.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Commandes</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orders.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenus</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {orders.reduce((total, order) => total + Number(order.total), 0).toFixed(2)} €
            </div>
          </CardContent>
        </Card>

        {profile?.role === 'admin' && (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Actions</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <Button onClick={syncShopifyProducts} size="sm" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Sync Shopify
              </Button>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Products Section */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Mes Produits</CardTitle>
          <CardDescription>
            Gérez vos produits et leurs détails
          </CardDescription>
        </CardHeader>
        <CardContent>
          {products.length === 0 ? (
            <p className="text-muted-foreground">Aucun produit trouvé</p>
          ) : (
            <div className="space-y-4">
              {products.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {product.price} {product.currency} • Stock: {product.stock}
                    </p>
                  </div>
                  <Badge variant={product.status === 'active' ? 'default' : 'secondary'}>
                    {product.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>Commandes Récentes</CardTitle>
          <CardDescription>
            Suivez vos commandes et leur statut
          </CardDescription>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <p className="text-muted-foreground">Aucune commande trouvée</p>
          ) : (
            <div className="space-y-4">
              {orders.slice(0, 5).map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Commande #{order.id.slice(0, 8)}</h4>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString('fr-FR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">{order.total} {order.currency}</div>
                    <Badge variant={order.status === 'completed' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;