import { createAction } from "../../utils/reducer.util";
import { CATEGORIES_ACTION_TYPES } from './category.types';

export const setCategoriesMap = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesArray);