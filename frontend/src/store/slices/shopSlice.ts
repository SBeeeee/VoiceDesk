import { createSlice } from "@reduxjs/toolkit";
import { IShop } from "@/src/types/shop.types"
import { createShopThunk, getMyShopThunk, updateShopThunk, deleteShopThunk } from "@/src/thunks/shop.thunks"

interface ShopState {
  shop: IShop | null;
  loading: boolean;
  error: string | null;
}

const initialState: ShopState = { shop: null, loading: false, error: null };

const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearShopError(state) { state.error = null; },
    clearShop(state) { state.shop = null; },
  },
  extraReducers: (builder) => {
    const pending = (state: ShopState) => { state.loading = true; state.error = null; };
    const rejected = (state: ShopState, action: any) => {
      state.loading = false;
      state.error = action.payload ?? "Something went wrong";
    };
    builder
      .addCase(createShopThunk.pending, pending)
      .addCase(createShopThunk.fulfilled, (state, action) => { state.loading = false; state.shop = action.payload; })
      .addCase(createShopThunk.rejected, rejected)
      .addCase(getMyShopThunk.pending, pending)
      .addCase(getMyShopThunk.fulfilled, (state, action) => { state.loading = false; state.shop = action.payload; })
      .addCase(getMyShopThunk.rejected, rejected)
      .addCase(updateShopThunk.pending, pending)
      .addCase(updateShopThunk.fulfilled, (state, action) => { state.loading = false; state.shop = action.payload; })
      .addCase(updateShopThunk.rejected, rejected)
      .addCase(deleteShopThunk.fulfilled, (state) => { state.shop = null; state.loading = false; })
      .addCase(deleteShopThunk.rejected, rejected);
  },
});

export const { clearShopError, clearShop } = shopSlice.actions;
export default shopSlice.reducer;