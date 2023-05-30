# Documento de Diseño

Este proyecto es un trabajo universitario para la asignatura optativa "Desarrollo de videojuegos mediante tecnologías web" en la Universidad Complutense de Madrid.

## Enlace al juego

https://gmartinezc7.github.io/PROYECTODVI/

## Información básica

**Desarrollador:** Pirotech Studios

**Título**: Mega Explosive 

**Género**: Arcade plataformas

**Plataformas**: Web

**Modos:** Videojuego de un jugador

**Audiencia objetivo**: Jugadores Casuales

## Descripción

*Mega Explosive* es un juego de plataformas para navegadores web. El protagonista es Mascleto, un petardo o "masclet" cuyo sueño es convertirse en un fuego artificial. Para ello deberá recoger toda la luz que se encuentre y explotar a la mayor altura posible. 

## Temática, ambientación y lore

La temática elegida es la fiesta popular de las Fallas de Valencia, famosa no solo por el arte de sus impresionantes esculturas de madera, si no también por sus increíbles espectáculos pirotécnicos, como la "Mascletá" y la "Nit del Foc".

Muchos jóvenes y mayores aprovechan las Fallas para disfrutar de estos espectáculos y contribuir a la celebración con sus propios petardos. Estos petardos se llaman “masclets” en valenciano, y a partir de esta palabra nombramos a nuestro personaje jugable, Mascleto.

Los masclets solo hacen ruido y humo al detonar y están pensados para ser usados en el suelo o colgados, a una distancia de seguridad prudente. La pirotecnia de los fuegos artificiales es distinta, y está diseñada para elevarse en el aire y detonar formando patrones coloridos en el cielo.

En el juego, usamos esta diferencia para caracterizar al personaje jugable, que desea convertirse en un fuego artificial cuando consiga el objetivo de explotar a una altura elevada y llenar el cielo de colores.

## Mecánicas

El juego constará de varios niveles, en los que el jugador tiene que llevar al personaje jugable hacia arriba a través del nivel, esquivando enemigos y consiguiendo esferas de luz. 

La condición para superar el nivel es llegar a un altura establecida. Si el personaje jugable colisiona con algun elemento dañino o cae más allá de una altura determinada, el jugador pierde la partida y tendrá que volver a intentarlo.

### Controles

El jugador tendrá a su disposición varios controles para el personaje jugable:

- Teclas izquierda y derecha controlan la dirección del personaje en la pantalla.
- El botón de espacio permite al personaje saltar hacia arriba

Los controles y sus explicaciones serán visibles en la página web dónde está alojado el juego.

### Elementos de interacción

#### Esferas de luz

Las esferas de luz llevarán el conteo de la puntuación que consigue el jugador. Se consiguen colisionando el personaje jugable con las esferas de luz. 

#### Plataformas

Las plataformas sirven como apoyo al personaje jugable. Si este se posiciona sobre ellas, no caerá hacia abajo. Es posible para el jugador mover al personaje a la izquierda y a la derecha encima de la plataforma. Para salir de la plataforma, el jugador deberá saltar o sobrepasar el límite lateral de la plataforma. 

Las plataformas son accesibles por su parte inferior, es decir, si el personaje colisiona con ellas por debajo, el personaje las atravesará. Si el jugador colisiona con ellas por arriba pararán su caída.

Las plataformas podrán variar en longitud y también es posible que algunas se muevan de izquierda a derecha.

#### Enemigos

Existen dos tipos de enemigos:

- Un enemigo que cae desde arriba de la pantalla en dirección opuesta a la que se mueve el personaje
- Un enemigo que aparece ocasionalmente sobre las plataformas que usa el jugador
- Un enemigo que se mueve horizontalmente a través de la pantalla entre las plataformas

Si el personaje jugable colisiona con un enemigo, la partida finaliza.

#### Potenciadores

Existen 4 tipos de potenciadores:

##### Imán de esferas del luz

Cuando el personaje colisiona con potenciador de imán de esferas de luz, inmediatamente se crea un efecto de imán o gravitatorio centrado en el personaje que atrae hacia a si mismo las esferas de luz en un radio dado.

##### Impulso momentáneo

