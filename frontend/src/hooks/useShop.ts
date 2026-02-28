import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "@/src/store"
import { createShopThunk, getMyShopThunk, updateShopThunk, deleteShopThunk } from "@/src/thunks/shop.thunks"
import { clearShopError } from "@/src/store/slices/shopSlice"
import { IShop } from "@/src/types/shop.types"

export const useShop = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shop, loading, error } = useSelector((s: RootState) => s.shop);

  return {
    shop, loading, error,
    hasShop: !!shop,
    getMyShop:  ()                     => dispatch(getMyShopThunk()),
    createShop: (data: Partial<IShop>) => dispatch(createShopThunk(data)),
    updateShop: (data: Partial<IShop>) => dispatch(updateShopThunk(data)),
    deleteShop: ()                     => dispatch(deleteShopThunk()),
    clearError: ()                     => dispatch(clearShopError()),
  };
};