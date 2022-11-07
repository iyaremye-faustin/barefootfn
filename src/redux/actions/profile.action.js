import { updateUserProfile } from '../../api/profileApi';
import { updatedProfile, successUpdate } from '../features/profile.feature';
import { registerSuccess, registerFail } from '../features/auth.feature';

const updateProfile = (data) => async (dispatch) => {
  try {
    const res = await updateUserProfile(data);
    if (res.status) {
      dispatch(registerSuccess(res.message));
      dispatch(updatedProfile(data));
      dispatch(successUpdate());
    } else {
      dispatch(registerFail(res.message));
    }
  } catch (error) {
    dispatch(registerFail(error));
  }
};
export { updateProfile };