Cuando el personaje colisiona con un potenciador de impulso momentáneo, se catapulta al personaje (a una velocidad mayor que la del salto) durante unos momentos hacia arriba, bajo las siguientes condiciones:

- Es inmune a las colisiones con los enemigos.
- Se invalida la opción de saltar, ya que el personaje está siendo impulsado hacia arriba.

##### Escudo

Cuando el personaje colisiona con un potenciador de escudo, le otorga invulnerabilidad con las colisiones contra los enemigos

##### Multiplicador

Cuando el personaje colisiona con un potencidador de multiplciador, la puntuación adquirida por las esferas de luz se multiplica por 2

### Físicas

Las físicas del juego se pueden explicar en dos partes:

#### Físicas de colisión

Cuando el personaje jugable colisiona con algún elemento de interacción, se producirá un evento, pero no se modificará la dirección ni la velocidad del personaje.

#### Físicas de gravedad

Para el personaje jugable y para los enemigos que caen, se aplica una gravedad hacia abajo que afecta al movimiento del personaje haciendo que este caiga cuando se termine el impulso del salto. 

Esta gravedad no tiene efecto cuando el personaje jugable se encuentre sobre una plataforma.

### Niveles 

El diseño de los niveles es incremental en dificultad:

Entonces un nivel fácil tendrá:

- Muchas plataformas grandes y potenciadores.
- Pocos enemigos moviéndose lento.

Y un nivel difícil tendrá:

- Pocas plataformas pequeñas y potenciadores.
- Muchos enemigos moviéndose rápido.

Los elementos de interacción se generan en el nivel de acuerdo a unos parámetros:

- Distancia entre las plataformas
- Agrupaciones de esferas de luz
- Frecuencia de enemigos
- Frecuencia de potenciadores

Los niveles se superaran cuando el jugador llegue a una altura establecida.

El nivel termina en derrota si el personaje jugable cae más allá del rango de la cámara, haciendo que este desaparezca, o cuando colisione con un enemigo.

### Progreso

Existe un sistema de estrellas y esferas:

- Cuando se supera un nivel se asigna un número de estrellas dependiendo de la puntuación obtenida en el nivel (número de esferas conseguidas)
  - Si se recogen el 80% de las esferas, se otorgan 3 estrellas
  - Si se recogen el 40% de las esferas, se otorgan 2 estrellas
  - Si se recogen el menos del 40% de las esferas, se otorga 1 estrella
- Las esferas recogidas en un nivel se acumulan en un contador. 

Para poder jugar niveles superiores, es necesario que número de estrellas y esferas total supere un umbral. Cuánto más alto sea el número de nivel, más alto será este umbral.

### Pantalla y cámara

La pantalla de juego será un cuadrado de tamaño 720x720. Sin embargo la escena será de un tamaño mayor que acogerá todo el nivel (__Altura_x720). La cámara sigue al personaje cuando suba hacia arriba de la escena, pero no cuando este descienda. 

### Menús

El menú principal es lo primero que ve el jugador al iniciar el juego. Cuenta con un botón de inicio que lleva al jugador a otra pantalla para elegir el nivel que desee. 

En la pantalla de niveles, se mostrará el número total de estrellas conseguidas, las estrellas conseguidas en cada nivel y el número total de esferas conseguidas. Además se podrá acceder desde aquí al menú de la tienda de skins.

Al hacer click en uno de estos niveles, se iniciará el juego.

El juego pude terminar con una victoria o una derrota, y se representa con un mensaje acorde. En ambos casos, existirán dos botones con este mensaje:

- Un botón para reintentar el nivel, que te llevará al inicio del nivel para poder jugarlo de nuevo
- Un botón para regresar al menú principal

Durante el juego, se muestra un botón de pausa en una esquina de la pantalla, accionable también mediante la tecla de escape. Este botón pausará el juego y ofrecerá en forma de botón la opción para reanudar el juego o volver al menú principal.

En el menú de skins, el jugador podrá gastar esferas en la compra de diferentes apariencias usando esferas. Algunos cosméticos requieren que se completen ciertos niveles primero.

## Arte

La gran mayoría del arte del juego ha sido creado por nosotros mediante técnicas de dibujo digital, exceptuando las tipografías de los textos.

### Protagonista

El protagonista está basado en la forma real de un "masclet", personificado con rasgos faciales de boca y ojos.

