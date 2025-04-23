import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    showModal: true,
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        }
    }
})

export const { setShowModal} = userSlice.actions;
export default userSlice.reducer;