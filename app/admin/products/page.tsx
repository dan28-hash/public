"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { products as initialProducts } from "@/lib/mock-data";
import type { Product } from "@/lib/types";
import { FadeIn } from "@/components/motion";

export default function AdminProducts() {
  const [productList, setProductList] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [form, setForm] = useState({
    name: "",
    category: "drills",
    description: "",
    price: "",
    moq: "50",
    inStock: true,
  });

  const filtered = productList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  function resetForm() {
    setForm({ name: "", category: "drills", description: "", price: "", moq: "50", inStock: true });
    setEditingProduct(null);
  }

  function openEdit(product: Product) {
    setEditingProduct(product);
    setForm({
      name: product.name,
      category: product.category,
      description: product.description,
      price: product.price?.toString() ?? "",
      moq: product.moq?.toString() ?? "50",
      inStock: product.inStock,
    });
    setDialogOpen(true);
  }

  function handleSave() {
    if (editingProduct) {
      setProductList((prev) =>
        prev.map((p) =>
          p.id === editingProduct.id
            ? {
                ...p,
                name: form.name,
                category: form.category,
                description: form.description,
                price: parseFloat(form.price) || undefined,
                moq: parseInt(form.moq) || 50,
                inStock: form.inStock,
              }
            : p
        )
      );
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        name: form.name,
        slug: form.name.toLowerCase().replace(/\s+/g, "-"),
        category: form.category,
        description: form.description,
        image: "/placeholder.svg?height=300&width=400",
        features: [],
        specifications: {},
        inStock: form.inStock,
        moq: parseInt(form.moq) || 50,
        price: parseFloat(form.price) || undefined,
      };
      setProductList((prev) => [newProduct, ...prev]);
    }
    setDialogOpen(false);
    resetForm();
  }

  function handleDelete(id: string) {
    setProductList((prev) => prev.filter((p) => p.id !== id));
  }

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Product Management</h2>
            <p className="text-sm text-muted-foreground">
              {productList.length} products in catalog
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={(open) => { setDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus size={16} /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Heavy Duty Impact Drill"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Category</Label>
                    <Select
                      value={form.category}
                      onValueChange={(v) => setForm({ ...form, category: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="drills">Drills</SelectItem>
                        <SelectItem value="saws">Saws</SelectItem>
                        <SelectItem value="grinders">Grinders</SelectItem>
                        <SelectItem value="sanders">Sanders</SelectItem>
                        <SelectItem value="impact-tools">Impact Tools</SelectItem>
                        <SelectItem value="combo-kits">Combo Kits</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="moq">MOQ</Label>
                    <Input
                      id="moq"
                      type="number"
                      value={form.moq}
                      onChange={(e) => setForm({ ...form, moq: e.target.value })}
                      min={50}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="price">Unit Price (USD)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    placeholder="e.g. 89.99"
                    step="0.01"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="desc">Description</Label>
                  <Textarea
                    id="desc"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="inStock"
                    checked={form.inStock}
                    onChange={(e) => setForm({ ...form, inStock: e.target.checked })}
                    className="accent-primary"
                  />
                  <Label htmlFor="inStock">In Stock</Label>
                </div>
                <Button onClick={handleSave} disabled={!form.name}>
                  {editingProduct ? "Save Changes" : "Add Product"}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.2}>
        <Card className="border-border">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Product
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Category
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      MOQ
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Price
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                      Status
                    </th>
                    <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-border last:border-0 hover:bg-muted/30"
                    >
                      <td className="px-4 py-3 font-medium text-foreground">
                        {product.name}
                      </td>
                      <td className="px-4 py-3 capitalize text-muted-foreground">
                        {product.category.replace("-", " ")}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {product.moq ?? 50}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {product.price
                          ? `$${product.price.toFixed(2)}`
                          : "Quote"}
                      </td>
                      <td className="px-4 py-3">
                        <Badge
                          variant="outline"
                          className={
                            product.inStock
                              ? "border-green-500/20 bg-green-500/15 text-green-600"
                              : "border-red-500/20 bg-red-500/15 text-red-600"
                          }
                        >
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(product)}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-muted hover:text-foreground"
                          >
                            <Pencil size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="rounded-md p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
