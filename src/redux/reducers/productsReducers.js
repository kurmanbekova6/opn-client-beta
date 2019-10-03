import * as C from "../actions/actionTypes";

const productsReducer = (state = {}, action) => {
  switch (action.type) {
    case C.ORDER_PAID:
      return {
        ...state,
        paidOrderId: action.paidOrderId,
      };

    case C.SAVE_PRODUCTS:
      return {
        ...state,
        originProductList: action.originList,
        productList: action.originList,
      };

    case C.SET_PRODUCTS:
      return {
        ...state,
        productList: action.productList,
      };

    case C.GET_EXIST_PRODUCTS:
      return {
        ...state,
        productList: state.originProductList,
      };

    case C.GET_PRODUCTS_BY_COMPANY:
      let filteredList = [];
      state.originProductList.filter(item => {
        if (item.company.profile.name == action.companyName) {
          filteredList.push(item);
        }
      });

      return {
        ...state,
        productList: filteredList,
      };

    case C.PRODUCTS_SORTING:
      switch (action.sortType) {
        case "az": {
          if (state.sortType === action.sortType) {
            const reverseList = state.productList.reverse();
            return {
              ...state,
              productList: reverseList.slice(),
            };
          }

          let alphabeticalList = state.productList.sort(function(a, b) {
            if (a.name < b.name) {
              return -1;
            }
            if (a.name > b.name) {
              return 1;
            }
            return 0;
          });

          return {
            ...state,
            sortType: action.sortType,
            productList: alphabeticalList.slice(),
          };
        }

        case C.DATE: {
          if (state.sortType === action.sortType) {
            const reverseList = state.productList.reverse();
            return {
              ...state,
              productList: reverseList.slice(),
            };
          }

          const ascendingList = state.productList.sort(
            (a, b) => new Date(b.auction.start) - new Date(a.auction.start)
          );
          return {
            ...state,
            sortType: action.sortType,
            productList: ascendingList.slice(),
          };
        }

        case C.PRICE: {
          if (state.sortType === action.sortType) {
            const reverseList = state.productList.reverse();
            return {
              ...state,
              productList: reverseList.slice(),
            };
          }

          const ascendingList = state.productList.sort(
            (a, b) => a.price - b.price
          );
          return {
            ...state,
            sortType: action.sortType,
            productList: ascendingList.slice(),
          };
        }

        case C.REGION: {
          if (state.sortType === action.sortType) {
            const reverseList = state.productList.reverse();
            return {
              ...state,
              productList: reverseList.slice(),
            };
          }

          let alphabeticalRegionList = state.productList.sort(function(a, b) {
            if (a.country < b.country) {
              return -1;
            }
            if (a.country > b.country) {
              return 1;
            }
            return 0;
          });

          return {
            ...state,
            sortType: action.sortType,
            productList: alphabeticalRegionList.slice(),
          };
        }
      }

    default:
      return state;
  }
};

export default productsReducer;
