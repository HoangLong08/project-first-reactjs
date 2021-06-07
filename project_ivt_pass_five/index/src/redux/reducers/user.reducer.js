const initialState = {
   userInfo: {
      data: {},
      load: false,
      error: '',
   },
   productOrderList: {
      data: [],
      load: false,
      error: '',
   }
};

export default function userReducer(state = initialState, action) {
   switch (action.type) {
      case 'LOGIN_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'LOGIN_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  data: data,
                  load: false,
               },
            }
         }
      case 'LOGIN_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }

      case 'GET_USER_INFO_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'GET_USER_INFO_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  data: data,
                  load: false,
               },
            }
         }
      case 'GET_USER_INFO_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }
      case 'REGISTER_REQUEST':
         {
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: true,
               },
            }
         }
      case 'REGISTER_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  data: data,
                  load: false,
               },
            }
         }
      case 'REGISTER_FAIL':
         {
            const { error } = action.payload;
            return {
               ...state,
               userInfo: {
                  ...state.userInfo,
                  load: false,
                  error: error,
               },
            }
         }
      case 'LOGOUT':
         {
            return {
               userInfo: {
                  data: {}
               }
            }
         }
      case 'GET_PRODUCT_ORDER_LIST_REQUEST':
         {
            return {
               ...state,
               productOrderList: {
                  data: [],
                  load: true,
                  error: '',
               },
            }
         }
      case 'GET_PRODUCT_ORDER_LIST_SUCCESS':
         {
            const { data } = action.payload;
            return {
               ...state,
               productOrderList: {
                  ...state.productOrderList,
                  data: data,
                  load: false,
               },
            }
         }
      default:
         {
            return state;
         }
   }
}