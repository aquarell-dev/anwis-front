import { PayloadAction, createSlice } from '@reduxjs/toolkit'

import { StaffMember } from '../../types/acceptance.types'
import { LastActionInitial, StaffLastAction } from './last.action.types'

const initialState: LastActionInitial = {
  cachedMembers: []
}

export const lastActionSlice = createSlice({
  name: 'lastAction',
  initialState,
  reducers: {
    cacheLastMemberState: (state, action: PayloadAction<StaffLastAction>) => {
      state.cachedMembers = [
        ...state.cachedMembers.filter(m => m.staff.id !== action.payload.staff.id),
        action.payload
      ]
    }
  }
})

export const lastActionReducer = lastActionSlice.reducer
export const lastActionActions = lastActionSlice.actions
