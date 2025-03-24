import PropTypes from 'prop-types';

export const IngredientType = {
  id: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  image_mobile: PropTypes.string,
  image_large: PropTypes.string,
  image: PropTypes.string,
  proteins: PropTypes.number,
  price: PropTypes.number,
  fat: PropTypes.number,
  carbohydrates: PropTypes.number,
  calories: PropTypes.number,
  __v: PropTypes.number,
}

export interface IIngredientType {
  id: string,
  _id: string,
  type: string,
  name: string,
  image_mobile: string,
  image_large: string,
  image: string,
  proteins: number,
  price: number,
  fat: number,
  carbohydrates: number,
  calories: number,
  __v: number,
}

export interface ISetOrder {
  "success": boolean,
  "name": string,
  "order": {
      "number": number
  }
}

export interface IUserr {
  "name": string,
  "email": string,
}

export interface IOrderFeed {
  "success": boolean,
  "orders": [
    {
      "ingredients": string[],
      "_id": string,
      "status": string,
      "name": string,
      "number": number,
      "createdAt": string,
      "updatedAt": string
    }
  ],
  "total": number,
  "totalToday": number
} 

export interface IOrderFeedIng {
  "ingredients"?: string[] ,
  "_id"?: string,
  "id"?: string,
  "name": string,
  "status"?: string,
  "number": number,
  "createdAt": string,
  "updatedAt"?: string,
  "idFeed"?: "idFeed",
  "typeOrders"?: "user"
} 


export interface IOrderResponse {
  success: boolean;
  name: string;
  order: IOrderFeedIng;
}