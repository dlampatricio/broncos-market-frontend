"use client";

import { useState } from "react";
import { Menu, ShoppingCart, Heart, User, Sun, Moon, Home, Info, Phone } from "lucide-react";
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
  Switch
} from "@mui/material";
import { useTheme } from "next-themes";

const ItemsMenuMobile = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  // Función para obtener el color del icono según el tema
  const getIconColor = () => {
    return theme === "dark" ? "#ffffff" : "#000000";
  };

  return (
    <Box>
      <IconButton 
        onClick={toggleDrawer(true)} 
        sx={{ 
          color: "inherit",
          "&:hover": { backgroundColor: "rgba(136, 19, 19, 0.1)" }
        }}
      >
        <Menu className="w-6 h-6" />
      </IconButton>

      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: { 
            width: "300px",
            backgroundColor: theme === "dark" ? "#121212" : "#ffffff",
            boxShadow: theme === "dark" ? "0 0 15px rgba(255,255,255,0.1)" : "0 0 15px rgba(0,0,0,0.1)"
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
              color: theme === "dark" ? "#ffffff" : "#000000",
              letterSpacing: "0.5px"
            }}
          >
            BRONCO&apos;S MARKET
          </Typography>
          <Typography 
            variant="caption" 
            component="div"
            sx={{
              color: theme === "dark" ? "#ffffff" : "#000000",
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
              "&:hover": { bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" },
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
                color: theme === "dark" ? "#f5f5f5" : "#333333"
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
              color: theme === "dark" ? "#fecaca" : "#881313",
              fontWeight: 600
            }}
          >
            CATEGORÍAS
          </Typography>
          
          {[
            { href: "/category/combos", text: "Combos", icon: null },
            { href: "/category/lacteos", text: "Lácteos", icon: null },
            { href: "/category/carnicos", text: "Cárnicos", icon: null },
            { href: "/category/bebidas", text: "Bebidas", icon: null },
            { href: "/category/confituras", text: "Confituras", icon: null },
            { href: "/category/otros", text: "Otros", icon: null },
          ].map((item) => (
            <ListItem
              key={item.href}
              component={Link}
              href={item.href}
              onClick={toggleDrawer(false)}
              sx={{ 
                "&:hover": { 
                  bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
                },
                py: 1.5
              }}
            >
              {item.icon && (
                <ListItemIcon sx={{ 
                  minWidth: "36px",
                  color: theme === "dark" ? "#fecaca" : "#881313"
                }}>
                  {item.icon}
                </ListItemIcon>
              )}
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: theme === "dark" ? "#e5e5e5" : "#333333"
                }} 
              />
            </ListItem>
          ))}
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
                bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
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
                color: theme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>
          <ListItem
            component={Link}
            href="/contact"
            onClick={toggleDrawer(false)}
            sx={{ 
              "&:hover": { 
                bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
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
                color: theme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>
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
                bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <ShoppingCart size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Carrito" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: theme === "dark" ? "#e5e5e5" : "#333333"
              }} 
            />
          </ListItem>

          {/* Favoritos */}
          <ListItem
            onClick={() => {
              router.push("/loved-products");
              toggleDrawer(false)();
            }}
            sx={{ 
              "&:hover": { 
                bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
              },
              py: 1.5
            }}
          >
            <ListItemIcon sx={{ minWidth: "36px" }}>
              <Heart size={20} color={getIconColor()} />
            </ListItemIcon>
            <ListItemText 
              primary="Favoritos" 
              primaryTypographyProps={{ 
                fontWeight: 500,
                color: theme === "dark" ? "#e5e5e5" : "#333333"
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
                bgcolor: theme === "dark" ? "rgba(136, 19, 19, 0.2)" : "rgba(254, 202, 202, 0.5)" 
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
                color: theme === "dark" ? "#e5e5e5" : "#333333"
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
                {theme === "dark" ? (
                  <Moon size={20} color={getIconColor()} />
                ) : (
                  <Sun size={20} color={getIconColor()} />
                )}
              </ListItemIcon>
              <ListItemText 
                primary="Modo oscuro" 
                primaryTypographyProps={{ 
                  fontWeight: 500,
                  color: theme === "dark" ? "#e5e5e5" : "#333333"
                }} 
              />
            </Box>
            <Switch
              checked={theme === "dark"}
              onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
              color="default"
              sx={{
                '& .MuiSwitch-switchBase': {
                  color: theme === "dark" ? "#fecaca" : "#881313",
                },
                '& .MuiSwitch-track': {
                  backgroundColor: theme === "dark" ? "#fecaca" : "#881313",
                },
                '& .Mui-checked': {
                  color: theme === "dark" ? "#fecaca" : "#881313",
                },
                '& .Mui-checked + .MuiSwitch-track': {
                  backgroundColor: theme === "dark" ? "#fecaca" : "#881313",
                },
              }}
            />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};

export default ItemsMenuMobile;