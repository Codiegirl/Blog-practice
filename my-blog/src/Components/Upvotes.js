import React from 'react';

const Upvotes = ({ articleName, upvotes, setArticleInfo }) => {
    const upvoteArticle = async () => {
        const result = await fetch(`/api/articles/${articleName}/upvote`, {
            method: 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
        <div id="upvotes-section">
        <button onClick={() => upvoteArticle()}>Vote</button>
        <p>This article has {upvotes} votes.</p>
        </div>
)
    }
    export default Upvotes
