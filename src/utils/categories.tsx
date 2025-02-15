import type { Category, CategoryName } from '../types/interfaces';

import { BiSolidPlaneAlt } from 'react-icons/bi';
import { PiIslandBold, PiBowlFoodFill } from 'react-icons/pi';
import { MdSunny, MdFastfood, MdFoodBank } from 'react-icons/md';
import { RiHome9Fill } from 'react-icons/ri';
import { FaUserGroup } from 'react-icons/fa6';
import { FaMoneyBillAlt } from 'react-icons/fa';

export const categories: Record<CategoryName, Category> = {
	holiday: {
		name: 'Holiday',
		colour: 'red',
		icons: [<BiSolidPlaneAlt />, <PiIslandBold />, <MdSunny />],
	},
	food: {
		name: 'Food',
		colour: 'blue',
		icons: [<MdFastfood />, <MdFoodBank />, <PiBowlFoodFill />],
	},
	home: {
		name: 'Home',
		colour: 'green',
		icons: [<RiHome9Fill />],
	},
	other: {
		name: 'Other',
		colour: 'grey',
		icons: [<FaUserGroup />, <FaMoneyBillAlt />],
	},
};
