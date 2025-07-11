"use client"

import { useEffect, useState } from "react"
import { Menu, ShoppingCart, Heart, Sun, Moon, Home, Info, BaggageClaim } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Typography,
  Switch,
} from "@mui/material"
import { useTheme } from "next-themes"
import { useCart } from "@/hooks/use-cart"
import { useLovedProducts } from "@/hooks/use-loved-products"

const ItemsMenuMobile = () => {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  const { systemTheme, theme, setTheme } = useTheme()
  const currentTheme = theme === "system" ? systemTheme : theme
  const cart = useCart()
  const { lovedItems } = useLovedProducts()

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen)
  }

  if (!mounted) {
    return (
      <IconButton 
        sx={{
          color: "#dc2626",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.8
          }
        }}
      >
        <Menu className="w-6 h-6 text-red-900" />
      </IconButton>
    )
  }

  return (
    <Box>
      <IconButton 
        onClick={toggleDrawer(true)}
        sx={{
          color: currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626",
          "&:hover": {
            backgroundColor: "transparent",
            opacity: 0.8
          }
        }}
      >
        <Menu className="w-6 h-6 text-red-900 dark:text-red-500" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        transitionDuration={300}
        PaperProps={{
          sx: { 
            width: "300px",
            backgroundColor: currentTheme === "dark" ? "rgb(23 23 23)" : "#ffffff",
            borderLeft: currentTheme === "dark" ? "1px solid rgb(34 35 35)" : "1px solid #e5e7eb"
          }
        }}
      >
        {/* Encabezado */}
        <Box sx={{ 
          p: 3, 
          textAlign: "center",
          borderBottom: currentTheme === "dark" ? "1px solid rgb(34 35 35)" : "1px solid #e5e7eb"
        }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              color: currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626",
              letterSpacing: "0.5px"
            }}
          >
            BRONCO&apos;S MARKET
          </Typography>
          <Typography 
            variant="caption" 
            component="div"
            sx={{
              color: currentTheme === "dark" ? "#9ca3af" : "#6b7280",
              mt: 0.5
            }}
          >
            Lo esencial llega a tu puerta
          </Typography>
        </Box>

        {/* Menú principal */}
        <List sx={{ py: 0 }}>
          <ListItem
            component={Link}
            href="/"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                backgroundColor: currentTheme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)" 
              },
              borderBottom: currentTheme === "dark" ? "1px solid rgb(34 35 35)" : "1px solid #e5e7eb"
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Home size={20} color={currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626"} />
            </ListItemIcon>
            <ListItemText 
              primary="Inicio" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#f3f4f6" : "#111827"
              }} 
            />
          </ListItem>

          {/* Categorías */}
          <Typography 
            variant="subtitle2" 
            sx={{ 
              px: 2, 
              pt: 2, 
              pb: 1,
              color: currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626",
              fontWeight: 600
            }}
          >
            CATEGORÍAS
          </Typography>
          
          {[
            { href: "/category/combos", text: "Combos" },
            { href: "/category/lacteos", text: "Lácteos" },
            { href: "/category/carnicos", text: "Cárnicos" },
            { href: "/category/bebidas", text: "Bebidas" },
            { href: "/category/confituras", text: "Confituras" },
            { href: "/category/otros", text: "Otros" },
            { href: "/all-products", text: "Todos los Productos" },
          ].map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{ 
                "&:hover": { 
                  backgroundColor: currentTheme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)" 
                },
                py: 1.5
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: currentTheme === "dark" ? "#e5e7eb" : "#374151"
                }} 
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ 
          my: 1,
          borderColor: currentTheme === "dark" ? "rgb(34 35 35)" : "#e5e7eb" 
        }} />

        {/* Acciones del usuario */}
        <List>
          {/* Carrito */}
          <ListItem
            onClick={() => {
              router.push("/cart")
              toggleDrawer(false)()
            }}
            sx={{ 
              "&:hover": { 
                backgroundColor: currentTheme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)" 
              },
              py: 1.5,
              position: "relative"
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              {cart.items.length > 0 ? (
                <BaggageClaim size={20} color={currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626"} />
              ) : (
                <ShoppingCart size={20} color={currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626"} />
              )}
            </ListItemIcon>
            <ListItemText 
              primary="Carrito" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#f3f4f6" : "#111827"
              }} 
            />
            {cart.items.length > 0 && (
              <Box sx={{
                position: "absolute",
                right: 16,
                backgroundColor: currentTheme === "dark" ? "#ef4444" : "#dc2626",
                color: "white",
                borderRadius: "50%",
                width: 22,
                height: 22,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem"
              }}>
                {cart.items.length}
              </Box>
            )}
          </ListItem>

          {/* Favoritos */}
          <ListItem
            onClick={() => {
              router.push("/loved-products")
              toggleDrawer(false)()
            }}
            sx={{ 
              "&:hover": { 
                backgroundColor: currentTheme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Heart 
                size={20} 
                color={currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626"} 
                fill={lovedItems.length > 0 ? (currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626") : "none"}
              />
            </ListItemIcon>
            <ListItemText 
              primary="Favoritos" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#f3f4f6" : "#111827"
              }} 
            />
          </ListItem>

          {/* Toggle de tema */}
          <ListItem 
            sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center",
              py: 1.5
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ListItemIcon sx={{ minWidth: "36px" }}>
                {currentTheme === "dark" ? (
                  <Moon size={20} color="rgb(251 44 54)" />
                ) : (
                  <Sun size={20} color="#dc2626" />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={currentTheme === "dark" ? "Modo oscuro" : "Modo claro"} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: currentTheme === "dark" ? "#f3f4f6" : "#111827"
                }} 
              />
            </Box>
            <Switch
              checked={currentTheme === "dark"}
              onChange={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              color="default"
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626",
                },
                '& .MuiSwitch-track': {
                  backgroundColor: currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626",
                },
              }}
            />
          </ListItem>
        </List>

        <Divider sx={{ 
          my: 1,
          borderColor: currentTheme === "dark" ? "rgb(34 35 35)" : "#e5e7eb" 
        }} />

        {/* Información */}
        <List>
          <ListItem
            component={Link}
            href="/about-us"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                backgroundColor: currentTheme === "dark" ? "rgba(239, 68, 68, 0.1)" : "rgba(220, 38, 38, 0.05)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Info size={20} color={currentTheme === "dark" ? "rgb(251 44 54)" : "#dc2626"} />
            </ListItemIcon>
            <ListItemText 
              primary="Sobre nosotros" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#f3f4f6" : "#111827"
              }} 
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  )
}

export default ItemsMenuMobile