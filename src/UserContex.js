import {useContext, useState, createContext} from 'react';

import {getUsers} from './online-shop-api'
export const UserContext = createContext(null);
export const UsersContext = createContext(null);
