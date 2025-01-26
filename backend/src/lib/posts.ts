import _ from 'lodash'

export const posts = _.times(30, (i) => ({
  nickName: `User ${i}`,
  foto: `Iamge ${i} of data ${i}.01.2025...`,
  text: _.times(3, (j) => `<p>Text paragrph ${j} of user ${i}...</p>`).join(''),
  descryption: _.times(3, (j) => `<p>Descryption ${j} of user ${i} ...</p> `).join(''),
}))
