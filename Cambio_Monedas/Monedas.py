#Importar libreria para interfaz grafica de usuario
from tkinter import *
#Importar Util para las funciones ya creadas
import Util

iconos=["./iconos/bd.png", \
        "./iconos/statistics.png"] #El espacio + backslash es para partir codigo en varias lineas

#Crear una ventana
v = Tk()

#Titulo ventana
v.title("Cambios de Monedas")

#Tamaño ventana
v.geometry("400x300")

#Importar función
Util.agregarBarra(v,iconos)

# Iniciar el bucle de la aplicación para que la ventana se mantenga visible
v.mainloop()