// ce fichier représente mon entry point. c'est donc dans celui-ci que je vais importer
// mes fichiers scss et bootstrap

// import '../sass/style.scss';
// import '../../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss';

import { $, $$ } from './modules/bling';
import typeAhead from './modules/typeAhead';
import sessionUpdate from './modules/session';

typeAhead($('.search'));

sessionUpdate($('.course-session'));
