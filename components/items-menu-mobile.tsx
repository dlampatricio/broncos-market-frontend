"use client";

import { useState } from "react";
import { Menu, ShoppingCart, Heart, User, Sun, Moon, Home, Info, Phone, BaggageClaim } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
} from "@mui/material";
import { useTheme } from "next-themes";
import { useCart } from "@/hooks/use-cart";
import { useLovedProducts } from "@/hooks/use-loved-products";

const ItemsMenuMobile = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;
  const cart = useCart();
  const { lovedItems } = useLovedProducts();

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const getIconColor = () => {
    return currentTheme === "dark" ? "#ffffff" : "#000000";
  };

  return (
    <Box>
      <IconButton 
        onClick={toggleDrawer(true)} 
        sx={{ 
          color: "inherit",
          "&:hover": {
            backgroundColor: "transparent"
          }
        }}
      >
        <Menu className="w-6 h-6" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        transitionDuration={300}
        PaperProps={{
          sx: { 
            width: "300px",
            backgroundColor: currentTheme === "dark" ? "rgb(17 24 39)" : "#ffffff",
            transition: "background-color 0.3s ease",
          }
        }}
      >
        {/* Encabezado con logo */}
        <Box sx={{ 
          p: 3, 
          textAlign: "center",
          borderBottom: "1px solid",
          borderColor: "divider"
        }}>
          <Typography 
            variant="h6" 
            component="div"
            sx={{
              fontWeight: 700,
              color: currentTheme === "dark" ? "#ffffff" : "#000000",
              letterSpacing: "0.5px",
              background: currentTheme === "dark" 
                ? "linear-gradient(to right, #fecaca, #f87171)" 
                : "linear-gradient(to right, #881313, #dc2626)",
              backgroundClip: "text",
              textFillColor: "transparent"
            }}
          >
            BRONCO&apos;S MARKET
          </Typography>
          <Typography 
            variant="caption" 
            component="div"
            sx={{
              color: currentTheme === "dark" ? "#d1d5db" : "#4b5563",
              mt: 0.5
            }}
          >
            Lo esencial llega a tu puerta, sin complicaciones
          </Typography>
        </Box>

        {/* Sección principal del menú */}
        <List sx={{ py: 0 }}>
          <ListItem
            component={Link}
            href="/"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              borderBottom: "1px solid",
              borderColor: "divider"
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Home size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Inicio" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#f5f5f5" : "#333333"
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
              color: currentTheme === "dark" ? "#fecaca" : "#881313",
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
          ].map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{ 
                "&:hover": { 
                  bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
                },
                py: 1.5
              }}
            >
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
                }} 
              />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Sección de acciones del usuario */}
        <List>
          {/* Carrito */}
          <ListItem
            onClick={() => {
              router.push("/cart");
              toggleDrawer(false)();
            }}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5,
              position: "relative"
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              {cart.items.length > 0 ? (
                <BaggageClaim size={20} color={getIconColor()} />
              ) : (
                <ShoppingCart size={20} color={getIconColor()} />
              )}
            </ListItemIcon>
            <ListItemText 
              primary="Carrito" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
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
              router.push("/loved-products");
              toggleDrawer(false)();
            }}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Heart 
                size={20} 
                color={getIconColor()} 
                fill={lovedItems.length > 0 ? getIconColor() : "none"}
              />
            </ListItemIcon>
            <ListItemText 
              primary="Favoritos" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>

          {/* Perfil de usuario */}
          <ListItem
            onClick={() => {
              router.push("/user");
              toggleDrawer(false)();
            }}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <User size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Mi cuenta" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>

          {/* Tema oscuro/claro */}
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
                  <Moon size={20} color={getIconColor()} />
                ) : (
                  <Sun size={20} color={getIconColor()} />
                )}
              </ListItemIcon>
              <ListItemText 
                primary={currentTheme === "dark" ? "Modo oscuro" : "Modo claro"} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
                }} 
              />
            </Box>
            <Switch
              checked={currentTheme === "dark"}
              onChange={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
              color="default"
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: currentTheme === "dark" ? "#fecaca" : "#881313",
                },
                '& .MuiSwitch-track': {
                  backgroundColor: currentTheme === "dark" ? "#fecaca" : "#881313",
                },
                '& .Mui-checked': {
                  color: currentTheme === "dark" ? "#fecaca" : "#881313",
                },
                '& .Mui-checked + .MuiSwitch-track': {
                  backgroundColor: currentTheme === "dark" ? "#fecaca" : "#881313",
                },
              }}
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 1 }} />

        {/* Sección de información */}
        <List>
          <ListItem
            component={Link}
            href="/about"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Info size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Sobre nosotros" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>
          <ListItem
            component={Link}
            href="/contact"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                bgcolor: currentTheme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Phone size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Contacto" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: currentTheme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default ItemsMenuMobile;