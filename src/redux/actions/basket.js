export const addPizzaToBasket = (pizzaObj) => ({
    type: 'ADD_PIZZA_BASKET',
    payload: pizzaObj,
});

export const clearBasket = () => ({
    type: 'CLEAR_BASKET',
});

export const removeBasketItem = (id) => ({
    type: 'REMOVE_BASKET_ITEM',
    payload: id,
});

export const addItem = (id) => ({
    type: 'ADD_ITEM',
    payload: id,
});

export const removeItem = (id) => ({
    type: 'REMOVE_ITEM',
    payload: id,
});