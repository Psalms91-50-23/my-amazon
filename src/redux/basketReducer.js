
import { ADD_TO_BASKET, REMOVE_FROM_CART, SET_QUANTITY, SET_ID, SET_USER, SET_PROFILE_NAME, SET_GEOLOCATION, SET_TOTAL_PRICE, EMPTY_BASKET } from '../actions/basketAction'

const initialState = {

    basket: [],
    user: null,
    profileName: null,
    totalPrice: null

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
        
        case SET_PROFILE_NAME:
        
        return {

            ...state,
            profileName: action.profileName
            
        }

        case SET_TOTAL_PRICE:

            return {

                ...state,
                totalPrice: action.totalPrice

            }
            
        case EMPTY_BASKET:
            return {

                ...state,
                basket: []
                
            }
        default:
            return state

    }
}

export default basketReducer