Está creado siguiendo un estilo artístico de dibujo animado. Esto se ve reflejado en un contorno grueso que rodea la figura del dibujo. Como el personaje se desplaza rápidamente por la pantalla, hemos elegido darle un bajo nivel de detalle, resultando en una forma simple y distinguible.

Otra de las ventajas de un diseño simple es la capacidad de modificación, para crear diferentes "skins" realizando variaciones simple de los rasgos (boca y ojos) y utilizando diferentes colores.

### Escenario

#### Esferas de luz

Para el diseño de las esferas de luz hemos elegido una forma circular iluminada con un resplandor exterior e interior. Es importante que este elemento tenga un borde definido, para que sea distinguible y de alto contraste. Esto permite al jugador identificar bien la zona de colisión con la esfera de luz. 

Existen esferas de luz de varios colores vivos para su uso en diferentes situaciones.

#### Plataformas

Para las plataformas es importante que su diseño también sea de alto contraste, ya que es un elemento que permite el descanso del jugador. Su grosor de referencia es el radio de una esfera de luz.

#### Enemigos

El diseño de los enemigos también se basa en un estilo de dibujo animado con rasgos faciales simples. En su diseño tiene que estar claro que son elementos a los que no quieres acercarte. Esto se consigue a través de:

- Su forma, acorde a la temática del juego. Por ejemplo, como el personaje está hecho de pólvora, el agua es un elemento peligroso.
- Su expresión, con rasgos faciales que resulten poco amigables, como expresiones de enfado y malicia.

#### Potenciadores

Todos los potenciadores se encontrarán dentro de un esfera de luz para enfatizar su interacción.

##### Imán de esferas de luz

Su diseño es el clásico imán de herradura con dos polos, azul y rojo.

##### Impulso momentáneo

El diseño seran dos flechas apuntando hacia arriba

##### Escudo

El diseño será un escudo de "plancha" simbolizando protección

##### Multiplicador

El diseño serán los caracteres "x2" utilizando la tipografía del título del juego

### Mapas (Niveles)

En cada nivel, el mapa que el jugador atraviesa representa una forma distinta que puede tomar el cielo. Desde un cielo azul, hasta la noche cerrada. 

Los niveles con menor dificultad tendrán un diseño más claro (día) y según avancen los niveles y la dificultad, se irá progresando por etapas (tarde) hasta un diseño más oscuro (noche).

El diseño del personaje jugable cambiará cada mapa usando una apariencia distinta que sea apropiada para el nivel.

La principal decisión de diseño en los mapas es que se no tengan distracciones que puedan interferir con la identificación de los elementos del escenario.

Todos los elementos que forman el mapa tienen que mezclarse en el fondo para que sea claro que no son elementos con los que el jugador puede interactuar.

La pantalla del juego es de tamaño 720x720, y el mapa debe reflejar este tamaño en su longitud horizontal. Su longitud vertical depende de lo largo que sea el nivel.

## Sonido

Existen varios tipos de sonidos asociados a los eventos que ocurren durante el juego

- **Sonido al obtener una esfera de luz**
- **Sonido al colisionar con un enemigo**
- **Sonido de salto**
- **Sonido de potenciador obtenido**
- **Sonido de potenciador acabado**
- **Sonido al pulsar en un botón de menú**

## Música

A diferencia de los sonidos, la música será una reproducción en bucle de una melodía. Tiene que sonar de fondo y tiene que tener las opciones de volumen y silencio.

Existen 3 pistas que pueden sonar dependiendo del estado del juego

- Pista del menú principal y juego
- Pista de condición de victoria
- Pista de condición de derrota

## Referencias

La idea principal del videojuego ha sido sacada del juego llamado "Mega Jump". Un juego basado en propulsar a un pequeño dinosaurio lo más alto posible mientras se recogen objetos especiales (power-ups) y monedas para comprar nuevos personajes.

Otro juego muy popular del que podemos sacar ciertas referencias es "Doodle Jump" , un juego basado en un personaje y cuyo objetivo es subir lo más alto posible, mientras rebota en distintas plataformas y se ayuda de distintos objetos especiales (potenciadores). Mientras llevamos al personaje a lo más alto debemos intentar no caernos y esquivar a enemigos como plataformas quebradizas.



