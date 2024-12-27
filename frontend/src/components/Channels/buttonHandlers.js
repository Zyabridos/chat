import axios from 'axios';
import { toast } from 'react-toastify';
import leoProfanity from 'leo-profanity';
import routes from '../../routes';
import { setChannels } from '../../store/slices/channelsSlice';

/**
 * @param {string} channelId - channelId to edit/delete
 * @param {Function} dispatch - upsate Redux store
 * @param {Array} channels - list of all channels
 * @param {string} token - auth token
 * @param {Function} setError - func to set error
 * @param {Function} t - funct of text translation
 * @param {Object} values - obj with new form values (for example, { name: 'новое имя канала' })
 * @param {Function} setSubmitting - funch to change submitting state
 * @param {Array} channels - array of all channels
 */

export const handleDeleteChannel = async (channelId, dispatch, channels, token, setError, t) => {
  if (!token) {
    setError(t('error.tokenNotFound'));
    return;
  }

  try {
    const response = await axios.delete(`${routes.channelsPath()}/${channelId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      dispatch(setChannels(channels.filter((channel) => channel.id !== channelId)));
      toast.success(t('toast.channelDeleted'));
      setError(null);
    } else {
      throw new Error('Error while deleting the channel');
    }
  } catch (err) {
    console.error('Error while deleting the channel:', err);
    setError(err.response ? err.response.data.message : t('error.deleteChannelFailed'));
  }
};

export const handleAddChannel = async (
  values,
  { setSubmitting },
  channels,
  dispatch,
  handleCloseModal,
  setError,
  token,
  t
) => {
  if (leoProfanity.check(values.name)) {
    setSubmitting(false);
    toast.error(t('channelsFormErrors.profanityDetected'));
    return;
  }

  try {
    const response = await axios.post(
      routes.channelsPath(),
      { name: values.name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data) {
      dispatch(setChannels([...channels, response.data]));
      handleCloseModal();
      toast.success(t('toast.channelCreated'));
    } else {
      throw new Error('Error while creating the channel. The response contains no data.');
    }
  } catch (err) {
    console.error('Error while creating the channel:', err);
    setError(err.response ? err.response.data.message : t('error.addChannelFailed'));
  } finally {
    setSubmitting(false);
  }
};

export const handleEditChannel = async (
  values,
  { setSubmitting },
  channels,
  dispatch,
  setError,
  token,
  editingChannelId,
  t
) => {
  if (leoProfanity.check(values.name)) {
    setSubmitting(false);
    toast.error(t('channelsFormErrors.profanityDetected'));
    return;
  }

  try {
    const response = await axios.put(
      `${routes.channelsPath()}/${editingChannelId}`,
      { name: values.name },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data) {
      dispatch({
        type: 'SET_CHANNELS',
        payload: channels.map((channel) =>
          channel.id === editingChannelId ? { ...channel, name: values.name } : channel
        ),
      });
      toast.success(t('toast.channelRenamed'));
    } else {
      throw new Error('Error while editing the channel.');
    }
  } catch (err) {
    console.error('Error while editing the channel:', err);
    setError(err.response ? err.response.data.message : t('error.editChannelFailed'));
  } finally {
    setSubmitting(false);
  }
};
