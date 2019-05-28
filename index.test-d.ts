import {expectType} from 'tsd';
import untildify from './index.js';

expectType<string>(untildify('~/dev'));
