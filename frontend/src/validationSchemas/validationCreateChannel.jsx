import * as yup from 'yup';

const validationCreateChannel = yup.object({
  channelName: yup.string()
    .min(3, 'Название канала должно быть не менее 3 символов')
    .max(20, 'Название канала не может быть более 20 символов')
    .required('Название канала обязательно')
    // .test('is-unique', 'Такой канал уже существует', function(value) {
    //   const { channels } = this.options.context;
    //   return !channels.some(channel => channel.name === value);
    // }),
});

export default validationCreateChannel;
