# api-gateway

Para agregar/modificar una servidor:

1. Crear un IServer en /routes/serverRoutes.ts y exportarlo

```javascript
const newServer: IServer = {
    url: 'http://localhost',
    port: 3000
};
```
Para agregar una nueva entidad

1. Crear el modelo en /entities con sus funciones de mapeo siguiendo la convencion mapToInput para la conversion en el sentido Front => Back y mapToOutput para la conversion Back => Front

```typescript
interface IPreVentaOut {
    hola: string;
}

interface IPreVentaIn {
    chau: string;
}

const mapToOutput = (preVenta: IPreVentaIn): IPreVentaOut => {
    return {
        hola: preVenta.chau,
    };
};

const mapToInput = (preVenta: IPreVentaOut): IPreVentaIn => {
    return {
        chau: preVenta.hola,
    };
};

export { mapToOutput, mapToInput };

```

Para agregar una nueva ruta

1. Crear o modificar un archivo nuevo en /routes
2. Se provee el archivo /routes/requestHelper.ts con funciones que permiten facilitar el proceso
   
   ```javascript
    import { createRequestHandler } from './requestHelper';
    import { newServer } from './serverRoutes'

    const { router, createPromise, combinePromises, ...request } = createRequestHandler(newServer);

    // createPromise() devuelve un objeto con los metodos get, put, post y delete. 
    //Estos metodos reciben como primer argumento la ruta del servidor a acceder y como segundo argumento opcional una funcion de mapeo. 
    //Devuelve una promesa

    const promise1 = createPromise().get('prueba1') 
    //realizara un get a http://localhost:3000/prueba1. Devuelve por ejemplo {"nombre": "Carlos"}

    const promise2 = createPromise().get('prueba2', (r) => r.lenght) 
    //realizara un get a http://localhost:3000/prueba2 y el resultado sera mapeado con la funcion y devolvera el largo de la respuesta. Por ejemplo 3


    /*combinePromises permite realizar multiples request y devolver el resultado de todas juntas. Recibe un array de promesas y una funcion de mapeo*/
    const promise3 = combinePromises([
        promise1, promise2
    ]); // devuelve [{"nombre": "Carlos"}, 3]

    const promise4 = combinePromises([
        promise1, promise2
    ], r => ({...r[0], cantidad: r[2]})); // devuelve {"nombre": "Carlos", "cantidad": 3}



    request.get('/unaRuta', promise3); // Se agrega una ruta /unaRuta a la API que ejecutara la promesa promise3 
    request.get('/otraRuta', promise4);

    export default router;
   ```
