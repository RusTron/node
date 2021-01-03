const firstNames = ['Gregory', 'Jim', 'Jane', 'Robert', 'Liza', 'Tiffany', 'Elizabeth', 'John', 'Kristen', 'David'];
const secondNames = ['Parker', 'Ball', 'Morgan', 'Mccoy', 'Murphy', 'Cooper', 'Watson', 'Flores', 'Webb', 'Baker'];
const messagePatterns = ['Hi!', 'How are you doing?', 'I have done it already', 'I am typing this on my phone', 'check it out', 'not sure yet', 'That was yesterday', 'I really like it', 'Thank you so much', 'Oh hey'];
const messageTypes = ['sent', 'received'];
const avatars = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const usersAmount = Math.ceil(Math.random() * 20) + 10;
let avatarNumber = Math.floor(Math.random() * avatars.length);

const createUsers = () => {
  let usersArray = [];

  for (let i = 1; i <= usersAmount; i++) {
    const name = createName();
    const time = Date.now();
    const messages = createMessages(time);
    const image = createImage();
    let user = {'id' : i, name, time, 'avatars' : avatars[avatarNumber], messages, image };
    avatarNumber++;
    if (avatarNumber === 10) avatarNumber = 0;
    usersArray.push(user);
  };

  return usersArray;
}

const createName = () => (
  '' + firstNames[Math.floor(Math.random() * firstNames.length)] + ' '
    + secondNames[Math.floor(Math.random() * secondNames.length)]
);

const createMessages = (time) => {
  const messages = [];
  const messagesAmount = Math.ceil(Math.random() * 2);
  for (let i = 0; i <= messagesAmount; i++) {
    const id = '_' + Math.random().toString(36).substr(2, 9);
    const type = messageTypes[Math.floor(Math.random() * 2)];
    const message = messagePatterns[Math.floor(Math.random() * messagePatterns.length)];
    const read = 'read';
    messages.push({ [type] : message, time, id, read })
  }
  return messages;
}

const createImage = () => {
  const number = Math.floor(Math.random() * avatars.length);
  return number ? `./images/users/${number}.jpg` : number;
}

const users = createUsers();

exports.users = users;
