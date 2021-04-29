const initialState = {
    items: {},
    totalPrice: 0,
    totalCount: 0,
}


const getTotalPrice = arr => arr.reduce((sum, obj) => obj.price + sum, 0);

const get = (obj, path) => {
    const [firstKey, ...keys] = path.split('.');
    return keys.reduce((val, key) => {
        return val[key]
    }, obj[firstKey]);

}

const getTotalSum = (obj, path) => {
    return Object.values(obj).reduce((sum, obj) => {
        const value = get(obj, path);
        return sum + value;
    }, 0);
};


const basket = (state = initialState, action) => {

    switch (action.type) {
        case 'ADD_PIZZA_BASKET': {
            const currentPizzaItems = !state.items[action.payload.id]
                ? [action.payload]
                : [...state.items[action.payload.id].items, action.payload];

            const newItems = {
                ...state.items,
                [action.payload.id]: {
                    items: currentPizzaItems,
                    totalPrice: getTotalPrice(currentPizzaItems),
                },
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }

        case 'REMOVE_BASKET_ITEM': {
            const newItems = {
                ...state.items
            };

            const currentTotalPrice = newItems[action.payload].totalPrice;
            const currentTotalCount = newItems[action.payload].items.length;

            delete newItems[action.payload];

            return {
                ...state,
                items: newItems,
                totalPrice: state.totalPrice - currentTotalPrice,
                totalCount: state.totalCount - currentTotalCount,
            }
        }

        case 'CLEAR_BASKET': {
            return {
                totalPrice: 0,
                totalCount: 0,
                items: {},
            }
        }

        case 'ADD_ITEM': {
            const newObjItems = [...state.items[action.payload].items, state.items[action.payload].items[0]
            ];
            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalPrice,
                totalCount,
            }
        }

        case 'REMOVE_ITEM': {
            const oldItems = state.items[action.payload].items;
            let newObjItems = null;

            if (oldItems.length > 1) {
                newObjItems = oldItems.slice(1);

            } else {
                const newItems = {
                    ...state.items
                };

                const currentTotalPrice = newItems[action.payload].totalPrice;
                const currentTotalCount = newItems[action.payload].items.length;

                delete newItems[action.payload];

                return {
                    ...state,
                    items: newItems,
                    totalPrice: state.totalPrice - currentTotalPrice,
                    totalCount: state.totalCount - currentTotalCount,
                }
            }

            const newItems = {
                ...state.items,
                [action.payload]: {
                    items: newObjItems,
                    totalPrice: getTotalPrice(newObjItems),
                },
            };

            const totalCount = getTotalSum(newItems, 'items.length');
            const totalPrice = getTotalSum(newItems, 'totalPrice');

            return {
                ...state,
                items: newItems,
                totalCount,
                totalPrice,
            };
        }


        default:
            return state;

    }

}

export default basket;