
import { ADD_TO_BASKET, REMOVE_FROM_CART, SET_QUANTITY, SET_ID, SET_USER } from '../actions/basketAction'

const initialState = {

    basket: [],
    user: null

}

const basketReducer = (state = initialState, action) => {
   
    switch(action.type){

        case ADD_TO_BASKET:

            if(!action.item.quantity)
            {
                const tempVar = {...action.item, quantity: 1}

                return {
                    ...state,
                    basket: [...state.basket, tempVar]
                 }
            }
            else{

                return {
                    ...state,
                    basket: [...state.basket, action.item]
                 }

            }
          
        case REMOVE_FROM_CART:

            return {
                ...state,
                basket: state.basket.filter((item, index) => action.id !== index)
            }

        case SET_QUANTITY:
            // console.log("state in action ",state.basket)
            return {
                ...state,
                basket: state.basket.map((item,index) => {

                    if(index === action.id)
                    {
                        return {...item, quantity: Number(action.quantity)}
                    }
                    else{
                        return item
                    }
                })
            }
        case SET_ID:
            
            return {

                ...state,
                basket: state.basket.map((item,index) => {

                    if(index === action.id)
                    {
                        return {...item, id: action.id}
                    }
                    else{
                        return item
                    }
                })

            }
        
        case SET_USER:

        return {

            ...state,
            user: action.user
            
        }

        default:
            return state

    }
}

export default basketReducer
