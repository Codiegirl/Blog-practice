import React from 'react';
import ArticlesList from '../Components/ArticlesList';
import articleContent from './article-content';
import NotFoundPage from './NotFoundPage';

const ArticlesPage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);

    if (!article) return <NotFoundPage/>
     
    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
        <h1>{article.title}</h1>
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
        ))}
        <h3>More Articles:</h3>
        <ArticlesList articles={otherArticles}/>
        </>
    
    );
}

export default ArticlesPage;