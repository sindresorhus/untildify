import {expectType} from 'tsd';
import untildify = require('.');

expectType<string>(untildify('~/dev'));
