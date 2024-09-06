import java.util.Random;
import javax.swing.JPanel;

public class Jugador {

    private final int TOTAL_CARTAS = 10;
    private final int MARGEN = 10;
    private final int DISTANCIA = 50;

    private Carta[] cartas = new Carta[TOTAL_CARTAS];
    private Random r = new Random();

    public void repartir() {
        int i = 0;

        for (Carta c : cartas) {
            cartas[i++] = new Carta(r);
        }
    }

    public void mostrar(JPanel pnl) {
        pnl.removeAll();

        int p = 1;
        for (Carta c : cartas) {
            c.mostrar(pnl, MARGEN + TOTAL_CARTAS * DISTANCIA - p++ * DISTANCIA, MARGEN);
        }

        pnl.repaint();
    }

    public String getGrupos() {
        String mensaje = "No se encontraron grupos";
        int[] contadores = new int[NombreCarta.values().length];
        int[][] contadoresPinta = new int[NombreCarta.values().length][Pinta.values().length];
        int[][] cartasPorPinta = new int[Pinta.values().length][NombreCarta.values().length];
        int[] cartaValor = new int[NombreCarta.values().length];
        int puntaje = 0;
        int puntajeSinGrupos = 0;

        // Asignar valores a las cartas
        for (int i = 0; i < NombreCarta.values().length; i++) {
            NombreCarta nombreCarta = NombreCarta.values()[i];
            if (nombreCarta == NombreCarta.AS || nombreCarta == NombreCarta.JACK ||
                nombreCarta == NombreCarta.QUEEN || nombreCarta == NombreCarta.KING) {
                cartaValor[i] = 10;
            } else {
                cartaValor[i] = i + 1;
            }
        }

        // Contar cuántas veces aparece cada carta y cuántas cartas por pinta
        for (Carta c : cartas) {
            contadores[c.getNombre().ordinal()]++;
            contadoresPinta[c.getNombre().ordinal()][c.getPinta().ordinal()]++;
            cartasPorPinta[c.getPinta().ordinal()][c.getNombre().ordinal()]++;
        }

        boolean hayGrupos = false;

        // Verificar los grupos
        for (int i = 0; i < contadores.length; i++) {
            if (contadores[i] >= 2) {
                if (!hayGrupos) {
                    hayGrupos = true;
                    mensaje = "Se encontraron los siguientes grupos:\n";    
                }
                mensaje += Grupo.values()[contadores[i]] + " DE " + NombreCarta.values()[i] + "\n";
                if (contadores[i] == 3) {
                    mensaje += "Terna de " + NombreCarta.values()[i] + "\n";
                } else if (contadores[i] == 4) {
                    mensaje += "Cuarta de " + NombreCarta.values()[i] + "\n";
                } else if (contadores[i] >= 5) {
                    mensaje += Grupo.values()[contadores[i]] + " DE " + NombreCarta.values()[i] + "\n";
                }
            }
        }

        // Verificar ternas y cuartas en escalera de la misma pinta
        for (int pintaIndex = 0; pintaIndex < cartasPorPinta.length; pintaIndex++) {
            for (int i = 0; i < cartasPorPinta[pintaIndex].length; i++) {
                // Verificar escalera de longitud mínima 3
                for (int longitud = 3; i + longitud <= cartasPorPinta[pintaIndex].length; longitud++) {
                    int cantidad = 0;
                    for (int j = 0; j < longitud; j++) {
                        if (cartasPorPinta[pintaIndex][i + j] > 0) {
                            cantidad++;
                        } else {
                            break;
                        }
                    }
                    if (cantidad == longitud) {
                        if (!hayGrupos) {
                            hayGrupos = true;
                            mensaje = "Se encontraron los siguientes grupos:\n";
                        }
                        mensaje += Grupo.values()[contadores[i]] + " DE " + NombreCarta.values()[i] + "\n";
                        if (longitud == 3) {
                            mensaje += "Terna en escalera de " + NombreCarta.values()[i] + " a " + NombreCarta.values()[i + longitud - 1] + " en " + Pinta.values()[pintaIndex] + "\n";
                        } else if (longitud == 4) {
                            mensaje += "Cuarta en escalera de " + NombreCarta.values()[i] + " a " + NombreCarta.values()[i + longitud - 1] + " en " + Pinta.values()[pintaIndex] + "\n";
                        }
                    }
                }
            }
        }

        // Calcular el puntaje de las cartas que no conforman grupos
        for (Carta c : cartas) {
            if (contadores[c.getNombre().ordinal()] <= 1) {
                puntajeSinGrupos += cartaValor[c.getNombre().ordinal()];
            }
        }

        if (hayGrupos) {
            mensaje += "Puntaje total de grupos: " + puntaje + "\n";
        }
        mensaje += "Puntaje total sin grupos: " + puntajeSinGrupos;

        return mensaje;
    }
}
