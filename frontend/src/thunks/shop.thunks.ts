import { createAsyncThunk } from "@reduxjs/toolkit";
import shopService from "@/src/services/shop.service"
import { IShop } from "@/src/types/shop.types"

export const createShopThunk = createAsyncThunk<IShop, Partial<IShop>, { rejectValue: string }>(
  "shop/create",
  async (data, { rejectWithValue }) => {
    try { return await shopService.createShop(data); }
    catch (err: any) { return rejectWithValue(err.message); }
  }
);

export const getMyShopThunk = createAsyncThunk<IShop, void, { rejectValue: string }>(
  "shop/getMyShop",
  async (_, { rejectWithValue }) => {
    try { return await shopService.getMyShop(); }
    catch (err: any) { return rejectWithValue(err.message); }
  }
);

export const updateShopThunk = createAsyncThunk<IShop, Partial<IShop>, { rejectValue: string }>(
  "shop/update",
  async (data, { rejectWithValue }) => {
    try { return await shopService.updateShop(data); }
    catch (err: any) { return rejectWithValue(err.message); }
  }
);

export const deleteShopThunk = createAsyncThunk<void, void, { rejectValue: string }>(
  "shop/delete",
  async (_, { rejectWithValue }) => {
    try { await shopService.deleteShop(); }
    catch (err: any) { return rejectWithValue(err.message); }
  }
);