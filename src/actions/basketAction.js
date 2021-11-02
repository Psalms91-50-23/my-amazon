
export const ADD_TO_BASKET = "ADD_TO_BASKET"
export const REMOVE_FROM_CART = "REMOVE_FROM_CART"
export const SET_QUANTITY = "SET_QUANTITY"
export const ADD_ID_QTY = "ADD_ID_QTY"
export const SET_ID = "SET_ID"
export const SET_USER = "SET_USER"
export const SET_PROFILE_NAME = "SET_PROFILE_NAME"
export const SET_GEOLOCATION = "SET_GEOLOCATION"
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE"

export function addToCartAction( itemId, title, price, image, rating ) {

    return {

        type: ADD_TO_BASKET,
        item: {

            itemId,
            title,
            image,
            price,
            rating

        }

    }
}

export function removeFromCartAction(id){


    return {

        type: REMOVE_FROM_CART,
        id

    }
}

export function setQtyAction(id,quantity){

    return {

        type: SET_QUANTITY,
        id,
        quantity

    }

}


export function setIdAction(id){

    return {

        type: SET_ID,
        id

    }
}

export function setUser(user){

    return {

        type: SET_USER,
        user

    }

}

export function setDisplayName(profileName){

    return {

        type: SET_PROFILE_NAME,
        profileName

    }
}

export function setGeoLocation(geoLocation){

    return {

        type: SET_GEOLOCATION,
        geoLocation

    }

}

export function setTotalPrice(totalPrice){

    return {

        type: SET_TOTAL_PRICE,
        totalPrice

    }
}