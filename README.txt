1. Conectar a oracle: 

    Versión de oracle: 21c

    Es posible que si no se contecta oracleplus sea por la variable
    de entorno, en este caso crea esta: ORACLE_SID --> XE

    Ejecutar estos comando en sqlplus:
        ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;
        create user keymaxter identified by deamu;
        grant connect, resource to keymaxter;
        ALTER USER keymaxter QUOTA UNLIMITED ON USERS;

2. En esta entrega he cambiado casi por completo el funcionamiendo y la interfaz de 
modificación de produtos. He corregido muchos errores en el alta de productos. He 
añadido la sección de información de teclados mecánicos. He mejorado la estructura 
de los archivos js, haciendo refactorización y asignando los valores a las variables una
vez cargado el DOM. He mejorado la estructura semántica de algunos archivos html, como por ejemplo
en el keymaxter_main.html he añadido la etiqueta output para mostrar el contenido dinámico de la
web.
He cambiado los links de algunos recursos que usaban "localhost" por la dirección IP del servidor
para que otros dispositivos de la red se puedan conectar.

3. Para acceder como admin y mostrar la opción de delete o el icono para acceder al formulario para
la gestión de productos debes introducir usuario: admin y contraseña: admin en el formulario de inicio de sesión.

4. Los enlaces de las redes sociales no me ha dado tiempo ha dejarlos como quería porque no he tenido tiempo de 
crear las cuentas ni de hacer el sistema de sugerencias por correo que quería implementar. Tan solo he añadido el enlace 
a gitHub correspondiente al repositorio de este proyecto.
Tampoco me ha dado tiempo a implementar el campo para cambiar de idioma.

Te dejo una carpeta PreCarga con imagenes de productos que puedes usar para probarla.