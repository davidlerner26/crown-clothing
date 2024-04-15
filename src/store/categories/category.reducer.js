export const CATEGORIES_INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = CATEGORIES_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;

    switch (type) {
        case 'SET_CATEGORIES_MAP':
            return { ...state, categories: payload };
        default:
            return state;
    }
}