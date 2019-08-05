import React, { useState, useEffect } from 'react';
import ArticlesList from '../Components/ArticlesList';
import Upvotes from '../Components/Upvotes';
import articleContent from './article-content';
import CommentsList from '../Components/CommentsList';
import AddCommentForm from '../Components/AddCommentForm';
import NotFoundPage from './NotFoundPage';

const ArticlesPage = ({ match }) => {
    const name = match.params.name;
    const article = articleContent.find(article => article.name === name);


    const [articleInfo, setArticleInfo] = useState({upvotes: 0, comments:[] })//react hooks are functions called to absract away state management for our components

    useEffect(() => {//react hook gives a place to fetch data and set state with the result
        const fetchData = async () => { //async function
            const result = await fetch(`/api/articles/${name}`)//automaticaly proxied to the address defined in the package.json
            const body = await result.json();//response body that contains the article info
            setArticleInfo(body);//set state with the info from the server
            console.log(body);
        }
        fetchData();
     } , [name]);
        

    if (!article) return <NotFoundPage/>
     
    const otherArticles = articleContent.filter(article => article.name !== name);

    return (
        <>
        <h1>{article.title}</h1>
        <Upvotes articleName={name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo}/>
        
        {article.content.map((paragraph, key) => (
            <p key={key}>{paragraph}</p>
            
        ))}
        <CommentsList comments={articleInfo.comments}/>
        <AddCommentForm articleName={name} setArticleInfo={setArticleInfo}/>
        <h3>More Articles:</h3>
        <ArticlesList articles={otherArticles}/>
        </>
    
    );
}

export default ArticlesPage;