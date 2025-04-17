import React, {ChangeEvent, useRef, useState} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CircularProgress from '@mui/material/CircularProgress';
import '../style/pages/SearchPage.scss';

const SearchPage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);

    const [inputValue, setInputValue] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
        setLoading(true);
    }

    return (
        <>
            <div className="input-wrapper">
                <SearchIcon className="input-icon"/>
                <input
                    ref={inputRef}
                    className="input"
                    placeholder="Search for Recipes"
                    value={inputValue}
                    onChange={onTextChange}
                />
                {loading && <CircularProgress className="loading-indicator" size={24} thickness={5}/>}
            </div>
        </>
    );
};

export default SearchPage;