import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  song: {},
}

export const songSlice = createSlice({
  name: 'song',
  initialState,
  reducers: {
    setSongPlaying: (state, action) => {
      state.song = action.payload
    },

    setSongState: (state, action) => {
      state.song.playing = action.payload
    }
  },
})

export const { setSongPlaying, setSongState } = songSlice.actions

export const songData = (state) => state.song
export default songSlice.reducer
