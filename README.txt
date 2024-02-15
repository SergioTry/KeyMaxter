1. Conectar a oracle: 

    Versión de oracle: 21c

    Es posible que si no se contecta oracleplus sea por la variable
    de entorno, en este caso crea esta: ORACLE_SID --> XE

    Ejecutar estos comando en sqlplus:
        ALTER SESSION SET "_ORACLE_SCRIPT" = TRUE;
        create user keymaxter identified by deamu;
        grant connect, resource to keymaxter;
        ALTER USER keymaxter QUOTA UNLIMITED ON USERS;
2. Me falta por amplicar mucho la documentación y actualizarla porque
debido a la excasez de tiempo no voy a poder cumplirlo todo, pero también se han
añadido cambios que no están reflejados en la documentación.

3. Me falta por mejorar la estructura y organización de los ficheros html y css
mejorando algunas etiquetas semánticas, entre ellas añadir la etiqueta 
"output". Mejorar la funcionalidad del menú desplegable en la vista móvil,
mejorar la funcionalidad del formulario en lo referido a actualizar los produtos,
implementar un spinner, añadir un fichero .env para establecer el puerto e incluso 
si me da tiempo implementaré el cambio de idioma pero no creo sinceramente.
El cambio más grande que falta por implementar es añadir el contenido de información 
sobre teclados y switch que corresponde al primer botón de la barra lateral que aún no está 
implementado.

Para acceder como admin y mostrar la opción de delete o el icono para acceder al formulario para
la gestión de productos debes introducir usuario: admin y contraseña: admin en el formulario de inicio de sesión.

Te dejo una carpeta PreCarga con imagenes de productos que puedes usar para probarla.