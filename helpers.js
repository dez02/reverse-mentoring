exports.dump = obj => JSON.stringify(obj, null, 2);
const fs = require('fs');

// Some details about the site
exports.siteName = 'Reverse-Mentoring!';
exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);


exports.menu = [
  { slug: '/courses', title: 'Courses', icon: 'logo_B' },
  { slug: '/top', title: 'Top', icon: 'top' },
  { slug: '/add/course', title: 'Add', icon: 'add' },
];
exports.moment = require('moment');
