import { useState, useEffect } from 'react';

const useMediumBlogs = (username) => {
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!username) {
            setIsLoading(false);
            return;
        }

        const fetchBlogs = async () => {
            try {
                // Using rss2json.com API to convert Medium RSS to JSON
                const rssUrl = `https://medium.com/feed/@${username}`;
                const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`;

                const response = await fetch(apiUrl);
                const data = await response.json();

                if (data.status === 'ok') {
                    const formattedBlogs = data.items.map(item => ({
                        title: item.title,
                        description: item.description.replace(/<[^>]*>?/gm, '').substring(0, 150) + '...',
                        url: item.link,
                        date: new Date(item.pubDate).toLocaleDateString()
                    }));
                    setBlogs(formattedBlogs);
                } else {
                    throw new Error(data.message || 'Failed to fetch blogs');
                }
            } catch (err) {
                setError(err.message);
                console.error("Error fetching Medium blogs:", err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlogs();
    }, [username]);

    return { blogs, isLoading, error };
};

export default useMediumBlogs;
