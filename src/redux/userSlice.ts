import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    showModal: true,
    showModalProfile: false,
    
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setShowModal(state, action: PayloadAction<boolean>) {
            state.showModal = action.payload;
        },
        setShowModalProfile(state, action: PayloadAction<boolean>) {
            state.showModalProfile = action.payload;
        }
    }
})

export const { setShowModal} = userSlice.actions;
export const { setShowModalProfile} = userSlice.actions;
export default userSlice.reducer;