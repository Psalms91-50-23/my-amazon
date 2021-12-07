
import { ADD_TO_BASKET, REMOVE_FROM_CART, SET_QUANTITY, SET_ID, SET_USER, SET_PROFILE_NAME, SET_TOTAL_PRICE, EMPTY_BASKET, SET_GEOLOCATION } from '../actions/basketAction'

const initialState = {

    basket: [],
    user: null,
    profileName: null,
    totalPrice: null,
    userGeoLocation: null

}

const basketReducer = (state = initialState, action) => {
   
    switch(action.type){

        case ADD_TO_BASKET:

                const tempItem = {...action.item, quantity: 1, total: Number(action.item.price)}

                return {
                    ...state,
                    basket: [...state.basket, tempItem]
                 }
   
          
        case REMOVE_FROM_CART:

            return {

                ...state,
                basket: state.basket.filter((item, index) => action.id !== index)

            }

        case SET_QUANTITY:

            return {

                ...state,
                basket: state.basket.map((item,index) => {

                    
                    if(index === action.id)
                    {
                        const itemTotal = Number(action.quantity)? Number(action.quantity*item.price) : Number(item.price)
                        return {...item, quantity: Number(action.quantity), total: itemTotal}
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
        case SET_GEOLOCATION:

            const location = action.geoLocation.split(", ")
            // console.log("location in reducer ", location)
            return {

                ...state,
                userGeoLocation: location

            }
            
        default:
            return state

    }
}

export default basketReducer
