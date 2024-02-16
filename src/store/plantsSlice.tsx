import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../utils/API";

export const fetchPlants = createAsyncThunk(
  "/plants/fetch",
  async (userId: number) => {
    const response = await API.get(`/plants/${userId}`);
    return response;
  },
);

export const updatePlants = createAsyncThunk<any, Partial<PlantInfo>>(
  "/plants/update",
  async (params: any, thunkAPI) => {
    const { id, ...param } = params;
    const response = await API.patch(`/plants/${params.id}`, param);

    if (response.status === 400) {
      return thunkAPI.rejectWithValue(response.statusText);
    }
    return response;
  },
);

export const updateGrowthMaterial = createAsyncThunk<
  any,
  Pick<PlantInfo, "water" | "nutrientCount">,
  { state: { plant: InitialStateType } }
>("/plants/updateGrowthMaterial", async (params: any, thunkAPI) => {
  const { id, water, nutrientCount } = params;
  const { plant } = thunkAPI.getState();
  const currentState = plant.plantInfo;
  const update = {
    water: water + currentState.water,
    nutrientCount: nutrientCount + currentState.nutrientCount,
  };
  const response = await API.patch(`/plants/${id}`, update);

  if (response.status === 400) {
    return thunkAPI.rejectWithValue(response.statusText);
  }
  return response;
});

interface PlantInfo {
  type: string;
  name: string;
  typeName: string;
  level: number;
  growthRate: number;
  nutrientCount: number;
  water: number;
  nutrient: number;
}

interface InitialStateType {
  error?: string;
  plantInfo: PlantInfo;
}

const initialState: InitialStateType = {
  error: "",
  plantInfo: {
    type: "",
    name: "",
    typeName: "",
    level: 1,
    growthRate: 0,
    nutrientCount: 0,
    water: 0,
    nutrient: 50,
  },
};

const plantSlice = createSlice({
  name: "plants",
  initialState,
  reducers: {},
  extraReducers: (builder: any) => {
    builder.addCase(fetchPlants.fulfilled, (state: any, { payload }: any) => {
      state.plantInfo = { ...state.plantInfo, ...payload.data };
    });
    builder.addCase(fetchPlants.rejected, (state: any, action: any) => {
      if (action.payload) {
        state.error = action.playlod.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(updatePlants.fulfilled, (state: any, { payload }: any) => {
      state.plantInfo = { ...state.plantInfo, ...payload.data };
    });
    builder.addCase(updatePlants.rejected, (state: any, action: any) => {
      if (action.payload) {
        state.error = action.playlod.errorMessage;
      } else {
        state.error = action.error;
      }
    });
    builder.addCase(
      updateGrowthMaterial.fulfilled,
      (state: any, { payload }: any) => {
        state.plantInfo = { ...state.plantInfo, ...payload.data };
      },
    );
    builder.addCase(
      updateGrowthMaterial.rejected,
      (state: any, action: any) => {
        if (action.payload) {
          state.error = action.playlod.errorMessage;
        } else {
          state.error = action.error;
        }
      },
    );
  },
});
export default plantSlice;
