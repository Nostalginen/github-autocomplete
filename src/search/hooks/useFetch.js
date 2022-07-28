/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useMemo } from 'react';
import { usePrevious } from "./usePrevious";
import { PER_PAGE } from "../constants";
import axios from "axios";

export const useFetch = (page = 1, search = '') => {
    const [data, setData] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [maxResults, setMax] = useState(0);
    const prevSearch = usePrevious(search);
    const searchChanged = prevSearch !== search;
    const halfPage = PER_PAGE / 2;
    const loadMore = useMemo(() => (page * PER_PAGE) < maxResults, [maxResults]);
    const params = `q=${search}&per_page=${halfPage}&page=${page}`;
    const endpoints = [
        `https://api.github.com/search/users?${params}`,
        `https://api.github.com/search/repositories?${params}`
    ];


    useEffect(() => {
        if (search.length >= 3) {
            (async () => {
                try {
                    setLoading(true);
                    await axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                        axios.spread(({ data: usersData }, { data: reposData }) => {
                            // Reconstruct data
                            const allData = [...usersData.items, ...reposData.items].map(i => ({ id: i.id, type: i.login ? 'user' : 'repository', name: i.login || i.name, url: i.html_url }));
                            // And then sort by name
                            const dataSorted = allData.sort((a, b) => a.name.localeCompare(b.name));
                            setMax(usersData.total_count + reposData.total_count);
                            setData(!data || searchChanged ? [dataSorted] : [...data, dataSorted]);
                            setError("");
                        })
                    );
                } catch (error) {
                    console.error('Oh no, an error:', error);
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            })();
        } else {
            setData(null);
        }
    }, [page, search]);

    return { data, error, loading, loadMore, maxResults };
};
