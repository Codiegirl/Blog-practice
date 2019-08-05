import React, { useState, useEffect } from 'react';
import ArticlesList from '../Components/ArticlesList';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlesPage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);


    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments:[] })//react hooks are functions called to absract away state management for our components

    useEffect(() => {//react hook gives a place to fetch data and set state with the result
        setArticleInfo({ upvotes: Math.ceil(Math.random() * 10) })
    }, [name]);//useEffect will get called whenever we change between articles

    if (!article) return <NotFoundPage/>
     
    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
        <h1>{article.title}</h1>
        <p>This article has {articleInfo.upvotes} votes.</p>
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <h3>More Articles:</h3>
        <ArticlesList articles={otherArticles}/>
        </>
    
    );
}

export default ArticlesPage;