import { configureStore } from "@reduxjs/toolkit";
import produtoReducer from "./produtoReducer";
import categoriaReducer from "./categoriaReducer";
import fornecedorReducer from "./fornecedorReducer";
import usuarioReducer from "./usuarioReducer";
import clienteReducer from "./clienteReducer";
const store = configureStore({
    reducer:{
        'produto':produtoReducer,
        'categoria':categoriaReducer,
        'fornecedor':fornecedorReducer,
        'usuario':usuarioReducer,
        'cliente': clienteReducer
    }
});
export default store;