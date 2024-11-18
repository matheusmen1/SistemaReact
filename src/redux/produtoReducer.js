import { createSlice } from "@reduxjs/toolkit";
import ESTADO from "./estados"
import { createAsyncThunk } from "@reduxjs/toolkit";
import { consultarProduto } from "../servicos/servicoProduto";

const buscarProdutos =  createAsyncThunk('buscarProdutos', async() =>{
    //lista de produtos
    const resultado = await consultarProduto();
    //se for um array/lista a consulta funcionou
    
    try {
        if(Array.isArray(resultado)){
            return{
                "status":true,
                "mensagem":"Produtos recuperados com sucesso",
                listaDeProdutos
            }
        }
        else{
            return{
                "status":false,
                "mensagem":"Erro ao recuperar os produtos do Backend",
                "listaDeProdutos":[]
            }
        }

    } catch (error) {
        return {
            "status":false,
            "mensagem":"Erro "+error.mensage,
            "listaDeProdutos":[]
        }
    }
        
});
const produtoReducer = createSlice({
    name: 'produto',
    initialState:{
        estado: ESTADO.OCIOSO,
        mensagem:"",
        listaDeProdutos:[]
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(buscarProdutos.pending, (state, aciton)=>{
            state.estado = ESTADO.PENDENTE
            state.mensagem="Processando requisição (buscando produtos)";
            
        })
        .addCase(buscarProdutos.fulfilled, (state, aciton)=>{
            if(aciton.payload.status){
                state.estado = ESTADO.OCIOSO;
                state.mensagem = action.payload.mensagem;
                state.listaDeProdutos = aciton.payload.listaDeProdutos;
            }
            else{
                state.estado = ESTADO.ERRO;
                state.mensagem= action.payload.listaDeProdutos;
                state.listaDeProdutos = aciton.payload.listaDeProdutos/

            }
        })
        .addCase(buscarProdutos.rejected, (state, aciton)=>{
                state.estado = ESTADO.ERRO;
                state.mensagem= action.payload.listaDeProdutos;
                state.listaDeProdutos = aciton.payload.listaDeProdutos/
        })
    }
});
export default produtoReducer.reducer;