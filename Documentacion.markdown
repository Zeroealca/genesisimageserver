#Documentación API de imágenes para Génesis

## URL base
http://194.140.198.23:2638

##Rutas para las empresas:
### *Crear Empresa*
- Método: POST
- Ruta: /company/create

####Cuerpo de la petición


| Nombre     | Tipo   | Descripción                |
|------------|--------|----------------------------|
| ruc     | string | Ruc de la empresa         |

####Entrada:
```
{
    "ruc": "1315082682001"
}
```

####Respuestas:
+ Exitosa:

```
{
    "status": true,
    "msg": "success"
}
```

+ Error

```
{
    status: false,
    msg: "Ya existe una empresa con ese ruc" (O el error que haya dado durante la ejecución),
}
```

### *Actualizar Empresa*
- Método: PUT
- Ruta: /company/update/:*ruc_viejo*

####*Parámetros de la petición*

| Nombre     | Tipo   | Descripción                |
|------------|--------|----------------------------|
| ruc     | string | Nuevo ruc de la empresa         |

####Entradas:

```
ruta: /company/update/1315082682001
{
    ruc: "1315082667001
}
```
####Respuestas:
+ Exitosa:

```
{
    status: true,
    msg: "success"
}
```

+ Error

```
{
    status: false,
    msg: "Ya existe una empresa con el ruc: 1315082667001" (O el error que haya dado durante la ejecución)
}
```

##**Rutas para las imágenes:**

### *Subir imágenes*
- Método: POST
- Ruta: /image/upload

####*Cuerpo de la petición*

| Nombre     | Tipo   | Descripción                |
|------------|--------|----------------------------|
| files     | array | - `image`: base64 de la imágen<br>- `name`: nombre de la imágen         |
| ruc     | string | Ruc de la empresa a la que se va a ingresar la imágen         |
| reference     | string | Referencia de la imágen o nombre de la carpeta         |
| code     | string |  Identificador del item al que refiere la imagen        |

####Entradas:

```
{
    files:   [
        {
            image:"data:image/png;base64,iVBORw0KGgoAAAANSUhEU...",
            name:"Segunda"
        }
    ],
    ruc:"1315082682001",
    reference:"producto",
    code:"125"
}
```
####Respuestas:
+ Exitosa:

```
{
    status: true,
    msg: "success",
    data: [
        {
            url: "http:/194.140.198.23:2638/:2638/1315082682001/producto/125/Segunda.png",
            name: "Segunda.png",
            id: "64a72bf4f292a2bcde0f1bf6"
        }
    ]
}
```

+ Error

```
{
    status: false,
    msg: (Mensaje de error que ocurra durante la ejecución),
}
```

### *Obtener Imágenes de una Empresa*
- Método: GET
- Ruta: /image/getAll/:*ruc_empresa*

####Entrada:

```
ruta: /image/getAll/1315082675001
```

####Respuestas:
+ Exitosa:

```
{
    status: true,
    msg: "success",
    data: {
        producto: [
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/producto/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72b5fdbd94ac53e92fcca"
            },
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/producto/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72b5fdbd94ac53e92fccb"
            },
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/producto/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72bc9848fec4d83f091bb"
            },
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/producto/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72bc9848fec4d83f091bc"
            },
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/producto/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72be5f292a2bcde0f1bf5"
            }
        ],
        presentacion: [
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/presentacion/125/Primera.jpeg",
                name: "Primera.jpeg",
                id: "64a72e50f292a2bcde0f1bfa"
            },
            {
                url: "http:/194.140.198.23:2638/:2638/1315082675001/presentacion/125/Segunda.png",
                name: "Segunda.png",
                id: "64a72e50f292a2bcde0f1bfb"
            }
        ]
    }
}
```

+ Error

```
{
    status: false,
    msg: (Mensaje de error durante la ejecución),
}
```

### *Eliminar Imágen*
- Método: DELETE
- Ruta: /image/delete/:*id_imagen*

####Entradas:
```
ruta: /image/delete/64a72be5f292a2bcde0f1bf5
```

####Respuestas:
+ Exitosa:

```
{
    status: true,
    msg: "success",
}
```

+ Error

```
{
    status: false,
    msg: (Error que suceda durante la ejecución),
}
```

### *Eliminar Varias Imágenes*
- Método: DELETE
- Ruta: /image/deleteMany/:images

####Parámetros de la petición

| Parametro     | Descripción                |
|------------|----------------------------|
| images     | Array con los ids de las imágenes a eliminar         |

####Entradas:
```
ruta: /image/deleteMany/["64a72e50f292a2bcde0f1bfb","64a72b5fdbd94ac53e92fcca"]
```
####Respuestas:
+ Exitosa:

```
{
    status: true,
    msg: "success",
}
```

+ Error

```
{
    status: false,
    msg: (Error que suceda durante la ejecución),
}
```