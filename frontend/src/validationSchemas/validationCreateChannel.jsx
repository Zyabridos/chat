import * as yup from 'yup';

const validationCreateChannel = (t) =>
  yup.object({
    name: yup
      .string()
      .min(3, t('validationErrors.min6'))
      .max(20, t('validationErrors.max20'))
      .required(t('validationErrors.required')),
    // .test('is-unique', t('validationErrors.channelAlreadyExists'), function (value) {
    //   const { channels } = this.options.context;
    //   return !channels.some((channel) => channel.name === value);
    // }),
  });

export default validationCreateChannel;
