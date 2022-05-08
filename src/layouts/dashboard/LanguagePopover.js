import { useRef, useState } from 'react';
// material
import { Menu, MenuItem, List, ListItem, ListItemText } from '@mui/material';
// components
import { Icon } from '@iconify/react';
// multi language support
import { useTranslation } from 'react-i18next';

// ----------------------------------------------------------------------
 
const LANGS = [
	{
		value: 'en',
		label: 'English'
	},
	{
		value: 'tc',
		label: '繁體中文'
	}
];

export default function SimpleListMenu() {
	const [anchorEl, setAnchorEl] = useState(null);
	const [selectedLanguageIndex, setselectedLanguageIndex] = useState(0);	// default language
	const open = Boolean(anchorEl);

	const { t, i18n } = useTranslation();

	const handleClickListItem = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLanguageChange = (event, index, option) => {
		setselectedLanguageIndex(index);
		setAnchorEl(null);
		i18n.changeLanguage(option["value"]);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<div>
			<List component="nav">
				<ListItem
					button
					id="lock-button"
					onClick={handleClickListItem}
				>
					<Icon icon="ic:round-language" color="black" sx={{ pr: 2 }}/>
					<ListItemText
						secondary={LANGS[selectedLanguageIndex]["label"]}
					/>
				</ListItem>
			</List>
			<Menu
				id="lock-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
			>
				{LANGS.map((lang, index) => (
					<MenuItem
						key={lang.value}
						selected={index === selectedLanguageIndex}
						onClick={(event) => handleLanguageChange(event, index, lang)}
					>
						
						{lang.label}
					</MenuItem>
				))}
				{/* {options.map((option, index) => (
					<MenuItem
						key={option}
						selected={index === selectedLanguageIndex}
						onClick={(event) => handleLanguageChange(event, index, option)}
					>
						{option}
					</MenuItem>
				))} */}
			</Menu>
		</div>
	);
}