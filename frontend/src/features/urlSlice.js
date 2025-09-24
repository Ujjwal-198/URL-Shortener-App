import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../api/axiosInstance.js';

// CREATE SHORT URL
export const handleCreateUrl = createAsyncThunk(
  'url/createUrl',
  async ({ longUrl }, { rejectWithValue }) => {
    try {
      const result = await api.post('/url/getUrl', { longUrl });
      return result.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to create short URL'
      );
    }
  }
);
// delete URL
export const handleDeleteUrl = createAsyncThunk(
  'url/deleteUrl',
  async (shortId, { rejectWithValue }) => {
    try {
      console.log("Deleting URL with shortId:", shortId);
      const result = await api.delete(`/url/delete/${shortId}`);
      return { shortId, ...result.data }; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to delete URL'
      );
    }
  }
);

// GET ALL URLS FOR A USER
export const handleGetAllUrls = createAsyncThunk(
  'url/getAllUrls',
  async (_, { rejectWithValue }) => {
    try {
      const result = await api.get('/url/getAllUrl');
      return result.data; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.error?.message || 'Failed to fetch user URLs'
      );
    }
  }
);

const initialState = {
  data: null,      // for single created short URL
  urls: [],        // for all URLs of the user
  error: null,
  loading: false,
};

const urlSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    resetUrlState: (state) => {
      state.data = null;
      state.urls = [];
      state.error = null;
      state.loading = false;
    },
    resetError: (state) => { state.error = null; }
  },
  extraReducers: (builder) => {
    builder
      // CREATE URL
      .addCase(handleCreateUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleCreateUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data; // store the single short URL response
        state.error = null;
      })
      .addCase(handleCreateUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.data = null;
      })

      // GET ALL URLS
      .addCase(handleGetAllUrls.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleGetAllUrls.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = action.payload.data.urls; // store array of URLs
        state.error = null;
      })
      .addCase(handleGetAllUrls.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.urls = [];
      })

      // DELETE URL
      .addCase(handleDeleteUrl.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDeleteUrl.fulfilled, (state, action) => {
        state.loading = false;
        state.urls = state.urls.filter((url) => url.ShortId !== action.payload.shortId);
        state.error = null;
      })
      .addCase(handleDeleteUrl.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetUrlState, resetError } = urlSlice.actions;
export default urlSlice.reducer;
