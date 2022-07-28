import React, { useState } from 'react';
import Loader from "./loader/loader";
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";
import { useFetch } from "./hooks/useFetch";
import { useKeys } from "./hooks/useKeys"
import { useDebounce } from 'use-debounce';
import "./search.scss";
import ListItem from './list-item/list-item';

const Search = ({ debounce = true }) => {
    useKeys();
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [debouncedSearch] = useDebounce(search, 500);
    const { data, error, loading, loadMore, maxResults } = useFetch(page, debounce ? debouncedSearch : search);
    const containerOpen = !!data && search.length >= 3;

    const handleInput = (e) => {
        setSearch(e.target.value);
        setPage(1);
    }

    return (
        <>
            <div className="search__container">
                <form onSubmit={e => e.preventDefault()} aria-label="Search form" autoComplete='off' className='search__form'>
                    <SearchIcon aria-hidden="true" width="40" height="40" stroke='#B8BAC4' />
                    <input
                        data-testid="search-input"
                        type="text"
                        name="search"
                        autoFocus
                        placeholder='Type to search'
                        aria-label='Type to search'
                        className='search__input'
                        onChange={handleInput}
                    />
                    {page === 1 && loading && <div data-testid="top-loader" className='loader__container'><Loader /></div>}
                </form>
                <section data-testid="search-container" style={{ height: containerOpen ? '530px' : 0, borderWidth: containerOpen ? '2px' : 0 }} aria-hidden={!data} className='search-results__container'>
                    <h1>{`${maxResults} results found`}</h1>
                    <ul className='search-results__list'>
                        {data?.map((page, pageIndex) => page.map((item, index) => <ListItem key={item.id} data={item} index={index} pageIndex={pageIndex} data-testid="list-item" />))}
                    </ul>
                    {!loading && loadMore && (
                        <div className='load__more'>
                            <button className='btn' onClick={() => setPage(page + 1)}>Load more</button>
                        </div>
                    )}
                    {page !== 1 && loading && <div className='search-results__loader'><Loader /></div>}
                </section>
            </div>
            {error && <div className='search__error'>Oops.. error occured, we will fix it.. <a rel="noreferrer" href="https://bitly.com/98K8eH" target="_blank">probably</a></div>}
        </>
    )
}

export default Search