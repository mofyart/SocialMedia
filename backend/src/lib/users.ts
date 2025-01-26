import _ from 'lodash'

export const users = _.times(100, (i) => ({
  nickName: `User ${i}`,
  descryptionText: `Текст ${i}......`,
  data: '21.01.2025',
  image: _.times(3, (j) => `<p>Iamge ${j} of data 21.01.2025...</p>`).join(''),
  subscribes: `${i}`,
  subscriptions: `${i + 50}`,
  text: _.times(3, (j) => `<p>Text paragrph ${j} of user ${i}...</p>`).join(''),
}))
